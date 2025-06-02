import { DateTime } from 'luxon';

import { StringsUtil } from 'utils/strings/strings.util';

type TimeAggregateValue = {
  hour?: number;
  day?: number;
  weeks?: number;
  month?: number;
  year?: number;
};

export enum TimeMode {
  MAX_1D = 'max_1d',
  MAX_7D = 'max_7d',
  MAX_1M = 'max_1m',
  MAX_1Y = 'max_1y',
  ALL = 'all',
}

export enum TimeOption {
  ONE_HOUR = '1h',
  TWO_HOUR = '2h',
  SIX_HOUR = '6h',
  ONE_DAY = '1d',
  TWO_DAY = '2d',
  SEVEN_DAY = '7d',
  TWO_WEEK = '2w',
  ONE_MONTH = '1m',
  THREE_MONTH = '3m',
  SIX_MONTH = '6m',
  ONE_YEAR = '1y',
}

export type TimePeriodDropdownOption = { label: string; value: TimeOption };

export class TimeUtil {
  public static readonly ONE_HOUR = 3600;
  public static readonly ONE_DAY = 86400;
  public static readonly ONE_WEEK = 604800;

  public static now(): DateTime {
    return DateTime.now();
  }

  public static nowISO(): string {
    return TimeUtil.now().toISO();
  }

  public static fromISO(time: string): DateTime {
    if (StringsUtil.isBlank(time)) {
      return DateTime.fromISO(TimeUtil.now().toString());
    }

    const dateTime = DateTime.fromISO(time);
    return dateTime.isValid ? dateTime : DateTime.fromISO(TimeUtil.now().toString());
  }

  public static fromMillis(time: number): DateTime {
    return DateTime.fromMillis(time);
  }

  public static isBefore(target: DateTime, source: DateTime = TimeUtil.now()): boolean {
    try {
      return target.toMillis() < source.toMillis();
    } catch (e) {
    console.error(e);
      return false;
    }
  }

  public static getStartTime(timeOption: TimeOption | string, seed?: DateTime): string {
    const currentDate = seed?.isValid ? seed : TimeUtil.now();
    const timeAggregateValue: TimeAggregateValue = {};
    let startTime: string;

    switch (timeOption) {
      case TimeOption.ONE_HOUR:
        timeAggregateValue.hour = 1;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.TWO_HOUR:
        timeAggregateValue.hour = 2;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.SIX_HOUR:
        timeAggregateValue.hour = 6;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.ONE_DAY:
        timeAggregateValue.day = 1;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.TWO_DAY:
        timeAggregateValue.day = 2;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.SEVEN_DAY:
        timeAggregateValue.weeks = 1;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.TWO_WEEK:
        timeAggregateValue.weeks = 2;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.ONE_MONTH:
        timeAggregateValue.month = 1;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.THREE_MONTH:
        timeAggregateValue.month = 3;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.SIX_MONTH:
        timeAggregateValue.month = 6;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      case TimeOption.ONE_YEAR:
        timeAggregateValue.year = 1;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
      default:
        // Default is the same as 7 days
        timeAggregateValue.weeks = 1;
        startTime = currentDate.minus(timeAggregateValue).startOf('minute').toISO();
        break;
    }

    return startTime;
  }
  public static getStepMinutes(timeframe: TimeOption | string): number {
    switch (timeframe) {
      case TimeOption.ONE_HOUR:
        return 1;
      case TimeOption.TWO_HOUR:
        return 2;
      case TimeOption.SIX_HOUR:
        return 5;
      case TimeOption.ONE_DAY:
        return 30;
      case TimeOption.TWO_DAY:
        return 60;
      case TimeOption.SEVEN_DAY:
        return 60;
      case TimeOption.TWO_WEEK:
        return 1440;
      case TimeOption.ONE_MONTH:
        return 2880;
      case TimeOption.SIX_MONTH:
        return 43200;
      case TimeOption.ONE_YEAR:
        return 525600;
      default:
        return 10;
    }
  }

  public static getTimeframeDifference(time: string): TimeOption {
    const now = TimeUtil.now().toJSDate();
    const inputDateTime = TimeUtil.fromISO(time).toJSDate();
    const differenceInMilliseconds = now.getTime() - inputDateTime.getTime();

    const timeframes = {
      [TimeOption.ONE_HOUR]: 60 * 60 * 1000,
      [TimeOption.TWO_HOUR]: 2 * 60 * 60 * 1000,
      [TimeOption.SIX_HOUR]: 6 * 60 * 60 * 1000,
      [TimeOption.ONE_DAY]: 24 * 60 * 60 * 1000,
      [TimeOption.TWO_DAY]: 2 * 24 * 60 * 60 * 1000,
      [TimeOption.SEVEN_DAY]: 7 * 24 * 60 * 60 * 1000,
      [TimeOption.TWO_WEEK]: 14 * 24 * 60 * 60 * 1000,
      [TimeOption.ONE_MONTH]: 30 * 24 * 60 * 60 * 1000,
      [TimeOption.SIX_MONTH]: 6 * 30 * 24 * 60 * 60 * 1000,
      [TimeOption.ONE_YEAR]: 365 * 24 * 60 * 60 * 1000,
    };

    let closestTimeframe = TimeOption.ONE_YEAR;
    let minDifference = timeframes[TimeOption.ONE_YEAR];
    for (const timeframe in timeframes) {
      const difference = Math.abs(timeframes[timeframe] - differenceInMilliseconds);
      if (difference < minDifference) {
        minDifference = difference;
        closestTimeframe = timeframe as TimeOption;
      }
    }

    return closestTimeframe as TimeOption;
  }
}
