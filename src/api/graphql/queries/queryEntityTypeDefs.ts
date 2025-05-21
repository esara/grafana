import { ApiEntityTypeDef, ApiQueryEntityTypeDefsArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { EntityTypeSchema } from "../schemas/entityTypeDefs.schema";

export type GetEntityTypeDefsQueryData = {
    entityTypeDefs: ApiEntityTypeDef[];
};

export const QueryEntityTypeDefs = (variables?: ApiQueryEntityTypeDefsArgs): Promise<QueryResult<GetEntityTypeDefsQueryData>> => {
    const entityTypeDefsPayload = {
        operationName: 'entityTypeDefs',
        variables: variables,
        query: EntityTypeSchema,
    };

    return ApiUtil.postQuery<GetEntityTypeDefsQueryData>(entityTypeDefsPayload);
}; 
