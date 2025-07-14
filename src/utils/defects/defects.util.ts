import { ApiDefect, ApiDefectSeverity } from "api/api.types";
import { EntityUtil } from "utils/entity/entity.util";
import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { IntlUtil } from "utils/intl/intl.util";
import { ObjectsUtil } from "utils/objects/objects.util";
import { StringsUtil } from "utils/strings/strings.util";
import { TimeUtil } from "utils/time/time.util";

export type DefectStatus = 'detected' | 'remediated' | 'cleared' | 'inactive';

export class DefectsUtil {

  public static defectOnEntityDescription(rootcause: ApiDefect): string {
    if (ObjectsUtil.isUnset(rootcause)) {
      return '';
    }
    const rootCauseName = EntityTypeDefs.getInstance().getDefectDef(rootcause.entity.typeName, rootcause.name).displayName;

    if (DefectsUtil.isServiceDegrading(rootcause)) {
      return `Service Degrading: ${rootCauseName} on ${EntityUtil.simplifyEntityname(rootcause.entity)}`;
    }
    return `Non-Service Degrading: ${rootCauseName} on ${EntityUtil.simplifyEntityname(rootcause.entity)}`;
  }

  public static isServiceDegrading(rootcause: ApiDefect): boolean {
    return rootcause?.serviceCount > 0;
  }

  public static isDetected(defect: ApiDefect): boolean {
    const status = DefectsUtil.toStatus(defect);
    return status === 'detected';
  }

  public static isDiagnose(defect: ApiDefect): boolean {
    return (
      StringsUtil.equalsIgnoreCase(defect?.severity, ApiDefectSeverity.Critical) ||
      StringsUtil.equalsIgnoreCase(defect?.severity, ApiDefectSeverity.High)
    );
  }

  public static toStatus(defect: ApiDefect): DefectStatus {
    if (StringsUtil.isBlank(defect?.fromTime)) {
      return 'inactive';
    }

    if (defect?.remediated) {
      return 'remediated';
    }

    const isBefore = StringsUtil.isNotBlank(defect?.toTime) && TimeUtil.isBefore(TimeUtil.fromISO(defect?.toTime));

    if (isBefore) {
      return 'cleared';
    }
    return 'detected';
  }

  public static toTimeInfo(defect: ApiDefect): string {
    const status = DefectsUtil.toStatus(defect);
    if (status === 'inactive') {
      return `Inactive`;
    }

    if (status === 'remediated') {
      return `Remediated ${IntlUtil.toRelativeScaledTime(TimeUtil.fromISO(defect.toTime).toJSDate())}`;
    }

    if (status === 'cleared') {
      return `Cleared ${IntlUtil.toRelativeScaledTime(TimeUtil.fromISO(defect.toTime).toJSDate())}`;
    }

    return `Identified ${IntlUtil.toRelativeScaledTime(TimeUtil.fromISO(defect.fromTime).toJSDate())}`;
  }

  public static getActiveSymptomsCount(defect: ApiDefect): number {
    return [...(defect?.symptoms ?? []), ...(defect?.events ?? [])]
      .filter((manifestation) => manifestation.active).length;
  }

}
