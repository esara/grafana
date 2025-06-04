import { PanelPlugin } from '@grafana/data';
import { ScopeSelectEditor } from '../panelOptions/scopeSelectEditor/scopeSelectEditor.component';
import { ApiUserScope } from 'api/api.types';
import { ServiceCardsPanel } from './serviceCardsPanel.component';

export type ServiceCardsPanelOptions = {
    apiUserScope: ApiUserScope;
    panelType: PanelType;
}

export enum PanelType {
    Single = 'single',
    Collection = 'collection',
}

export const plugin = new PanelPlugin<ServiceCardsPanelOptions>(ServiceCardsPanel)
    .setPanelOptions(builder => {
        return builder.addSelect({
            path: 'panelType',
            name: 'Panel Type',
            settings: {
                options: [
                    { label: 'Single', value: PanelType.Single },
                    { label: 'Collection', value: PanelType.Collection },
                ],
            },
            defaultValue: PanelType.Single,
        }).addCustomEditor({
            id: 'apiUserScope',
            path: 'apiUserScope',
            name: 'User Scope',
            editor: ScopeSelectEditor,
        });
    });

