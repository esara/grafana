import { PanelPlugin } from '@grafana/data';
import { RootCausePanel } from './rootCausePanel.component';
import { ScopeSelectEditor } from '../editorOptions/scopeSelectEditor/scopeSelectEditor.component';
import { ApiUserScope } from 'api/api.types';

export type RootCausePanelOptions = {
    apiUserScope: ApiUserScope;
    panelType: PanelType;
}
export enum PanelType {
    UrgentRootCause = 'urgentRcs',
    RootCauseHeadlines = 'headlines',
}

export const plugin = new PanelPlugin<RootCausePanelOptions>(RootCausePanel)
    .setPanelOptions(builder => {
        return builder.addCustomEditor({
            id: 'apiUserScope',
            path: 'apiUserScope',
            name: 'User Scope',
            editor: ScopeSelectEditor,
        }).addSelect({
            path: 'panelType',
            name: 'Panel Type',
            settings: {
                options: [
                    { label: 'Urgent Root Cause', value: PanelType.UrgentRootCause },
                    { label: 'Root Cause Headlines', value: PanelType.RootCauseHeadlines },
                ],
            },
            defaultValue: PanelType.UrgentRootCause,
        });
    });

