import { ApiQuerySloConnectionArgs, ApiSloConnection } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { SloConnectionSchema } from "../schemas/sloConnection.schema";

export type GetSloConnectionQueryData = {
    sloConnection: ApiSloConnection;
};

    export const QuerySloConnection = (variables?: ApiQuerySloConnectionArgs): Promise<QueryResult<GetSloConnectionQueryData>> => {
    const sloConnectionPayload = {
        operationName: 'sloConnection',
        variables: variables,
        query: SloConnectionSchema,
    };

    return ApiUtil.postQuery<GetSloConnectionQueryData>(sloConnectionPayload);
};