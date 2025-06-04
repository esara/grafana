import { useState, useEffect, useCallback } from 'react';
import { ApiEntity, ApiEntityRelatedDefects, ApiQueryEntityConnectionArgs, ApiRelatedDefects, ApiSloEdge, ApiSloNode, ApiUserScope } from 'api/api.types';
import { QueryEntityConnection } from 'api/graphql/queries/queryEntityConnection';
import { QueryEntityRelatedDefects } from 'api/graphql/queries/queryEntityRelatedDefects';
import { QuerySloConnection } from 'api/graphql/queries/querySloConnection';
import { EntityTypeDefs } from 'utils/entityTypeDefs/EntityTypeDefs.singleton';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';

export type ServiceCardEntity = ApiEntity & {
    relatedDefects?: ApiRelatedDefects;
    sloConnections?: ApiSloNodeWithMetaData[];
};

export const useSingleServiceCardApi = (userScope: ApiUserScope) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ServiceCardEntity | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback((): void => {
        setError(null);

        const entityConnectionVariables: ApiQueryEntityConnectionArgs = {
            first: 1,
            entityFilter: {
                entityTypes: ['Service'],
                scopesFilter: {
                    scopes: userScope?.scopes || []
                }
            },
        };

        QueryEntityConnection(entityConnectionVariables)
            .then((response) => {
                const edges = response.data?.entityConnection?.edges || [];
                
                if (edges.length === 0) {
                    setData(null);
                    return null;
                }

                const entity = edges[0].node;
                
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
    }, [userScope]);

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
        fetchData();
        
        // Set up interval to refetch data every 20 seconds
        const interval = setInterval(() => {
            fetchData();
        }, 20000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return { isLoading, data, error };
}; 