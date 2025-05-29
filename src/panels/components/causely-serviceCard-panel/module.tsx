import { PanelPlugin } from '@grafana/data';
import { ScopeSelectEditor } from '../panelOptions/scopeSelectEditor/scopeSelectEditor.component';
import { ApiUserScope } from 'api/api.types';
import { ServiceCardsPanel } from './serviceCardsPanel.component';

export type ServiceCardsPanelOptions = {
    apiUserScope: ApiUserScope;
}

export const plugin = new PanelPlugin<ServiceCardsPanelOptions>(ServiceCardsPanel)
    .setPanelOptions(builder => {
        return builder.addCustomEditor({
            id: 'apiUserScope',
            path: 'apiUserScope',
            name: 'User Scope',
            editor: ScopeSelectEditor,
        });
    });

