import { ApiDefectCount } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { DefectCountsSchema } from "../schemas/defectCounts.schema";

export type GetDefectCountQueryData = {
    defectCounts: ApiDefectCount[];
};

export const QueryDefectCounts = (): Promise<QueryResult<GetDefectCountQueryData>> => {
    const defectCountPayload = {
        operationName: 'defectCounts',
        query: DefectCountsSchema,
    };

    return ApiUtil.postQuery<GetDefectCountQueryData>(defectCountPayload);
};
