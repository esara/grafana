import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiEntity, ApiEntityEdge, ApiEntityRelatedDefects, ApiEntityTypeCount, ApiPageInfo, ApiQueryEntityConnectionArgs, ApiRelatedDefects, ApiSloEdge, ApiSloNode } from 'api/api.types';
import { QueryEntityConnection } from 'api/graphql/queries/queryEntityConnection';
import { QueryEntityRelatedDefects } from 'api/graphql/queries/queryEntityRelatedDefects';
import { QuerySloConnection } from 'api/graphql/queries/querySloConnection';
import { EntityTypeDefs } from 'utils/entityTypeDefs/EntityTypeDefs.singleton';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';
import { ObjectsUtil } from 'utils/objects/objects.util';
import { CuiPaginationDirection } from 'sdk/pagination/cuiPagination.component';
import { QueryEntityTypeCounts } from 'api/graphql/queries/queryEntityTypeCounts';
import { ServiceCardsPanelOptions } from '../module';


const UnHealthyServiceStates = new Set(['Critical', 'Major']);

const entityConnectionVariables: ApiQueryEntityConnectionArgs = {
    entityFilter: {
        entityTypes: ['Service'],
        severities: Array.from(UnHealthyServiceStates),
    },
};

export type ServiceCardEntity = ApiEntity & {
    relatedDefects?: ApiRelatedDefects;
    sloConnections?: ApiSloNodeWithMetaData[];
};

export const useServiceCardsApi = ({apiUserScope, pageSize}: ServiceCardsPanelOptions) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Record<string, ServiceCardEntity>>(null);
    const [error, setError] = useState<string | null>(null);
    const [pageInfo, setPageInfo] = useState<ApiPageInfo>(null);
    const [serviceCounts, setServiceCounts] = useState<{
        total: number;
        unhealthy: number;
    }>({
        total: 0,
        unhealthy: 0
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isAutoRefreshPausedRef = useRef(false);

    const fetchServiceCounts = useCallback(() => {
        QueryEntityTypeCounts({
            entityFilter: {
                entityTypes: ['Service'],
                scopesFilter: {
                    scopes: apiUserScope?.scopes || []
                }
            }
        }).then(response => {
            let totalServiceCount = 0;
            let unhealthyServiceCount = 0;

            response.data.entityTypeCounts.forEach((entityCount: ApiEntityTypeCount) => {
                totalServiceCount += entityCount.count;
                if (UnHealthyServiceStates.has(entityCount.severity)) {
                    unhealthyServiceCount += entityCount.count;
                }
            })

            setServiceCounts({
                total: totalServiceCount,
                unhealthy: unhealthyServiceCount
            });
        });
    }, [apiUserScope]);

    const updateApiAutoRefresh = useCallback((cursorDirection?: CuiPaginationDirection): void => {
        if (cursorDirection) {
            isAutoRefreshPausedRef.current = true;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } else if (ObjectsUtil.isUnset(cursorDirection)) {
            isAutoRefreshPausedRef.current = false;
            startAutoRefresh();
        }
    }, []);

    const fetchData = useCallback((cursorDirection?: CuiPaginationDirection): void => {
        setError(null);
        updateApiAutoRefresh(cursorDirection);
        fetchServiceCounts();
        
        let idToEntityMap: Record<string, ServiceCardEntity> = {};
        QueryEntityConnection({
            ...entityConnectionVariables,
            first: pageSize,
            after: cursorDirection === CuiPaginationDirection.NEXT ? pageInfo?.endCursor : null,
            before: cursorDirection === CuiPaginationDirection.PREVIOUS ? pageInfo?.startCursor : null,
            entityFilter: {
                ...entityConnectionVariables.entityFilter,
                scopesFilter: {
                    scopes: apiUserScope?.scopes || []
                }
            }
        }).then(response => {
            const unhealthyServiceCount = response.data?.entityConnection.totalCount;

            if (ObjectsUtil.isUnset(unhealthyServiceCount) || unhealthyServiceCount < 1) {
                //There is no unhealthy services, we only care to get total service count to display
                return null;
            }

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

            if (!response) {
                return;
            }

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
        }).catch((error) => {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }).finally(() => {
            setIsLoading(false);
        });
    }, [fetchServiceCounts, apiUserScope, pageInfo?.endCursor, pageInfo?.startCursor, pageSize]);

    /**
     * Auto Refresh should always be on, unless the user is page scrolling.
     * This way they are not interrupted with auto re-renders
     * Click First Page in pagination controls will reset the auto refresh
     */
    const startAutoRefresh = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        if (!isAutoRefreshPausedRef.current) {
            intervalRef.current = setInterval(() => {
                fetchData();
                
            }, 30000); // 30 seconds
        }
    }, [fetchData]);

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
        setIsLoading(true);
        fetchData();
        startAutoRefresh();
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [apiUserScope, pageSize]);

    return { isLoading, data, error, fetchData, pageInfo, serviceCounts };
};
