import { ApiEntity, ApiQueryEntityArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { EntitySchema } from "../schemas/entity.schema";

export type GetEntityQueryData = {
    entity: ApiEntity;
};

export const QueryEntity = (variables: ApiQueryEntityArgs): Promise<QueryResult<GetEntityQueryData>> => {
    const entityPayload = {
        operationName: 'entity',
        variables: variables,
        query: EntitySchema,
    };

    return ApiUtil.postQuery<GetEntityQueryData>(entityPayload);
}; 