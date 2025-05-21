import { useState, useEffect } from 'react';
import { QueryDefectConnections } from 'api/graphql/queries/queryDefectConnections';
import { ApiDefectConnection, ApiQueryDefectConnectionArgs } from 'api/api.types';

const defaultDefectConnectionVariables: ApiQueryDefectConnectionArgs = {
    first: 8, // Adjust this number based on your needs
    defectFilter: {
        includeInactiveDefect: false,
    },
};

export const useRootCausePanelApi = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ApiDefectConnection | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
        QueryDefectConnections(defaultDefectConnectionVariables)
            .then(response => {
                setData(response.data.defectConnection);
            })
            .catch(error => {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Update data every 60 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    return { isLoading, data, error, fetchData };
}; 
