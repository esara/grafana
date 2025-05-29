import { ApiDefect, ApiDefectSeverity } from "api/api.types";
import { IntlUtil } from "utils/intl/intl.util";
import { StringsUtil } from "utils/strings/strings.util";
import { TimeUtil } from "utils/time/time.util";

export type DefectStatus = 'detected' | 'remediated' | 'cleared' | 'inactive';

export class DefectsUtil {

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

}
