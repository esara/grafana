import { PanelPlugin } from '@grafana/data';
import { RootCausePanel } from './rootCausePanel.component';
import { ScopeSelectEditor } from '../editorOptions/scopeSelectEditor/scopeSelectEditor.component';
import { ApiUserScope } from 'api/api.types';

export type RootCausePanelOptions = {
    apiUserScope: ApiUserScope;
}

export const plugin = new PanelPlugin<RootCausePanelOptions>(RootCausePanel)
    .setPanelOptions(builder => {
        return builder.addCustomEditor({
            id: 'apiUserScope',
            path: 'apiUserScope',
            name: 'User Scope',
            editor: ScopeSelectEditor,
        });
    });

