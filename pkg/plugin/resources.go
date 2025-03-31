package plugin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
)

type UserResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	ExpiresIn    int    `json:"expiresIn"`
}

// authenticate sends a POST request to Frontegg to get the access token.
func authenticate(userName string, password string, domain string) (string, error) {
	authUrl := fmt.Sprintf("https://auth.%s", domain)
	loginUrl, err := url.JoinPath(authUrl, "frontegg/identity/resources/auth/v1/user")
	if err != nil {
		return "", fmt.Errorf("failed to construct login URL: %w", err)
	}

	payload := map[string]string{"email": userName, "password": password}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest(http.MethodPost, loginUrl, bytes.NewReader(payloadBytes))
	if err != nil {
		return "", err
	}
	req.Header.Set("accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(res.Body)
		log.DefaultLogger.Error("Authentication failed", "status", res.Status, "response", string(responseData))
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

	return response.AccessToken, nil
}

// getGraphQL proxies the GraphQL request to the Causely API and returns the json response.
func getGraphQL(token string, body io.Reader, domain string) ([]byte, error) {
	baseUrl := fmt.Sprintf("https://api.%s", domain)
	url, err := url.JoinPath(baseUrl, "query")
	if err != nil {
		return nil, fmt.Errorf("failed to construct GraphQL URL: %w", err)
	}
	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest(http.MethodPost, url, body)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	res, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(res.Body)
		log.DefaultLogger.Error("GraphQL request failed", "status", res.Status, "response", string(responseData))
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
	token, err := authenticate(app.username, app.password, app.domain)
	if err != nil {
		log.DefaultLogger.Error("Authentication failed", "error", err)
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
