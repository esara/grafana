import { useState, useEffect } from 'react';
import { QueryDefectEvidence } from 'api/graphql/queries/queryDefectEvidence';
import { ApiDefectEvidence } from 'api/api.types';
import { StringsUtil } from 'utils/strings/strings.util';

export type RootCauseEvidence = {
    hasEvents: boolean;
    hasExceptions: boolean;
    hasLogs: boolean;
    hasRemediation: boolean;
};

export const useRootCauseEvidence = (defectId: string): RootCauseEvidence => {
    const [evidence, setEvidence] = useState<RootCauseEvidence>({
        hasEvents: false,
        hasExceptions: false,
        hasLogs: false,
        hasRemediation: false
    });

    useEffect(() => {
        const fetchEvidence = async () => {
            try {
                const response = await QueryDefectEvidence({ defectId });
                const defectEvidence: ApiDefectEvidence = response.data.defectEvidence;

                setEvidence({
                    hasEvents: (defectEvidence.events?.length ?? 0) > 0,
                    hasExceptions: (defectEvidence.exceptions?.length ?? 0) > 0,
                    hasLogs: (defectEvidence.logs?.length ?? 0) > 0,
                    hasRemediation: StringsUtil.isNotBlank(defectEvidence.remediation)
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
