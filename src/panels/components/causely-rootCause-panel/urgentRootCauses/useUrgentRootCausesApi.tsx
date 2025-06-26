import { useState, useEffect, useCallback } from 'react';
import { QueryDefectConnections } from 'api/graphql/queries/queryDefectConnections';
import { ApiDefectConnection, ApiDefectEdge, ApiDefectSeverity, ApiQueryDefectConnectionArgs, ApiUserScope } from 'api/api.types';

const defaultDefectConnectionVariables: ApiQueryDefectConnectionArgs = {
    first: 10, // Adjust this number based on your needs
    defectFilter: {
        includeInactiveDefect: false,
        severities: [ApiDefectSeverity.Critical, ApiDefectSeverity.High, ApiDefectSeverity.Medium, ApiDefectSeverity.Low],
        scopesFilter: {
            scopes: []
        },
        includeNonSvcImpact: true
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

                //This is temporary fix until https://github.com/Causely/causely/pull/4828 is merged which fixes includeNonSvcImpact Working
                const serviceDegradingEdges = response.data.defectConnection.edges.filter((edge: ApiDefectEdge) => edge.node.serviceCount > 0);
                setData({
                    ...response.data.defectConnection,
                    edges: serviceDegradingEdges,
                    totalCount: response.data.defectConnection.totalCount - serviceDegradingEdges.length
                });
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
