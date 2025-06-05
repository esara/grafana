import i18next, {  } from 'i18next';
import { Duration } from 'luxon';
import { NumberUtil } from 'utils/number/number.util';
import { StringsUtil } from 'utils/strings/strings.util';

/**
 * IntlUtil should be used for all the values displayed in UI.
 * This utility class provides function to display number with or without unit and considers user's
 * language preference.
 */
export class IntlUtil {

  /**
   * Get the current language.
   * Eg: en
   */
  public static getLanguage(): string {
    return i18next?.language ?? 'en';
  }

  /**
   * Determine relative scaled time for the given target and source dates.
   * This function automatically determines the closest and accurate relative time
   * based on the difference of target and source date.
   * @param target
   * @param source
   */
  public static toRelativeScaledTime(target: Date, source: Date = new Date()): string {
    try {
      const msDifference = target.getTime() - source.getTime();
      const absMsDifference = Math.abs(msDifference);

      // 1 year in milliseconds
      if (absMsDifference >= 31536000000) {
        const yearsDifference = Math.floor(msDifference / 31536000000);
        return IntlUtil.toRelativeTime(yearsDifference, 'year');
      }

      // 1 month in milliseconds
      if (absMsDifference >= 2592000000) {
        const monthsDifference = Math.floor(msDifference / 2592000000);
        return IntlUtil.toRelativeTime(monthsDifference, 'month');
      }

      // 1 week in milliseconds
      if (absMsDifference >= 604800000) {
        const weeksDifference = Math.floor(msDifference / 604800000);
        return IntlUtil.toRelativeTime(weeksDifference, 'week');
      }

      // 1 day in milliseconds
      if (absMsDifference >= 86400000) {
        const daysDifference = Math.floor(msDifference / 86400000);
        return IntlUtil.toRelativeTime(daysDifference, 'day');
      }

      // 1 hour in milliseconds
      if (absMsDifference >= 3600000) {
        const hoursDifference = Math.floor(msDifference / 3600000);
        return IntlUtil.toRelativeTime(hoursDifference, 'hour');
      }

      // 1 minute in milliseconds
      if (absMsDifference >= 60000) {
        const minutesDifference = Math.floor(msDifference / 60000);
        return IntlUtil.toRelativeTime(minutesDifference, 'minute');
      }

      // Less than 1 minute
      const secondsDifference = Math.round(msDifference / 1000);
      return IntlUtil.toRelativeTime(secondsDifference, 'second');
    } catch (e) {
      console.error(e);
      return IntlUtil.toRelativeTime(0, 'second');
    }
  }

  /**
   * Convert given value and unit to a locale based formatted relative time string.
   * Format is `1 day ago` or `in 3 qtrs.` or `in 4 yrs`
   */
  public static toRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit): string {
    const language = IntlUtil.getLanguage();
    return new Intl.RelativeTimeFormat(language, { numeric: 'auto' }).format(value, unit);
  }

  public static secondsToHours(seconds: number, display: 'long' | 'short' | 'narrow' = 'short'): string {
    try {
      let tempSeconds = seconds;
      if (NumberUtil.isNotNumber(tempSeconds)) {
        tempSeconds = 0;
      }

      const isNegative = tempSeconds < 0;
      const absSeconds = Math.abs(tempSeconds);
      const hours = absSeconds / 3600;

      const duration = {
        hours: hours,
      };

      const toHumanOption: {
        unitDisplay?: 'long' | 'short' | 'narrow';
      } = display === 'short' ? { unitDisplay: 'short' } : {};
      const durationOutput = Duration.fromObject(duration, { locale: IntlUtil.getLanguage() }).toHuman(toHumanOption);
      return isNegative ? `-${durationOutput}` : durationOutput;
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  /**
   * Convert percentage to locale based formatted percentage string.
   * Eg: 0.75 will be 75%
   *     3500 will be 350,000%
   * Reference
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#decimal_and_percent_formatting
   */
  public static toPercentage(value: string | number, maximumFractionDigits = 2): string {
    if (StringsUtil.isBlank(value as string)) {
      return '';
    }

    if (Number.isNaN(Number(value))) {
      return value.toString();
    }
    const language = IntlUtil.getLanguage();
    const options = {
      style: 'percent' as Intl.NumberFormatOptionsStyle,
    };

    return Intl.NumberFormat(language, {
      ...options,
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(parseFloat(value as string));
  }
}
