import { useState, useEffect } from 'react';
import {getBackendSrv} from "@grafana/runtime";
import {AppPluginId} from "../../constants";
import {ApiDefectCount, ApiEntityTypeCount, EntityHealthCardsUtil} from "./entityHealthCard/entityHealthCards.util";
import {EntityHealthCardData} from "./entityHealthCard/entityHealthCard.component";

const entityCountPayload = {
    operationName: 'entityTypeCounts',
    variables: {
        entityFilter: {
            entityTypes: ['Service'],
        },
    },
    query:
        'query entityTypeCounts($entityFilter: EntityFilter) {\n  entityTypeCounts(entityFilter: $entityFilter) {\n    entityType\n    count\n    severity    __typename }}',
};

const defectCountPayload = {
    operationName: 'defectCounts',
    query:
        'query defectCounts($bucketSize: String, $filter: DefectFilter, $groupRecurring: Boolean) {\n  defectCounts(\n    bucketSize: $bucketSize\n    filter: $filter\n    groupRecurring: $groupRecurring\n  ) {\n    severity\n    defectAutoCount\n    defectCount\n    defectManualCount\n    defectName\n    entityType\n    time\n    __typename\n  }\n}',
};

const useServiceHealthApi = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<EntityHealthCardData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const promises = [
                getBackendSrv().post(`api/plugins/${AppPluginId}/resources/query`, entityCountPayload),
                getBackendSrv().post(`api/plugins/${AppPluginId}/resources/query`, defectCountPayload),
            ];
            Promise.all(promises)
                .then((response) => {
                    const entityCounts: ApiEntityTypeCount[] = response[0].data?.entityTypeCounts ?? [];
                    const defectCounts: ApiDefectCount[] = response[1]?.data?.defectCounts ?? [];
                    return { entityCounts, defectCounts };
                })
                .then(({ entityCounts, defectCounts }) => {
                    setData(EntityHealthCardsUtil.toEntityHealthCardDataList(defectCounts, entityCounts));
                })
        } catch (error) {
            // @ts-ignore
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // fetchData();
    }, []);

    useEffect(() => {
      setData(
        EntityHealthCardsUtil.toEntityHealthCardDataList(
          mockDataDefectCounts.defectCounts,
          mockDataentityTypeCounts.entityTypeCounts as ApiEntityTypeCount[]
        )
      );
    setIsLoading(false);
    }, []);


    return { isLoading, data, error, fetchData };
};

export default useServiceHealthApi;

const mockDataentityTypeCounts = {
    entityTypeCounts: [
        {
            entityType: 'Service',
            count: 50,
            severity: 'Normal',
        },
        {
            entityType: 'Service',
            count: 2,
            severity: 'Warning',
        },
        {
            entityType: 'Service',
            count: 1,
            severity: 'Major',
        },
        {
            entityType: 'Service',
            count: 9,
            severity: 'Minor',
        },
        {
            entityType: 'Service',
            count: 9,
            severity: 'Critical',
        },
    ],
};

const mockDataDefectCounts = {
    defectCounts: [
        {
            severity: 'Critical',
            defectAutoCount: 0,
            defectCount: 1,
            defectManualCount: 0,
            defectName: 'Congested',
            entityType: 'Service',
            time: '2025-03-10T18:05:19Z',
        },
        {
            severity: 'Critical',
            defectAutoCount: 0,
            defectCount: 1,
            defectManualCount: 0,
            defectName: 'DBConnections_Congested',
            entityType: 'Workload',
            time: '2025-03-10T18:05:19Z',
        },
        {
            severity: 'Medium',
            defectAutoCount: 0,
            defectCount: 1,
            defectManualCount: 0,
            defectName: 'InefficientGC',
            entityType: 'Service',
            time: '2025-03-10T18:05:19Z',
        },
        {
            severity: 'Low',
            defectAutoCount: 0,
            defectCount: 1,
            defectManualCount: 0,
            defectName: 'Malfunction',
            entityType: 'Controller',
            time: '2025-03-10T18:05:19Z',
        },
        {
            severity: 'Low',
            defectAutoCount: 0,
            defectCount: 1,
            defectManualCount: 0,
            defectName: 'Malfunction',
            entityType: 'Service',
            time: '2025-03-10T18:05:19Z',
        },
        {
            severity: 'Low',
            defectAutoCount: 0,
            defectCount: 1,
            defectManualCount: 0,
            defectName: 'Memory_NoisyNeighbor',
            entityType: 'Container',
            time: '2025-03-10T18:05:19Z',
        },
        {
            severity: 'Low',
            defectAutoCount: 0,
            defectCount: 1,
            defectManualCount: 0,
            defectName: 'SlowDatabaseServerQuery',
            entityType: 'Workload',
            time: '2025-03-10T18:05:19Z',
        },
    ],
};