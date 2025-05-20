import { useState, useEffect } from 'react';
import { getBackendSrv } from "@grafana/runtime";
import { AppPluginId } from "../../../../constants";
import { DefectConnectionQuery } from 'api/graphql/schemas/defectConnection';

interface RootCause {
    id: string;
    name: string;
    symptoms: Array<{
        name: string;
        severity: string;
        description: string;
    }>;
    time: string;
    additionalInformation: {
        hasRemediation: boolean;
        hasEvents: boolean;
        hasLogs: boolean;
        hasExceptions: boolean;
    };
}

const rootCausePayload = {
    operationName: 'defectConnection',
    query: DefectConnectionQuery
};

export const useCriticalRootCause = () => {
    const [data, setData] = useState<RootCause[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await getBackendSrv().post(
                `api/plugins/${AppPluginId}/resources/query`,
                rootCausePayload
            );
            setData(response.data?.criticalRootCauses ?? []);
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
