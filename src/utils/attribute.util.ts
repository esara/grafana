
  import { ApiEntityDataQuery, ApiEntityQuery, ApiIndicator, ApiAttribute, ApiTableRow, ApiTableColumn, ApiAttributeType, ApiTableCell, ApiMetric } from 'api/api.types';
import { ArraysUtil } from 'utils/arrays/arrays.util';
  import { ObjectsUtil } from 'utils/objects/objects.util';
  import { StringsUtil } from 'utils/strings/strings.util';
  import { TimeUtil } from 'utils/time/time.util';
  
  export class AttributeUtil {
    private static readonly simpleAttributesSet = new Set([
      'BooleanAttribute',
      'StringAttribute',
      'FloatAttribute',
      'IntAttribute',
    ]);
  
    public static toAttributeQuery(
      startTime: string,
      entityIds: string[],
      attributeNames: string[],
      stepMinutes: number = null,
    ): {
      entities: Array<{ attributes: string[]; id: string }>;
      start: string;
      stepMinutes: number;
    } {
      if (ArraysUtil.isEmpty(entityIds) || ArraysUtil.isEmpty(attributeNames)) {
        throw Error('[toAttributeQuery] - entityIds and attributeNames is expected');
      }
  
      return {
        start: startTime,
        stepMinutes: stepMinutes ?? TimeUtil.getStepMinutes(TimeUtil.getTimeframeDifference(startTime)),
        entities: entityIds.map((entityId) => ({
          id: entityId,
          attributes: attributeNames,
        })),
      };
    }
  
    public static toEntityDataQuery(
      startTime: string,
      entityDataQueries: ApiEntityDataQuery[],
      stepMinutes: number = null,
    ): ApiEntityQuery {
      if (ArraysUtil.isEmpty(entityDataQueries)) {
        throw Error('[toEntityDataQuery] - entityDataQueries is expected');
      }
  
      return {
        start: startTime,
        stepMinutes: stepMinutes ?? TimeUtil.getStepMinutes(TimeUtil.getTimeframeDifference(startTime)),
        entities: [...entityDataQueries],
      };
    }
  
    public static toEntityIndicator(indicator: ApiIndicator): EntityDataIndicatorAttribute {
      if (ObjectsUtil.isUnset(indicator)) {
        return indicator;
      }
  
      switch (indicator.__typename) {
        case 'BooleanAttribute':
          return { ...indicator, value: indicator.booleanValue };
        case 'StringAttribute':
          return { ...indicator, value: indicator.stringValue };
        case 'FloatAttribute':
          return { ...indicator, value: indicator.floatValue };
        case 'IntAttribute':
          return { ...indicator, value: indicator.intValue };
        case 'MetricAttribute':
          return { ...indicator, value: indicator.metricValue };
        case 'HistogramAttribute':
          return indicator;
        case 'TableAttribute':
          return { ...indicator, value: AttributeUtil.toTableValue(indicator.rows, indicator.columns) };
        default:
          return indicator;
      }
    }
  
    public static toEntityAttribute(attribute: ApiAttribute): EntityAttribute {
      if (ObjectsUtil.isUnset(attribute)) {
        return attribute;
      }
  
      switch (attribute.__typename) {
        case 'BooleanAttribute':
          return { ...attribute, value: attribute.booleanValue };
        case 'StringAttribute':
          return { ...attribute, value: attribute.stringValue };
        case 'FloatAttribute':
          return { ...attribute, value: attribute.floatValue };
        case 'IntAttribute':
          return { ...attribute, value: attribute.intValue };
        case 'MetricAttribute':
          return { ...attribute, value: attribute.metricValue };
        case 'HistogramAttribute':
          return attribute;
        case 'TableAttribute':
          return { ...attribute, value: AttributeUtil.toTableValue(attribute.rows, attribute.columns) };
        default:
          return attribute;
      }
    }
  
    public static toAttributeChartType(attribute: EntityAttribute): EntityAttributeChartType {
      if (ObjectsUtil.isUnset(attribute)) {
        return 'metric';
      }
  
      if (attribute.__typename === 'MetricAttribute') {
        return 'metric';
      }
  
      if (attribute.__typename === 'HistogramAttribute') {
        return 'histogram';
      }
  
      if (attribute.__typename === 'TableAttribute') {
        return 'table';
      }
  
      if (AttributeUtil.simpleAttributesSet.has(attribute.__typename)) {
        return 'simple';
      }
      
      return null;
    }
  
    private static toTableValue(rows: ApiTableRow[], columns: ApiTableColumn[]): EntityDataAttributeTableValue {
      if (ArraysUtil.isEmpty(rows)) {
        return { columns: [], rows: [] };
      }
  
      const columnIndexTypeMap = new Map<string, { contentType: string; columnType: ApiAttributeType }>();
  
      const columnValues: EntityDataAttributeColumn[] = ArraysUtil.isEmpty(columns)
        ? Array(rows[0].values.length).fill({
            name: '',
            unit: '',
            contentType: 'string',
            columnType: ApiAttributeType.String,
          })
        : columns;
  
      // create rows and infer column content type
      const rowValues = rows.map((row) =>
        row.values.map((cell, colIndex) => {
          columnIndexTypeMap.set(colIndex.toString(), AttributeUtil.inferContentType(cell));
  
          if (StringsUtil.isNotBlank(cell.stringValue)) {
            return cell.stringValue;
          }
  
          if (StringsUtil.isNotBlank(cell.intValue?.toString())) {
            return cell.intValue;
          }
  
          if (StringsUtil.isNotBlank(cell.boolValue?.toString())) {
            return cell.boolValue;
          }
  
          if (StringsUtil.isNotBlank(cell.floatValue?.toString())) {
            return cell.floatValue;
          }
  
          return null;
        }),
      );
  
      // iterate over columns to set inferred content type
      const updateColumns: EntityDataAttributeColumn[] = columnValues.map((column, index) => {
        if (StringsUtil.isNotBlank(column.contentType)) {
          return column;
        }
  
        const inferredType = columnIndexTypeMap.get(index.toString());
        if (ObjectsUtil.isSet(inferredType)) {
          return { ...column, contentType: inferredType.contentType, columnType: inferredType.columnType };
        }
  
        return column;
      });
  
      return { columns: updateColumns, rows: rowValues };
    }
  
    public static findEntityAttribute(attributes: ApiAttribute[], name: string): EntityAttribute {
      const match = (attributes ?? []).find((attribute) => StringsUtil.equalsIgnoreCase(attribute.name, name));
      if (ObjectsUtil.isSet(match)) {
        return AttributeUtil.toEntityAttribute(match);
      }
      return null;
    }
  
    private static inferContentType(cell: ApiTableCell): {
      contentType: string;
      columnType: ApiAttributeType;
    } {
      if (StringsUtil.isNotBlank(cell.stringValue)) {
        return { contentType: 'string', columnType: ApiAttributeType.String };
      }
  
      if (StringsUtil.isNotBlank(cell.intValue?.toString())) {
        return { contentType: 'int', columnType: ApiAttributeType.Int };
      }
  
      if (StringsUtil.isNotBlank(cell.boolValue?.toString())) {
        return { contentType: 'boolean', columnType: ApiAttributeType.Boolean };
      }
  
      if (StringsUtil.isNotBlank(cell.floatValue?.toString())) {
        return { contentType: 'float', columnType: ApiAttributeType.Float };
      }
  
      return { contentType: 'string', columnType: ApiAttributeType.String };
    }
  }
  
  export type EntityAttribute = ApiAttribute & {
    name: string;
    value?: EntityDataIndicatorAttributeSimpleValue | ApiMetric | EntityDataAttributeTableValue;
  };
  
  export type EntityAttributeChartType = 'metric' | 'histogram' | 'table' | 'simple';
  
  export type EntityDataAttributeColumn = ApiTableColumn & {
    name: string;
    contentType: string;
    columnType: ApiAttributeType;
  };
  
  export type EntityDataAttributeTableValue = {
    columns: EntityDataAttributeColumn[];
    rows: EntityDataIndicatorAttributeSimpleValue[][];
  };
  
  export type EntityDataIndicatorAttribute = ApiIndicator & {
    value?: EntityDataIndicatorAttributeSimpleValue | ApiMetric | EntityDataAttributeTableValue;
  };
  
  export type EntityDataIndicatorAttributeSimpleValue = string | number | boolean;
  