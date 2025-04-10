# Causely Grafana Plugin

**Causely** delivers instant value with no complex setup or configuration. It shifts your organization from reactive to proactive operations. Instead of a flood of alerts, Causely tells you exactly what you need to know about active and emerging application failures — including why a failure happened, what the root cause was, and how to fix it.

## Overview / Introduction

The [Causal AI platform][1] supercharges your observability stack by using built-in intelligence to analyze your telemetry data. It enables **self-managed, resilient applications** by integrating observability with automated orchestration.

Use Causely to:

- **Assure continuous application reliability**: Ensure KPIs, SLAs, SLOs, and SLIs are consistently met to maintain reliability and performance.
- **Improve operational efficiency**: Reduce labor, data, and tooling costs by accelerating Mean Time to Repair (MTTR) and streamlining operational processes.
- **Accelerate feature delivery and innovation**: Increase the speed and reliability of shipping new services and features, helping you maintain a competitive edge.

Causely integrates with Grafana to provide **automated root cause analysis** based on OpenTelemetry signals. It uses OTEL Traces and Metrics as inputs to the Causal AI reasoning platform, identifying the root causes of anomalies and alerts. The **Causely Grafana Plugin** displays the identified root causes, including service impacts, in a Grafana Panel.

## Requirements
An active Causely subscription.  You can sign up for a free trial [here][3].

## Install the Plugin on Grafana Cloud

**Prerequisite:**
Access to a Grafana Cloud environment (including the free tier)

**Steps:**
1. In Grafana Cloud, click **Administration** > **Plugins and data** > **Plugins** in the side navigation menu.
1. Browse or search for the **Causely** plugin and click to open it.
1. On the **Configuration** tab, enter a valid causely username and password.
1. Click **Save Causely Credentials**.

## Install the Plugin Directly

Use the `GF_INSTALL_PLUGINS` environment variable when running Grafana:

```sh
GF_INSTALL_PLUGINS=esara-causely-app
```

or alternatively install using the Grafana CLI:

```sh
grafana cli plugins install esara-causely-app
```

## Documentation
Access the Causely documentation at [Causely documentation][2] for more information.

Additional helpful documentation, links, and articles:
- [Request a demo][3] to experience automated root cause analysis with Causely first-hand
- [Read the blog][4]: DevOps may have cheated death, but do we all need to work for the king of the underworld?
- [Watch the video][5]: Causely for asynchronous communication

[1]: https://www.causely.ai
[2]: https://docs.causely.ai/getting-started/overview/
[3]: https://www.causely.ai/try
[4]: https://www.causely.ai/blog/devops-may-have-cheated-death-but-do-we-all-need-to-work-for-the-king-of-the-underworld/
[5]: https://www.causely.ai/blog/causely-for-asynchronous-communication