import { useState, useEffect, useCallback } from 'react';
import { ApiEntity, ApiEntityRelatedDefects, ApiRelatedDefects, ApiSloEdge, ApiSloNode } from 'api/api.types';
import { QueryEntityRelatedDefects } from 'api/graphql/queries/queryEntityRelatedDefects';
import { QuerySloConnection } from 'api/graphql/queries/querySloConnection';
import { EntityTypeDefs } from 'utils/entityTypeDefs/EntityTypeDefs.singleton';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';
import { QueryEntity } from 'api/graphql/queries/queryEntity';
import { ObjectsUtil } from 'utils/objects/objects.util';
import { ComboboxOption } from '@grafana/ui';

export type ServiceCardEntity = ApiEntity & {
    relatedDefects?: ApiRelatedDefects;
    sloConnections?: ApiSloNodeWithMetaData[];
};

export const useSingleServiceCardApi = (singleServiceData: ComboboxOption<string>) => {
    console.info("singleServiceData", singleServiceData);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ServiceCardEntity | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback((): void => {
        setError(null);

        QueryEntity({
            entityId: singleServiceData.value,
        }).then((response) => {
                const entity: ApiEntity = response.data?.entity;
                
                if (ObjectsUtil.isUnset(entity)) {
                    setData(null);
                    return null;
                }
                
                return Promise.all([
                    fetchEntityRelatedDefects([entity]),
                    fetchSloConnection([entity])
                ]).then(([relatedDefects, sloConnection]) => {
                    return { entity, relatedDefects, sloConnection };
                });
            })
            .then((result) => {
                if (!result || !result.entity) {
                    setData(null);
                    return;
                }

                const { entity, relatedDefects, sloConnection } = result;
                let serviceCardEntity: ServiceCardEntity = { ...entity };

                // Append relatedDefects to entity
                if (relatedDefects.length > 0) {
                    const entityRelatedDefect = relatedDefects.find(rd => rd.entity.id === entity.id);
                    if (entityRelatedDefect) {
                        serviceCardEntity.relatedDefects = entityRelatedDefect.relatedDefects;
                    }
                }

                // Append sloConnection to entity
                const entitySlos = sloConnection.filter(slo => slo?.relatedEntity?.id === entity.id);
                if (entitySlos.length > 0) {
                    serviceCardEntity.sloConnections = entitySlos.map(slo => ({
                        ...slo,
                        metaData: SloUtil.toSloMetaData(slo),
                    }));
                }

                setData(serviceCardEntity);
            })
            .catch((error) => {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [singleServiceData]);

    const fetchEntityRelatedDefects = (entities: ApiEntity[]): Promise<ApiEntityRelatedDefects[]> => {
        const entityIds = entities.map((entity: ApiEntity) => entity.id);

        return QueryEntityRelatedDefects({
            entityIds: entityIds,
        }).then((response) => {
            return response.data?.entityRelatedDefects || [];
        });
    };

    const fetchSloConnection = (entities: ApiEntity[]): Promise<ApiSloNode[]> => {
        const sloMetricQuery = SloUtil.toSloAttributeMetricQuery(EntityTypeDefs.getInstance(), true);
        const entityIds = entities.map((entity: ApiEntity) => entity.id);

        return QuerySloConnection({
            filter: {
                metricQuery: sloMetricQuery,
                relatedByFilter: {
                    relatedIds: entityIds,
                }
            }
        }).then(response => {
            return response.data?.sloConnection.edges.map((edge: ApiSloEdge) => edge.node) || [];
        });
    };

    useEffect(() => {
        if (ObjectsUtil.isUnset(singleServiceData)) {
            return undefined;
        }

        setIsLoading(true);        
        fetchData();
        
        // Set up interval to refetch data every 20 seconds
        const interval = setInterval(() => {
            fetchData();
        }, 20000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [singleServiceData]);

    return { isLoading, data, error };
}; 