package gqmdl

import (
	"errors"
)

/* --- DefectFilter Model --- */

// FilterBase -  is a common abstraction for Filters that enables extracting common fields into a narrow interface
// which can be more easily reused in for certain function calls
type FilterBase struct {
	IncludeDerivedTypes *bool
	EntityTypes         []string
}

/* --- FilterBase Model --- */
func (filter *FilterBase) IsSet() bool {
	return filter != nil
}

func (filter *FilterBase) HasEntityTypes() bool {
	return filter.IsSet() && len(filter.EntityTypes) > 0
}

func (filter *FilterBase) GetEntityTypes() []string {
	if !filter.IsSet() {
		return make([]string, 0)
	}
	return filter.EntityTypes
}

func (filter *FilterBase) IncludesDerivedTypes() bool {
	return filter.IsSet() && filter.IncludeDerivedTypes != nil && *filter.IncludeDerivedTypes
}

func (f *DefectFilter) IsSet() bool {
	return f != nil
}
func (f *DefectFilter) HasEntityTypes() bool {
	return f.IsSet() && len(f.EntityTypes) > 0
}
func (f *DefectFilter) HasDefectNames() bool {
	return f.IsSet() && len(f.DefectNames) > 0
}
func (f *DefectFilter) HasScopesFilter() bool {
	return f.IsSet() && f.ScopesFilter.IsSet() && f.ScopesFilter.HasScopes()
}

/* --- EntityTypeDefFilter Model --- */
func (filter *EntityTypeDefFilter) IsSet() bool {
	return filter != nil
}

func (filter *EntityTypeDefFilter) HasEntityTypes() bool {
	return filter.IsSet() && filter.EntityTypes != nil && len(filter.EntityTypes) > 0
}

func (filter *EntityTypeDefFilter) ToFilterBase() *FilterBase {
	filterBase := &FilterBase{}
	if filter.IsSet() {
		filterBase.EntityTypes = filter.EntityTypes
		filterBase.IncludeDerivedTypes = filter.IncludeDerivedTypes
	}
	return filterBase
}

// GetSLOState returns the SLO state based on the severity of the entity
func (entity *Entity) GetSLOState() *SloState {
	var sloState SloState
	if entity == nil {
		return &sloState
	}
	switch entity.Severity {
	case "Critical":
		sloState = "VIOLATED"
	case "Major":
		sloState = "AT_RISK"
	default:
		sloState = "NORMAL"
	}
	return &sloState
}

/* --- SloFilter Model --- */
func (filter *SloFilter) ToFilterBase() *FilterBase {
	filterBase := &FilterBase{}
	if filter.IsSet() {
		if filter.HasEntityTypes() {
			filterBase.EntityTypes = filter.EntityTypes
		} else {
			filterBase.EntityTypes = []string{"SLOBase"}
		}
		inclDerivedTypes := true
		filterBase.IncludeDerivedTypes = &inclDerivedTypes
	}
	return filterBase
}

func (filter *SloFilter) ValidateEntityTypes(validTypes []string) ([]string, error) {
	var validatedTypes = make([]string, 0)
	if !filter.HasEntityTypes() {
		return validatedTypes, nil
	}

	validator := make(map[string]struct{})
	for _, item := range validTypes {
		validator[string(item)] = struct{}{}
	}

	for _, entityType := range filter.EntityTypes {
		if _, ok := validator[entityType]; !ok {
			return validatedTypes, errors.New("invalid entity type")
		}
		validatedTypes = append(validatedTypes, string(entityType))
	}
	return validatedTypes, nil
}

func (filter *SloFilter) IsSet() bool {
	return filter != nil
}

func (filter *SloFilter) HasEntityTypes() bool {
	return filter.IsSet() && len(filter.EntityTypes) > 0
}

func (filter *SloFilter) GetEntityTypes() []string {
	if !filter.IsSet() {
		return make([]string, 0)
	}
	return filter.EntityTypes
}

