import { PanelPlugin } from '@grafana/data';
import ServiceHealthSummaryPanel from "./serviceHealthSummary.panel";

export const plugin = new PanelPlugin<void>(ServiceHealthSummaryPanel);
