import React, { useEffect, useState } from 'react';
import { Combobox, ComboboxOption, LoadingBar } from '@grafana/ui';
import { StandardEditorProps } from '@grafana/data';
import { GetEntityConnectionQueryData, QueryEntityConnection } from 'api/graphql/queries/queryEntityConnection';
import { QueryResult } from 'api/apiUtil';
import { ApiEntityEdge, ApiQueryEntityConnectionArgs } from 'api/api.types';
import { CUIRenderWhen } from 'sdk/cuiRenderWhen/coreRenderWhen.component';
import { EntityUtil } from 'utils/entity/entity.util';


export const ServiceSelectEditor: React.FC<StandardEditorProps<ComboboxOption<string>>> = ({ value, onChange }) => {

    const [selected, setSelected] = useState<ComboboxOption<string>>(value);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getOptions(null);
    }, []);

    const getOptions = ((inputValue: string = null): Promise<Array<ComboboxOption<string>>> => {
        const entityConnectionVariables: ApiQueryEntityConnectionArgs = {
            entityFilter: {
                entityTypes: ['Service'],
                nameExpr: inputValue,
            },
            first: 10, // Adjust as needed
        };

        const serviceOptions: Array<ComboboxOption<string>> = [];

        return QueryEntityConnection(entityConnectionVariables).then((res: QueryResult<GetEntityConnectionQueryData>) => {

            res.data?.entityConnection?.edges?.forEach((edge: ApiEntityEdge) => {
                serviceOptions.push({
                    label: EntityUtil.simplifyEntityname(edge.node),
                    value: edge.node.id,
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
        <>
            <CUIRenderWhen condition={isLoading}>
                <LoadingBar width={100} />
            </CUIRenderWhen>
            <CUIRenderWhen condition={!isLoading}>
                <Combobox
                    placeholder="Choose a service"
                    options={getOptions}
                    // @ts-ignore
                    onChange={handleChange}
                    value={selected}
                />
            </CUIRenderWhen>
        </>
    );
};
