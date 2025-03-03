package plugin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	gqmdl "github.com/esara/causely/pkg/causelyGraphQl"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
)

type UserResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	ExpiresIn    int    `json:"expiresIn"`
}

var domain = "staging.causely.app"
var userName string = ""
var password string = ""

// authenticate sends a POST request to Frontegg to get the access token.
func authenticate(userName string, password string) (string, error) {
	authUrl := fmt.Sprintf("https://auth.%s", domain)
	loginUrl := fmt.Sprintf("%s/frontegg/identity/resources/auth/v1/user", authUrl)

	payload := map[string]string{"email": userName, "password": password}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		log.DefaultLogger.Error("Error marshalling payload: ", err)
		return "", err
	}

	client := &http.Client{}
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

	// log.DefaultLogger.Info("Response Status: " + res.Status)

	if res.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(res.Body)
		return "", fmt.Errorf("authentication failed: %s - %s", res.Status, responseData)
	}

	responseData, err := io.ReadAll(res.Body)
	if err != nil {
		return "", fmt.Errorf("error reading response body: %w", err)
	}

	var response UserResponse
	if err = json.Unmarshal(responseData, &response); err != nil {
		return "", fmt.Errorf("failed to parse response: %w", err)
	}

	return response.AccessToken, nil
}

// getLoginTokenFromFrontEgg sends a POST request to Frontegg to get the login token.
func getLoginTokenFromFrontEgg(userName, password string) (string, error) {
	authUrl := fmt.Sprintf("https://auth.%s", domain)
	loginUrl := fmt.Sprintf("%s/frontegg/identity/resources/auth/v1/user", authUrl)

	log.DefaultLogger.Info("Auth URL: " + authUrl)
	log.DefaultLogger.Info("Login URL: " + loginUrl)
	log.DefaultLogger.Info("Username: " + userName)
	log.DefaultLogger.Info("Password: " + password) // Ensure the password is logged correctly

	payload := map[string]string{"email": userName, "password": password}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		log.DefaultLogger.Error("Error marshalling payload: ", err)
		return "", err
	}

	log.DefaultLogger.Info("Payload: " + string(payloadBytes))

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodPost, loginUrl, bytes.NewReader(payloadBytes))
	if err != nil {
		log.DefaultLogger.Error("Error creating request: ", err)
		return "", err
	}
	req.Header.Set("accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	log.DefaultLogger.Info("Request Headers: ", req.Header)

	res, err := client.Do(req)
	if err != nil {
		log.DefaultLogger.Error("Error making request: ", err)
		return "", err
	}
	defer res.Body.Close()

	log.DefaultLogger.Info("Response Status: " + res.Status)

	if res.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(res.Body)
		log.DefaultLogger.Error("Authentication failed: ", res.Status, " - ", string(responseData))
		return "", fmt.Errorf("authentication failed: %s - %s", res.Status, responseData)
	}

	responseData, err := io.ReadAll(res.Body)
	if err != nil {
		log.DefaultLogger.Error("Error reading response body: ", err)
		return "", fmt.Errorf("error reading response body: %w", err)
	}

	log.DefaultLogger.Info("Response Data123: " + string(responseData))

	var response UserResponse
	if err = json.Unmarshal(responseData, &response); err != nil {
		log.DefaultLogger.Error("Failed to parse response: ", err)
		return "", fmt.Errorf("failed to parse response: %w", err)
	}

	log.DefaultLogger.Info("Access Token: " + response.AccessToken)

	return response.AccessToken, nil
}

// createRequestBody creates a JSON-encoded body for the HTTP request.
func createRequestBody(data map[string]interface{}) (io.Reader, error) {
	bodyBytes, err := json.Marshal(data)
	if err != nil {
		log.DefaultLogger.Error("Error marshalling request body: ", err)
		return nil, err
	}
	log.DefaultLogger.Info("Request Body: " + string(bodyBytes))
	return bytes.NewReader(bodyBytes), nil
}

