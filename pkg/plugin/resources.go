package plugin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"sync"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend/httpclient"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
)

const defaultTimeout = 10 * time.Second

type UserResponse struct {
	Access_token  string `json:"access_token"`  // For client ID authentication
	Refresh_token string `json:"refresh_token"` // For client ID authentication
	AccessToken   string `json:"accessToken"`   // For username authentication
	RefreshToken  string `json:"refreshToken"`  // For username authentication
	ExpiresIn     int    `json:"expiresIn"`
}

var (
	httpClient     *http.Client
	httpClientErr  error
	httpClientOnce sync.Once
)

// initHTTPClient initializes the shared HTTP client using the Grafana SDK's httpclient,
// which provides proxy support, logging, tracing, and other Grafana-integrated behavior.
func initHTTPClient() {
	httpClientOnce.Do(func() {
		httpClient, httpClientErr = httpclient.New(httpclient.Options{
			Timeouts: &httpclient.TimeoutOptions{Timeout: defaultTimeout},
		})
	})
}

// authenticate sends a POST request to Frontegg to get the access token.
func authenticate(loginUrl string, payload map[string]string) (string, error) {
	initHTTPClient()
	if httpClientErr != nil {
		return "", httpClientErr
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest(http.MethodPost, loginUrl, bytes.NewReader(payloadBytes))
	if err != nil {
		return "", err
	}
	req.Header.Set("accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	res, err := httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer func() {
		if closeErr := res.Body.Close(); closeErr != nil {
			log.DefaultLogger.Error("Error closing response body", "error", closeErr)
		}
	}()

	if res.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(res.Body)
		log.DefaultLogger.Error("Authentication failed", "status", res.Status, "responseLength", len(responseData))
		log.DefaultLogger.Debug("Authentication failed response body (DEBUG only)", "response", string(responseData))
		return "", fmt.Errorf("authentication failed, see Grafana server log for details")
	}

	responseData, err := io.ReadAll(res.Body)
	if err != nil {
		log.DefaultLogger.Error("Error reading response body", "error", err)
		return "", fmt.Errorf("error reading response bod, see Grafana server log for details")
	}

	var response UserResponse
	if err = json.Unmarshal(responseData, &response); err != nil {
		log.DefaultLogger.Error("Failed to parse response", "error", err)
		return "", fmt.Errorf("failed to parse response, see Grafana server log for details")
	}

	// Get token from either field
	token := response.Access_token
	if token == "" {
		token = response.AccessToken
	}
	if token == "" {
		log.DefaultLogger.Error("No access token found in response")
		return "", fmt.Errorf("no access token found in response")
	}

	return token, nil
}

// getGraphQL proxies the GraphQL request to the Causely API and returns the json response.
func getGraphQL(token string, body io.Reader, domain string) ([]byte, error) {
	initHTTPClient()
	if httpClientErr != nil {
		return nil, httpClientErr
	}

	baseUrl := fmt.Sprintf("https://api.%s", domain)
	url, err := url.JoinPath(baseUrl, "query")
	if err != nil {
		return nil, fmt.Errorf("failed to construct GraphQL URL: %w", err)
	}
	req, err := http.NewRequest(http.MethodPost, url, body)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	res, err := httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer func() {
		if closeErr := res.Body.Close(); closeErr != nil {
			log.DefaultLogger.Error("Error closing response body", "error", closeErr)
		}
	}()

	if res.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(res.Body)
		log.DefaultLogger.Error("GraphQL request failed", "status", res.Status, "responseLength", len(responseData))
		log.DefaultLogger.Debug("GraphQL request failed response body (DEBUG only)", "response", string(responseData))
		return nil, fmt.Errorf("request failed, see Grafana server log for details")
	}

	responseData, err := io.ReadAll(res.Body)
	if err != nil {
		log.DefaultLogger.Error("Error reading GraphQL response body", "error", err)
		return nil, fmt.Errorf("request failed, see Grafana server log for details")
	}

	return responseData, nil
}

// handleQuery is an HTTP POST resource that returns graphql JSON response.
func (app *App) handleQuery(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	token, err := app.getValidToken()
	if err != nil {
		log.DefaultLogger.Error("Failed to get valid token", "error", err)
		http.Error(w, "authentication failed, see Grafana server log for details", http.StatusInternalServerError)
		return
	}

	requestBody, err := io.ReadAll(req.Body)
	if err != nil {
		log.DefaultLogger.Error("Error reading request body", "error", err)
		http.Error(w, "error reading request body see Grafana server log for details", http.StatusInternalServerError)
		return
	}

	response, err := getGraphQL(token, bytes.NewReader(requestBody), app.domain)
	if err != nil {
		log.DefaultLogger.Error("GraphQL request failed", "error", err)
		http.Error(w, "graphql request failed, see Grafana server log for details", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	if _, err := w.Write(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// handlePing is an example HTTP GET resource that returns a {"message": "ok"} JSON response.
func (app *App) handlePing(w http.ResponseWriter, req *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	if _, err := w.Write([]byte(`{"message": "ok"}`)); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// handleEcho is an example HTTP POST resource that accepts a JSON with a "message" key and
// returns to the client whatever it is sent.
func (app *App) handleEcho(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var body struct {
		Message string `json:"message"`
	}
	if err := json.NewDecoder(req.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(body); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// registerRoutes takes a *http.ServeMux and registers some HTTP handlers.
func (app *App) registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/query", app.handleQuery)
	mux.HandleFunc("/ping", app.handlePing)
	mux.HandleFunc("/echo", app.handleEcho)
}
