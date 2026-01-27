export const EntityConnectionLeanSchema = `query entityConnection($entityFilter: EntityFilter, $first: Int, $after: String, $last: Int, $before: String) {
    entityConnection(entityFilter: $entityFilter, first: $first, after: $after, last: $last, before: $before){
        totalCount
        edges{
            node{
                id
                name
                typeName
                labels{
                    key
                    value
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
