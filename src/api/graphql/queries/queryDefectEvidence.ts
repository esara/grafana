import { ApiDefectEvidence, ApiQueryDefectEvidenceArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { DefectEvidenceSchema } from "../schemas/defectEvidence.schema";

export type GetDefectEvidenceQueryData = {
    defectEvidence: ApiDefectEvidence;
};

export const QueryDefectEvidence = (variables: ApiQueryDefectEvidenceArgs): Promise<QueryResult<GetDefectEvidenceQueryData>> => {
    const defectEvidencePayload = {
        operationName: 'defectEvidence',
        variables: variables,
        query: DefectEvidenceSchema,
    };

    return ApiUtil.postQuery<GetDefectEvidenceQueryData>(defectEvidencePayload);
}; 