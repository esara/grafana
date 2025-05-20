export const DefectCountsQuery = `query defectCounts($bucketSize: String, $filter: DefectFilter, $groupRecurring: Boolean) {
    defectCounts(bucketSize: $bucketSize, filter: $filter, groupRecurring: $groupRecurring){
        entityType
        defectName
        severity
        time
        defectCount
        defectManualCount
        defectAutoCount
    }   
}`;
