import { useState, useEffect, useCallback } from 'react';
import { ApiEntity, ApiEntityEdge, ApiEntityRelatedDefects, ApiPageInfo, ApiQueryEntityConnectionArgs, ApiRelatedDefects, ApiSloEdge, ApiSloNode, ApiUserScope } from 'api/api.types';
import { QueryEntityConnection } from 'api/graphql/queries/queryEntityConnection';
import { QueryEntityRelatedDefects } from 'api/graphql/queries/queryEntityRelatedDefects';
import { QuerySloConnection } from 'api/graphql/queries/querySloConnection';
import { EntityTypeDefs } from 'utils/entityTypeDefs/EntityTypeDefs.singleton';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';
import { ObjectsUtil } from 'utils/objects/objects.util';
import { CuiPaginationDirection } from 'sdk/pagination/cuiPagination.component';

const entityConnectionVariables: ApiQueryEntityConnectionArgs = {
    first: 4,
    entityFilter: {
        entityTypes: ['Service'],
        severities: ['Critical', 'Major', 'Minor', 'Warning', 'Normal'],//TODO: Remove unwanted severities
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
    const [pageInfo, setPageInfo] = useState<ApiPageInfo>(null);

    const fetchData = useCallback((cursorDirection?: CuiPaginationDirection): void => {
        setError(null);
        let idToEntityMap: Record<string, ServiceCardEntity> = {};
        QueryEntityConnection({
            after: cursorDirection === CuiPaginationDirection.NEXT ? pageInfo?.endCursor : null,
            before: cursorDirection === CuiPaginationDirection.PREVIOUS ? pageInfo?.startCursor : null,
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

            setPageInfo(response.data?.entityConnection?.pageInfo);

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
    }, [userScope, pageInfo?.endCursor, pageInfo?.startCursor]);

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
        console.log('useEFFECT RUNNING');
        fetchData();
        // const interval = setInterval(fetchData, 15000); // Update data every 15 seconds

        // return () => clearInterval(interval); // Cleanup interval
    }, []);

    return { isLoading, data, error, fetchData, pageInfo };
}; 