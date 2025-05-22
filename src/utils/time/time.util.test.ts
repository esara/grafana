
// describe('TimeUtil', () => {
//   describe('formatDate', () => {
//     it('should return empty string for invalid date', () => {
//       // GIVEN
//       const dateString = '';

//       // WHEN
//       const result = TimeUtil.formatDate(dateString);

//       // THEN
//       expect(result).toEqual('');
//     });

//     it('should return non-empty string for valid date', () => {
//       // GIVEN
//       const dateString = '2023-07-26T18:14:11Z';

//       // WHEN
//       const result = TimeUtil.formatDate(dateString);

//       // THEN
//       expect(result).toEqual('Wed, Jul 26, 2023, 6:14 PM');
//     });
//   });

//   describe('isBefore', () => {
//     it('should return true when target is before source', () => {
//       // GIVEN
//       const target = TimeUtil.fromISO(TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()));
//       const source = TimeUtil.now();

//       // WHEN
//       const isBefore = TimeUtil.isBefore(target, source);

//       // THEN
//       expect(isBefore).toEqual(true);
//     });

//     it('should return false when target is after source', () => {
//       // GIVEN
//       const target = TimeUtil.now();
//       const source = TimeUtil.fromISO(TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()));

//       // WHEN
//       const isBefore = TimeUtil.isBefore(target, source);

//       // THEN
//       expect(isBefore).toEqual(false);
//     });
//   });

//   describe('getStartTime', () => {
//     let currentDate;

//     beforeEach(() => {
//       // GIVEN
//       currentDate = DateTime.fromISO('2023-08-01T12:00:00.000Z');
//     });

//     it('should return the correct start time for 1 hour', () => {
//       // WHEN
//       const startTime1h = TimeUtil.getStartTime(TimeOption.ONE_HOUR, currentDate);

//       // THEN
//       expect(startTime1h).toEqual('2023-08-01T11:00:00.000+00:00');
//     });

//     it('should return the correct start time for 1 day', () => {
//       // WHEN
//       const startTime1d = TimeUtil.getStartTime(TimeOption.ONE_DAY, currentDate);

//       // THEN
//       expect(startTime1d).toEqual('2023-07-31T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 2 day', () => {
//       // WHEN
//       const startTime2d = TimeUtil.getStartTime(TimeOption.TWO_DAY, currentDate);

//       // THEN
//       expect(startTime2d).toEqual('2023-07-30T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 7 day', () => {
//       // WHEN
//       const startTime7d = TimeUtil.getStartTime(TimeOption.SEVEN_DAY, currentDate);

//       // THEN
//       expect(startTime7d).toEqual('2023-07-25T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 2 week', () => {
//       // WHEN
//       const startTime2w = TimeUtil.getStartTime(TimeOption.TWO_WEEK, currentDate);

//       // THEN
//       expect(startTime2w).toEqual('2023-07-18T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 1 month', () => {
//       // WHEN
//       const startTime1m = TimeUtil.getStartTime(TimeOption.ONE_MONTH, currentDate);

//       // THEN
//       expect(startTime1m).toEqual('2023-07-01T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 6 month', () => {
//       // WHEN
//       const startTime6m = TimeUtil.getStartTime(TimeOption.SIX_MONTH, currentDate);

//       // THEN
//       expect(startTime6m).toEqual('2023-02-01T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 1 year', () => {
//       // WHEN
//       const startTime1y = TimeUtil.getStartTime(TimeOption.ONE_YEAR, currentDate);

//       // THEN
//       expect(startTime1y).toEqual('2022-08-01T12:00:00.000+00:00');
//     });
//   });

//   describe('toTimeInputToString', () => {
//     it('should return time string for 1h', () => {
//       // GIVEN
//       const timeOption = TimeOption.ONE_HOUR;

//       // WHEN
//       const result = TimeUtil.toTimeInputToString(timeOption);

//       // THEN
//       expect(result).toEqual('sdk.default.time.1h.label');
//     });

//     it('should return time string for 6h', () => {
//       // GIVEN
//       const timeOption = TimeOption.SIX_HOUR;

//       // WHEN
//       const result = TimeUtil.toTimeInputToString(timeOption);

//       // THEN
//       expect(result).toEqual('sdk.default.time.6h.label');
//     });

//     it('should return time string for 1d', () => {
//       // GIVEN
//       const timeOption = TimeOption.ONE_DAY;

//       // WHEN
//       const result = TimeUtil.toTimeInputToString(timeOption);

//       // THEN
//       expect(result).toEqual('sdk.default.time.1d.label');
//     });

//     it('should return time string for 2d', () => {
//       // GIVEN
//       const timeOption = TimeOption.TWO_DAY;

