import {PanelPlugin} from '@grafana/data';
import ServiceHealthSummaryPanel from "./components/serviceHealthSummary.panel";

export const plugin = new PanelPlugin<void>(ServiceHealthSummaryPanel);