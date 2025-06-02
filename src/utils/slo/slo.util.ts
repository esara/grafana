import { ApiSamplePair, ApiSloDataQuery, ApiSloNode, ApiSloState } from "api/api.types";
import { ArraysUtil } from "utils/arrays/arrays.util";
import { AttributeUtil, EntityAttribute } from "utils/attribute.util";
import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { IntlUtil } from "utils/intl/intl.util";
import { NumberUtil } from "utils/number/number.util";
import { ObjectsUtil } from "utils/objects/objects.util";
import { StringsUtil } from "utils/strings/strings.util";
import { TimeUtil, TimeOption } from "utils/time/time.util";

export type ApiSloNodeWithMetaData = ApiSloNode & {
  metaData: SloMetaData;
};

export enum SloAttribute {
  TotalWindowTime = 'TotalWindowTime',
  WindowDuration = 'WindowDuration',
  WindowType = 'WindowType',
  ErrorBudget = 'ErrorBudget',
  ErrorBudgetRemaining = 'ErrorBudgetRemaining',
  BurnRate = 'BurnRate',
  BurnRateComputed = 'BurnRateComputed',
  TargetThreshold = 'TargetThreshold',
  CalendarWindowType = 'CalendarWindowType',
  IsExternal = 'IsExternal',
  ElapsedTime = 'ElapsedTime',
}

// export enum SloIndicator {
//   ErrorBudgetRemaining = 'ErrorBudgetRemaining',
//   BurnRate = 'BurnRate',
// }

export type SloMetaData = {
  // percent
  targetThreshold: number;
  // seconds
  elapsedTime: number;
  // seconds
  totalWindowTime: number;
  burnRate: number;
  burnRateAttribute: { values: ApiSamplePair[] };
  // percent
  errorBudget: number;
  // percent
  errorBudgetRemaining: number;
  // percentSeries
  errorBudgetRemainingAttribute: { values: ApiSamplePair[] };
  windowDuration: number;
  windowType: string;
  calendarWindowType: string;
  isExternal: boolean;
};

// export type SloInfo = { label: string; tagType: CuiTagType; sloList: ApiSloNodeWithMetaData[] };

// type SLOStatusInfo = {
//   tagType: CuiTagType;
//   iconName: CuiIconName;
//   status: string;
//   nameTooltip: string;
//   statusTooltip: string;
//   className: string;
// };

// type SignedSeriesData<T = any> = {
//   positive: T[];
//   negative: T[];
// };

// type SignedSeriesGroups = {
//   positiveGroup: string;
//   negativeGroup: string;
// };

export class SloUtil {
//   public static toStatusInfo(slo: ApiSloNode): SLOStatusInfo {
//     const tooltipParams = {
//       sloName: slo.entity.name,
//       sloDescription: '', //slo.description,
//     };
//     const sloState: SloState = slo.state ?? 'UNKNOWN';

//     const iconDetails = SloUtil.toSloIconDetails(sloState);
//     const tagType = SloUtil.toSloStateTagType(sloState);

//     const status = IntlUtil.translate(`feature.slo.sloName.status.${sloState}.label`);
//     const nameTooltip = IntlUtil.translate(`feature.slo.sloName.${sloState}.tooltip`, tooltipParams);
//     const statusTooltip = IntlUtil.translate(`feature.slo.sloName.${sloState}.tooltip`, tooltipParams);

//     return {
//       tagType,
//       iconName: iconDetails.iconName,
//       className: SdkUtil.withPrefix(iconDetails.iconClassName),
//       status,
//       nameTooltip,
//       statusTooltip,
//     };
//   }

//   public static toSloIconDetails(sloState: SloState): { iconName: DomainIcon; iconClassName: DomainIconClassName } {
//     if (sloState === ApiSloState.AtRisk) {
//       return {
//         iconName: DomainIcon.SloAtRisk,
//         iconClassName: DomainIconClassName.SloAtRisk,
//       };
//     }

//     if (sloState === ApiSloState.Violated) {
//       return {
//         iconName: DomainIcon.SloAlreadyViolated,
//         iconClassName: DomainIconClassName.SloAlreadyViolated,
//       };
//     }

//     if (sloState === ApiSloState.Normal) {
//       return {
//         iconName: DomainIcon.Slo,
//         iconClassName: DomainIconClassName.SloNormal,
//       };
//     }

//     return {
//       iconName: DomainIcon.Slo,
//       iconClassName: DomainIconClassName.SloUnknown,
//     };
//   }