//       // WHEN
//       const result = TimeUtil.toTimeInputToString(timeOption);

//       // THEN
//       expect(result).toEqual('sdk.default.time.2d.label');
//     });

//     it('should return time string for 7d', () => {
//       // GIVEN
//       const timeOption = TimeOption.SEVEN_DAY;

//       // WHEN
//       const result = TimeUtil.toTimeInputToString(timeOption);

//       // THEN
//       expect(result).toEqual('sdk.default.time.7d.label');
//     });
//   });

//   describe('getTimePeriodOptions', () => {
//     it('should return time period options', () => {
//       // WHEN
//       const result = TimeUtil.getTimePeriodOptions();

//       // THEN
//       expect(result).toEqual([
//         {
//           label: 'sdk.default.time.1h.label',
//           value: TimeOption.ONE_HOUR,
//         },
//         {
//           label: 'sdk.default.time.6h.label',
//           value: TimeOption.SIX_HOUR,
//         },
//         {
//           label: 'sdk.default.time.1d.label',
//           value: TimeOption.ONE_DAY,
//         },
//         {
//           label: 'sdk.default.time.2d.label',
//           value: TimeOption.TWO_DAY,
//         },
//         {
//           label: 'sdk.default.time.7d.label',
//           value: TimeOption.SEVEN_DAY,
//         },
//       ]);
//     });
//   });

//   describe('getTimePeriod', () => {
//     it('should return time period option for 1h', () => {
//       // WHEN
//       const result = TimeUtil.getTimePeriod(TimeOption.ONE_HOUR);

//       // THEN
//       expect(result).toEqual({
//         label: 'sdk.default.time.1h.label',
//         value: TimeOption.ONE_HOUR,
//       });
//     });

//     it('should return time period option for 6h', () => {
//       // WHEN
//       const result = TimeUtil.getTimePeriod(TimeOption.SIX_HOUR);

//       // THEN
//       expect(result).toEqual({
//         label: 'sdk.default.time.6h.label',
//         value: TimeOption.SIX_HOUR,
//       });
//     });

//     it('should return time period option for 1d', () => {
//       // WHEN
//       const result = TimeUtil.getTimePeriod(TimeOption.ONE_DAY);

//       // THEN
//       expect(result).toEqual({
//         label: 'sdk.default.time.1d.label',
//         value: TimeOption.ONE_DAY,
//       });
//     });

//     it('should return time period option for 2d', () => {
//       // WHEN
//       const result = TimeUtil.getTimePeriod(TimeOption.TWO_DAY);

//       // THEN
//       expect(result).toEqual({
//         label: 'sdk.default.time.2d.label',
//         value: TimeOption.TWO_DAY,
//       });
//     });

//     it('should return time period option for 7d', () => {
//       // WHEN
//       const result = TimeUtil.getTimePeriod(TimeOption.SEVEN_DAY);

//       // THEN
//       expect(result).toEqual({
//         label: 'sdk.default.time.7d.label',
//         value: TimeOption.SEVEN_DAY,
//       });
//     });
//   });

//   describe('toDurationInfo', () => {
//     it('should return when both startTime and endTime are provided with year difference', () => {
//       // GIVEN
//       const input = {
//         startTime: new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)).toISOString(),
//         endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)).toISOString(),
//       };

