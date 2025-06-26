import React, { useState } from 'react';
import { Combobox, ComboboxOption } from '@grafana/ui';
import { StandardEditorProps } from '@grafana/data';
import { GetEntityConnectionQueryData, QueryEntityConnection } from 'api/graphql/queries/queryEntityConnection';
import { QueryResult } from 'api/apiUtil';
import { ApiEntity, ApiEntityEdge, ApiQueryEntityConnectionArgs } from 'api/api.types';
import { EntityUtil } from 'utils/entity/entity.util';
import { ArraysUtil } from 'utils/arrays/arrays.util';
import { TopologyUtil } from 'utils/topology/topology.util';
import { ServiceUtil } from 'utils/service/service.util';


export const ServiceSelectEditor: React.FC<StandardEditorProps<ComboboxOption<string>>> = ({ value, onChange }) => {

    const [selected, setSelected] = useState<ComboboxOption<string>>(value);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getOptions = ((inputValue: string = null): Promise<Array<ComboboxOption<string>>> => {
        setIsLoading(true);
        const entityConnectionVariables: ApiQueryEntityConnectionArgs = {
            entityFilter: {
                entityTypes: ['Service'],
                nameExpr: inputValue,
            },
            first: 25
        };

        const serviceOptions: Array<ComboboxOption<string>> = [];

        return QueryEntityConnection(entityConnectionVariables).then((res: QueryResult<GetEntityConnectionQueryData>) => {

            res.data?.entityConnection?.edges?.forEach((edge: ApiEntityEdge) => {
                const entity = edge.node;

                serviceOptions.push({
                    label: EntityUtil.simplifyEntityname(entity),
                    description: `${ServiceUtil.getNameSpaceAndClusterNameInfo(entity)}`,
                    value: entity.id,
                });
            });
            return serviceOptions;
        }).catch((error) => {
            console.error("Service Select Editor Error: ", error);
            return [];
        }).finally(() => {
            setIsLoading(false);
        });
    });

    const handleChange = (serviceEntity: ComboboxOption<string>) => {
        setSelected(serviceEntity);
        onChange(serviceEntity); // update panel option state
    };

    return (
        <Combobox
            placeholder="Search for service"
            options={getOptions}
            onChange={handleChange}
            value={selected}
            loading={isLoading}
        />
    );
};
