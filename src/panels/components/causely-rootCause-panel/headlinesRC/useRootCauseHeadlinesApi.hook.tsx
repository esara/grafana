import { ApiHeadlineSortField, ApiUserScope, ApiHeadlineItem, ApiQueryDefectCountsArgs, ApiDefectSeverity, ApiDefectState } from 'api/api.types';
import { QueryHeadlines } from 'api/graphql/queries/queryHeadlines';
import { useState, useEffect, useCallback } from 'react';
import { TimeUtil, TimeOption } from 'utils/time/time.util';
import { QueryDefectCounts } from 'api/graphql/queries/queryDefectCounts';

const defaultHeadlinesOptions = {
    timeFilter: {
        start: TimeUtil.getStartTime(TimeOption.ONE_DAY),
        end: TimeUtil.nowISO()
    },
    limit: 3, // Request 
    sort: {
        priority: [
            ApiHeadlineSortField.Active,
            ApiHeadlineSortField.Severity,
            ApiHeadlineSortField.ServiceCount,
            ApiHeadlineSortField.SymptomCount,
            ApiHeadlineSortField.TotalDuration,
            ApiHeadlineSortField.RecurrenceCount
        ]
    }
};

const defaultDefectCountsOptions = {
    filter: {
        severities: [
            ApiDefectSeverity.Critical,
            ApiDefectSeverity.High,
        ],
        state: ApiDefectState.Active
    },
    groupRecurring: true,
};

export const useRootCauseHeadlinesApi = (userScope: ApiUserScope) => {
    const [isLoading, setIsLoading] = useState(true);
    const [headlines, setHeadlines] = useState<ApiHeadlineItem[]>([]);
    const [urgentRcActiveCount, setUrgentRcActiveCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const fetchHeadlines = useCallback(() => {
        const variables = {
            ...defaultHeadlinesOptions,
            scopesFilter: {
                scopes: userScope?.scopes || []
                
            }
        };

        return QueryHeadlines(variables)
            .then(response => {
                const headlineItems = response.data?.headlines?.headlineItems ?? [];
                setHeadlines(headlineItems);
            })
            .catch(error => {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            });
    }, [userScope]);

    const fetchDefectCounts = useCallback(() => {
        const variables: ApiQueryDefectCountsArgs = {
            ...defaultDefectCountsOptions,
            filter: {
                ...defaultDefectCountsOptions.filter,
                scopesFilter: {
                    scopes: userScope?.scopes || []
                }
            }
        };

        return QueryDefectCounts(variables)
            .then(response => {
                const defectCounts =response.data.defectCounts.reduce((acc, defectCount) => {
                    return acc + defectCount.defectCount;
                }, 0);
                setUrgentRcActiveCount(defectCounts);
            })
            .catch(error => {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            });
    }, [userScope]);

    useEffect(() => {
        Promise.all([fetchHeadlines(), fetchDefectCounts()])
            .catch(error => {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }).finally(() => {
                setIsLoading(false);
            });
        const interval = setInterval(() => {fetchHeadlines(); fetchDefectCounts();}, 30000); // Update data every 30 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, [fetchHeadlines, fetchDefectCounts]);

    return {
        isLoading,
        headlinesData: {
            headlines,
            urgentRcActiveCount
        },
        error,
        fetchHeadlines
    };
};
