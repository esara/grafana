export const EntityTypeCountsSchema = `query entityTypeCounts($entityFilter: EntityFilter) {
    entityTypeCounts(entityFilter: $entityFilter){
        entityType
        severity
        count
    }
}`;
