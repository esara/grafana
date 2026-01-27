import { ApiEntityConnection, ApiQueryEntityConnectionArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { EntityConnectionSchema } from "../schemas/entityConnection.schema";
import { EntityConnectionLeanSchema } from "../schemas/entityConnectionLean.schema";

export type GetEntityConnectionQueryData = {
    entityConnection: ApiEntityConnection;
};

export const QueryEntityConnection = (variables: ApiQueryEntityConnectionArgs): Promise<QueryResult<GetEntityConnectionQueryData>> => {
    const entityConnectionPayload = {
        operationName: 'entityConnection',
        variables: variables,
        query: EntityConnectionSchema,
    };

    return ApiUtil.postQuery<GetEntityConnectionQueryData>(entityConnectionPayload);
};

export const QueryEntityConnectionLean = (variables: ApiQueryEntityConnectionArgs): Promise<QueryResult<GetEntityConnectionQueryData>> => {
    const entityConnectionPayload = {
        operationName: 'entityConnection',
        variables: variables,
        query: EntityConnectionLeanSchema,
    };

    return ApiUtil.postQuery<GetEntityConnectionQueryData>(entityConnectionPayload);
}; 