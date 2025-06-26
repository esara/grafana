package plugin

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"sync"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"
)

// Make sure App implements required interfaces. This is important to do
// since otherwise we will only get a not implemented error response from plugin in
// runtime. Plugin should not implement all these interfaces - only those which are
// required for a particular task.
var (
	_ backend.CallResourceHandler   = (*App)(nil)
	_ instancemgmt.InstanceDisposer = (*App)(nil)
	_ backend.CheckHealthHandler    = (*App)(nil)
)

// App is an example app backend plugin which can respond to data queries.
type App struct {
	backend.CallResourceHandler
	domain      string
	clientId    string
	secret      string
	username    string
	password    string
	token       string
	tokenExpiry time.Time
	tokenMutex  sync.RWMutex
}

type JSONDataStruct struct {
	CauselyDomain   string `json:"causelyDomain"`
	CauselyUser     string `json:"causelyUsername"`
	CauselyClientId string `json:"causelyClientId"`
}

// NewApp creates a new example *App instance.
func NewApp(_ context.Context, appSettings backend.AppInstanceSettings) (instancemgmt.Instance, error) {
	log.DefaultLogger.Debug("Creating new app instance")
	var app App
	var err error

	log.DefaultLogger.Debug("Loading settings")

	// Unmarshal JSONData
	var jsonDataStruct JSONDataStruct
	err = json.Unmarshal(appSettings.JSONData, &jsonDataStruct)
	if err != nil {
		fmt.Println("Error unmarshalling JSONData:", err)
		return nil, err
	}
	app.domain = jsonDataStruct.CauselyDomain
	app.username = jsonDataStruct.CauselyUser
	app.clientId = jsonDataStruct.CauselyClientId
	app.password = appSettings.DecryptedSecureJSONData["causelyPassword"]
	app.secret = appSettings.DecryptedSecureJSONData["causelySecret"]

	// Use a httpadapter (provided by the SDK) for resource calls. This allows us
	// to use a *http.ServeMux for resource calls, so we can map multiple routes
	// to CallResource without having to implement extra logic.
	mux := http.NewServeMux()
	app.registerRoutes(mux)
	app.CallResourceHandler = httpadapter.New(mux)

	return &app, nil
}

// Dispose here tells plugin SDK that plugin wants to clean up resources when a new instance
// created.
func (a *App) Dispose() {
	// cleanup
}

// CheckHealth handles health checks sent from Grafana to the plugin.
func (a *App) CheckHealth(_ context.Context, _ *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "ok",
	}, nil
}

// getValidToken returns a valid token, either from cache or by authenticating.
func (app *App) getValidToken() (string, error) {
	app.tokenMutex.RLock()
	// Check if we have a valid cached token
	if app.token != "" && time.Now().Before(app.tokenExpiry) {
		token := app.token
		app.tokenMutex.RUnlock()
		return token, nil
	}
	app.tokenMutex.RUnlock()

	// Need to authenticate - acquire write lock
	app.tokenMutex.Lock()
	defer app.tokenMutex.Unlock()

	// Double-check after acquiring write lock (another goroutine might have refreshed)
	if app.token != "" && time.Now().Before(app.tokenExpiry) {
		return app.token, nil
	}

	// Create authentication payload and url using either clientId or username
	var loginUrl string
	var payload map[string]string
	var err error

	authUrl := fmt.Sprintf("https://auth.%s", app.domain)

	if app.clientId != "" && app.secret != "" {
		payload = map[string]string{"clientId": app.clientId, "secret": app.secret}
		loginUrl, err = url.JoinPath(authUrl, "frontegg/identity/resources/auth/v2/api-token")
	} else if app.username != "" && app.password != "" {
		payload = map[string]string{"email": app.username, "password": app.password}
		loginUrl, err = url.JoinPath(authUrl, "frontegg/identity/resources/auth/v1/user")
	} else {
		return "", fmt.Errorf("missing clientId and username credentials")
	}

	if err != nil {
		return "", fmt.Errorf("failed to construct login URL: %w", err)
	}

	// Authenticate and get new token
	token, err := authenticate(loginUrl, payload)
	if err != nil {
		return "", fmt.Errorf("authentication failed: %w", err)
	}

	// Cache the token with 24-hour expiry minus a small buffer for safety
	app.token = token
	app.tokenExpiry = time.Now().Add(43200 * time.Minute) // `12h to be safe

	return token, nil
}
