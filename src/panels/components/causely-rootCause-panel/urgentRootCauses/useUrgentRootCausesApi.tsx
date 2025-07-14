import { useState, useEffect, useCallback } from 'react';
import { QueryDefectConnections } from 'api/graphql/queries/queryDefectConnections';
import { ApiDefectConnection, ApiDefectSeverity, ApiDefectState, ApiQueryDefectConnectionArgs, ApiUserScope } from 'api/api.types';

const defaultDefectConnectionVariables: ApiQueryDefectConnectionArgs = {
    first: 4, //Will only every show at most 4 RCs in the panel
    defectFilter: {
        severities: [ApiDefectSeverity.Critical, ApiDefectSeverity.High, ApiDefectSeverity.Medium, ApiDefectSeverity.Low],
        scopesFilter: {
            scopes: []
        },
        state: ApiDefectState.Active,
        includeNonSvcImpact: false // Only looking at service degrading RC's
    },
    groupRecurring: true
};

export const useRootCausePanelApi = (userScope: ApiUserScope) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ApiDefectConnection | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(() => {
        const variables: ApiQueryDefectConnectionArgs = {
            ...defaultDefectConnectionVariables,
            defectFilter: {
                ...defaultDefectConnectionVariables.defectFilter,
                scopesFilter: {
                    scopes: userScope?.scopes || []
                }
            }
        };

        QueryDefectConnections(variables)
            .then(response => {
                setData({
                    ...response.data.defectConnection,
                });
            })
            .catch(error => {
                const errorMessage = `${error.data.error}: ${error.data.message}`;
                console.error(`Query Failure "useRootCausePanelApi.QueryDefectConnections": ${JSON.stringify(error)}`)
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [userScope]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Update data every 30 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, [fetchData]);

    return { isLoading, data, error, fetchData };
}; 