func (filter *SloFilter) HasStates() bool {
	return filter.IsSet() && filter.States != nil && len(filter.States) > 0
}

func (filter *SloFilter) GetFilterStatesAsSeverities() []Severity {
	sevStates := make([]Severity, 0)
	if !filter.HasStates() {
		return sevStates
	}
	for _, state := range filter.States {
		switch state {
		case SloStateViolated:
			sevStates = append(sevStates, Critical)
		case SloStateAtRisk:
			sevStates = append(sevStates, Major)
		default:
			sevStates = append(sevStates, Normal)
		}
	}
	return sevStates
}

func (filter *SloFilter) HasMetricQuery() bool {
	return filter.IsSet() && filter.MetricQuery != nil
}

func (filter *SloFilter) HasMetricQueries() bool {
	return filter.HasMetricQuery() && len((*filter).MetricQuery.Queries) > 0
}

func (filter *SloFilter) GetMetricQueries() []*SloQuery {
	if filter.HasMetricQueries() {
		return (*filter).MetricQuery.Queries
	}
	return make([]*SloQuery, 0)
}

func (filter *SloFilter) GetMappedMetricQueries() map[string]*SloQuery {
	mappedQueries := make(map[string]*SloQuery)
	if !filter.HasMetricQueries() {
		return mappedQueries
	}

	for _, query := range filter.GetMetricQueries() {
		mappedQueries[query.SloType] = query
	}
	return mappedQueries
}

func (filter *SloFilter) HasRelatedByFilter() bool {
	return filter.IsSet() && filter.RelatedByFilter != nil
}

func (filter *SloFilter) HasRelatedScopesFilter() bool {
	return filter.HasRelatedByFilter() && filter.RelatedByFilter.HasScopesFilter()
}

func (filter *SloFilter) HasNameExpr() bool {
	return filter.IsSet() && filter.NameExpr != nil && *filter.NameExpr != ""
}

/* --- RelatedByFilter Model --- */
func (filter *RelatedByFilter) IsSet() bool {
	return filter != nil
}

func (filter *RelatedByFilter) HasRelatedIds() bool {
	return filter.IsSet() && filter.RelatedIds != nil && len(filter.RelatedIds) > 0
}

func (filter *RelatedByFilter) HasScopesFilter() bool {
	return filter.IsSet() && filter.ScopesFilter.IsSet()
}

func (filter *RelatedByFilter) GetScopesFilter() *ScopesFilterInput {
	if filter.HasScopesFilter() {
		return filter.ScopesFilter
	}
	return &ScopesFilterInput{}
}

/* --- EntityFilter Model --- */
func (entityFilter *EntityFilter) ToFilterBase() *FilterBase {
	filterBase := &FilterBase{}
	if entityFilter.IsSet() {
		filterBase.EntityTypes = entityFilter.EntityTypes
		filterBase.IncludeDerivedTypes = entityFilter.IncludeDerivedTypes
	}
	return filterBase
}

func (entityFilter *EntityFilter) IsSet() bool {
	return entityFilter != nil
}

func (entityFilter *EntityFilter) HasEntityTypes() bool {
	return entityFilter.IsSet() && len(entityFilter.EntityTypes) > 0
}

func (entityFilter *EntityFilter) GetEntityTypes() []string {
	if !entityFilter.IsSet() {
		return make([]string, 0)
	}
	return entityFilter.EntityTypes
}

func (entityFilter *EntityFilter) HasScopesFilter() bool {
	return entityFilter.IsSet() && entityFilter.ScopesFilter.IsSet() && entityFilter.ScopesFilter.HasScopes()
}

func (entityFilter *EntityFilter) GetScopesFilter() *ScopesFilterInput {
	if entityFilter.HasScopesFilter() {
		return entityFilter.ScopesFilter
	}
	return &ScopesFilterInput{}
}

func (entityFilter *EntityFilter) HasSeverityValues() bool {
	return entityFilter.IsSet() && entityFilter.Severities != nil && len(entityFilter.Severities) > 0
}

