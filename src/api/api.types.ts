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
  changedResources: Array<ApiConstraintResource>;
  entity: ApiEntity;
  relatedResources: Array<ApiConstraintResource>;
};

export type ApiAdgNode = {
  __typename?: 'ADGNode';
  node?: Maybe<ApiConstraintResource>;
  relatedResources: Array<ApiConstraintResource>;
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
  configuredScrapers?: Maybe<Array<ApiAgentConfiguredScraper>>;
  discoveredScrapers?: Maybe<Array<ApiAgentDiscoveredScraper>>;
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

export type ApiAnyValue = ApiArrayValue | ApiBoolValue | ApiBytesValue | ApiDoubleValue | ApiIntValue | ApiKeyValueList | ApiStringValue;

export type ApiArrayValue = {
  __typename?: 'ArrayValue';
  values: Array<ApiAnyValue>;
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
  entities: Array<ApiEntityAttributeQuery>;
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

export type ApiCausalityEdge = ApiNode & {
  __typename?: 'CausalityEdge';
  fromCausality: ApiCausalityNode;
  id: Scalars['String']['output'];
  probability: Scalars['Float']['output'];
  toCausality: ApiCausalityNode;
};

export type ApiCausalityEdgeConnection = ApiConnection & {
  __typename?: 'CausalityEdgeConnection';
  edges: Array<ApiCausalityEdgeEdge>;
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

export type ApiConnection = {
  edges: Array<ApiEdge>;
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export enum ApiConstraintAnalysisChangeType {
  CurrentLoad = 'CURRENT_LOAD',
  LoadChange = 'LOAD_CHANGE'
}

export type ApiConstraintAnalysisConnection = ApiConnection & {
  __typename?: 'ConstraintAnalysisConnection';
  edges: Array<ApiConstraintAnalysisEdge>;
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
  types?: InputMaybe<Array<ApiConstraintAnalysisChangeType>>;
};

export type ApiConstraintAnalysisInput = {
  loadChange?: InputMaybe<ApiLoadChangesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  type: ApiConstraintAnalysisChangeType;
};

export type ApiConstraintAnalysisResult = {
  __typename?: 'ConstraintAnalysisResult';
  adgEdges: Array<ApiAdgEdge>;
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
  relatedAttributes?: Maybe<Array<ApiMetricAttribute>>;
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
  context?: Maybe<Array<ApiCopilotScopeContext>>;
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
  context?: InputMaybe<Array<ApiCopilotScopeContextInput>>;
  relatedEntityId?: InputMaybe<Scalars['String']['input']>;
};

export type ApiCopilotThread = {
  __typename?: 'CopilotThread';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  queries?: Maybe<Array<ApiCopilotQueryResponse>>;
  scope: ApiCopilotScope;
};

export type ApiDefect = ApiNode & {
  __typename?: 'Defect';
  SLOAtRiskCount: Scalars['Int']['output'];
  SLOTTL: Scalars['Int']['output'];
  activeCount: Scalars['Int']['output'];
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  events: Array<ApiEvent>;
  fromTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  impacts: Array<ApiSymptom>;
  likelihood: Scalars['Float']['output'];
  missingCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  relatedOccurrrences: Array<ApiDefect>;
  remediated: Scalars['Boolean']['output'];
  serviceCount: Scalars['Int']['output'];
  severity: ApiDefectSeverity;
  slos: Array<ApiSloNode>;
  symptoms: Array<ApiSymptom>;
  toTime: Scalars['String']['output'];
};

export type ApiDefectConnection = ApiConnection & {
  __typename?: 'DefectConnection';
  edges: Array<ApiDefectEdge>;
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
  events: Array<ApiEventDef>;
  name: Scalars['String']['output'];
  symptoms: Array<ApiSymptomDef>;
};

export type ApiDefectDescription = {
  __typename?: 'DefectDescription';
  details?: Maybe<Scalars['String']['output']>;
  remediationOptions: Array<ApiRemediationOption>;
  summary: Scalars['String']['output'];
};

export type ApiDefectEdge = ApiEdge & {
  __typename?: 'DefectEdge';
  cursor: Scalars['String']['output'];
  node: ApiDefect;
};

export type ApiDefectEvidence = {
  __typename?: 'DefectEvidence';
  events?: Maybe<Array<ApiDefectEvidenceEvent>>;
  exceptions?: Maybe<Array<ApiDefectEvidenceException>>;
  logs?: Maybe<Array<ApiEntityLogLine>>;
  remediation: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  symptoms?: Maybe<Array<ApiDefectEvidenceSymptom>>;
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

export type ApiDefectEvidenceSymptom = {
  __typename?: 'DefectEvidenceSymptom';
  displayName: Scalars['String']['output'];
  entity: ApiEntityReference;
  fromTime: Scalars['Time']['output'];
  id: Scalars['String']['output'];
  indicator?: Maybe<ApiIndicatorData>;
  name: Scalars['String']['output'];
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
  includeNonSvcImpact?: InputMaybe<Scalars['Boolean']['input']>;
  minSymptomCount?: InputMaybe<Scalars['Int']['input']>;
  scopesFilter?: InputMaybe<ApiScopesFilterInput>;
  severities?: InputMaybe<Array<ApiDefectSeverity>>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
  state?: InputMaybe<ApiDefectState>;
};

export enum ApiDefectSeverity {
  Critical = 'Critical',
  High = 'High',
  Low = 'Low',
  Medium = 'Medium'
}

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

export type ApiDoubleValue = {
  __typename?: 'DoubleValue';
  doubleValue: Scalars['Float']['output'];
};

export type ApiDurationIndicatorData = ApiIndicatorData & {
  __typename?: 'DurationIndicatorData';
  le: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  quantile: Scalars['Float']['output'];
  relatedAttributes?: Maybe<Array<ApiMetricAttribute>>;
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
  defects: Array<Maybe<ApiDefect>>;
  events: Array<ApiEvent>;
  id: Scalars['String']['output'];
  labels: Array<ApiLabel>;
  name: Scalars['String']['output'];
  severity: Scalars['String']['output'];
  slos: Array<ApiSlo>;
  symptoms: Array<ApiSymptom>;
  typeName: Scalars['String']['output'];
};

export type ApiEntityAttributeQuery = {
  attributes: Array<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type ApiEntityAttributeQueryResult = {
  __typename?: 'EntityAttributeQueryResult';
  attributes: Array<ApiAttribute>;
  id: Scalars['String']['output'];
};

export type ApiEntityConnection = ApiConnection & {
  __typename?: 'EntityConnection';
  edges: Array<ApiEntityEdge>;
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiEntityData = {
  __typename?: 'EntityData';
  attributes: Array<ApiAttribute>;
  id: Scalars['String']['output'];
  indicators: Array<ApiIndicatorData>;
  resources: Array<ApiResourceData>;
};

export type ApiEntityDataQuery = {
  attributes?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  indicators?: InputMaybe<Array<Scalars['String']['input']>>;
  resources?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApiEntityDataQueryResult = {
  __typename?: 'EntityDataQueryResult';
  entities: Array<ApiEntityData>;
};

export type ApiEntityEdge = ApiEdge & {
  __typename?: 'EntityEdge';
  cursor: Scalars['String']['output'];
  node: ApiEntity;
};

export type ApiEntityFilter = {
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
  entities: Array<ApiEntityDataQuery>;
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
  entities: Array<ApiEntity>;
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
  attributes: Array<ApiAttributeDef>;
  contextAttributes?: Maybe<Array<Scalars['String']['output']>>;
  defects: Array<ApiDefectDef>;
  events: Array<ApiEventDef>;
  indicators: Array<ApiIndicatorDef>;
  name: Scalars['String']['output'];
  relations: Array<ApiRelationDef>;
  resources: Array<ApiResourceDef>;
  symptoms: Array<ApiSymptomDef>;
};

export type ApiEntityTypeDefFilter = {
  EntityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  includeDerivedTypes?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApiEvent = {
  __typename?: 'Event';
  active: Scalars['Boolean']['output'];
  activeDefects?: Maybe<Array<ApiDefect>>;
  entity: ApiEntity;
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  time: Scalars['String']['output'];
};

export type ApiEventDef = {
  __typename?: 'EventDef';
  entityType: ApiEntityTypeDef;
  entityTypeName: Scalars['String']['output'];
  impacts: Array<ApiSlo>;
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

export type ApiGroupSummary = {
  __typename?: 'GroupSummary';
  groupBy: Scalars['String']['output'];
  groupName: Scalars['String']['output'];
  summaryData: Array<ApiSummaryData>;
};

export type ApiHeadlineContext = {
  __typename?: 'HeadlineContext';
  active: Scalars['Boolean']['output'];
  durationMinutes: Scalars['Int']['output'];
  errorRateImpacted: Scalars['Boolean']['output'];
  latencyImpacted: Scalars['Boolean']['output'];
  recurrenceCount: Scalars['Int']['output'];
  renderedText: Scalars['String']['output'];
  rules: Array<ApiHeadlineRule>;
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
  rules: Array<ApiHeadlineRule>;
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
  priority?: InputMaybe<Array<ApiHeadlineSortField>>;
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
  headlineItems: Array<ApiHeadlineItem>;
  rules: ApiHeadlineRules;
};

export type ApiHistogramAttribute = ApiAttribute & {
  __typename?: 'HistogramAttribute';
  attrType: ApiAttributeType;
  buckets: Array<ApiBucket>;
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
  attributes: Array<ApiAttributeDef>;
  contextAttributes?: Maybe<Array<Scalars['String']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  symptoms: Array<ApiSymptomDef>;
  type: Scalars['String']['output'];
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
};

export type ApiKeyValueList = {
  __typename?: 'KeyValueList';
  values: Array<ApiTraceKeyValue>;
};

export type ApiLabel = {
  __typename?: 'Label';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ApiLoadChangesEntityInput = {
  absoluteValue?: InputMaybe<Scalars['Float']['input']>;
  changePercent?: InputMaybe<Scalars['Float']['input']>;
  entityId: Scalars['String']['input'];
  resourceName: Scalars['String']['input'];
};

export type ApiLoadChangesInput = {
  entities: Array<ApiLoadChangesEntityInput>;
};

export type ApiLoadChangesResult = {
  __typename?: 'LoadChangesResult';
  resourceSummary: Array<ApiConstraintResourceSummary>;
  resources: Array<ApiConstraintResource>;
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
  edges: Array<ApiManifestationEdge>;
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
  manifestationTypes?: InputMaybe<Array<ApiManifestationType>>;
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
  values: Array<ApiSamplePair>;
};

export type ApiMetricAttribute = ApiAttribute & {
  __typename?: 'MetricAttribute';
  attrType: ApiAttributeType;
  name: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  value: ApiMetric;
};

export type ApiMutateUserScopeInput = {
  audience: ApiUserScopeAudience;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  scopes: Array<ApiScopeInput>;
};

export type ApiMutation = {
  __typename?: 'Mutation';
  constraintAnalysis: Scalars['String']['output'];
  createFeedback?: Maybe<Scalars['String']['output']>;
  createUserScope: ApiUserScope;
  deleteConstraintAnalysis: Scalars['String']['output'];
  deleteUserScope: Scalars['Boolean']['output'];
  deleteUserSetting: ApiUserSettings;
  executeAction: Scalars['Boolean']['output'];
  queryCopilotThread: ApiCopilotQueryResponse;
  startCopilotThread: ApiCopilotThread;
  updateUserScope: ApiUserScope;
  updateUserSetting: ApiUserSettings;
  userSettings: ApiUserSettings;
};


export type ApiMutationConstraintAnalysisArgs = {
  input?: InputMaybe<ApiConstraintAnalysisInput>;
};


export type ApiMutationCreateFeedbackArgs = {
  feedback: ApiFeedback;
};


export type ApiMutationCreateUserScopeArgs = {
  scope: ApiMutateUserScopeInput;
};


export type ApiMutationDeleteConstraintAnalysisArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteUserScopeArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationDeleteUserSettingArgs = {
  id: Scalars['String']['input'];
  settings: Array<InputMaybe<ApiUserSettingInput>>;
};


export type ApiMutationExecuteActionArgs = {
  id: Scalars['String']['input'];
};


export type ApiMutationQueryCopilotThreadArgs = {
  query: Scalars['String']['input'];
  threadId: Scalars['String']['input'];
};


export type ApiMutationStartCopilotThreadArgs = {
  scope: ApiCopilotScopeInput;
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

export type ApiQuery = {
  __typename?: 'Query';
  action: ApiAction;
  actions: Array<ApiAction>;
  agentCounts?: Maybe<Array<ApiAgentCount>>;
  agents?: Maybe<Array<ApiAgent>>;
  causality: Array<Maybe<ApiCausalityEdge>>;
  codebookCausality: Array<Maybe<ApiCausalityEdge>>;
  codebookCausalityChain: ApiCausalityEdgeConnection;
  codebookDefects: Array<Maybe<ApiDefect>>;
  constraintAnalyses: ApiConstraintAnalysisConnection;
  constraintAnalysis: ApiConstraintAnalysisData;
  constraintAnalysisADG: Array<Maybe<ApiAdgEdge>>;
  constraintAnalysisGraph: Array<Maybe<ApiAdgGraphEdge>>;
  defect: ApiDefect;
  defectConnection: ApiDefectConnection;
  defectCounts: Array<ApiDefectCount>;
  defectEvidence?: Maybe<ApiDefectEvidence>;
  defectStats: Array<ApiDefectStat>;
  /** @deprecated This field is depreciated. Use new entityConnection field with pagination */
  entities: Array<Maybe<ApiEntity>>;
  entity?: Maybe<ApiEntity>;
  entityAttributes: Array<ApiEntityAttributeQueryResult>;
  entityConnection: ApiEntityConnection;
  entityData: ApiEntityDataQueryResult;
  entityLogs: ApiEntityLogsResult;
  entityRelatedDefects: Array<ApiEntityRelatedDefects>;
  entityTraces: ApiEntityTracesResult;
  entityTypeCounts?: Maybe<Array<ApiEntityTypeCount>>;
  entityTypeDef: ApiEntityTypeDef;
  entityTypeDefs: Array<ApiEntityTypeDef>;
  getCopilotQueryResponse: ApiCopilotQueryResponse;
  getCopilotThread: ApiCopilotThread;
  getCopilotThreads?: Maybe<Array<ApiCopilotThread>>;
  getUserScope?: Maybe<ApiUserScope>;
  getUserScopes: ApiUserScopeConnection;
  getUserScopesWithEntityCounts: ApiUserScopeEntityCountConnection;
  headlines: ApiHeadlines;
  isFeatureFlagEnabled: ApiFeatureFlagStatus;
  isIntegrationConnected: ApiIntegrationStatus;
  manifestationCounts: Array<ApiManifestationCount>;
  manifestations: ApiManifestationConnection;
  relatedDefects: ApiRelatedDefects;
  relatedEntities: Array<ApiEntityRelation>;
  relatedEntityCount: ApiRelatedEntityCountConnection;
  relatedSlos: Array<ApiSloNode>;
  scopes?: Maybe<ApiScopesFilter>;
  sloConnection: ApiSloConnection;
  sloHealth: Array<ApiSloHealth>;
  sloNode: ApiSloNode;
  sloTypes: Array<Scalars['String']['output']>;
  slos: Array<ApiSlo>;
  summarize: ApiSummaryContent;
  summary: Array<ApiSummary>;
  symptoms: Array<ApiSymptom>;
  topologyGraph: Array<Maybe<ApiTopologyEdge>>;
  userSettings: ApiUserSettings;
  version: ApiVersionInfo;
  whatIf: ApiConstraintAnalysisResult;
  workloadCounts: Array<ApiWorkloadCount>;
};


export type ApiQueryActionArgs = {
  actionId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryActionsArgs = {
  defectId?: InputMaybe<Scalars['String']['input']>;
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
  entityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  hasActiveManifestation?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ApiQueryEntityArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  entityId?: InputMaybe<Scalars['String']['input']>;
};


export type ApiQueryEntityAttributesArgs = {
  query: ApiAttributeQuery;
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


export type ApiQueryScopesArgs = {
  input?: InputMaybe<ApiScopesFilterInput>;
  typesList?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ApiQuerySloConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApiSloFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ApiQuerySloHealthArgs = {
  bucketSize?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['Time']['input']>;
  startTime?: InputMaybe<Scalars['Time']['input']>;
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
  graphType: Scalars['String']['input'];
};


export type ApiQueryUserSettingsArgs = {
  filter?: InputMaybe<ApiUserSettingsFilter>;
  id: Scalars['String']['input'];
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
  relatedAttributes?: Maybe<Array<ApiMetricAttribute>>;
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
  aggregatingDefects: Array<ApiDefect>;
  directDefects: Array<ApiDefect>;
  impactingDefects: Array<ApiDefect>;
};

export type ApiRelatedEntityCount = ApiNode & {
  __typename?: 'RelatedEntityCount';
  entity: ApiEntity;
  id: Scalars['String']['output'];
  relatedCounts: Array<ApiEntityRelationCount>;
};

export type ApiRelatedEntityCountConnection = ApiConnection & {
  __typename?: 'RelatedEntityCountConnection';
  edges: Array<ApiRelatedEntityCountEdge>;
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

export type ApiResourceData = {
  name: Scalars['String']['output'];
};

export type ApiResourceDef = {
  __typename?: 'ResourceDef';
  attributes: Array<ApiAttributeDef>;
  defects: Array<ApiDefectDef>;
  name: Scalars['String']['output'];
  symptoms: Array<ApiSymptomDef>;
  type: Scalars['String']['output'];
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

export type ApiSloHealth = {
  __typename?: 'SLOHealth';
  entityType?: Maybe<Scalars['String']['output']>;
  sloHealth: Scalars['Int']['output'];
  sloName?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
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
  scopes: Array<ApiScope>;
};

export type ApiScopesFilterInput = {
  scopes: Array<ApiScopeInput>;
};

export type ApiSloConnection = ApiConnection & {
  __typename?: 'SloConnection';
  edges: Array<ApiSloEdge>;
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
  queries?: InputMaybe<Array<ApiSloQuery>>;
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
  states?: InputMaybe<Array<ApiSloState>>;
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
  groupSummary: Array<ApiGroupSummary>;
};

export enum ApiSummaryCategory {
  BusinessImpacts = 'BUSINESS_IMPACTS',
  RootCauses = 'ROOT_CAUSES'
}

export type ApiSummaryContent = {
  __typename?: 'SummaryContent';
  content?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<ApiSummaryContentType>;
  summaryData?: Maybe<Array<ApiSummary>>;
};

export enum ApiSummaryContentType {
  Html = 'HTML'
}

export type ApiSummaryData = {
  __typename?: 'SummaryData';
  nodeType: Scalars['String']['output'];
  nodes?: Maybe<Array<ApiSummaryNode>>;
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
  activeDefects?: Maybe<Array<ApiDefect>>;
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
  impacts: Array<ApiSlo>;
  name: Scalars['String']['output'];
};

export type ApiTableAttribute = ApiAttribute & {
  __typename?: 'TableAttribute';
  attrType: ApiAttributeType;
  columns: Array<ApiTableColumn>;
  name: Scalars['String']['output'];
  rows: Array<ApiTableRow>;
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
  values: Array<ApiTableCell>;
};

export type ApiThresholdIndicatorData = ApiIndicatorData & {
  __typename?: 'ThresholdIndicatorData';
  name: Scalars['String']['output'];
  relatedAttributes?: Maybe<Array<ApiMetricAttribute>>;
  threshold?: Maybe<ApiMetricAttribute>;
  value?: Maybe<ApiMetricAttribute>;
  window: Scalars['Int']['output'];
};

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

export type ApiTrace = {
  __typename?: 'Trace';
  id: Scalars['String']['output'];
  spans?: Maybe<Array<ApiTraceSpan>>;
};

export type ApiTraceEvent = {
  __typename?: 'TraceEvent';
  attributes?: Maybe<Array<ApiTraceKeyValue>>;
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
  attributes?: Maybe<Array<ApiTraceKeyValue>>;
  endTimeUnixNano: Scalars['Int']['output'];
  events?: Maybe<Array<ApiTraceEvent>>;
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

export type ApiUserScope = ApiNode & {
  __typename?: 'UserScope';
  audience: ApiUserScopeAudience;
  id: Scalars['String']['output'];
  lastUpdate: Scalars['Time']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  scopes: Array<ApiScope>;
};

export enum ApiUserScopeAudience {
  Global = 'GLOBAL',
  User = 'USER'
}

export type ApiUserScopeConnection = ApiConnection & {
  __typename?: 'UserScopeConnection';
  edges: Array<ApiUserScopeEdge>;
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
  entityTypeCount: Array<ApiEntityTypeCount>;
  id: Scalars['String']['output'];
  userScope: ApiUserScope;
};

export type ApiUserScopeEntityCountConnection = ApiConnection & {
  __typename?: 'UserScopeEntityCountConnection';
  edges: Array<ApiUserScopeEntityCountEdge>;
  pageInfo?: Maybe<ApiPageInfo>;
  totalCount: Scalars['Int']['output'];
};

export type ApiUserScopeEntityCountEdge = ApiEdge & {
  __typename?: 'UserScopeEntityCountEdge';
  cursor: Scalars['String']['output'];
  node: ApiUserScopeEntityCount;
};

export type ApiUserScopeFilter = {
  audiences?: InputMaybe<Array<ApiUserScopeAudience>>;
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
  settings: Array<ApiUserSetting>;
};

export type ApiUserSettingsFilter = {
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ApiUserSettingsInput = {
  id: Scalars['String']['input'];
  settings: Array<ApiUserSettingInput>;
};

export type ApiUtilizationIndicatorData = ApiIndicatorData & {
  __typename?: 'UtilizationIndicatorData';
  capacity?: Maybe<ApiMetricAttribute>;
  name: Scalars['String']['output'];
  relatedAttributes?: Maybe<Array<ApiMetricAttribute>>;
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
  histogramBuckets?: Array<ApiBucket>;
  columns?: Array<ApiTableColumn>;
  rows?: Array<ApiTableRow>;
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
  histogramBuckets?: Array<ApiBucket>;
  columns?: Array<ApiTableColumn>;
  rows?: Array<ApiTableRow>;
};