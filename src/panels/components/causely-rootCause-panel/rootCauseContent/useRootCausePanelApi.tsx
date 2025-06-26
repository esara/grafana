import { useState, useEffect, useCallback } from 'react';
import { QueryDefectConnections } from 'api/graphql/queries/queryDefectConnections';
import { ApiQueryDefectConnectionArgs, ApiDefectSeverity, ApiUserScope, ApiDefectConnection } from 'api/api.types';

const defaultDefectConnectionVariables: ApiQueryDefectConnectionArgs = {
    first: 4, // Adjust this number based on your needs
    defectFilter: {
        includeInactiveDefect: false,
        severities: [ApiDefectSeverity.Critical, ApiDefectSeverity.High],
        scopesFilter: {
            scopes: []
        }
    },
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
                setData(response.data.defectConnection);
            })
            .catch(error => {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
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