  public static toSloMetaData(slo: ApiSloNode): SloMetaData {
    const attributeMap = (slo.metrics?.attributes ?? [])
      .map((attribute) => AttributeUtil.toEntityAttribute(attribute))
      .reduce((acc, attribute) => {
        acc[attribute.name] = attribute.value;
        return acc;
      }, {});

    // TODO:: This is a temporary solution to get the attribute value from the array of values
    // We query for a time range and get multiple values, some of which are zero
    // these values can be probably zero because of rolling windows
    const getFirstNonZeroValue = (val: any): number => {
      if (typeof val === 'number') {
        return val;
      }

      const attributes = val?.values as EntityAttribute[];
      const nonZeroValues = (attributes ?? []).filter((attribute) => attribute.value !== 0);
      return ArraysUtil.isNotEmpty(nonZeroValues)
        ? NumberUtil.mustGetNumber(ArraysUtil.last(nonZeroValues)?.value as number)
        : 0;
    };

    const burnRateComputed = NumberUtil.mustGetNumber(attributeMap[SloAttribute.BurnRateComputed] as number);

    console.info('toSloMeta', {
      elapsedTime: NumberUtil.mustGetNumber(attributeMap[SloAttribute.ElapsedTime] as number),
      totalWindowTime: NumberUtil.mustGetNumber(attributeMap[SloAttribute.TotalWindowTime] as number),
      targetThreshold: NumberUtil.mustGetNumber(attributeMap[SloAttribute.TargetThreshold] as number),
      burnRate: Math.round(
        burnRateComputed === 0 ? getFirstNonZeroValue(attributeMap[SloAttribute.BurnRate]) : burnRateComputed,
      ),
      burnRateAttribute: attributeMap[SloAttribute.BurnRate],
      errorBudget: NumberUtil.mustGetNumber(attributeMap[SloAttribute.ErrorBudget] as number),
      errorBudgetRemaining: getFirstNonZeroValue(attributeMap[SloAttribute.ErrorBudgetRemaining]),
      errorBudgetRemainingAttribute: attributeMap[SloAttribute.ErrorBudgetRemaining],
      windowDuration: NumberUtil.mustGetNumber(attributeMap[SloAttribute.WindowDuration] as number),
      windowType: attributeMap[SloAttribute.WindowType] as string,
      calendarWindowType: attributeMap[SloAttribute.CalendarWindowType] as string,
      isExternal: attributeMap[SloAttribute.IsExternal] as boolean,
    });
    
    return {
      elapsedTime: NumberUtil.mustGetNumber(attributeMap[SloAttribute.ElapsedTime] as number),
      totalWindowTime: NumberUtil.mustGetNumber(attributeMap[SloAttribute.TotalWindowTime] as number),
      targetThreshold: NumberUtil.mustGetNumber(attributeMap[SloAttribute.TargetThreshold] as number),
      burnRate: Math.round(
        burnRateComputed === 0 ? getFirstNonZeroValue(attributeMap[SloAttribute.BurnRate]) : burnRateComputed,
      ),
      burnRateAttribute: attributeMap[SloAttribute.BurnRate],
      errorBudget: NumberUtil.mustGetNumber(attributeMap[SloAttribute.ErrorBudget] as number),
      errorBudgetRemaining: getFirstNonZeroValue(attributeMap[SloAttribute.ErrorBudgetRemaining]),
      errorBudgetRemainingAttribute: attributeMap[SloAttribute.ErrorBudgetRemaining],
      windowDuration: NumberUtil.mustGetNumber(attributeMap[SloAttribute.WindowDuration] as number),
      windowType: attributeMap[SloAttribute.WindowType] as string,
      calendarWindowType: attributeMap[SloAttribute.CalendarWindowType] as string,
      isExternal: attributeMap[SloAttribute.IsExternal] as boolean,
    };
  }

//   public static toSloType(slo: ApiSloNode): string {
//     return TopologyUtil.toHumanizedEntityType(slo.entity).replace('SLO', '').trim();
//   }

