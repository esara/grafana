export const GetUserScopesSchema = `query getUserScopes($filter: UserScopeFilter, $first: Int, $after: String, $last: Int, $before: String) {
    getUserScopes(filter: $filter, first: $first, after: $after, last: $last, before: $before){
        totalCount
        edges{
            node{
                id
                name
                audience
                ownerId
                lastUpdate
                scopes{
                    typeName
                    typeValues
                }
            }
            cursor
        }
        pageInfo{
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
            totalCount
        }
    }
}`;
