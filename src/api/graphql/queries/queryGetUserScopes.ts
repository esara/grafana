import { ApiUserScopeConnection, ApiQueryGetUserScopesArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { GetUserScopesSchema } from "../schemas/getUserScopes.schema";

export type GetUserScopesQueryData = {
    getUserScopes: ApiUserScopeConnection;
};

export const QueryGetUserScopes = (variables?: ApiQueryGetUserScopesArgs): Promise<QueryResult<GetUserScopesQueryData>> => {
    const userScopesPayload = {
        operationName: 'getUserScopes',
        variables: variables,
        query: GetUserScopesSchema,
    };

    return ApiUtil.postQuery<GetUserScopesQueryData>(userScopesPayload);
}; 