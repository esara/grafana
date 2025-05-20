import { useState, useEffect } from 'react';
import { EntityHealthCardsUtil } from "./entityHealthCards.util";
import { EntityHealthCardData } from "./entityHealthCard.component";
import { GetEntityCountQueryData, QueryEntityTypeCounts } from 'api/graphql/queries/queryEntityTypeCounts';
import { ApiDefectCount, ApiEntityTypeCount, ApiQueryEntityTypeCountsArgs } from 'api/api.types';
import { QueryResult } from 'api/apiUtil';
import { GetDefectCountQueryData, QueryDefectCounts } from 'api/graphql/queries/queryDefectCounts';

const entityCountVariables: ApiQueryEntityTypeCountsArgs = {
        entityFilter: {
            entityTypes: ['Service'],
        },
};

export const useServiceHealthApi = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<EntityHealthCardData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const promises: [Promise<QueryResult<GetEntityCountQueryData>>, Promise<QueryResult<GetDefectCountQueryData>>] = [
                QueryEntityTypeCounts(entityCountVariables),
                QueryDefectCounts(),
            ];
            Promise.all(promises)
                .then((response) => {
                    const entityCounts: ApiEntityTypeCount[] = response[0].data.entityTypeCounts ?? [];
                    const defectCounts: ApiDefectCount[] = response[1]?.data?.defectCounts ?? [];
                    return { entityCounts, defectCounts };
                })
                .then(({ entityCounts, defectCounts }) => {
                    setData(EntityHealthCardsUtil.toEntityHealthCardDataList(defectCounts, entityCounts));
                })
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
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

