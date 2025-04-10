# Causely Grafana Plugin

**Causely** delivers instant value — no complex setup required. It shifts your teams from reactive firefighting to proactive control. Instead of drowning in alerts, Causely tells you what matters: which failures are happening, why they’re happening, and how to fix them — all inside Grafana.

## What is Causely 

Causely is a [Causal AI platform][1] that supercharges your observability stack by using built-in intelligence to analyze your telemetry data and infer root causes in real time. It enables self-managed, resilient applications by combining observability with automated decision-making.

Use Causely to:

- **Ensure Continuous Reliability**: Automatically meet KPIs, SLAs, SLOs, and SLIs by detecting and resolving reliability issues before users are impacted.
- **Improve Operational Efficiency**: Reduce MTTR and alert fatigue. Eliminate hours of manual troubleshooting and correlation work.
- **Accelerate Feature Delivery**: Confidently ship new services by understanding the impact of every change across your environment.

 The **Causely Grafana Plugin** brings this reasoning directly into Grafana dashboards — showing root causes, impacted services, and SLO risks in context. It works by analyzing OpenTelemetry (OTEL) traces and metrics from your environment.

## Requirements
An active Causely subscription.  You can sign up for a free trial [here][3].

## Install the Plugin on Grafana Cloud

**Prerequisite:**
- Grafana Cloud account (including the free tier)
- Causely credentials (username and password)

**Steps:**
1. In Grafana Cloud, go to **Administration** > **Plugins and data** > **Plugins** in the side navigation menu.
2. Search for the **Causely** plugin and click to open the plugin page.
3. Navigate to the **Configuration** tab
4. Enter a valid **Causely username** and **password**.
5. Click **Save Causely Credentials**.

## Install the Plugin Directly

Use the `GF_INSTALL_PLUGINS` environment variable when running Grafana:

```sh
GF_INSTALL_PLUGINS=esara-causely-app
```

or alternatively install using the Grafana CLI:

```sh
grafana cli plugins install esara-causely-app
```

## What You Get
With Causely + Grafana, you can:
- View the **root causes of all active anomalies** across your environment
- Identify the **highest priority issue** impacting your services right now
- Detect **SLOs at risk**, before they’re violated
- See **service impact analysis and resolution recommendations** — all inside your Grafana dashboards
- Feed Causely root cause alerts directly into **Grafana Alertmanager**, enriching your existing incident response workflows

All of this is powered by Causely’s real-time reasoning engine, and enabled within minutes via [Grafana Beyla][6] — an eBPF-based auto-instrumentation agent that connects to your Kubernetes workloads with zero code changes.

## Need Help 
- Access the Causely documentation at [Causely documentation][2]
- Contact us at support@causely.ai

Additional helpful links and articles:
- [Request a demo][3] to experience automated root cause analysis with Causely first-hand
- [Read the blog][4]: DevOps may have cheated death, but do we all need to work for the king of the underworld?
- [Watch the video][5]: Causely for asynchronous communication

[1]: https://www.causely.ai
[2]: https://docs.causely.ai/getting-started/overview/
[3]: https://www.causely.ai/try
[4]: https://www.causely.ai/blog/devops-may-have-cheated-death-but-do-we-all-need-to-work-for-the-king-of-the-underworld/
[5]: https://www.causely.ai/blog/causely-for-asynchronous-communication
[6]: https://github.com/grafana/beyla