// getGraphQL proxies the GraphQL request to the Causely API and returns the json response.
func getGraphQL(token string, body io.Reader) ([]byte, error) {
	baseUrl := fmt.Sprintf("https://api.%s", domain)
	url := fmt.Sprintf("%s/query/", baseUrl)

	log.DefaultLogger.Info("GraphQL Request url ", url)
	log.DefaultLogger.Info("GraphQL Request body ", body)

	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest(http.MethodPost, url, body)
	log.DefaultLogger.Info("GraphQL Request req.body: ", req.Body)

	if err != nil {
		log.DefaultLogger.Error("Error creating GraphQL request: ", err)
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	log.DefaultLogger.Info("GraphQL Request Headers: ", req.Header)

	res, err := client.Do(req)
	if err != nil {
		log.DefaultLogger.Error("Error making GraphQL request: ", err)
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer res.Body.Close()

	log.DefaultLogger.Info("GraphQL Response Status: " + res.Status)

	if res.StatusCode != http.StatusOK {
		responseData, _ := io.ReadAll(res.Body)
		log.DefaultLogger.Error("GraphQL request failed: ", res.Status, " - ", string(responseData))
		return nil, fmt.Errorf("request failed: %s - %s", res.Status, responseData)
	}

	responseData, err := io.ReadAll(res.Body)
	if err != nil {
		log.DefaultLogger.Error("Error reading GraphQL response body: ", err)
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	log.DefaultLogger.Info("GraphQL Response Data: " + string(responseData))

	return responseData, nil
}

// handleQuery is an HTTP POST resource that returns graphql JSON response.
func (a *App) handleQuery(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		log.DefaultLogger.Error("Method not allowed: ", req.Method)
		return
	}
	token, err := authenticate(userName, password)
	// token, err := getLoginTokenFromFrontEgg(userName, password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.DefaultLogger.Error("Error authenticating: ", err)
		return
	}
	log.DefaultLogger.Info("Access Token: " + token)

	bodyData := payloadEntityTypeCounts()

	body, err := createRequestBody(bodyData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.DefaultLogger.Error("Error creating request body: ", err)
		return
	}

	response, err := getGraphQL(token, body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.DefaultLogger.Error("Error getting GraphQL response: ", err)
		return
	}
	log.DefaultLogger.Info("GraphQL Response: " + string(response))

	w.Header().Add("Content-Type", "application/json")
	if _, err := w.Write(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.DefaultLogger.Error("Error writing response: ", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	log.DefaultLogger.Info("Query handled successfully")
}

// handlePing is an example HTTP GET resource that returns a {"message": "ok"} JSON response.
func (a *App) handlePing(w http.ResponseWriter, req *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	if _, err := w.Write([]byte(`{"message": "ok"}`)); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.DefaultLogger.Error("Error writing ping response: ", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	log.DefaultLogger.Info("Ping handled successfully")
}

// handleEcho is an example HTTP POST resource that accepts a JSON with a "message" key and
// returns to the client whatever it is sent.
func (a *App) handleEcho(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		log.DefaultLogger.Error("Method not allowed: ", req.Method)
		return
	}
	var body struct {
		Message string `json:"message"`
	}
	if err := json.NewDecoder(req.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.DefaultLogger.Error("Error decoding request body: ", err)
		return
	}
	log.DefaultLogger.Info("Echo Message: " + body.Message)

	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(body); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.DefaultLogger.Error("Error encoding response body: ", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	log.DefaultLogger.Info("Echo handled successfully")
}

// registerRoutes takes a *http.ServeMux and registers some HTTP handlers.
func (a *App) registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/query", a.handleQuery)
	mux.HandleFunc("/ping", a.handlePing)
	mux.HandleFunc("/echo", a.handleEcho)
}

// Declare a variable that will be a string value
var queryDefectCounts = "query defectCounts($bucketSize: String, $filter: DefectFilter, $groupRecurring: Boolean) {\n  defectCounts(\n    bucketSize: $bucketSize\n    filter: $filter\n    groupRecurring: $groupRecurring\n  ) {\n    severity\n    defectAutoCount\n    defectCount\n    defectManualCount\n    defectName\n    entityType\n    time\n    __typename\n  }\n}"
var queryEntityTypeCounts = "query entityTypeCounts($entityFilter: EntityFilter) {\n  entityTypeCounts(entityFilter: $entityFilter) {\n    entityType\n    count\n    severity\n    __typename\n  }\n}"

func payloadDefectCounts2() map[string]interface{} {
	bodyData := map[string]interface{}{
		"operationName": "defectCounts",
		"variables": map[string]interface{}{
			"entityFilter": map[string]interface{}{
				"entityTypes": []string{
					"KubernetesService",
					"Service",
				},
			},
		},
		"query": queryDefectCounts,
	}
	return bodyData
}

func payloadEntityTypeCounts() map[string]interface{} {
	//Limiting results to service level
	entityFilterServices := gqmdl.EntityFilter{
		EntityTypes: []string{
			"Service",
		}}

	bodyData := map[string]interface{}{
		"operationName": "entityTypeCounts",
		"variables": map[string]interface{}{
			"entityFilter": entityFilterServices,
		},
		"query": queryEntityTypeCounts,
	}
	return bodyData
}