  public static toSloAttributeMetricQuery(
    entityTypeDefs: EntityTypeDefs,
    excludeTimeframe?: boolean,
  ): ApiSloDataQuery {
    const apiSloDataQuery: ApiSloDataQuery = {
      queries: SloUtil.toSloTypeNames(entityTypeDefs).map((sloTypeDefName) => {
        return {
          sloType: sloTypeDefName,
          attributes: ObjectsUtil.keys(SloAttribute),
          indicators: [],
        };
      }),
    };
    if (!excludeTimeframe) {
      apiSloDataQuery.start = TimeUtil.getStartTime(TimeOption.ONE_HOUR);
      apiSloDataQuery.stepMinutes = 60;
    }
    return apiSloDataQuery;
  }

//   public static toSloIndicatorMetricQuery(
//     entityTypeDefModel: AppStateEntityTypeDefModel,
//     slo: ApiSloNodeWithMetaData,
//   ): ApiSloDataQuery {
//     const startTime = SloUtil.toSloWindowStartTime(slo);
//     return {
//       start: startTime,
//       stepMinutes: 60, // TimeUtil.getStepMinutes(TimeUtil.getTimeframeDifference(startTime))
//       // queries: SloUtil.toSloTypeNames(entityTypeDefModel).map((sloTypeDefName) => {
//       //   return {
//       //     sloType: sloTypeDefName,
//       //     attributes: [],
//       //     indicators: ObjectsUtil.keys(SloIndicator),
//       //   };
//       // }),
//     };
//   }

//   public static toSloIndicatorQuery(
//     entityTypeDefModel: AppStateEntityTypeDefModel,
//     slo: ApiSloNodeWithMetaData,
//   ): TopologyIndicatorQuery {
//     if (ObjectsUtil.isEmpty(entityTypeDefModel) || ObjectsUtil.isUnset(slo)) {
//       return;
//     }

//     // TODO:: This is a temporary solution to get the indicatorDefs for the related entity
//     const indicatorSet = TopologyUtil.isService(slo.relatedEntity)
//       ? new Set(['RequestDuration', 'RequestRate'])
//       : new Set([]);
//     const entityTypeDef = entityTypeDefModel.getEntityTypeDef(slo.relatedEntity.typeName);
//     const indicatorDefs = (entityTypeDef?.indicators ?? []).filter((indicatorDef) => {
//       return indicatorSet.has(indicatorDef.name);
//     });

//     return {
//       entity: slo.relatedEntity,
//       indicatorDefs: indicatorDefs,
//     };
//   }

  public static toSloTypeNames(entityTypeDefs: EntityTypeDefs): string[] {
    return entityTypeDefs.getSloTypeDefs().map((sloTypeDef) => sloTypeDef.name);
  }

//   public static toSloWindowDetail(slo: ApiSloNodeWithMetaData): string {
//     const { windowType, calendarWindowType, windowDuration } = slo.metaData;
//     if (windowType === 'rolling') {
//       return IntlUtil.translate('feature.slo.sloWindow.rolling.value', {
//         windowDuration,
//       });
//     }

//     if (windowType === 'calendar' && StringsUtil.isNotBlank(calendarWindowType)) {
//       return IntlUtil.translate('feature.slo.sloWindow.calendar.value', {
//         windowDuration,
//         calendarWindowType,
//         count: windowDuration,
//       });
//     }

//     return '';
//   }

  public static toErrorBudgetSeconds(slo: ApiSloNodeWithMetaData): number {
    const totalSeconds = slo.metaData.totalWindowTime;
    return totalSeconds * slo.metaData.errorBudget;
  }

  public static toErrorBudgetRemainingSeconds(slo: ApiSloNodeWithMetaData): number {
    const totalSeconds = slo.metaData.totalWindowTime;
    return totalSeconds * slo.metaData.errorBudgetRemaining;
  }

  public static toErrorBudgetPercentage(errorBudgetSeconds: number, errorBudgetRemainingSeconds: number): number {
    if (errorBudgetSeconds <= 0) {
      return 0;
    }
    return (errorBudgetRemainingSeconds / errorBudgetSeconds) * 100;
  }

