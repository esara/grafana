import { ApiEntityRelatedDefects, ApiQueryEntityRelatedDefectsArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { EntityRelatedDefectsSchema } from "../schemas/entityRelatedDefects.schema";

export type GetEntityRelatedDefectsQueryData = {
    entityRelatedDefects: ApiEntityRelatedDefects[];
};

export const QueryEntityRelatedDefects = (variables: ApiQueryEntityRelatedDefectsArgs): Promise<QueryResult<GetEntityRelatedDefectsQueryData>> => {
    const entityRelatedDefectsPayload = {
        operationName: 'entityRelatedDefects',
        variables: variables,
        query: EntityRelatedDefectsSchema,
    };

    return ApiUtil.postQuery<GetEntityRelatedDefectsQueryData>(entityRelatedDefectsPayload);
};