//       // WHEN & THEN
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, true)).toEqual({
//         duration: '1 year, 8 days, 1 hour, 30 minutes, 4 seconds',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Tue, Dec 20, 2022, 3:23 AM',
//         startDate: 'Tue, Dec 20, 2022',
//         startTime: '3:23 AM',
//       });
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, false)).toEqual({
//         duration: '1 year, 8 days',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Tue, Dec 20, 2022, 3:23 AM',
//         startDate: 'Tue, Dec 20, 2022',
//         startTime: '3:23 AM',
//       });
//     });

//     it('should return when both startTime and endTime are provided with month difference', () => {
//       // GIVEN
//       const input = {
//         startTime: new Date(Date.UTC(2023, 10, 20, 3, 23, 16, 738)).toISOString(),
//         endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)).toISOString(),
//       };

//       // WHEN & THEN
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, true)).toEqual({
//         duration: '1 month, 8 days, 1 hour, 30 minutes, 4 seconds',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Mon, Nov 20, 2023, 3:23 AM',
//         startDate: 'Mon, Nov 20, 2023',
//         startTime: '3:23 AM',
//       });
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, false)).toEqual({
//         duration: '1 month, 8 days',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Mon, Nov 20, 2023, 3:23 AM',
//         startDate: 'Mon, Nov 20, 2023',
//         startTime: '3:23 AM',
//       });
//     });

//     it('should return when both startTime and endTime are provided with days difference', () => {
//       // GIVEN
//       const input = {
//         startTime: new Date(Date.UTC(2023, 11, 20, 3, 23, 16, 738)).toISOString(),
//         endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)).toISOString(),
//       };

//       // WHEN & THEN
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, true)).toEqual({
//         duration: '8 days, 1 hour, 30 minutes, 4 seconds',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Wed, Dec 20, 2023, 3:23 AM',
//         startDate: 'Wed, Dec 20, 2023',
//         startTime: '3:23 AM',
//       });
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, false)).toEqual({
//         duration: '8 days, 1 hour',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Wed, Dec 20, 2023, 3:23 AM',
//         startDate: 'Wed, Dec 20, 2023',
//         startTime: '3:23 AM',
//       });
//     });

//     it('should return when both startTime and endTime are provided with hours difference', () => {
//       // GIVEN
//       const input = {
//         startTime: new Date(Date.UTC(2022, 11, 28, 3, 23, 16, 738)).toISOString(),
//         endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)).toISOString(),
//       };

//       // WHEN & THEN
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, true)).toEqual({
//         duration: '1 year, 1 hour, 30 minutes, 4 seconds',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Wed, Dec 28, 2022, 3:23 AM',
//         startDate: 'Wed, Dec 28, 2022',
//         startTime: '3:23 AM',
//       });
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, false)).toEqual({
//         duration: '1 year, 1 hour',
//         end: 'Thu, Dec 28, 2023, 4:53 AM',
//         endDate: 'Thu, Dec 28, 2023',
//         endTime: '4:53 AM',
//         start: 'Wed, Dec 28, 2022, 3:23 AM',
//         startDate: 'Wed, Dec 28, 2022',
//         startTime: '3:23 AM',
//       });
//     });

//     it('should return when endTime is empty string', () => {
//       // GIVEN
//       const input = {
//         startTime: new Date(Date.UTC(2022, 11, 28, 3, 23, 16, 738)).toISOString(),
//         endTime: '',
//       };

//       // WHEN & THEN
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, true)).toEqual({
//         duration: '',
//         end: '',
//         endDate: '',
//         endTime: '',
//         start: 'Wed, Dec 28, 2022, 3:23 AM',
//         startDate: 'Wed, Dec 28, 2022',
//         startTime: '3:23 AM',
//       });
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, false)).toEqual({
//         duration: '',
//         end: '',
//         endDate: '',
//         endTime: '',
//         start: 'Wed, Dec 28, 2022, 3:23 AM',
//         startDate: 'Wed, Dec 28, 2022',
//         startTime: '3:23 AM',
//       });
//     });

//     it('should return when startTime is empty string', () => {
//       // GIVEN
//       const input = {
//         startTime: '',
//         endTime: new Date(Date.UTC(2022, 11, 28, 3, 23, 16, 738)).toISOString(),
//       };

//       // WHEN & THEN
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, true)).toEqual({
//         duration: '',
//         end: 'Wed, Dec 28, 2022, 3:23 AM',
//         endDate: 'Wed, Dec 28, 2022',
//         endTime: '3:23 AM',
//         start: '',
//         startDate: '',
//         startTime: '',
//       });
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, false)).toEqual({
//         duration: '',
//         end: 'Wed, Dec 28, 2022, 3:23 AM',
//         endDate: 'Wed, Dec 28, 2022',
//         endTime: '3:23 AM',
//         start: '',
//         startDate: '',
//         startTime: '',
//       });
//     });

//     it('should return when both startTime & endTime are empty string', () => {
//       // GIVEN
//       const input = {
//         startTime: '',
//         endTime: '',
//       };

//       // WHEN & THEN
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, true)).toEqual({
//         duration: '',
//         end: '',
//         endDate: '',
//         endTime: '',
//         start: '',
//         startDate: '',
//         startTime: '',
//       });
//       expect(TimeUtil.toFormattedDurationInfo(input.startTime, input.endTime, false)).toEqual({
//         duration: '',
//         end: '',
//         endDate: '',
//         endTime: '',
//         start: '',
//         startDate: '',
//         startTime: '',
//       });
//     });
//   });

//   describe('getStepMinutes', () => {
//     it('returns 10 for "1h"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.ONE_HOUR)).toBe(1);
//     });

//     it('returns 30 for "6h"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.SIX_HOUR)).toBe(5);
//     });

//     it('returns 60 for "1d"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.ONE_DAY)).toBe(30);
//     });

//     it('returns 120 for "2d"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.TWO_DAY)).toBe(60);
//     });

//     it('returns 420 for "7d"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.SEVEN_DAY)).toBe(60);
//     });

//     it('returns 1440 for "2w"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.TWO_WEEK)).toBe(1440);
//     });

//     it('returns 2880 for "1m"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.ONE_MONTH)).toBe(2880);
//     });

//     it('returns 43200 for "6m"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.SIX_MONTH)).toBe(43200);
//     });

//     it('returns 525600 for "1y"', () => {
//       expect(TimeUtil.getStepMinutes(TimeOption.ONE_YEAR)).toBe(525600);
//     });

//     it('returns default value (10) for unknown timeframe', () => {
//       expect(TimeUtil.getStepMinutes('unknown')).toBe(10);
//     });
//   });

//   describe('getTimeframeDifference', () => {
//     it('returns "1h" for a time within the last hour', () => {
//       // GIVEN
//       const currentTimeMinus30Minutes = new Date(Date.now() - 30 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus30Minutes)).toBe(TimeOption.ONE_HOUR);
//     });

//     it('returns "6h" for a time within the last 6 hours', () => {
//       // GIVEN
//       const currentTimeMinus3Hours = new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus3Hours)).toBe(TimeOption.SIX_HOUR);
//     });

//     it('returns "1d" for a time within the last 24 hours', () => {
//       // GIVEN
//       const currentTimeMinus12Hours = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus12Hours)).toBe(TimeOption.ONE_DAY);
//     });

//     it('returns "2d" for a time within the last 2 days', () => {
//       // GIVEN
//       const currentTimeMinus36Hours = new Date(Date.now() - 49 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus36Hours)).toBe(TimeOption.TWO_DAY);
//     });

//     it('returns "7d" for a time within the last 7 days', () => {
//       // GIVEN
//       const currentTimeMinus5Days = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus5Days)).toBe(TimeOption.SEVEN_DAY);
//     });

//     it('returns "2w" for a time within the last 2 weeks', () => {
//       // GIVEN
//       const currentTimeMinus15Days = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus15Days)).toBe(TimeOption.TWO_WEEK);
//     });

//     it('returns "1m" for a time within the last month', () => {
//       // GIVEN
//       const currentTimeMinus20Days = new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus20Days)).toBe(TimeOption.ONE_MONTH);
//     });

//     it('returns "6m" for a time within the last 6 months', () => {
//       // GIVEN
//       const currentTimeMinus4Months = new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus4Months)).toBe(TimeOption.SIX_MONTH);
//     });

//     it('returns "1y" for a time within the last year', () => {
//       // GIVEN
//       const currentTimeMinus9Months = new Date(Date.now() - 13 * 30 * 24 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(currentTimeMinus9Months)).toBe(TimeOption.ONE_YEAR);
//     });

//     it('returns "1y" for a time more than a year ago', () => {
//       // GIVEN
//       const timeMoreThanAYearAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString();

//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference(timeMoreThanAYearAgo)).toBe(TimeOption.ONE_YEAR);
//     });

//     it('returns "1y" for an invalid time format', () => {
//       // WHEN & THEN
//       expect(TimeUtil.getTimeframeDifference('invalid')).toBe(TimeOption.ONE_HOUR);
//     });
//   });

//   describe('getStartTimeFrom', () => {
//     it('should return the correct start time for 1 hour', () => {
//       // GIVEN
//       vi.spyOn(TimeUtil, 'now').mockReturnValue(DateTime.fromISO('2022-02-01T12:00:00.000Z'));
//       const timeAggregateValue = {
//         year: 1,
//       };

//       // WHEN
//       const result = TimeUtil.getStartTimeFrom({ timeAggregateValue });

//       // THEN
//       expect(result).toEqual('2021-02-01T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 1 day', () => {
//       // GIVEN
//       vi.spyOn(TimeUtil, 'now').mockReturnValue(DateTime.fromISO('2022-02-01T12:00:00.000Z'));
//       const timeAggregateValue = {
//         year: 1,
//       };

//       // WHEN
//       const result = TimeUtil.getStartTimeFrom({ timeAggregateValue });

//       // THEN
//       expect(result).toEqual('2021-02-01T12:00:00.000+00:00');
//     });

//     it('should return the correct start time for 30 days', () => {
//       // GIVEN
//       vi.spyOn(TimeUtil, 'now').mockReturnValue(DateTime.fromISO('2022-02-01T12:00:00.000Z'));
//       const timeAggregateValue = {
//         year: 1,
//       };

//       // WHEN
//       const result = TimeUtil.getStartTimeFrom({ timeAggregateValue });

//       // THEN
//       expect(result).toEqual('2021-02-01T12:00:00.000+00:00');
//     });
//   });
});
