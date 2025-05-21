import { ApiDefectConnection, ApiQueryDefectConnectionArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { DefectConnectionSchema } from "../schemas/defectConnection.schema";


export type GetDefectConnectionQueryData = {
    defectConnection: ApiDefectConnection;
};

export const QueryDefectConnections = (variables: ApiQueryDefectConnectionArgs): Promise<QueryResult<GetDefectConnectionQueryData>> => {
    const defectConnectionPayload = {
        operationName: 'defectConnection',
        variables: variables,
        query: DefectConnectionSchema,
    };

    return ApiUtil.postQuery<GetDefectConnectionQueryData>(defectConnectionPayload);
};
