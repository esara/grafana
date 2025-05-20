import { ApiEntityTypeCount, ApiQueryEntityTypeCountsArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { EntityTypeCountsQuery } from "../schemas/entityTypeCounts";

export type GetEntityCountQueryData = {
    entityTypeCounts: ApiEntityTypeCount[];
};

export const QueryEntityTypeCounts = (variables: ApiQueryEntityTypeCountsArgs): Promise<QueryResult<GetEntityCountQueryData>> => {
    const entityCountPayload = {
        operationName: 'entityTypeCounts',
        variables: variables,
        query: EntityTypeCountsQuery,
    };

    return ApiUtil.postQuery<GetEntityCountQueryData>(entityCountPayload);
}
