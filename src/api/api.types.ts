export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  Time: { input: any; output: any; }
};

export type ApiAdgEdge = {
  __typename?: 'ADGEdge';
  fromNode?: Maybe<ApiConstraintResource>;
  toNode?: Maybe<ApiConstraintResource>;
};

export type ApiAdgGraphEdge = {
  __typename?: 'ADGGraphEdge';
  edgeType: Scalars['String']['output'];
  fromNode?: Maybe<ApiAdgGraphNode>;
  toNode?: Maybe<ApiAdgGraphNode>;
};

export type ApiAdgGraphNode = {
  __typename?: 'ADGGraphNode';
  changedResources: ApiConstraintResource[];
  entity: ApiEntity;
  relatedResources: ApiConstraintResource[];
};

export type ApiAdgNode = {
  __typename?: 'ADGNode';
  node?: Maybe<ApiConstraintResource>;
  relatedResources: ApiConstraintResource[];
};

export type ApiAction = {
  __typename?: 'Action';
  defect: ApiDefect;
  defectId: Scalars['String']['output'];
  description: Scalars['String']['output'];
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  executable: Scalars['Boolean']['output'];
  executionStatus: Scalars['String']['output'];
  id: Scalars['String']['output'];
  resourceAttribute: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  resourceValue: Scalars['Float']['output'];
  time: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ApiAgent = {
  __typename?: 'Agent';
  buildVersion?: Maybe<Scalars['String']['output']>;
  clusterName?: Maybe<Scalars['String']['output']>;
  configuredScrapers?: Maybe<ApiAgentConfiguredScraper[]>;
  discoveredScrapers?: Maybe<ApiAgentDiscoveredScraper[]>;
  hostname: Scalars['String']['output'];
  id: Scalars['String']['output'];
  kernelRelease?: Maybe<Scalars['String']['output']>;
  kernelVersion?: Maybe<Scalars['String']['output']>;
  lastSeen: Scalars['String']['output'];
};

export type ApiAgentConfiguredScraper = {
  __typename?: 'AgentConfiguredScraper';
  initializationError?: Maybe<Scalars['String']['output']>;
  initializationSuccessful: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ApiAgentCount = {
  __typename?: 'AgentCount';
  count: Scalars['Int']['output'];
  repositoryId: Scalars['String']['output'];
};

export type ApiAgentDiscoveredScraper = {
  __typename?: 'AgentDiscoveredScraper';
  type: Scalars['String']['output'];
};

export type ApiAlertHistory = ApiNode & {
  __typename?: 'AlertHistory';
  alertName: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  defects: ApiDefect[];
  entity?: Maybe<ApiEntity>;
  id: Scalars['String']['output'];
  labels: Scalars['JSON']['output'];
  mappingState: ApiAlertMappingState;
  rawAlert: Scalars['JSON']['output'];
  severity?: Maybe<Scalars['String']['output']>;
  symptomName?: Maybe<Scalars['String']['output']>;
};

export type ApiAlertHistoryConnection = ApiConnection & {
  __typename?: 'AlertHistoryConnection';
  edges: ApiAlertHistoryEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiAlertHistoryEdge = ApiEdge & {
  __typename?: 'AlertHistoryEdge';
  cursor: Scalars['String']['output'];
  node: ApiAlertHistory;
};

export type ApiAlertHistoryFilter = {
  alertNameExpr?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['Time']['input']>;
  labelFilters?: InputMaybe<Scalars['JSON']['input']>;
  mappingStates?: InputMaybe<ApiAlertMappingState[]>;
  severity?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
};

export enum ApiAlertMappingState {
  MappedEntityOnly = 'MAPPED_ENTITY_ONLY',
  MappedEntitySymptom = 'MAPPED_ENTITY_SYMPTOM',
  Unmapped = 'UNMAPPED'
}

export type ApiAnyValue = ApiArrayValue | ApiBoolValue | ApiBytesValue | ApiDoubleValue | ApiIntValue | ApiKeyValueList | ApiStringValue;

export type ApiArrayValue = {
  __typename?: 'ArrayValue';
  values: ApiAnyValue[];
};



export type ApiAttributeDef = {
  __typename?: 'AttributeDef';
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  unit?: Maybe<Scalars['String']['output']>;
};

export type ApiAttributeQuery = {
  end?: InputMaybe<Scalars['Time']['input']>;
  entities: ApiEntityAttributeQuery[];
  start: Scalars['Time']['input'];
  stepMinutes?: InputMaybe<Scalars['Int']['input']>;
};

export enum ApiAttributeType {
  Boolean = 'BOOLEAN',
  Float = 'FLOAT',
  Int = 'INT',
  String = 'STRING'
}

export type ApiBoolValue = {
  __typename?: 'BoolValue';
  boolValue: Scalars['Boolean']['output'];
};

export type ApiBooleanAttribute = ApiAttribute & {
  __typename?: 'BooleanAttribute';
  attrType: ApiAttributeType;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  value: Scalars['Boolean']['output'];
};

export type ApiBucket = {
  __typename?: 'Bucket';
  upperBound: Scalars['Float']['output'];
  values: ApiMetric;
};

export type ApiBytesValue = {
  __typename?: 'BytesValue';
  bytesValue: Scalars['String']['output'];
};

export type ApiCalculatedMetric = {
  __typename?: 'CalculatedMetric';
  avg?: Maybe<Scalars['Float']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  metricName: Scalars['String']['output'];
  metricType: Scalars['String']['output'];
  peak?: Maybe<Scalars['Float']['output']>;
  sum?: Maybe<Scalars['Float']['output']>;
  unit: Scalars['String']['output'];
  valid?: Maybe<Scalars['Boolean']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type ApiCausalityEdge = ApiNode & {
  __typename?: 'CausalityEdge';
  fromCausality: ApiCausalityNode;
  id: Scalars['String']['output'];
  probability: Scalars['Float']['output'];
  toCausality: ApiCausalityNode;
};

export type ApiCausalityEdgeConnection = ApiConnection & {
  __typename?: 'CausalityEdgeConnection';
  edges: ApiCausalityEdgeEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiCausalityEdgeEdge = ApiEdge & {
  __typename?: 'CausalityEdgeEdge';
  cursor: Scalars['String']['output'];
  node: ApiCausalityEdge;
};

export type ApiCausalityNode = {
  __typename?: 'CausalityNode';
  defect?: Maybe<ApiDefect>;
  event?: Maybe<ApiEvent>;
  slo?: Maybe<ApiSlo>;
  symptom?: Maybe<ApiSymptom>;
  type: Scalars['String']['output'];
};

export type ApiCodebookManifestationInput = {
  causalityType: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
  manifestationName: Scalars['String']['input'];
};

export type ApiCompareSnapshotsInput = {
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
  snapshotIds: Array<Scalars['String']['input']>;
  userScopeId?: InputMaybe<Scalars['String']['input']>;
};

export enum ApiComparisonAssessment {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED'
}

export type ApiComparisonDiff = {
  __typename?: 'ComparisonDiff';
  assessment: ApiComparisonAssessment;
  comparisonId: Scalars['String']['output'];
  defectDiff?: Maybe<ApiDefectDiff>;
  entityDiff?: Maybe<ApiEntityDiff>;
  resourceSummary?: Maybe<ApiResourceSummary>;
  serviceSummary?: Maybe<ApiServiceSummary>;
  snapshotId1: Scalars['String']['output'];
  snapshotId2: Scalars['String']['output'];
};

export type ApiComparisonMetadata = {
  __typename?: 'ComparisonMetadata';
  comparisonDate: Scalars['Time']['output'];
  comparisonDuration: Scalars['String']['output'];
  scopeInfo?: Maybe<ApiComparisonScopeInfo>;
  snapshotIds: Array<Scalars['String']['output']>;
  snapshotsInfo: ApiSnapshotInfo[];
  timespanCovered: Scalars['String']['output'];
  totalSnapshots: Scalars['Int']['output'];
};

export type ApiComparisonScopeInfo = {
  __typename?: 'ComparisonScopeInfo';
  scopeId?: Maybe<Scalars['String']['output']>;
  scopeName?: Maybe<Scalars['String']['output']>;
};

export enum ApiConfigurationScope {
  Global = 'GLOBAL',
  Individual = 'INDIVIDUAL',
  Label = 'LABEL'
}

export enum ApiConfigurationSource {
  Api = 'API',
  Default = 'DEFAULT',
  K8SLabel = 'K8S_LABEL',
  MlLearned = 'ML_LEARNED'
}

export type ApiConnection = {
  edges: ApiEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export enum ApiConstraintAnalysisChangeType {
  CurrentLoad = 'CURRENT_LOAD',
  LoadChange = 'LOAD_CHANGE'
}

export type ApiConstraintAnalysisConnection = ApiConnection & {
  __typename?: 'ConstraintAnalysisConnection';
  edges: ApiConstraintAnalysisEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiConstraintAnalysisData = ApiNode & {
  __typename?: 'ConstraintAnalysisData';
  data?: Maybe<ApiConstraintAnalysisResult>;
  from: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  to?: Maybe<Scalars['Time']['output']>;
};

export type ApiConstraintAnalysisEdge = ApiEdge & {
  __typename?: 'ConstraintAnalysisEdge';
  cursor: Scalars['String']['output'];
  node: ApiConstraintAnalysisData;
};

export type ApiConstraintAnalysisFilter = {
  from?: InputMaybe<Scalars['Time']['input']>;
  nameExpr?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Time']['input']>;
  types?: InputMaybe<ApiConstraintAnalysisChangeType[]>;
};

export type ApiConstraintAnalysisInput = {
  loadChange?: InputMaybe<ApiLoadChangesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  type: ApiConstraintAnalysisChangeType;
};

export type ApiConstraintAnalysisResult = {
  __typename?: 'ConstraintAnalysisResult';
  adgEdges: ApiAdgEdge[];
  config?: Maybe<ApiConstraintResource>;
  loadChange?: Maybe<ApiLoadChangesResult>;
  status: Scalars['String']['output'];
  type: ApiConstraintAnalysisChangeType;
};

export type ApiConstraintResource = {
  __typename?: 'ConstraintResource';
  attributeName: Scalars['String']['output'];
  currentValue: Scalars['Float']['output'];
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  initialValue: Scalars['Float']['output'];
  percentDifference: Scalars['Float']['output'];
  resultValue: Scalars['Float']['output'];
  unit: Scalars['String']['output'];
};

export type ApiConstraintResourceSummary = {
  __typename?: 'ConstraintResourceSummary';
  attributeName: Scalars['String']['output'];
  currentValue: Scalars['Float']['output'];
  entityTypeName: Scalars['String']['output'];
  percentDifference: Scalars['Float']['output'];
  resultValue: Scalars['Float']['output'];
  unit: Scalars['String']['output'];
};

export type ApiContinuousIncreaseIndicatorData = ApiIndicatorData & {
  __typename?: 'ContinuousIncreaseIndicatorData';
  name: Scalars['String']['output'];
  relatedAttributes?: Maybe<ApiMetricAttribute[]>;
  value?: Maybe<ApiMetricAttribute>;
  window: Scalars['Int']['output'];
};

export type ApiCopilotQueryResponse = {
  __typename?: 'CopilotQueryResponse';
  createdAt: Scalars['String']['output'];
  finishedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  query: Scalars['String']['output'];
  response?: Maybe<Scalars['String']['output']>;
};

export type ApiCopilotScope = {
  __typename?: 'CopilotScope';
  context?: Maybe<ApiCopilotScopeContext[]>;
  relatedEntityId?: Maybe<Scalars['String']['output']>;
};

export type ApiCopilotScopeContext = {
  __typename?: 'CopilotScopeContext';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ApiCopilotScopeContextInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ApiCopilotScopeInput = {
  context?: InputMaybe<ApiCopilotScopeContextInput[]>;
  relatedEntityId?: InputMaybe<Scalars['String']['input']>;
};

export type ApiCopilotThread = {
  __typename?: 'CopilotThread';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  queries?: Maybe<ApiCopilotQueryResponse[]>;
  scope: ApiCopilotScope;
};

export type ApiCreateProductInput = {
  name: Scalars['String']['input'];
  ownerIds: Array<Scalars['String']['input']>;
  serviceEntityIds: Array<Scalars['String']['input']>;
};

export type ApiCreateThresholdConfigurationInput = {
  labelSelector?: InputMaybe<Scalars['JSON']['input']>;
  minLatencyThresholdMs?: InputMaybe<Scalars['Float']['input']>;
  minThresholds?: InputMaybe<Scalars['JSON']['input']>;
  scope: ApiConfigurationScope;
  targetEntityId?: InputMaybe<Scalars['String']['input']>;
  thresholds?: InputMaybe<Scalars['JSON']['input']>;
};

export type ApiCreateTicketInput = {
  integrationType: ApiIntegrationType;
  objectId: Scalars['String']['input'];
  objectType: ApiTicketObjectType;
  projectKey?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<Scalars['String']['input']>;
};

export type ApiCreatedTicket = {
  __typename?: 'CreatedTicket';
  id: Scalars['String']['output'];
  integrationType: ApiIntegrationType;
  url: Scalars['String']['output'];
};

export type ApiDefect = ApiNode & {
  __typename?: 'Defect';
  SLOAtRiskCount: Scalars['Int']['output'];
  SLOTTL: Scalars['Int']['output'];
  activeCount: Scalars['Int']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  duration: Scalars['String']['output'];
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  events: ApiEvent[];
  fromTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  impactedEntities: ApiEntity[];
  impacts: ApiSymptom[];
  likelihood: Scalars['Float']['output'];
  missingCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  relatedOccurrrences: ApiDefect[];
  remediated: Scalars['Boolean']['output'];
  serviceCount: Scalars['Int']['output'];
  severity: ApiDefectSeverity;
  slos: ApiSloNode[];
  symptoms: ApiSymptom[];
  toTime: Scalars['String']['output'];
};

export type ApiDefectConnection = ApiConnection & {
  __typename?: 'DefectConnection';
  edges: ApiDefectEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiDefectCount = {
  __typename?: 'DefectCount';
  defectAutoCount: Scalars['Int']['output'];
  defectCount: Scalars['Int']['output'];
  defectManualCount: Scalars['Int']['output'];
  defectName?: Maybe<Scalars['String']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  severity?: Maybe<ApiDefectSeverity>;
  time?: Maybe<Scalars['String']['output']>;
};

export type ApiDefectDef = {
  __typename?: 'DefectDef';
  contextAttributes?: Maybe<Array<Scalars['String']['output']>>;
  contextIndicators?: Maybe<Array<Scalars['String']['output']>>;
  description: ApiDefectDescription;
  displayName: Scalars['String']['output'];
  entityType: ApiEntityTypeDef;
  entityTypeName: Scalars['String']['output'];
  events: ApiEventDef[];
  name: Scalars['String']['output'];
  symptoms: ApiSymptomDef[];
};

export type ApiDefectDelta = ApiNode & {
  __typename?: 'DefectDelta';
  defect: ApiSnapshotDefect;
  defectOccurrences: ApiSnapshotDefect[];
  entityName?: Maybe<Scalars['String']['output']>;
  entityType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ApiDefectDeltaByType = {
  __typename?: 'DefectDeltaByType';
  defectName: Scalars['String']['output'];
  defects: ApiDefectDelta[];
  entityType: Scalars['String']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ApiDefectDescription = {
  __typename?: 'DefectDescription';
  details?: Maybe<Scalars['String']['output']>;
  remediationOptions: ApiRemediationOption[];
  summary: Scalars['String']['output'];
};

export type ApiDefectDiff = {
  __typename?: 'DefectDiff';
  clearedDefectsByEntityTypes: ApiDefectDeltaByType[];
  countsByDefectType: ApiDefectTypeCount[];
  countsByEntityType: ApiEntityTypeDefectCount[];
  newDefectsByEntityTypes: ApiDefectDeltaByType[];
  totalClearedCount: Scalars['Int']['output'];
  totalNewCount: Scalars['Int']['output'];
};

export type ApiDefectEdge = ApiEdge & {
  __typename?: 'DefectEdge';
  cursor: Scalars['String']['output'];
  node: ApiDefect;
};

export type ApiDefectEvidence = {
  __typename?: 'DefectEvidence';
  alerts: ApiAlertHistory[];
  contextAttributes: ApiAttribute[];
  events?: Maybe<ApiDefectEvidenceEvent[]>;
  exceptions?: Maybe<ApiDefectEvidenceException[]>;
  logs?: Maybe<ApiEntityLogLine[]>;
  relatedEntities: ApiDefectEvidenceRelatedEntities;
  remediation: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  symptoms?: Maybe<ApiDefectEvidenceSymptom[]>;
};

export type ApiDefectEvidenceEvent = {
  __typename?: 'DefectEvidenceEvent';
  entity: ApiEntityReference;
  message: Scalars['String']['output'];
  severity: ApiEntityLogsSeverity;
  timestamp?: Maybe<Scalars['Time']['output']>;
};

export type ApiDefectEvidenceException = {
  __typename?: 'DefectEvidenceException';
  entity: ApiEntityReference;
  message: Scalars['String']['output'];
  timestamp: Scalars['Time']['output'];
};

export type ApiDefectEvidenceGraph = {
  __typename?: 'DefectEvidenceGraph';
  edges?: Maybe<ApiDefectEvidenceGraphEdge[]>;
  nodes?: Maybe<Array<Scalars['String']['output']>>;
};

export type ApiDefectEvidenceGraphEdge = {
  __typename?: 'DefectEvidenceGraphEdge';
  source: Scalars['String']['output'];
  target: Scalars['String']['output'];
};

export type ApiDefectEvidenceGraphInclusionReason = {
  __typename?: 'DefectEvidenceGraphInclusionReason';
  entityId: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type ApiDefectEvidenceRelatedEntities = {
  __typename?: 'DefectEvidenceRelatedEntities';
  entities: ApiEntity[];
  graphInclusionReason?: Maybe<ApiDefectEvidenceGraphInclusionReason[]>;
  impactedServicesGraph?: Maybe<ApiDefectEvidenceGraph>;
  originatingServiceId?: Maybe<Scalars['String']['output']>;
};

export type ApiDefectEvidenceSymptom = {
  __typename?: 'DefectEvidenceSymptom';
  displayName: Scalars['String']['output'];
  entity: ApiEntityReference;
  fromTime: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  indicator?: Maybe<ApiIndicatorData>;
  name: Scalars['String']['output'];
  originatingServiceId?: Maybe<Scalars['String']['output']>;
  toTime?: Maybe<Scalars['Time']['output']>;
  typeName: Scalars['String']['output'];
};

export type ApiDefectFilter = {
  defectNames?: InputMaybe<Array<Scalars['String']['input']>>;
  endTime?: InputMaybe<Scalars['Time']['input']>;
  entityName?: InputMaybe<Scalars['String']['input']>;
  entityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSloImpacts?: InputMaybe<Scalars['Boolean']['input']>;
  includeInactiveDefect?: InputMaybe<Scalars['Boolean']['input']>;
  minSymptomCount?: InputMaybe<Scalars['Int']['input']>;
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
  severities?: InputMaybe<ApiDefectSeverity[]>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
  state?: InputMaybe<ApiDefectState>;
};

export enum ApiDefectSeverity {
  Critical = 'Critical',
  Hidden = 'Hidden',
  High = 'High',
  Low = 'Low',
  Medium = 'Medium'
}

/** Columns on which Defect responses can be sorted */
export enum ApiDefectSortField {
  /** Whether the defect is active (1) or not (0) */
  Active = 'ACTIVE',
  /** The number of symptoms active at the time of the defect */
  ActiveSymptoms = 'ACTIVE_SYMPTOMS',
  /** The amount of time the defect is/was active */
  Duration = 'DURATION',
  /** The start time of the defect */
  FromTime = 'FROM_TIME',
  /** The unique ID of the defect */
  Id = 'ID',
  /** The number of services affected by the defect */
  ServiceCount = 'SERVICE_COUNT',
  /** The severity of the defect */
  Severity = 'SEVERITY',
  /** The end time of the defect */
  ToTime = 'TO_TIME'
}

/** Specifies the ordering of the results from Defect queries */
export type ApiDefectSortInput = {
  /** The field to sort by */
  field: ApiDefectSortField;
  /** The order to sort by, eg Ascending or Descending */
  order?: InputMaybe<ApiSortingOrder>;
};

export type ApiDefectStat = {
  __typename?: 'DefectStat';
  defectName?: Maybe<Scalars['String']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  mttr: Scalars['Int']['output'];
};

export enum ApiDefectState {
  Active = 'ACTIVE',
  All = 'ALL',
  Inactive = 'INACTIVE'
}

export type ApiDefectTypeCount = {
  __typename?: 'DefectTypeCount';
  count: Scalars['Int']['output'];
  defectType: Scalars['String']['output'];
};

export type ApiDefectsByMicroservice = {
  __typename?: 'DefectsByMicroservice';
  defectsByName: ApiDefectsByName[];
  microserviceHash: Scalars['String']['output'];
  microserviceId: Scalars['String']['output'];
  microserviceName: Scalars['String']['output'];
};

export type ApiDefectsByName = {
  __typename?: 'DefectsByName';
  defectName: Scalars['String']['output'];
  defects: ApiSnapshotDefect[];
};

export type ApiDiffEntity = ApiNode & {
  __typename?: 'DiffEntity';
  entityIdHash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  typeName: Scalars['String']['output'];
};

export type ApiDoubleValue = {
  __typename?: 'DoubleValue';
  doubleValue: Scalars['Float']['output'];
};

export type ApiDurationIndicatorData = ApiIndicatorData & {
  __typename?: 'DurationIndicatorData';
  le: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  quantile: Scalars['Float']['output'];
  relatedAttributes?: Maybe<ApiMetricAttribute[]>;
  threshold?: Maybe<ApiMetricAttribute>;
  value?: Maybe<ApiMetricAttribute>;
  window: Scalars['Int']['output'];
};

export type ApiEdge = {
  cursor: Scalars['String']['output'];
  node: ApiNode;
};

export type ApiEntity = ApiNode & {
  __typename?: 'Entity';
  configs: ApiEntityConfig[];
  defects: Array<Maybe<ApiDefect>>;
  events: ApiEvent[];
  id: Scalars['String']['output'];
  labels: ApiLabel[];
  name: Scalars['String']['output'];
  severity: Scalars['String']['output'];
  slos: ApiSlo[];
  symptoms: ApiSymptom[];
  typeName: Scalars['String']['output'];
};

export type ApiEntityAttributeQuery = {
  attributes: Array<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type ApiEntityAttributeQueryResult = {
  __typename?: 'EntityAttributeQueryResult';
  attributes: ApiAttribute[];
  id: Scalars['String']['output'];
};

export type ApiEntityConfig = {
  __typename?: 'EntityConfig';
  data: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ApiEntityConfigFilter = {
  data?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type ApiEntityConfigInput = {
  data: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ApiEntityConnection = ApiConnection & {
  __typename?: 'EntityConnection';
  edges: ApiEntityEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiEntityData = {
  __typename?: 'EntityData';
  attributes: ApiAttribute[];
  id: Scalars['String']['output'];
  indicators: ApiIndicatorData[];
  resources: ApiResourceData[];
};

export type ApiEntityDataQuery = {
  attributes?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  indicators?: InputMaybe<Array<Scalars['String']['input']>>;
  resources?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApiEntityDataQueryResult = {
  __typename?: 'EntityDataQueryResult';
  entities: ApiEntityData[];
};

export type ApiEntityDiff = {
  __typename?: 'EntityDiff';
  afterOnly: ApiDiffEntity[];
  afterOnlyCount: Scalars['Int']['output'];
  beforeOnly: ApiDiffEntity[];
  beforeOnlyCount: Scalars['Int']['output'];
  both: ApiDiffEntity[];
  stableCount: Scalars['Int']['output'];
};

export type ApiEntityEdge = ApiEdge & {
  __typename?: 'EntityEdge';
  cursor: Scalars['String']['output'];
  node: ApiEntity;
};

export type ApiEntityFilter = {
  configFilters?: InputMaybe<ApiEntityConfigFilter[]>;
  entityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  includeDerivedTypes?: InputMaybe<Scalars['Boolean']['input']>;
  nameExpr?: InputMaybe<Scalars['String']['input']>;
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
  severities?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApiEntityLogLine = {
  __typename?: 'EntityLogLine';
  entity: ApiEntityReference;
  message: Scalars['String']['output'];
  severity: ApiEntityLogsSeverity;
  timestamp: Scalars['Time']['output'];
};

export type ApiEntityLogsQuery = {
  id: Scalars['String']['input'];
  severity?: InputMaybe<ApiEntityLogsSeverity>;
};

export type ApiEntityLogsResult = {
  __typename?: 'EntityLogsResult';
  lines: Array<Maybe<ApiEntityLogLine>>;
};

export enum ApiEntityLogsSeverity {
  Critical = 'CRITICAL',
  Debug = 'DEBUG',
  Error = 'ERROR',
  Info = 'INFO',
  Unknown = 'UNKNOWN',
  Warning = 'WARNING'
}

export type ApiEntityQuery = {
  end?: InputMaybe<Scalars['Time']['input']>;
  entities: ApiEntityDataQuery[];
  start?: InputMaybe<Scalars['Time']['input']>;
  stepMinutes?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiEntityReference = {
  __typename?: 'EntityReference';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  typeName: Scalars['String']['output'];
};

export type ApiEntityRelatedDefects = {
  __typename?: 'EntityRelatedDefects';
  entity: ApiEntity;
  relatedDefects: ApiRelatedDefects;
};

export type ApiEntityRelation = {
  __typename?: 'EntityRelation';
  entities: ApiEntity[];
  name: Scalars['String']['output'];
};

export type ApiEntityRelationCount = {
  __typename?: 'EntityRelationCount';
  count?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  typeName?: Maybe<Scalars['String']['output']>;
};

export type ApiEntityTracesQuery = {
  id: Scalars['String']['input'];
};

export type ApiEntityTracesResult = {
  __typename?: 'EntityTracesResult';
  traces: Array<Maybe<ApiTrace>>;
};

export type ApiEntityTypeCount = {
  __typename?: 'EntityTypeCount';
  count: Scalars['Int']['output'];
  entityType: Scalars['String']['output'];
  severity?: Maybe<Scalars['String']['output']>;
};

export type ApiEntityTypeDef = {
  __typename?: 'EntityTypeDef';
  attributes: ApiAttributeDef[];
  contextAttributes?: Maybe<Array<Scalars['String']['output']>>;
  defects: ApiDefectDef[];
  events: ApiEventDef[];
  indicators: ApiIndicatorDef[];
  name: Scalars['String']['output'];
  relations: ApiRelationDef[];
  resources: ApiResourceDef[];
  symptoms: ApiSymptomDef[];
};

export type ApiEntityTypeDefFilter = {
  EntityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  includeDerivedTypes?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApiEntityTypeDefectCount = {
  __typename?: 'EntityTypeDefectCount';
  count: Scalars['Int']['output'];
  entityType: Scalars['String']['output'];
};

export type ApiEvent = {
  __typename?: 'Event';
  active: Scalars['Boolean']['output'];
  activeDefects?: Maybe<ApiDefect[]>;
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  time: Scalars['String']['output'];
};

export type ApiEventBasedContinuousIncreaseIndicatorData = ApiIndicatorData & {
  __typename?: 'EventBasedContinuousIncreaseIndicatorData';
  eventName: Scalars['String']['output'];
  eventTimestamp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  relatedAttributes?: Maybe<ApiMetricAttribute[]>;
  value?: Maybe<ApiMetricAttribute>;
  window: Scalars['Int']['output'];
};

export type ApiEventDef = {
  __typename?: 'EventDef';
  entityType: ApiEntityTypeDef;
  entityTypeName: Scalars['String']['output'];
  impacts: ApiSlo[];
  name: Scalars['String']['output'];
};

export type ApiFeatureFlagStatus = {
  __typename?: 'FeatureFlagStatus';
  enabled: Scalars['Boolean']['output'];
};

export type ApiFeedback = {
  message: Scalars['String']['input'];
  relatedObjectId: Scalars['String']['input'];
  relatedObjectType: ApiFeedbackObjectType;
  type: ApiFeedbackType;
};

export enum ApiFeedbackObjectType {
  CopilotQuery = 'CopilotQuery',
  RootCause = 'RootCause'
}

export enum ApiFeedbackType {
  Negative = 'Negative',
  Positive = 'Positive'
}

export type ApiFloatAttribute = ApiAttribute & {
  __typename?: 'FloatAttribute';
  attrType: ApiAttributeType;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type ApiGitHubRepository = {
  __typename?: 'GitHubRepository';
  description?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  language?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  private: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

export type ApiGroupSummary = {
  __typename?: 'GroupSummary';
  groupBy: Scalars['String']['output'];
  groupName: Scalars['String']['output'];
  summaryData: ApiSummaryData[];
};

export type ApiHeadlineContext = {
  __typename?: 'HeadlineContext';
  active: Scalars['Boolean']['output'];
  durationMinutes: Scalars['Int']['output'];
  errorRateImpacted: Scalars['Boolean']['output'];
  latencyImpacted: Scalars['Boolean']['output'];
  recurrenceCount: Scalars['Int']['output'];
  renderedText: Scalars['String']['output'];
  rules: ApiHeadlineRule[];
  serviceCount: Scalars['Int']['output'];
  sloAtRiskCount: Scalars['Int']['output'];
  sloViolatedCount: Scalars['Int']['output'];
  symptomCount: Scalars['Int']['output'];
};

export type ApiHeadlineItem = {
  __typename?: 'HeadlineItem';
  defect: ApiDefect;
  headlineContext: ApiHeadlineContext;
};

export type ApiHeadlineOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
  sort?: InputMaybe<ApiHeadlineSortInput>;
  thresholds?: InputMaybe<ApiHeadlineThresholdsInput>;
  timeFilter?: InputMaybe<ApiTimeFilter>;
};

export type ApiHeadlineRule = {
  __typename?: 'HeadlineRule';
  condition: Scalars['String']['output'];
  id: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export enum ApiHeadlineRuleId {
  Recurrences = 'RECURRENCES',
  ServiceImpacts = 'SERVICE_IMPACTS',
  SloImpacts = 'SLO_IMPACTS',
  SymptomSpread = 'SYMPTOM_SPREAD'
}

export type ApiHeadlineRules = {
  __typename?: 'HeadlineRules';
  rules: ApiHeadlineRule[];
  thresholds: ApiHeadlineThresholds;
};

export enum ApiHeadlineSortField {
  Active = 'ACTIVE',
  RecurrenceCount = 'RECURRENCE_COUNT',
  ServiceCount = 'SERVICE_COUNT',
  Severity = 'SEVERITY',
  SymptomCount = 'SYMPTOM_COUNT',
  TotalDuration = 'TOTAL_DURATION'
}

export type ApiHeadlineSortInput = {
  priority?: InputMaybe<ApiHeadlineSortField[]>;
};

export type ApiHeadlineThresholds = {
  __typename?: 'HeadlineThresholds';
  minDuration: Scalars['Int']['output'];
  minRecurrences: Scalars['Int']['output'];
  minServiceCount: Scalars['Int']['output'];
  minSymptomCount: Scalars['Int']['output'];
};

export type ApiHeadlineThresholdsInput = {
  minDuration?: InputMaybe<Scalars['Int']['input']>;
  minRecurrences?: InputMaybe<Scalars['Int']['input']>;
  minServiceCount?: InputMaybe<Scalars['Int']['input']>;
  minSymptomCount?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiHeadlines = {
  __typename?: 'Headlines';
  headlineItems: ApiHeadlineItem[];
  rules: ApiHeadlineRules;
};

export type ApiHealthMetrics = {
  __typename?: 'HealthMetrics';
  attributeUpdatesByType?: Maybe<Scalars['JSON']['output']>;
  attributesUpdated: Scalars['Int']['output'];
  entitiesByType?: Maybe<Scalars['JSON']['output']>;
  entitiesDiscovered: Scalars['Int']['output'];
  exampleEntitiesByType?: Maybe<Scalars['JSON']['output']>;
  lastSyncTime?: Maybe<Scalars['Time']['output']>;
  scrapeDurationMs: Scalars['Int']['output'];
};

export type ApiHistogramAttribute = ApiAttribute & {
  __typename?: 'HistogramAttribute';
  attrType: ApiAttributeType;
  buckets: ApiBucket[];
  count: ApiMetric;
  name: Scalars['String']['output'];
  sum: ApiMetric;
  unit: Scalars['String']['output'];
};

export type ApiIndicatorData = {
  name: Scalars['String']['output'];
};

export type ApiIndicatorDef = {
  __typename?: 'IndicatorDef';
  attributes: ApiAttributeDef[];
  contextAttributes?: Maybe<Array<Scalars['String']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  symptoms: ApiSymptomDef[];
  type: Scalars['String']['output'];
};

export enum ApiInstallationStatus {
  Active = 'ACTIVE',
  Disconnected = 'DISCONNECTED',
  Expired = 'EXPIRED'
}

export type ApiInstalledIntegration = {
  __typename?: 'InstalledIntegration';
  accountName: Scalars['String']['output'];
  installedAt: Scalars['Time']['output'];
  status: ApiInstallationStatus;
  type: ApiIntegrationType;
};

export type ApiIntAttribute = ApiAttribute & {
  __typename?: 'IntAttribute';
  attrType: ApiAttributeType;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type ApiIntValue = {
  __typename?: 'IntValue';
  intValue: Scalars['Int']['output'];
};

export enum ApiIntegration {
  Slack = 'SLACK'
}

export type ApiIntegrationStatus = {
  __typename?: 'IntegrationStatus';
  connected: Scalars['Boolean']['output'];
  userAuthorized: Scalars['Boolean']['output'];
};

export enum ApiIntegrationType {
  Github = 'GITHUB',
  Jira = 'JIRA',
  Linear = 'LINEAR'
}

export type ApiJiraIssueType = {
  __typename?: 'JiraIssueType';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ApiJiraProject = {
  __typename?: 'JiraProject';
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ApiKeyValueList = {
  __typename?: 'KeyValueList';
  values: ApiTraceKeyValue[];
};

export type ApiLabel = {
  __typename?: 'Label';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ApiLabelFilterInput = {
  key: Scalars['String']['input'];
  values: Array<Scalars['String']['input']>;
};

export type ApiLinearProject = {
  __typename?: 'LinearProject';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ApiLinearTeam = {
  __typename?: 'LinearTeam';
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ApiLoadChangesEntityInput = {
  absoluteValue?: InputMaybe<Scalars['Float']['input']>;
  changePercent?: InputMaybe<Scalars['Float']['input']>;
  entityId: Scalars['String']['input'];
  resourceName: Scalars['String']['input'];
};

export type ApiLoadChangesInput = {
  entities: ApiLoadChangesEntityInput[];
};

export type ApiLoadChangesResult = {
  __typename?: 'LoadChangesResult';
  resourceSummary: ApiConstraintResourceSummary[];
  resources: ApiConstraintResource[];
};

export type ApiManifestation = ApiNode & {
  __typename?: 'Manifestation';
  event?: Maybe<ApiEvent>;
  id: Scalars['String']['output'];
  slo?: Maybe<ApiSlo>;
  symptom?: Maybe<ApiSymptom>;
};

export type ApiManifestationConnection = ApiConnection & {
  __typename?: 'ManifestationConnection';
  edges: ApiManifestationEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiManifestationCount = {
  __typename?: 'ManifestationCount';
  entityType?: Maybe<Scalars['String']['output']>;
  manifestationCount: Scalars['Int']['output'];
  manifestationName?: Maybe<Scalars['String']['output']>;
  manifestationType?: Maybe<ApiManifestationType>;
  time?: Maybe<Scalars['String']['output']>;
};

export type ApiManifestationEdge = ApiEdge & {
  __typename?: 'ManifestationEdge';
  cursor: Scalars['String']['output'];
  node: ApiManifestation;
};

export type ApiManifestationFilter = {
  endTime?: InputMaybe<Scalars['Time']['input']>;
  entityName?: InputMaybe<Scalars['String']['input']>;
  entityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  manifestationNames?: InputMaybe<Array<Scalars['String']['input']>>;
  manifestationTypes?: InputMaybe<ApiManifestationType[]>;
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
};

export enum ApiManifestationState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Unknown = 'UNKNOWN'
}

export enum ApiManifestationType {
  Event = 'Event',
  Slo = 'Slo',
  Symptom = 'Symptom'
}

export type ApiMetric = {
  __typename?: 'Metric';
  values: ApiSamplePair[];
};

export type ApiMetricAttribute = ApiAttribute & {
  __typename?: 'MetricAttribute';
  attrType: ApiAttributeType;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  value: ApiMetric;
};

export type ApiMetricChange = {
  __typename?: 'MetricChange';
  afterValue?: Maybe<Scalars['Float']['output']>;
  aggregateType: Scalars['String']['output'];
  beforeValue?: Maybe<Scalars['Float']['output']>;
  changePercent?: Maybe<Scalars['Float']['output']>;
  changeValue?: Maybe<Scalars['Float']['output']>;
  entityType: Scalars['String']['output'];
  metricName: Scalars['String']['output'];
  unit: Scalars['String']['output'];
};

export type ApiMetricsSummary = {
  calculatedMetrics?: Maybe<ApiCalculatedMetric[]>;
  entityCount: Scalars['Int']['output'];
  snapshotId: Scalars['String']['output'];
};

export type ApiMutateUserScopeInput = {
  audience: ApiUserScopeAudience;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  scopes: ApiScopeInput[];
};

export type ApiMutation = {
  __typename?: 'Mutation';
  constraintAnalysis: Scalars['String']['output'];
  createEntityConfigs: ApiEntityConfig[];
  createFeedback?: Maybe<Scalars['String']['output']>;
  createNotification?: Maybe<Scalars['String']['output']>;
  createOrUpdateScraperSource: ApiScraperSourceCreateOrUpdateResponse;
  createProduct: ApiProduct;
  createSnapshot: ApiSnapshot;
  createThresholdConfiguration: ApiThresholdConfiguration;
  createTicket: ApiCreatedTicket;
  createUpdateNotificationConfig: ApiNotificationConfiguration;
  createUserScope: ApiUserScope;
  deleteConstraintAnalysis: Scalars['String']['output'];
  deleteCopilotThreads?: Maybe<Scalars['Boolean']['output']>;
  deleteEntityConfig: Scalars['Boolean']['output'];
  deleteNotificationConfiguration: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteScraperSource: Scalars['Boolean']['output'];
  deleteThresholdConfiguration: Scalars['Boolean']['output'];
  deleteUserScope: Scalars['Boolean']['output'];
  deleteUserSetting: ApiUserSettings;
  disconnectIntegration: Scalars['Boolean']['output'];
  executeAction: Scalars['Boolean']['output'];
  queryCopilotThread: ApiCopilotQueryResponse;
  retryCopilotQuery?: Maybe<Scalars['Boolean']['output']>;
  startCopilotThread: ApiCopilotThread;
  updateNotificationConfigFilters: ApiNotificationConfiguration;
  updateProduct: ApiProduct;
  updateProductDependentServiceStatus: Scalars['Boolean']['output'];
  updateThresholdConfiguration: ApiThresholdConfiguration;
  updateUserScope: ApiUserScope;
  updateUserSetting: ApiUserSettings;
  userSettings: ApiUserSettings;
};


export type ApiMutationConstraintAnalysisArgs = {
  input?: InputMaybe<ApiConstraintAnalysisInput>;
};


export type ApiMutationCreateEntityConfigsArgs = {
  entityConfigs: ApiEntityConfigInput[];
};


export type ApiMutationCreateFeedbackArgs = {
  feedback: ApiFeedback;
};


export type ApiMutationCreateNotificationArgs = {
  notification: ApiNotificationInput;
};


export type ApiMutationCreateOrUpdateScraperSourceArgs = {
  input: ApiScraperSourceCreateOrUpdateInput;
};


export type ApiMutationCreateProductArgs = {
  input: ApiCreateProductInput;
};


export type ApiMutationCreateSnapshotArgs = {
  options: ApiSnapshotOptionsInput;
};


export type ApiMutationCreateThresholdConfigurationArgs = {
  input: ApiCreateThresholdConfigurationInput;
};


export type ApiMutationCreateTicketArgs = {
  input: ApiCreateTicketInput;
};


export type ApiMutationCreateUpdateNotificationConfigArgs = {
  input: ApiNotificationConfigurationInput;
};


export type ApiMutationCreateUserScopeArgs = {
  scope: ApiMutateUserScopeInput;
};


export type ApiMutationDeleteConstraintAnalysisArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteCopilotThreadsArgs = {
  threadId: Array<Scalars['String']['input']>;
};


export type ApiMutationDeleteEntityConfigArgs = {
  configType: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
};


export type ApiMutationDeleteNotificationConfigurationArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteScraperSourceArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteThresholdConfigurationArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteUserScopeArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteUserSettingArgs = {
  id: Scalars['String']['input'];
  settings: Array<InputMaybe<ApiUserSettingInput>>;
};


export type ApiMutationDisconnectIntegrationArgs = {
  type: ApiIntegrationType;
};


export type ApiMutationExecuteActionArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationQueryCopilotThreadArgs = {
  query: Scalars['String']['input'];
  threadId: Scalars['String']['input'];
};


export type ApiMutationRetryCopilotQueryArgs = {
  queryId: Scalars['String']['input'];
};


export type ApiMutationStartCopilotThreadArgs = {
  scope: ApiCopilotScopeInput;
};


export type ApiMutationUpdateNotificationConfigFiltersArgs = {
  filters?: InputMaybe<ApiNotificationConfigFilterInput[]>;
  id: Scalars['String']['input'];
};


export type ApiMutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  input: ApiUpdateProductInput;
};


export type ApiMutationUpdateProductDependentServiceStatusArgs = {
  isIgnored: Scalars['Boolean']['input'];
  productId: Scalars['String']['input'];
  serviceEntityId: Scalars['String']['input'];
};


export type ApiMutationUpdateThresholdConfigurationArgs = {
  id: Scalars['String']['input'];
  input: ApiUpdateThresholdConfigurationInput;
};


export type ApiMutationUpdateUserScopeArgs = {
  scope: ApiMutateUserScopeInput;
};


export type ApiMutationUpdateUserSettingArgs = {
  id: Scalars['String']['input'];
  settings: Array<InputMaybe<ApiUserSettingInput>>;
};


export type ApiMutationUserSettingsArgs = {
  data: ApiUserSettingsInput;
};

export type ApiNode = {
  id: Scalars['String']['output'];
};

export type ApiNotification = {
  __typename?: 'Notification';
  Id: Scalars['String']['output'];
  payload: Scalars['String']['output'];
  sourceId: Scalars['String']['output'];
  time: Scalars['Time']['output'];
  type: Scalars['Int']['output'];
};

export type ApiNotificationConfigFilter = {
  __typename?: 'NotificationConfigFilter';
  fieldName: Scalars['String']['output'];
  operation: ApiNotificationFilterOperation;
  value: Scalars['String']['output'];
};

export type ApiNotificationConfigFilterInput = {
  fieldName: Scalars['String']['input'];
  operation: ApiNotificationFilterOperation;
  value: Scalars['String']['input'];
};

export type ApiNotificationConfigStatus = {
  __typename?: 'NotificationConfigStatus';
  clusterId: Scalars['String']['output'];
  failCount: Scalars['Int']['output'];
  lastMessage: Scalars['String']['output'];
  lastTimestamp: Scalars['String']['output'];
  name: Scalars['String']['output'];
  successCount: Scalars['Int']['output'];
};

export type ApiNotificationConfiguration = {
  __typename?: 'NotificationConfiguration';
  clusterIds: Array<Scalars['String']['output']>;
  configFilters?: Maybe<ApiNotificationConfigFilter[]>;
  destinationType: Scalars['String']['output'];
  global: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ApiNotificationConfigurationInput = {
  clusterIds: Array<Scalars['String']['input']>;
  configFilters?: InputMaybe<ApiNotificationConfigFilterInput[]>;
  destinationType: Scalars['String']['input'];
  global?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export enum ApiNotificationFilterOperation {
  Equals = 'equals',
  In = 'in',
  NotEquals = 'not_equals',
  NotIn = 'not_in'
}

export type ApiNotificationInput = {
  payload: Scalars['String']['input'];
  sourceId: Scalars['String']['input'];
  type: Scalars['Int']['input'];
};

export type ApiPageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ApiPageRequestInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiProduct = {
  __typename?: 'Product';
  activeRiskCount: Scalars['Int']['output'];
  activeRootCausesCount: Scalars['Int']['output'];
  createdAt: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owners: ApiUser[];
  services: ApiProductService[];
  suggestedImprovementsCount: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type ApiProductConfigurationStatus = {
  __typename?: 'ProductConfigurationStatus';
  services: ApiServiceConfigurationStatus[];
};

export type ApiProductRootCausesFilter = {
  endTime?: InputMaybe<Scalars['Time']['input']>;
  severities?: InputMaybe<ApiDefectSeverity[]>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
};

export type ApiProductService = {
  __typename?: 'ProductService';
  entity: ApiEntity;
  id: Scalars['String']['output'];
  isDependentService: Scalars['Boolean']['output'];
  isIgnored: Scalars['Boolean']['output'];
  isProductService: Scalars['Boolean']['output'];
};

export type ApiProductTrends = {
  __typename?: 'ProductTrends';
  productId: Scalars['String']['output'];
  risks: ApiSamplePair[];
  rootCauses: ApiSamplePair[];
};

export type ApiQuery = {
  __typename?: 'Query';
  action: ApiAction;
  actions: ApiAction[];
  agentCounts?: Maybe<ApiAgentCount[]>;
  agentNodes: ApiEntityReference[];
  agents?: Maybe<ApiAgent[]>;
  alertHistory: ApiAlertHistoryConnection;
  causality: Array<Maybe<ApiCausalityEdge>>;
  codebookCausality: Array<Maybe<ApiCausalityEdge>>;
  codebookCausalityChain: ApiCausalityEdgeConnection;
  codebookDefects: Array<Maybe<ApiDefect>>;
  compareSnapshots: ApiSnapshotComparisonResult;
  constraintAnalyses: ApiConstraintAnalysisConnection;
  constraintAnalysis: ApiConstraintAnalysisData;
  constraintAnalysisADG: Array<Maybe<ApiAdgEdge>>;
  constraintAnalysisGraph: Array<Maybe<ApiAdgGraphEdge>>;
  defect: ApiDefect;
  defectConnection: ApiDefectConnection;
  defectCounts: ApiDefectCount[];
  defectEvidence?: Maybe<ApiDefectEvidence>;
  defectStats: ApiDefectStat[];
  entities: Array<Maybe<ApiEntity>>;
  entity?: Maybe<ApiEntity>;
  entityAttributes: ApiEntityAttributeQueryResult[];
  entityConfigs?: Maybe<ApiEntityConfig[]>;
  entityConnection: ApiEntityConnection;
  entityData: ApiEntityDataQueryResult;
  entityLogs: ApiEntityLogsResult;
  entityRelatedDefects: ApiEntityRelatedDefects[];
  entityTraces: ApiEntityTracesResult;
  entityTypeCounts?: Maybe<ApiEntityTypeCount[]>;
  entityTypeDef: ApiEntityTypeDef;
  entityTypeDefs: ApiEntityTypeDef[];
  getCopilotQueryResponse: ApiCopilotQueryResponse;
  getCopilotThread: ApiCopilotThread;
  getCopilotThreads?: Maybe<ApiCopilotThread[]>;
  getIntegration?: Maybe<ApiInstalledIntegration>;
  getNotification: ApiNotification;
  getNotificationConfiguration: ApiNotificationConfiguration;
  getNotificationConfigurations: ApiNotificationConfiguration[];
  getSnapshot: ApiSnapshot;
  getSnapshots?: Maybe<ApiSnapshot[]>;
  getSnapshotsPaginated: ApiSnapshotConnection;
  getSupportedThresholdMetrics: ApiThresholdMetricDefinition[];
  getThresholdConfiguration?: Maybe<ApiThresholdConfiguration>;
  getUserScope?: Maybe<ApiUserScope>;
  getUserScopes: ApiUserScopeConnection;
  getUserScopesWithEntityCounts: ApiUserScopeEntityCountConnection;
  headlines: ApiHeadlines;
  isFeatureFlagEnabled: ApiFeatureFlagStatus;
  isIntegrationConnected: ApiIntegrationStatus;
  listAllDataSources: ApiScraperSource[];
  listAllScraperDefinitions: ApiScraperSourceDefinition[];
  listGitHubRepositories: ApiGitHubRepository[];
  listIntegrations: ApiInstalledIntegration[];
  listJiraIssueTypes: ApiJiraIssueType[];
  listJiraProjects: ApiJiraProject[];
  listLinearProjects: ApiLinearProject[];
  listLinearTeams: ApiLinearTeam[];
  listThresholdConfigurations: ApiThresholdConfiguration[];
  manifestationCounts: ApiManifestationCount[];
  manifestations: ApiManifestationConnection;
  notificationConfigStatus: ApiNotificationConfigStatus[];
  product?: Maybe<ApiProduct>;
  productConfigurationStatus: ApiProductConfigurationStatus;
  productRootCauses: ApiDefect[];
  productServices: ApiProductService[];
  productTrends: ApiProductTrends[];
  products: ApiProduct[];
  relatedDefects: ApiRelatedDefects;
  relatedEntities: ApiEntityRelation[];
  relatedEntityCount: ApiRelatedEntityCountConnection;
  relatedSlos: ApiSloNode[];
  resolveThresholdForEntity?: Maybe<ApiResolvedThresholdConfiguration>;
  scopes?: Maybe<ApiScopesFilter>;
  scraperSourceDefinition: ApiScraperSourceDefinition;
  scraperSources: ApiScraperSource[];
  sloConnection: ApiSloConnection;
  sloNode: ApiSloNode;
  sloTypes: Array<Scalars['String']['output']>;
  slos: ApiSlo[];
  summarize: ApiSummaryContent;
  summary: ApiSummary[];
  symptoms: ApiSymptom[];
  topologyGraph: Array<Maybe<ApiTopologyEdge>>;
  userSettings: ApiUserSettings;
  users: ApiUser[];
  version: ApiVersionInfo;
  whatIf: ApiConstraintAnalysisResult;
  workloadCounts: ApiWorkloadCount[];
};


export type ApiQueryActionArgs = {
  actionId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryActionsArgs = {
  defectId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryAgentNodesArgs = {
  clusterName: Scalars['String']['input'];
  withoutAgents?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiQueryAlertHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiAlertHistoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryCausalityArgs = {
  defectId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryCodebookCausalityArgs = {
  defectName: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
};


export type ApiQueryCodebookCausalityChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  defectName: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryCodebookDefectsArgs = {
  causalityType: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
  symptomOrDefectName: Scalars['String']['input'];
};


export type ApiQueryCompareSnapshotsArgs = {
  input: ApiCompareSnapshotsInput;
};


export type ApiQueryConstraintAnalysesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiConstraintAnalysisFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryConstraintAnalysisArgs = {
  id: Scalars['String']['input'];
};


export type ApiQueryConstraintAnalysisAdgArgs = {
  attribute?: InputMaybe<Scalars['String']['input']>;
  entityId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type ApiQueryConstraintAnalysisGraphArgs = {
  entityId?: InputMaybe<Scalars['String']['input']>;
  graphType: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type ApiQueryDefectArgs = {
  defectId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryDefectConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  defectFilter?: InputMaybe<ApiDefectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groupRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ApiDefectSortInput[]>;
};


export type ApiQueryDefectCountsArgs = {
  bucketSize?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiDefectFilter>;
  groupRecurring?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiQueryDefectEvidenceArgs = {
  defectId: Scalars['String']['input'];
};


export type ApiQueryDefectStatsArgs = {
  endTime?: InputMaybe<Scalars['Time']['input']>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
};


export type ApiQueryEntitiesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type ApiQueryEntityArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  entityId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryEntityAttributesArgs = {
  query: ApiAttributeQuery;
};


export type ApiQueryEntityConfigsArgs = {
  configType?: InputMaybe<Scalars['String']['input']>;
  entityId: Scalars['String']['input'];
};


export type ApiQueryEntityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  entityFilter?: InputMaybe<ApiEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryEntityDataArgs = {
  query: ApiEntityQuery;
};


export type ApiQueryEntityLogsArgs = {
  query: ApiEntityLogsQuery;
};


export type ApiQueryEntityRelatedDefectsArgs = {
  endTime?: InputMaybe<Scalars['Time']['input']>;
  entityIds: Array<Scalars['String']['input']>;
  groupRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
};


export type ApiQueryEntityTracesArgs = {
  query: ApiEntityTracesQuery;
};


export type ApiQueryEntityTypeCountsArgs = {
  entityFilter?: InputMaybe<ApiEntityFilter>;
};


export type ApiQueryEntityTypeDefArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryEntityTypeDefsArgs = {
  filter?: InputMaybe<ApiEntityTypeDefFilter>;
};


export type ApiQueryGetCopilotQueryResponseArgs = {
  queryId: Scalars['String']['input'];
};


export type ApiQueryGetCopilotThreadArgs = {
  threadId: Scalars['String']['input'];
};


export type ApiQueryGetCopilotThreadsArgs = {
  scope: ApiCopilotScopeInput;
};


export type ApiQueryGetIntegrationArgs = {
  type: ApiIntegrationType;
};


export type ApiQueryGetNotificationArgs = {
  id: Scalars['String']['input'];
};


export type ApiQueryGetNotificationConfigurationArgs = {
  id: Scalars['String']['input'];
};


export type ApiQueryGetSnapshotArgs = {
  id: Scalars['String']['input'];
};


export type ApiQueryGetSnapshotsArgs = {
  filter?: InputMaybe<ApiSnapshotFilterInput>;
};


export type ApiQueryGetSnapshotsPaginatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiSnapshotFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryGetSupportedThresholdMetricsArgs = {
  entityType?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryGetThresholdConfigurationArgs = {
  id: Scalars['String']['input'];
};


export type ApiQueryGetUserScopeArgs = {
  id: Scalars['String']['input'];
};


export type ApiQueryGetUserScopesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiUserScopeFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryGetUserScopesWithEntityCountsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiUserScopeFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryHeadlinesArgs = {
  options?: InputMaybe<ApiHeadlineOptions>;
};


export type ApiQueryIsFeatureFlagEnabledArgs = {
  flagName: Scalars['String']['input'];
};


export type ApiQueryIsIntegrationConnectedArgs = {
  integration: ApiIntegration;
};


export type ApiQueryListJiraIssueTypesArgs = {
  projectKey: Scalars['String']['input'];
};


export type ApiQueryListThresholdConfigurationsArgs = {
  filter?: InputMaybe<ApiThresholdConfigurationFilter>;
};


export type ApiQueryManifestationCountsArgs = {
  filter?: InputMaybe<ApiManifestationFilter>;
};


export type ApiQueryManifestationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiManifestationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQueryProductArgs = {
  id: Scalars['String']['input'];
};


export type ApiQueryProductConfigurationStatusArgs = {
  productId: Scalars['String']['input'];
};


export type ApiQueryProductRootCausesArgs = {
  filter?: InputMaybe<ApiProductRootCausesFilter>;
  productId: Scalars['String']['input'];
};


export type ApiQueryProductServicesArgs = {
  includeDependentServices?: InputMaybe<Scalars['Boolean']['input']>;
  includeIgnoredDependentServices?: InputMaybe<Scalars['Boolean']['input']>;
  includeProductServices?: InputMaybe<Scalars['Boolean']['input']>;
  productId: Scalars['String']['input'];
};


export type ApiQueryProductTrendsArgs = {
  endTime?: InputMaybe<Scalars['Time']['input']>;
  productIds: Array<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
};


export type ApiQueryProductsArgs = {
  nameExpr?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryRelatedDefectsArgs = {
  entityId: Scalars['String']['input'];
};


export type ApiQueryRelatedEntitiesArgs = {
  entityId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryRelatedEntityCountArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  entityFilter?: InputMaybe<ApiEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  relatedEntityType?: InputMaybe<Scalars['String']['input']>;
  relationNames?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ApiQueryRelatedSlosArgs = {
  dataQuery?: InputMaybe<ApiSloDataQuery>;
  entityId: Scalars['String']['input'];
};


export type ApiQueryResolveThresholdForEntityArgs = {
  entityId: Scalars['String']['input'];
  entityLabels?: InputMaybe<Scalars['JSON']['input']>;
};


export type ApiQueryScopesArgs = {
  input?: InputMaybe<ApiScopesFilterInput>;
  typesList?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ApiQueryScraperSourceDefinitionArgs = {
  scraperType: ApiScraperType;
};


export type ApiQueryScraperSourcesArgs = {
  scraperType: ApiScraperType;
};


export type ApiQuerySloConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiSloFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQuerySloNodeArgs = {
  dataQuery?: InputMaybe<ApiSloDataQuery>;
  sloId: Scalars['String']['input'];
};


export type ApiQuerySummarizeArgs = {
  summaryOptions?: InputMaybe<ApiSummaryOptions>;
};


export type ApiQuerySummaryArgs = {
  summaryOptions?: InputMaybe<ApiSummaryOptions>;
};


export type ApiQueryTopologyGraphArgs = {
  entityId: Scalars['String']['input'];
  graphType: ApiTopologyGraphType;
};


export type ApiQueryUserSettingsArgs = {
  filter?: InputMaybe<ApiUserSettingsFilter>;
  id: Scalars['String']['input'];
};


export type ApiQueryUsersArgs = {
  filter?: InputMaybe<ApiUserFilter>;
};


export type ApiQueryWhatIfArgs = {
  input?: InputMaybe<ApiConstraintAnalysisInput>;
};


export type ApiQueryWorkloadCountsArgs = {
  endTime?: InputMaybe<Scalars['Time']['input']>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
};

export type ApiRatioIndicatorData = ApiIndicatorData & {
  __typename?: 'RatioIndicatorData';
  count?: Maybe<ApiMetricAttribute>;
  name: Scalars['String']['output'];
  ratio?: Maybe<ApiMetricAttribute>;
  relatedAttributes?: Maybe<ApiMetricAttribute[]>;
  threshold?: Maybe<ApiMetricAttribute>;
  total?: Maybe<ApiMetricAttribute>;
  window: Scalars['Int']['output'];
};

export type ApiRelatedByFilter = {
  relatedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
};

export type ApiRelatedDefects = {
  __typename?: 'RelatedDefects';
  aggregatingDefects: ApiDefect[];
  directDefects: ApiDefect[];
  impactingDefects: ApiDefect[];
};

export type ApiRelatedEntityCount = ApiNode & {
  __typename?: 'RelatedEntityCount';
  entity: ApiEntity;
  id: Scalars['String']['output'];
  relatedCounts: ApiEntityRelationCount[];
};

export type ApiRelatedEntityCountConnection = ApiConnection & {
  __typename?: 'RelatedEntityCountConnection';
  edges: ApiRelatedEntityCountEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiRelatedEntityCountEdge = ApiEdge & {
  __typename?: 'RelatedEntityCountEdge';
  cursor: Scalars['String']['output'];
  node: ApiRelatedEntityCount;
};

export type ApiRelationDef = {
  __typename?: 'RelationDef';
  name: Scalars['String']['output'];
};

export type ApiRemediationOption = {
  __typename?: 'RemediationOption';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ApiResolvedThresholdConfiguration = {
  __typename?: 'ResolvedThresholdConfiguration';
  appliedAt: Scalars['Time']['output'];
  entityId: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  source: ApiConfigurationSource;
  thresholds: Scalars['JSON']['output'];
};

export type ApiResourceData = {
  name: Scalars['String']['output'];
};

export type ApiResourceDef = {
  __typename?: 'ResourceDef';
  attributes: ApiAttributeDef[];
  defects: ApiDefectDef[];
  name: Scalars['String']['output'];
  symptoms: ApiSymptomDef[];
  type: Scalars['String']['output'];
};

export type ApiResourceMetricsSummary = {
  __typename?: 'ResourceMetricsSummary';
  avgCPUUtilization: Scalars['Float']['output'];
  avgMemoryUtilization: Scalars['Float']['output'];
  calculatedMetrics?: Maybe<ApiCalculatedMetric[]>;
  entityCount: Scalars['Int']['output'];
  maxCPUUtilization: Scalars['Float']['output'];
  maxMemoryUtilization: Scalars['Float']['output'];
  snapshotId: Scalars['String']['output'];
};

export type ApiResourceSummary = {
  __typename?: 'ResourceSummary';
  after?: Maybe<ApiResourceMetricsSummary>;
  before?: Maybe<ApiResourceMetricsSummary>;
  changes: ApiMetricChange[];
  entityCountChange: Scalars['Int']['output'];
};

export type ApiSlo = {
  __typename?: 'SLO';
  active: Scalars['Boolean']['output'];
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  fromTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ApiSamplePair = {
  __typename?: 'SamplePair';
  timestamp: Scalars['Time']['output'];
  value: Scalars['Float']['output'];
};

export type ApiScope = {
  __typename?: 'Scope';
  typeName: Scalars['String']['output'];
  typeValues: Array<Scalars['String']['output']>;
};

export type ApiScopeInput = {
  exclude?: InputMaybe<Scalars['Boolean']['input']>;
  nameExpr?: InputMaybe<Scalars['String']['input']>;
  typeName: Scalars['String']['input'];
  typeValues: Array<Scalars['String']['input']>;
};

export type ApiScopesFilter = {
  __typename?: 'ScopesFilter';
  scopes: ApiScope[];
};

export type ApiScopesFilterInput = {
  scopes: ApiScopeInput[];
};

export type ApiScraperSource = ApiNode & {
  __typename?: 'ScraperSource';
  clusterId: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  healthMetrics?: Maybe<ApiHealthMetrics>;
  id: Scalars['String']['output'];
  lastError?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nonSecretFields: Scalars['JSON']['output'];
  scraperType: ApiScraperType;
  status: ApiScraperSourceStatus;
  updatedAt: Scalars['Time']['output'];
};

export type ApiScraperSourceCreateOrUpdateInput = {
  fieldInputs: ApiSourceFieldInput[];
  name: Scalars['String']['input'];
  scraperType: ApiScraperType;
  targetClusterIds: Array<Scalars['String']['input']>;
};

export type ApiScraperSourceCreateOrUpdateResponse = {
  __typename?: 'ScraperSourceCreateOrUpdateResponse';
  errors: ApiScraperSourceError[];
  results: ApiScraperSource[];
  success: Scalars['Boolean']['output'];
};

export type ApiScraperSourceDefinition = {
  __typename?: 'ScraperSourceDefinition';
  fields: ApiScraperSourceField[];
  scraperType: ApiScraperType;
};

export type ApiScraperSourceError = {
  __typename?: 'ScraperSourceError';
  clusterId: Scalars['String']['output'];
  error: Scalars['String']['output'];
};

export type ApiScraperSourceField = {
  __typename?: 'ScraperSourceField';
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export enum ApiScraperSourceStatus {
  Active = 'ACTIVE',
  Error = 'ERROR',
  Pending = 'PENDING'
}

export enum ApiScraperType {
  Aws = 'AWS',
  AlertManager = 'AlertManager',
  Azure = 'Azure',
  AzureEventHub = 'AzureEventHub',
  AzureMysql = 'AzureMysql',
  AzurePostgres = 'AzurePostgres',
  AzureRedis = 'AzureRedis',
  Beyla = 'Beyla',
  CauselyServices = 'CauselyServices',
  Checkly = 'Checkly',
  Confluent = 'Confluent',
  Consul = 'Consul',
  ContainerLogs = 'ContainerLogs',
  Datadog = 'Datadog',
  DatadogApm = 'DatadogAPM',
  DiskIoSaturation = 'DiskIOSaturation',
  Docker = 'Docker',
  Dynatrace = 'Dynatrace',
  ElasticSearch = 'ElasticSearch',
  Gcp = 'GCP',
  Gadget = 'Gadget',
  GadgetDns = 'GadgetDNS',
  GroundCover = 'GroundCover',
  Host = 'Host',
  Incident = 'Incident',
  Instana = 'Instana',
  Istio = 'Istio',
  IstioSidecar = 'IstioSidecar',
  IstioVirtualService = 'IstioVirtualService',
  Kubelet = 'Kubelet',
  Kubernetes = 'Kubernetes',
  MySql = 'MySQL',
  Nobl9 = 'Nobl9',
  Nomad = 'Nomad',
  Odigos = 'Odigos',
  OpenTelemetry = 'OpenTelemetry',
  OpenTelemetryMetrics = 'OpenTelemetryMetrics',
  Postgresql = 'Postgresql',
  Prometheus = 'Prometheus',
  Snowflake = 'Snowflake',
  Topology = 'Topology'
}

export type ApiServiceConfigurationStatus = {
  __typename?: 'ServiceConfigurationStatus';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  scrapers: ApiServiceScraperStatus[];
  typeName: Scalars['String']['output'];
};

export type ApiServiceMetricsSummary = ApiMetricsSummary & {
  __typename?: 'ServiceMetricsSummary';
  calculatedMetrics?: Maybe<ApiCalculatedMetric[]>;
  entityCount: Scalars['Int']['output'];
  networkReceiveThroughput: Scalars['Float']['output'];
  networkTransmitThroughput: Scalars['Float']['output'];
  requestDuration: Scalars['Float']['output'];
  requestErrorRate: Scalars['Float']['output'];
  requestRate: Scalars['Float']['output'];
  requestsTotal: Scalars['Float']['output'];
  snapshotId: Scalars['String']['output'];
};

export type ApiServiceScraperStatus = {
  __typename?: 'ServiceScraperStatus';
  enabled: Scalars['Boolean']['output'];
  scraper: ApiScraperType;
  suggested: Scalars['Boolean']['output'];
};

export type ApiServiceSummary = {
  __typename?: 'ServiceSummary';
  after?: Maybe<ApiServiceMetricsSummary>;
  before?: Maybe<ApiServiceMetricsSummary>;
  changes: ApiMetricChange[];
  entityCountChange: Scalars['Int']['output'];
};

export type ApiSloConnection = ApiConnection & {
  __typename?: 'SloConnection';
  edges: ApiSloEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiSloCount = {
  __typename?: 'SloCount';
  count: Scalars['Int']['output'];
  entityType: Scalars['String']['output'];
  severity?: Maybe<Scalars['String']['output']>;
};

export type ApiSloDataQuery = {
  end?: InputMaybe<Scalars['Time']['input']>;
  queries?: InputMaybe<ApiSloQuery[]>;
  start?: InputMaybe<Scalars['Time']['input']>;
  stepMinutes?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiSloEdge = ApiEdge & {
  __typename?: 'SloEdge';
  cursor: Scalars['String']['output'];
  node: ApiSloNode;
};

export type ApiSloFilter = {
  entityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  metricQuery?: InputMaybe<ApiSloDataQuery>;
  nameExpr?: InputMaybe<Scalars['String']['input']>;
  relatedByFilter?: InputMaybe<ApiRelatedByFilter>;
  states?: InputMaybe<ApiSloState[]>;
};

export type ApiSloNode = ApiNode & {
  __typename?: 'SloNode';
  entity: ApiEntity;
  id: Scalars['String']['output'];
  metrics?: Maybe<ApiEntityData>;
  relatedEntity?: Maybe<ApiEntity>;
  state?: Maybe<ApiSloState>;
};

export type ApiSloQuery = {
  attributes?: InputMaybe<Array<Scalars['String']['input']>>;
  indicators?: InputMaybe<Array<Scalars['String']['input']>>;
  resources?: InputMaybe<Array<Scalars['String']['input']>>;
  sloType: Scalars['String']['input'];
};

export enum ApiSloState {
  AtRisk = 'AT_RISK',
  Normal = 'NORMAL',
  Violated = 'VIOLATED'
}

export type ApiSnapshot = ApiNode & {
  __typename?: 'Snapshot';
  createdAt: Scalars['Time']['output'];
  description: Scalars['String']['output'];
  endTime: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  startTime: Scalars['Time']['output'];
  status: ApiSnapshotStatus;
  tags?: Maybe<ApiTagEntry[]>;
};

export type ApiSnapshotComparisonResult = {
  __typename?: 'SnapshotComparisonResult';
  comparisonDiffs: ApiComparisonDiff[];
  comparisonMetadata: ApiComparisonMetadata;
};

export type ApiSnapshotConnection = ApiConnection & {
  __typename?: 'SnapshotConnection';
  edges: ApiSnapshotEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiSnapshotDefect = ApiNode & {
  __typename?: 'SnapshotDefect';
  active: Scalars['Boolean']['output'];
  entityId: Scalars['String']['output'];
  entityName?: Maybe<Scalars['String']['output']>;
  entityType: Scalars['String']['output'];
  fromTime: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  severity: ApiDefectSeverity;
  snapshotId: Scalars['String']['output'];
  toTime?: Maybe<Scalars['Time']['output']>;
};

export type ApiSnapshotEdge = ApiEdge & {
  __typename?: 'SnapshotEdge';
  cursor: Scalars['String']['output'];
  node: ApiSnapshot;
};

export type ApiSnapshotFilterInput = {
  descriptionSearch?: InputMaybe<Scalars['String']['input']>;
  nameSearch?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<ApiTagEntryInput[]>;
  timeRange?: InputMaybe<ApiTimeFilter>;
};

export type ApiSnapshotInfo = {
  __typename?: 'SnapshotInfo';
  description: Scalars['String']['output'];
  endTime: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  startTime: Scalars['Time']['output'];
  version: Scalars['String']['output'];
};

export type ApiSnapshotOptionsInput = {
  description: Scalars['String']['input'];
  endTime?: InputMaybe<Scalars['Time']['input']>;
  name: Scalars['String']['input'];
  startTime?: InputMaybe<Scalars['Time']['input']>;
  tags?: InputMaybe<Array<InputMaybe<ApiTagEntryInput>>>;
};

export enum ApiSnapshotStatus {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

/** Specifies the ordering of a field when sorting results */
export enum ApiSortingOrder {
  /** Sort in ascending order, eg 1, 2, 3. */
  Asc = 'ASC',
  /** Sort in descending order, eg 3, 2, 1. */
  Desc = 'DESC'
}

export type ApiSourceFieldInput = {
  boolValue?: InputMaybe<Scalars['Boolean']['input']>;
  intValue?: InputMaybe<Scalars['Int']['input']>;
  labelFiltersValue?: InputMaybe<ApiLabelFilterInput[]>;
  name: Scalars['String']['input'];
  stringListValue?: InputMaybe<Array<Scalars['String']['input']>>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type ApiStringAttribute = ApiAttribute & {
  __typename?: 'StringAttribute';
  attrType: ApiAttributeType;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ApiStringValue = {
  __typename?: 'StringValue';
  stringValue: Scalars['String']['output'];
};

export type ApiSummary = {
  __typename?: 'Summary';
  category: ApiSummaryCategory;
  groupSummary: ApiGroupSummary[];
};

export enum ApiSummaryCategory {
  BusinessImpacts = 'BUSINESS_IMPACTS',
  RootCauses = 'ROOT_CAUSES'
}

export type ApiSummaryContent = {
  __typename?: 'SummaryContent';
  content?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<ApiSummaryContentType>;
  summaryData?: Maybe<ApiSummary[]>;
};

export enum ApiSummaryContentType {
  Html = 'HTML'
}

export type ApiSummaryData = {
  __typename?: 'SummaryData';
  nodeType: Scalars['String']['output'];
  nodes?: Maybe<ApiSummaryNode[]>;
  subCategory?: Maybe<ApiSummarySubCategory>;
};

export type ApiSummaryNode = {
  __typename?: 'SummaryNode';
  defect?: Maybe<ApiDefect>;
  defectMeta?: Maybe<ApiSummaryNodeDefectMeta>;
  entity?: Maybe<ApiEntity>;
  nodeLink?: Maybe<Scalars['String']['output']>;
};

export type ApiSummaryNodeDefectMeta = {
  __typename?: 'SummaryNodeDefectMeta';
  durationTimeSeconds?: Maybe<Scalars['Int']['output']>;
  recurrenceCount?: Maybe<Scalars['Int']['output']>;
  serviceImpactCount?: Maybe<Scalars['Int']['output']>;
  sloImpactCount?: Maybe<Scalars['Int']['output']>;
  symptomCount?: Maybe<Scalars['Int']['output']>;
};

export type ApiSummaryOptions = {
  groupBy?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
  timeFilter?: InputMaybe<ApiTimeFilter>;
};

export enum ApiSummarySubCategory {
  LgExplainedClosure = 'LG_EXPLAINED_CLOSURE',
  Persistent = 'PERSISTENT',
  SlosAffected = 'SLOS_AFFECTED'
}

export type ApiSymptom = {
  __typename?: 'Symptom';
  active: Scalars['Boolean']['output'];
  activeDefects?: Maybe<ApiDefect[]>;
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  fromTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isPropagated: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  state: ApiManifestationState;
  toTime: Scalars['String']['output'];
};

export type ApiSymptomDef = {
  __typename?: 'SymptomDef';
  contextAttributes?: Maybe<Array<Scalars['String']['output']>>;
  displayName: Scalars['String']['output'];
  entityType: ApiEntityTypeDef;
  entityTypeName: Scalars['String']['output'];
  impacts: ApiSlo[];
  name: Scalars['String']['output'];
};

export type ApiTableAttribute = ApiAttribute & {
  __typename?: 'TableAttribute';
  attrType: ApiAttributeType;
  columns: ApiTableColumn[];
  name: Scalars['String']['output'];
  rows: ApiTableRow[];
  unit: Scalars['String']['output'];
};

export type ApiTableCell = {
  __typename?: 'TableCell';
  boolValue?: Maybe<Scalars['Boolean']['output']>;
  floatValue?: Maybe<Scalars['Float']['output']>;
  intValue?: Maybe<Scalars['Int']['output']>;
  stringValue?: Maybe<Scalars['String']['output']>;
};

export type ApiTableColumn = {
  __typename?: 'TableColumn';
  columnType: ApiAttributeType;
  contentType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
};

export type ApiTableRow = {
  __typename?: 'TableRow';
  values: ApiTableCell[];
};

export type ApiTagEntry = {
  __typename?: 'TagEntry';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ApiTagEntryInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ApiThresholdConfiguration = ApiNode & {
  __typename?: 'ThresholdConfiguration';
  createdAt: Scalars['Time']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['String']['output'];
  labelSelector?: Maybe<Scalars['JSON']['output']>;
  minLatencyThresholdMs?: Maybe<Scalars['Float']['output']>;
  minThresholds?: Maybe<Scalars['JSON']['output']>;
  scope: ApiConfigurationScope;
  targetEntityId?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['String']['output'];
  thresholds: Scalars['JSON']['output'];
  updatedAt: Scalars['Time']['output'];
  updatedBy: Scalars['String']['output'];
};

export type ApiThresholdConfigurationFilter = {
  scope?: InputMaybe<ApiConfigurationScope>;
  targetEntityId?: InputMaybe<Scalars['String']['input']>;
};

export type ApiThresholdIndicatorData = ApiIndicatorData & {
  __typename?: 'ThresholdIndicatorData';
  name: Scalars['String']['output'];
  relatedAttributes?: Maybe<ApiMetricAttribute[]>;
  threshold?: Maybe<ApiMetricAttribute>;
  value?: Maybe<ApiMetricAttribute>;
  window: Scalars['Int']['output'];
};

export type ApiThresholdMetricDefinition = {
  __typename?: 'ThresholdMetricDefinition';
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  entityTypes: Array<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  maxValue?: Maybe<Scalars['Float']['output']>;
  minValue?: Maybe<Scalars['Float']['output']>;
  supportMLLearned: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  upperThresholdAttribute?: Maybe<Scalars['String']['output']>;
};

export enum ApiThresholdMetricKey {
  ErrorRate = 'ERROR_RATE',
  LatencyMs = 'LATENCY_MS'
}

export type ApiTicket = {
  __typename?: 'Ticket';
  createdAt: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  integrationType: ApiIntegrationType;
  url: Scalars['String']['output'];
};

export enum ApiTicketObjectType {
  Defect = 'DEFECT',
  SuggestedImprovement = 'SUGGESTED_IMPROVEMENT'
}

export type ApiTimeFilter = {
  end?: InputMaybe<Scalars['Time']['input']>;
  start?: InputMaybe<Scalars['Time']['input']>;
};

export type ApiTopologyEdge = {
  __typename?: 'TopologyEdge';
  edgeType: Scalars['String']['output'];
  fromEntity: ApiEntity;
  toEntity: ApiEntity;
};

export enum ApiTopologyGraphType {
  DataflowGraph = 'DataflowGraph',
  KubernetesGraph = 'KubernetesGraph',
  ServiceAccessGraph = 'ServiceAccessGraph'
}

export type ApiTrace = {
  __typename?: 'Trace';
  id: Scalars['String']['output'];
  spans?: Maybe<ApiTraceSpan[]>;
};

export type ApiTraceEvent = {
  __typename?: 'TraceEvent';
  attributes?: Maybe<ApiTraceKeyValue[]>;
  name: Scalars['String']['output'];
  timeUnixNano: Scalars['Int']['output'];
};

export type ApiTraceKeyValue = {
  __typename?: 'TraceKeyValue';
  key: Scalars['String']['output'];
  value?: Maybe<ApiAnyValue>;
};

export type ApiTraceSpan = {
  __typename?: 'TraceSpan';
  attributes?: Maybe<ApiTraceKeyValue[]>;
  endTimeUnixNano: Scalars['Int']['output'];
  events?: Maybe<ApiTraceEvent[]>;
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentSpanId: Scalars['String']['output'];
  spanId: Scalars['String']['output'];
  startTimeUnixNano: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  traceId: Scalars['String']['output'];
  traceState: Scalars['String']['output'];
};

export type ApiUseResourceData = ApiResourceData & {
  __typename?: 'USEResourceData';
  errors: ApiIndicatorData;
  name: Scalars['String']['output'];
  saturation: ApiIndicatorData;
  utilization: ApiIndicatorData;
};

export type ApiUpdateProductInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  ownerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  serviceEntityIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApiUpdateThresholdConfigurationInput = {
  minLatencyThresholdMs?: InputMaybe<Scalars['Float']['input']>;
  minThresholds?: InputMaybe<Scalars['JSON']['input']>;
  thresholds?: InputMaybe<Scalars['JSON']['input']>;
};

export type ApiUser = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profilePictureUrl?: Maybe<Scalars['String']['output']>;
};

export type ApiUserFilter = {
  emailExpr?: InputMaybe<Scalars['String']['input']>;
  nameExpr?: InputMaybe<Scalars['String']['input']>;
};

export type ApiUserScope = ApiNode & {
  __typename?: 'UserScope';
  audience: ApiUserScopeAudience;
  id: Scalars['String']['output'];
  lastUpdate: Scalars['Time']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  scopes: ApiScope[];
};

export enum ApiUserScopeAudience {
  Global = 'GLOBAL',
  User = 'USER'
}

export type ApiUserScopeConnection = ApiConnection & {
  __typename?: 'UserScopeConnection';
  edges: ApiUserScopeEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiUserScopeEdge = ApiEdge & {
  __typename?: 'UserScopeEdge';
  cursor: Scalars['String']['output'];
  node: ApiUserScope;
};

export type ApiUserScopeEntityCount = ApiNode & {
  __typename?: 'UserScopeEntityCount';
  entityTypeCount: ApiEntityTypeCount[];
  id: Scalars['String']['output'];
  userScope: ApiUserScope;
};

export type ApiUserScopeEntityCountConnection = ApiConnection & {
  __typename?: 'UserScopeEntityCountConnection';
  edges: ApiUserScopeEntityCountEdge[];
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiUserScopeEntityCountEdge = ApiEdge & {
  __typename?: 'UserScopeEntityCountEdge';
  cursor: Scalars['String']['output'];
  node: ApiUserScopeEntityCount;
};

export type ApiUserScopeFilter = {
  audiences?: InputMaybe<ApiUserScopeAudience[]>;
  nameExpr?: InputMaybe<Scalars['String']['input']>;
};

export type ApiUserSetting = {
  __typename?: 'UserSetting';
  name: Scalars['String']['output'];
  tenantId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ApiUserSettingInput = {
  name: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ApiUserSettings = {
  __typename?: 'UserSettings';
  id: Scalars['String']['output'];
  settings: ApiUserSetting[];
};

export type ApiUserSettingsFilter = {
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ApiUserSettingsInput = {
  id: Scalars['String']['input'];
  settings: ApiUserSettingInput[];
};

export type ApiUtilizationIndicatorData = ApiIndicatorData & {
  __typename?: 'UtilizationIndicatorData';
  capacity?: Maybe<ApiMetricAttribute>;
  name: Scalars['String']['output'];
  relatedAttributes?: Maybe<ApiMetricAttribute[]>;
  threshold?: Maybe<ApiMetricAttribute>;
  usage?: Maybe<ApiMetricAttribute>;
  utilization?: Maybe<ApiMetricAttribute>;
  window: Scalars['Int']['output'];
};

export type ApiVersionInfo = {
  __typename?: 'VersionInfo';
  mediationVersion: Scalars['String']['output'];
};

export type ApiWorkloadCount = {
  __typename?: 'WorkloadCount';
  count: Scalars['Int']['output'];
  entityType?: Maybe<Scalars['String']['output']>;
  time: Scalars['String']['output'];
};


// -------------------------------------------------------------------
// -------------------------- Overrides ------------------------------
// -------------------------------------------------------------------
// @overrideType
export type ApiAttribute = {
  attrType: ApiAttributeType;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  __typename:
  | 'MetricAttribute'
  | 'FloatAttribute'
  | 'StringAttribute'
  | 'BooleanAttribute'
  | 'IntAttribute'
  | 'HistogramAttribute'
  | 'TableAttribute';
  metricValue?: ApiMetric;
  intValue?: Scalars['Int']['output'];
  floatValue?: Scalars['Float']['output'];
  stringValue?: Scalars['String']['output'];
  booleanValue?: Scalars['Boolean']['output'];
  histogramSum?: ApiMetric;
  histogramCount?: ApiMetric;
  histogramBuckets?: ApiBucket[];
  columns?: ApiTableColumn[];
  rows?: ApiTableRow[];
};

// @overrideType
export type ApiIndicator = {
  __typename:
  | 'MetricAttribute'
  | 'FloatAttribute'
  | 'StringAttribute'
  | 'BooleanAttribute'
  | 'IntAttribute'
  | 'HistogramAttribute'
  | 'TableAttribute';
  metricValue?: ApiMetric;
  intValue?: Scalars['Int']['output'];
  floatValue?: Scalars['Float']['output'];
  stringValue?: Scalars['String']['output'];
  booleanValue?: Scalars['Boolean']['output'];
  histogramSum?: ApiMetric;
  histogramCount?: ApiMetric;
  histogramBuckets?: ApiBucket[];
  columns?: ApiTableColumn[];
  rows?: ApiTableRow[];
};