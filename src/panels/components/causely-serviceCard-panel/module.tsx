import { PanelPlugin } from '@grafana/data';
import { ScopeSelectEditor } from '../panelOptions/scopeSelectEditor/scopeSelectEditor.component';
import { ApiUserScope } from 'api/api.types';
import { ServiceCardsPanel } from './serviceCardsPanel.component';
import { ServiceSelectEditor } from '../panelOptions/scopeSelectEditor/serviceSelectEditor.component';
import { ComboboxOption } from '@grafana/ui';

export type ServiceCardsPanelOptions = {
    apiUserScope: ApiUserScope;
    panelType: PanelType;
    pageSize?: PageSize; 
    singleServiceData?: ComboboxOption<string>// Replace 'any' with your specific type
}

export enum PanelType {
    Single = 'single',
    Collection = 'collection',
}

export enum PageSize {
    Two = 2,
    Four = 4,
    Eight = 8,
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
            id: 'singleServiceData',
            path: 'singleServiceData',
            name: 'Service',
            editor: ServiceSelectEditor,
            showIf: (options) => options.panelType === PanelType.Single,
        })
        .addCustomEditor({
            id: 'apiUserScope',
            path: 'apiUserScope',
            name: 'User Scope',
            editor: ScopeSelectEditor,
            showIf: (options) => options.panelType === PanelType.Collection,
        }).addSelect({
            path: 'pageSize',
            name: 'Page Size',
            settings: {
                options: [
                    { label: '2', value: PageSize.Two },
                    { label: '4', value: PageSize.Four },
                    { label: '8', value: PageSize.Eight },
                ],
            },
            defaultValue: PageSize.Four,
            showIf: (options) => options.panelType === PanelType.Collection,
        });
    });

