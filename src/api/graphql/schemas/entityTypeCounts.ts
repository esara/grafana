export const EntityTypeCountsQuery = `query entityTypeCounts($entityFilter: EntityFilter) {
    entityTypeCounts(entityFilter: $entityFilter){
        entityType
        severity
        count
    }
}`;
