import { PanelPlugin } from '@grafana/data';
import { RootCausePanel } from './rootCausePanel.component';

export const plugin = new PanelPlugin<void>(RootCausePanel);
