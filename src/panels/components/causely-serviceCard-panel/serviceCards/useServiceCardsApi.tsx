import { useState, useEffect, useCallback } from 'react';
import { ApiEntity, ApiEntityEdge, ApiEntityRelatedDefects, ApiQueryEntityConnectionArgs, ApiRelatedDefects, ApiSloEdge, ApiSloNode, ApiUserScope } from 'api/api.types';
import { QueryEntityConnection } from 'api/graphql/queries/queryEntityConnection';
import { QueryEntityRelatedDefects } from 'api/graphql/queries/queryEntityRelatedDefects';
import { QuerySloConnection } from 'api/graphql/queries/querySloConnection';
import { EntityTypeDefs } from 'utils/entityTypeDefs/EntityTypeDefs.singleton';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';
import { ObjectsUtil } from 'utils/objects/objects.util';

const entityConnectionVariables: ApiQueryEntityConnectionArgs = {
    first: 5,
    entityFilter: {
        entityTypes: ['Service'],
    },
};

export type ServiceCardEntity = ApiEntity & {
    relatedDefects?: ApiRelatedDefects;
    sloConnections?: ApiSloNodeWithMetaData[];
};

export const useServiceCardsApi = (userScope: ApiUserScope) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Record<string, ServiceCardEntity>>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback((): void => {
        setError(null);
        let idToEntityMap: Record<string, ServiceCardEntity> = {};
        QueryEntityConnection({
            ...entityConnectionVariables,
            entityFilter: {
                ...entityConnectionVariables.entityFilter,
                scopesFilter: {
                    scopes: userScope?.scopes || []
                }
            }
        }).then(response => {
            idToEntityMap = response.data?.entityConnection?.edges.reduce((acc, edge: ApiEntityEdge) => {
                acc[edge.node.id] = edge.node;
                return acc;
            }, {} as Record<string, ApiEntity>);

            return Promise.all([
                fetchEntityRelatedDefects(ObjectsUtil.values(idToEntityMap)),
                fetchSloConnection(ObjectsUtil.values(idToEntityMap))
            ]);
        }).then((response) => {
            const [relatedDefects, sloConnection] = response;

            //Append relatedDefects to entityMap
            relatedDefects.forEach((entityRelatedDefect: ApiEntityRelatedDefects) => {
                idToEntityMap[entityRelatedDefect.entity.id] = {
                    ...idToEntityMap[entityRelatedDefect.entity.id],
                    relatedDefects: entityRelatedDefect.relatedDefects,
                };
            });

            //Append sloConnection to entityMap
            sloConnection.forEach((slo: ApiSloNode) => {
                const entityId = slo?.relatedEntity?.id;
                if (ObjectsUtil.isUnset(idToEntityMap[entityId])) {
                    return;
                }

                if (ObjectsUtil.isUnset(idToEntityMap[entityId].sloConnections)) {
                    idToEntityMap[entityId] = {
                        ...idToEntityMap[entityId],
                        sloConnections: []
                    };
                }

                const sloWithMetaData: ApiSloNodeWithMetaData = {
                    ...slo,
                    metaData: SloUtil.toSloMetaData(slo),
                };
                
                idToEntityMap[entityId] = {
                    ...idToEntityMap[entityId],
                    sloConnections: [...idToEntityMap[entityId].sloConnections, sloWithMetaData]
                };
            });
            
            setData(idToEntityMap);
            setIsLoading(false);

        }).catch((error) => {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        });
    }, [userScope]);

    const fetchEntityRelatedDefects = (entities: ApiEntity[]): Promise<ApiEntityRelatedDefects[]> => {
        const entityIds = entities.map((entity: ApiEntity) => entity.id);

        return QueryEntityRelatedDefects({
            entityIds: entityIds,
            // groupRecurring: true,
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
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000); // Update data every 15 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, [fetchData]);

    return { isLoading, data, error, fetchData };
}; 