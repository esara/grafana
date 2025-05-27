import { ApiDefectCount, ApiQueryDefectCountsArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { DefectCountsSchema } from "../schemas/defectCounts.schema";

export type GetDefectCountQueryData = {
    defectCounts: ApiDefectCount[];
};

export const QueryDefectCounts = (variables?: ApiQueryDefectCountsArgs): Promise<QueryResult<GetDefectCountQueryData>> => {
    const defectCountPayload = {
        operationName: 'defectCounts',
        query: DefectCountsSchema,
        variables
    };

    return ApiUtil.postQuery<GetDefectCountQueryData>(defectCountPayload);
};
