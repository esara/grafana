import { ApiHeadlines, ApiHeadlineOptions } from "api/api.types";
import { ApiUtil, QueryResult } from "api/apiUtil";
import { HeadlinesSchema } from "../schemas/headlines.schema";

export type GetHeadlinesQueryData = {
    headlines: ApiHeadlines;
};

export const QueryHeadlines = (variables?: ApiHeadlineOptions): Promise<QueryResult<GetHeadlinesQueryData>> => {
    const headlinesPayload = {
        operationName: 'headlines',
        variables: variables,
        query: HeadlinesSchema,
    };

    return ApiUtil.postQuery<GetHeadlinesQueryData>(headlinesPayload);
}; 