  public static toErrorBudgetRemainingInfo(slo: ApiSloNodeWithMetaData): {
    timeTotalBudgetSeconds: number;
    percentage: number;
    tooltipContent: string;
    timeToBudgetExhaustionSeconds: number;
  } {
    const timeTotalBudgetSeconds = SloUtil.toErrorBudgetSeconds(slo);
    const timeToBudgetExhaustionSeconds = SloUtil.toErrorBudgetRemainingSeconds(slo);
    const totalWindowTime = IntlUtil.secondsToHours(timeTotalBudgetSeconds);
    const timeToExhaustion = IntlUtil.secondsToHours(timeToBudgetExhaustionSeconds);
    const percentage = SloUtil.toErrorBudgetPercentage(timeTotalBudgetSeconds, timeToBudgetExhaustionSeconds);

    const tooltipInfo = {
      percentage: IntlUtil.toPercentage(percentage / 100),
      totalWindowTime,
      timeToExhaustion,
    };


    const tooltipContent = 
      slo.state === ApiSloState.Violated
        ? `Error budget fully utilized. <br> <br> Remaining: ${tooltipInfo.timeToExhaustion} (${tooltipInfo.percentage}) out of total <strong>${tooltipInfo.totalWindowTime}</strong> error budget.`
        : `Remaining error budget: ${tooltipInfo.timeToExhaustion} (${tooltipInfo.percentage}) out of total <strong>${tooltipInfo.totalWindowTime}</strong> error budget.`;
        
    return {
      percentage,
      tooltipContent,
      timeToBudgetExhaustionSeconds,
      timeTotalBudgetSeconds,
    };
  }

//   private static mapSignedDataSeries(
//     metricValues: ApiSamplePair[],
//     slo: ApiSloNodeWithMetaData,
//     groups: SignedSeriesGroups,
//   ): SignedSeriesData {
//     let isPrevPointPositive = true;
//     const { positiveGroup, negativeGroup } = groups;

//     const timeDriftZeroPoint = 1000 * 60 * 2; // 2 minutes

//     return metricValues.reduce(
//       (series, metric, index) => {
//         const date: Date = TimeUtil.fromISO(metric.timestamp).toJSDate();
//         if (index == 0) {
//           // set initial value
//           isPrevPointPositive = metric.value >= 0;
//         } else {
//           // IF moving from positive to negative
//           if (isPrevPointPositive && metric.value <= 0) {
//             // since we are changing series at this timestamp, we push a zero value to each series group prior to this
//             // current timestamp stepped back by some amount of time (e.g. 2 minutes)
//             series.positive.push({
//               id: series.positive.length.toString(),
//               group: positiveGroup,
//               date: new Date(date.getTime() - timeDriftZeroPoint),
//               value: 0,
//             });
//             series.negative.push({
//               id: series.negative.length.toString(),
//               group: negativeGroup,
//               date: new Date(date.getTime() - timeDriftZeroPoint),
//               value: 0,
//             });
//           }
//           if (!isPrevPointPositive && metric.value >= 0) {
//             series.negative.push({
//               id: series.negative.length.toString(),
//               group: negativeGroup,
//               date: new Date(date.getTime() - 1000),
//               value: 0,
//             });
//             series.positive.push({
//               id: series.positive.length.toString(),
//               group: positiveGroup,
//               date: new Date(date.getTime() - 1000),
//               value: 0,
//             });
//           }
//         }
//         // set prevPoint condition for next iteration
//         isPrevPointPositive = metric.value >= 0;

//         // push the actual datapoint to the respective series
//         if (metric.value >= 0) {
//           series.positive.push({
//             id: series.positive.length.toString(),
//             group: positiveGroup,
//             date,
//             value: metric.value / 100,
//           });
//         } else {
//           series.negative.push({
//             id: series.negative.length.toString(),
//             group: negativeGroup,
//             date,
//             value: metric.value / 100,
//           });
//         }
//         return series;
//       },
//       {
//         positive: [],
//         negative: [],
//       },
//     );
//   }

//   public static toErrorBudgetRemainingChartConfig(slo: ApiSloNodeWithMetaData, metricValues: ApiSamplePair[]): any {
//     const groups = {
//       positiveGroup: IntlUtil.translate('feature.slo.sloList.header.errorBudgetRemaining.positive'),
//       negativeGroup: IntlUtil.translate('feature.slo.sloList.header.errorBudgetRemaining.negative'),
//     };

//     const signedSeriesData = SloUtil.mapSignedDataSeries(metricValues, slo, groups);
//     const colorPalette = new Map<string, string>([]);
//     if (ArraysUtil.isNotEmpty(signedSeriesData.positive)) {
//       colorPalette.set(groups.positiveGroup, SdkUtil.COLOR_GREEN);
//     }

//     if (ArraysUtil.isNotEmpty(signedSeriesData.negative)) {
//       colorPalette.set(groups.negativeGroup, SdkUtil.COLOR_RED);
//     }

//     return {
//       title: IntlUtil.translate('feature.slo.sloList.header.errorBudgetRemaining'),
//       tooltip: IntlUtil.translate('feature.slo.sloErrorBudgetRemaining.series.tooltip'),
//       data: [...signedSeriesData.positive, ...signedSeriesData.negative],
//       options: {
//         colorPalette,
//         thresholds: {
//           valueAxis: [
//             {
//               value: slo.metaData.errorBudget / 100,
//               fillColor: SdkUtil.COLOR_GREY,
//               label: IntlUtil.translate('feature.slo.sloErrorBudgetRemaining.series.threshold'),
//               valueFormatter: IndicatorUtil.unitBasedValueFormatter({
//                 baseUnit: 'percent',
//                 bestFitUnit: 'percent',
//               }),
//             },
//           ],
//         },
//         points: {
//           enabled: true,
//         },
//         height: '200px',
//         titles: {
//           timeAxis: IntlUtil.translate('sdk.default.chart.timeAxis.title'),
//           valueAxis: IntlUtil.translate('sdk.default.chart.valueAxis.title'),
//         },
//         tooltip: {
//           groupLabel: IntlUtil.translate('sdk.default.chart.tooltip.groupLabel'),
//           valueFormatter: IndicatorUtil.unitBasedValueFormatter({
//             baseUnit: 'percent',
//             bestFitUnit: 'percent',
//           }),
//         },
//         ticks: {
//           valueAxis: {
//             formatter: IndicatorUtil.unitBasedValueFormatter({
//               baseUnit: 'percent',
//               bestFitUnit: 'percent',
//             }),
//           },
//         },
//       },
//     };
//   }

//   public static toBurnRateChartConfig(slo: ApiSloNodeWithMetaData, metricValues: ApiSamplePair[]): any {
//     const toLegendColor = (slo: ApiSloNodeWithMetaData): string => {
//       const burnRate = slo.metaData.burnRate;
//       if (burnRate === 0) {
//         return SdkUtil.COLOR_GREEN;
//       }

//       return SloUtil.toLegendColor(slo);
//     };

//     return {
//       title: IntlUtil.translate('feature.slo.sloList.header.burnRate'),
//       tooltip: IntlUtil.translate('feature.slo.sloBurnRate.series.tooltip'),
//       data: metricValues.map((metric, index) => {
//         return {
//           id: index.toString(),
//           group: IntlUtil.translate('feature.slo.sloList.header.burnRate'),
//           date: TimeUtil.fromISO(metric.timestamp).toJSDate(),
//           value: metric.value,
//         };
//       }),
//       options: {
//         height: '200px',
//         colorPalette: new Map<string, string>([
//           [IntlUtil.translate('feature.slo.sloList.header.burnRate'), toLegendColor(slo)],
//         ]),
//         titles: {
//           timeAxis: IntlUtil.translate('sdk.default.chart.timeAxis.title'),
//           valueAxis: IntlUtil.translate('sdk.default.chart.valueAxis.title'),
//         },
//         tooltip: {
//           groupLabel: IntlUtil.translate('sdk.default.chart.tooltip.groupLabel'),
//         },
//       },
//     };
//   }

//   public static toSloSummary(sloList: ApiSlo[], sloNode: ApiSloNode): any {
//     return (sloList ?? []).reduce((map, slo) => {
//       const key = slo?.name?.replace(`${sloNode.entity.typeName}_`, '');
//       const [sloName, value] = key.split('_');
//       map[sloName] = {
//         label: slo.active ? value : IntlUtil.translate('feature.slo.sloNode.sloContent.overview.ok'),
//         tagType: slo.active ? CuiTagType.red : CuiTagType.green,
//       };
//       return map;
//     }, {});
//   }

