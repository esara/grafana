import { ApiDefectCount, ApiEntityTypeCount } from "api/api.types";

export type EntityHealthCardData = {
  title: string;
  percentage: string;
  severity: string;
  count: number;
  rootCauseCount: number;
  total: number;
};


export enum ApiDefectSeverity {
  Critical = 'Critical',
  High = 'High',
  Low = 'Low',
  Medium = 'Medium'
}

const defectSeverityToEntitySeverityMap: {[key: string]: string} = {
  [ApiDefectSeverity.Critical]: 'Critical',
  [ApiDefectSeverity.High]: 'Major',
  [ApiDefectSeverity.Medium]: 'Minor',
  [ApiDefectSeverity.Low]: 'Minor',
};

export class EntityHealthCardsUtil {

  private static calculatePercentage(part: number, total: number): string {
    if (total === 0) {
      return "Total cannot be zero";
    }

    let percentage = (part / total) * 100;
    return `${percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(2)}%`;
  }

  private static getSeveritySortOrder(severity: string): number {
    const severityString = severity?.toLowerCase();
    switch (severityString) {
      case 'critical':
        return 0;
      case 'major':
        return 1;
      case 'minor':
        return 2;
      case 'warning':
        return 3;
      case 'normal':
        return 4;
      default:
        return 5;
    }
  }
  
  private static getTitle(severity: string): string {
    switch (severity.toLowerCase()) {
      case "normal":
        return "Healthy Services";
      case "warning":
        return 'Services with Symptoms';
      case "minor":
        return 'Services with Opportunities';
      case "major":
        return 'Services with SLO At Risk';
      case "critical":
        return 'Services with SLO Violations';
      default:
        return "Unknown Severity"
    }
  }
  public static toEntityHealthCardDataList(
    defectCounts: ApiDefectCount[],
    entityTypeCounts: ApiEntityTypeCount[],
  ): EntityHealthCardData[] {
    const totalEntityCount = entityTypeCounts.reduce((total, entityTypeCount) => total + entityTypeCount.count, 0);

    const entitySeverityCounts: {[key: string]: number} = (entityTypeCounts ?? []).reduce((map: {[key: string]: number}, entityTypeCount) => {
      if (entityTypeCount.severity) {
        map[entityTypeCount.severity] = (map[entityTypeCount.severity] ?? 0) + entityTypeCount.count;
      }
      return map;
    }, {});

    const defectSeverityCounts = (defectCounts ?? []).reduce((map: {[key: string]: number}, defectCount) => {
      if (defectCount.severity) {
        map[defectCount.severity] = (map[defectCount.severity] ?? 0) + defectCount.defectCount;
      }
      return map;
    }, {});

    return Object.keys(entitySeverityCounts)
      .map((severity: string) => {
        return {
          severity,
          title: EntityHealthCardsUtil.getTitle(severity),
          count: entitySeverityCounts[severity],
          percentage: EntityHealthCardsUtil.calculatePercentage(entitySeverityCounts[severity], totalEntityCount),
          rootCauseCount: defectSeverityToEntitySeverityMap.hasOwnProperty(severity)
            ? defectSeverityCounts[defectSeverityToEntitySeverityMap[severity]]
            : 0,
          total: totalEntityCount,
        };
      })
        .sort((a, b) =>
            EntityHealthCardsUtil.getSeveritySortOrder(a.severity) - EntityHealthCardsUtil.getSeveritySortOrder(b.severity));
  }
}
