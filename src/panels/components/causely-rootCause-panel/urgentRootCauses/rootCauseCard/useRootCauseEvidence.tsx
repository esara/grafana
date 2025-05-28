import { useState, useEffect } from 'react';
import { QueryDefectEvidence } from 'api/graphql/queries/queryDefectEvidence';
import { ApiDefectEvidence } from 'api/api.types';

export type RootCauseEvidence = {
    hasEvents: boolean;
    hasExceptions: boolean;
    hasLogs: boolean;
};

export const useRootCauseEvidence = (defectId: string): RootCauseEvidence => {
    const [evidence, setEvidence] = useState<RootCauseEvidence>({
        hasEvents: false,
        hasExceptions: false,
        hasLogs: false
    });

    useEffect(() => {
        const fetchEvidence = async () => {
            try {
                const response = await QueryDefectEvidence({ defectId });
                const defectEvidence: ApiDefectEvidence = response.data.defectEvidence;

                setEvidence({
                    hasEvents: (defectEvidence.events?.length ?? 0) > 0,
                    hasExceptions: (defectEvidence.exceptions?.length ?? 0) > 0,
                    hasLogs: (defectEvidence.logs?.length ?? 0) > 0
                });
            } catch (error) {
                console.error('Error fetching root cause evidence:', error);
                // Keep the default false values on error
            }
        };

        fetchEvidence();
    }, [defectId]);

    return evidence;
}; 
