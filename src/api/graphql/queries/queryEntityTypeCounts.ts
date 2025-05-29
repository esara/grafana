import { ApiEntityTypeCount, ApiQueryEntityTypeCountsArgs } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { EntityTypeCountsSchema } from "../schemas/entityTypeCounts.schema";

export type GetEntityCountQueryData = {
    entityTypeCounts: ApiEntityTypeCount[];
};

export const QueryEntityTypeCounts = (variables: ApiQueryEntityTypeCountsArgs): Promise<QueryResult<GetEntityCountQueryData>> => {
    const entityCountPayload = {
        operationName: 'entityTypeCounts',
        variables: variables,
        query: EntityTypeCountsSchema,
    };

    return ApiUtil.postQuery<GetEntityCountQueryData>(entityCountPayload);
}
