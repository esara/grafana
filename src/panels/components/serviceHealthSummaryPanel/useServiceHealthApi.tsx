import { useState, useEffect } from 'react';
import { getBackendSrv } from "@grafana/runtime";
import { AppPluginId } from "../../../constants";
import { ApiDefectCount, ApiEntityTypeCount, EntityHealthCardsUtil } from "./entityHealthCards.util";
import { EntityHealthCardData } from "./entityHealthCard.component";

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
        fetchData();
        const interval = setInterval(fetchData, 60000); // Update data every 60 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    return { isLoading, data, error, fetchData };
};

export default useServiceHealthApi;