type Severity int

const (
	Normal Severity = iota
	Warning
	Minor
	Major
	Critical
)

func (c Severity) String() string {
	switch c {
	case Normal:
		return "Normal"
	case Warning:
		return "Warning"
	case Minor:
		return "Minor"
	case Major:
		return "Major"
	case Critical:
		return "Critical"
	}
	return "Normal"
}

func SeverityFromString(s string) Severity {
	switch s {
	case "Normal":
		return Normal
	case "Warning":
		return Warning
	case "Minor":
		return Minor
	case "Major":
		return Major
	case "Critical":
		return Critical
	}
	return Normal
}

func (entityFilter *EntityFilter) GetFilterSeverityValues() []Severity {
	severityVals := make([]Severity, 0)
	if !entityFilter.HasSeverityValues() {
		return severityVals
	}

	for _, filterSev := range entityFilter.Severities {
		severityVals = append(severityVals, SeverityFromString(filterSev))
	}
	return severityVals
}

func (entityFilter *EntityFilter) HasNameExpr() bool {
	return entityFilter.IsSet() && entityFilter.NameExpr != nil && *entityFilter.NameExpr != ""
}

func (entityFilter *EntityFilter) IncludesDerivedTypes() bool {
	return entityFilter.IsSet() && entityFilter.IncludeDerivedTypes != nil && *entityFilter.IncludeDerivedTypes
}

/* --- ManifestationFilter Model --- */

func (manifestFilter *ManifestationFilter) IsSet() bool {
	return manifestFilter != nil
}

func (manifestFilter *ManifestationFilter) HasEntityTypes() bool {
	return manifestFilter.IsSet() && len(manifestFilter.EntityTypes) > 0
}

func (manifestFilter *ManifestationFilter) GetEntityTypes() []string {
	if manifestFilter.HasEntityTypes() {
		return manifestFilter.EntityTypes
	}
	return make([]string, 0)
}

func (manifestFilter *ManifestationFilter) HasManifestationTypes() bool {
	return manifestFilter.IsSet() && len(manifestFilter.ManifestationTypes) > 0
}

func (manifestFilter *ManifestationFilter) GetManifestationTypes() []ManifestationType {
	if manifestFilter.HasManifestationTypes() {
		return manifestFilter.ManifestationTypes
	}
	return make([]ManifestationType, 0)
}

func (manifestFilter *ManifestationFilter) HasManifestationNames() bool {
	return manifestFilter.IsSet() && len(manifestFilter.ManifestationNames) > 0
}

func (manifestFilter *ManifestationFilter) GetManifestationNames() []string {
	if manifestFilter.HasManifestationNames() {
		return manifestFilter.ManifestationNames
	}
	return make([]string, 0)
}

func (manifestFilter *ManifestationFilter) HasScopesFilter() bool {
	return manifestFilter.IsSet() && manifestFilter.ScopesFilter.IsSet() && manifestFilter.ScopesFilter.HasScopes()
}

func (manifestFilter *ManifestationFilter) GetScopesFilter() *ScopesFilterInput {
	if manifestFilter.HasScopesFilter() {
		return manifestFilter.ScopesFilter
	}
	return &ScopesFilterInput{}
}

func (manifestFilter *ManifestationFilter) HasEntityName() bool {
	return manifestFilter.IsSet() && manifestFilter.EntityName != nil && *manifestFilter.EntityName != ""
}

/* --- ScopesFilterInput Model --- */

func (s *ScopesFilterInput) IsSet() bool {
	return s != nil
}
func (s *ScopesFilterInput) HasScopes() bool {
	return s.IsSet() && len(s.Scopes) > 0
}

/* --- ScopeInput Model --- */

func (scope *ScopeInput) IsSet() bool {
	return scope != nil
}
func (scope *ScopeInput) HasTypeValues() bool {
	return scope.IsSet() && len(scope.TypeValues) > 0
}
