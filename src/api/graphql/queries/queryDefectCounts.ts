import { ApiDefectCount } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { DefectCountsQuery } from "../schemas/defectCounts";

export type GetDefectCountQueryData = {
    defectCounts: ApiDefectCount[];
};

export const QueryDefectCounts = (): Promise<QueryResult<GetDefectCountQueryData>> => {
    const defectCountPayload = {
        operationName: 'defectCounts',
        query: DefectCountsQuery,
    };

    return ApiUtil.postQuery<GetDefectCountQueryData>(defectCountPayload);
};