  public static toSloName(slo: ApiSloNode): string {
    return StringsUtil.splitCamelCase(slo.entity?.name?.replace(`${slo.relatedEntity.name}-`, ''));
  }

//   public static toSloAggregatedStatusAndCount(sloList: ApiSloNode[]): {
//     state: SloState;
//     count: number;
//     tagType: CuiTagType;
//   } {
//     if (ArraysUtil.isEmpty(sloList)) {
//       return {
//         state: 'UNKNOWN',
//         count: 0,
//         tagType: CuiTagType.gray,
//       };
//     }

//     const countsMap = sloList.reduce((countsMap, slo) => {
//       countsMap[slo.state] = (countsMap[slo.state] ?? 0) + 1;
//       return countsMap;
//     }, {});

//     let aggregatedState: SloState;
//     if (countsMap[ApiSloState.Violated] > 0) {
//       aggregatedState = ApiSloState.Violated;
//     } else if (countsMap[ApiSloState.AtRisk] > 0) {
//       aggregatedState = ApiSloState.AtRisk;
//     } else if (countsMap[ApiSloState.Normal] > 0) {
//       aggregatedState = ApiSloState.Normal;
//     } else {
//       aggregatedState = 'UNKNOWN';
//     }

//     return {
//       state: aggregatedState,
//       count: countsMap[aggregatedState],
//       tagType: SloUtil.toSloStateTagType(aggregatedState),
//     };
//   }

//   public static toSloStateTagType(sloState: SloState): CuiTagType {
//     if (sloState === ApiSloState.Violated) {
//       return CuiTagType.red;
//     }

//     if (sloState === ApiSloState.AtRisk) {
//       return CuiTagType.orange;
//     }

//     if (sloState === ApiSloState.Normal) {
//       return CuiTagType.green;
//     }

//     return CuiTagType.gray;
//   }

//   public static toSloInfo(sloList: ApiSloNode[]): SloInfo {
//     const sloSummary = SloUtil.toSloAggregatedStatusAndCount(sloList);
//     return {
//       label: IntlUtil.translate(`feature.slo.impactInfo.${sloSummary.state.toLowerCase()}.text`),
//       tagType: StringsUtil.equalsIgnoreCase(sloSummary.state, 'UNKNOWN') ? CuiTagType.green : sloSummary.tagType,
//       sloList: sloList?.map((slo) => {
//         return {
//           ...slo,
//           metaData: SloUtil.toSloMetaData(slo),
//         };
//       }),
//     };
//   }

//   private static toSloWindowStartTime(slo: ApiSloNodeWithMetaData): string {
//     const { windowType, calendarWindowType, windowDuration } = slo.metaData;
//     if (windowType === 'rolling') {
//       return TimeUtil.getStartTimeFrom({
//         timeAggregateValue: { day: windowDuration },
//       });
//     }

//     if (windowType === 'calendar' && StringsUtil.isNotBlank(calendarWindowType)) {
//       if (calendarWindowType === 'quarter') {
//         return TimeUtil.getStartTimeFrom({
//           timeAggregateValue: { month: windowDuration },
//         });
//       }

//       if (calendarWindowType === 'year') {
//         return TimeUtil.getStartTimeFrom({
//           timeAggregateValue: { year: windowDuration },
//         });
//       }

//       return TimeUtil.getStartTimeFrom({
//         timeAggregateValue: { month: windowDuration },
//       });
//     }

//     return TimeUtil.getStartTime(TimeOption.ONE_HOUR);
//   }

//   private static toLegendColor(slo: ApiSloNode): string {
//     if (slo.state === ApiSloState.Violated) {
//       return SdkUtil.COLOR_RED;
//     }

//     if (slo.state === ApiSloState.AtRisk) {
//       return SdkUtil.COLOR_ORANGE;
//     }

//     return SdkUtil.COLOR_GREEN;
//   }
}
