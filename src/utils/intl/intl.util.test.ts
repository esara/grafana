// const staticDate = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));

describe('IntlUtil', () => {
//   describe('getLanguage', () => {
//     it('should return en-US if navigator.language is en-US', () => {
//       // GIVEN
//       vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.getLanguage()).toEqual('en-US');
//     });
//   });

//   describe('translate', () => {
//     it('should return translated string for language = en-US', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.translate('test')).toEqual('test');
//     });
//   });

//   describe('changeLanguage', () => {
//     it('should change language', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');
//       vi.spyOn(i18next, 'changeLanguage');

//       // WHEN
//       IntlUtil.changeLanguage('fr-FR');

//       // THEN
//       expect(i18next.changeLanguage).toHaveBeenCalledWith('fr-FR', undefined);
//     });
//   });

//   describe('getDirection', () => {
//     it('should return ltr if language is en-US', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.getDirection()).toEqual('ltr');
//     });

//     it('should return rtl if language is ar-YE', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('ar-YE');

//       // WHEN & THEN
//       expect(IntlUtil.getDirection()).toEqual('rtl');
//     });
//   });

//   describe('toPercentage', () => {
//     it.each([
//       ['en-US', ['75%', '100%', '120%']],
//       ['ja-JP', ['75%', '100%', '120%']],
//       ['fr-FR', ['75 %', '100 %', '120 %']],
//     ])('should return formatted number for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toPercentage(0.75)).toEqual(values[0]);
//       expect(IntlUtil.toPercentage(1)).toEqual(values[1]);
//       expect(IntlUtil.toPercentage(1.2)).toEqual(values[2]);
//     });

//     it('should return N/A if value=N/A', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.toPercentage(null)).toEqual('');
//     });

//     it('should return empty string if value is not a number', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.toPercentage('')).toEqual('');
//     });
//   });

//   describe('toNumber', () => {
//     it.each([
//       ['en-US', ['20', '256', '1.2K', '99K', '100K', '123K', '12M', '12B']],
//       ['ja-JP', ['20', '256', '1234', '9.9万', '10万', '12万', '1235万', '123億']],
//       ['fr-FR', ['20', '256', '1,2 k', '99 k', '100 k', '123 k', '12 M', '12 Md']],
//     ])('should return formatted number for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toNumber(20)).toEqual(values[0]);
//       expect(IntlUtil.toNumber(256)).toEqual(values[1]);
//       expect(IntlUtil.toNumber(1234)).toEqual(values[2]);
//       expect(IntlUtil.toNumber(99087)).toEqual(values[3]);
//       expect(IntlUtil.toNumber(100000)).toEqual(values[4]);
//       expect(IntlUtil.toNumber(123456)).toEqual(values[5]);
//       expect(IntlUtil.toNumber(12345678)).toEqual(values[6]);
//       expect(IntlUtil.toNumber(12345678987)).toEqual(values[7]);
//     });

//     it('should return N/A if value=N/A', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.toNumber(null)).toEqual('');
//     });

//     it('should return empty string if value is not a number', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.toNumber('')).toEqual('');
//     });
//   });

//   describe('toNumberWithUnit', () => {
//     it.each([
//       ['en-US', 'mb/s', ['20 mb/s', '256 mb/s', '1,234 mb/s', '99,087 mb/s']],
//       ['ja-JP', 'mb/s', ['20 mb/s', '256 mb/s', '1,234 mb/s', '99,087 mb/s']],
//       ['fr-FR', 'mb/s', ['20 mb/s', '256 mb/s', '1 234 mb/s', '99 087 mb/s']],
//     ])(
//       'should return formatted number with units for language = %s & unit = %s',
//       (langKey: string, unit: string, values: string[]) => {
//         // GIVEN
//         vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//         // WHEN
//         const results = [
//           IntlUtil.toNumberWithUnit(20, unit),
//           IntlUtil.toNumberWithUnit(256, unit),
//           IntlUtil.toNumberWithUnit(1234, unit),
//           IntlUtil.toNumberWithUnit(99087, unit),
//         ];

//         // THEN
//         expect(results[0]).toEqual(values[0]);
//         expect(results[1]).toEqual(values[1]);
//         expect(results[2]).toEqual(values[2]);
//         expect(results[3]).toEqual(values[3]);
//       },
//     );

//     it('should return N/A if value=N/A', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.toNumberWithUnit(null, null)).toEqual('');
//     });

//     it('should return empty string if value is not a number', () => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');

//       // WHEN & THEN
//       expect(IntlUtil.toNumberWithUnit('', null)).toEqual('');
//     });
//   });

//   describe('toDate', () => {
//     it.each([
//       ['en-US', 'Sun, Dec 20, 2020'],
//       ['ja-JP', '2020年12月20日(日)'],
//       ['fr-FR', 'dim. 20 déc. 2020'],
//     ])('should return formatted date for language = %s', (langKey: string, value: string) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toDate(staticDate)).toEqual(value);
//     });

//     it.each([
//       ['en-US', 'Sun, Dec 20, 2020, Australian Eastern Daylight Time'],
//       ['ja-JP', '2020年12月20日(日) オーストラリア東部夏時間'],
//       ['fr-FR', 'dim. 20 déc. 2020, heure d’été de l’Est de l’Australie'],
//     ])('should return formatted date with timeZone for language = %s', (langKey: string, value: string) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//       const timeZone = 'Australia/Sydney';

//       // WHEN & THEN
//       expect(IntlUtil.toDate(staticDate, timeZone)).toEqual(value);
//     });
//   });

//   describe('toTime', () => {
//     it.each([
//       ['en-US', '3:23 AM'],
//       ['ja-JP', '3:23'],
//       ['fr-FR', '03:23'],
//     ])('should return formatted time for language = %s', (langKey: string, value: string) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toTime(staticDate)).toEqual(value);
//     });

//     it.each([
//       ['en-US', '2:23 PM Australian Eastern Daylight Time'],
//       ['ja-JP', '14:23 オーストラリア東部夏時間'],
//       ['fr-FR', '14:23 heure d’été de l’Est de l’Australie'],
//     ])('should return formatted time with timeZone for language = %s', (langKey: string, value: string) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//       const timeZone = 'Australia/Sydney';

//       // WHEN & THEN
//       expect(IntlUtil.toTime(staticDate, timeZone)).toEqual(value);
//     });
//   });

//   describe('toDateAndTime', () => {
//     it.each([
//       ['en-US', 'Sun, Dec 20, 2020, 3:23 AM'],
//       ['ja-JP', '2020年12月20日(日) 3:23'],
//       ['fr-FR', 'dim. 20 déc. 2020, 03:23'],
//     ])('should return formatted date and time for language = %s', (langKey: string, value: string) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toDateAndTime(staticDate)).toEqual(value);
//     });

//     it.each([
//       ['en-US', 'Sun, Dec 20, 2020, 2:23 PM Australian Eastern Daylight Time'],
//       ['ja-JP', '2020年12月20日(日) 14:23 オーストラリア東部夏時間'],
//       ['fr-FR', 'dim. 20 déc. 2020, 14:23 heure d’été de l’Est de l’Australie'],
//     ])('should return formatted date and time with timeZone for language = %s', (langKey: string, value: string) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//       const timeZone = 'Australia/Sydney';

//       // WHEN & THEN
//       expect(IntlUtil.toDateAndTime(staticDate, timeZone)).toEqual(value);
//     });
//   });

//   describe('toRelativeScaledTime', () => {
//     it.each([
//       ['en-US', ['in 2 years', '2 months ago', 'yesterday', 'now']],
//       ['ja-JP', ['2 年後', '2 か月前', '昨日', '今']],
//       ['fr-FR', ['dans 2 ans', 'il y a 2 mois', 'hier', 'maintenant']],
//     ])('should return formatted relative years for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toRelativeScaledTime(new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[0],
//       );
//       expect(IntlUtil.toRelativeScaledTime(new Date(Date.UTC(2020, 10, 15, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[1],
//       );
//       expect(IntlUtil.toRelativeScaledTime(new Date(Date.UTC(2020, 11, 19, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[2],
//       );
//       expect(IntlUtil.toRelativeScaledTime(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[3],
//       );
//     });
//   });

//   describe('toRelativeYears', () => {
//     it.each([
//       ['en-US', ['in 2 years', 'this year', 'this year', 'this year']],
//       ['ja-JP', ['2 年後', '今年', '今年', '今年']],
//       ['fr-FR', ['dans 2 ans', 'cette année', 'cette année', 'cette année']],
//     ])('should return formatted relative years for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toRelativeYears(new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[0]);
//       expect(IntlUtil.toRelativeYears(new Date(Date.UTC(2020, 10, 15, 3, 23, 16, 738)), staticDate)).toEqual(values[1]);
//       expect(IntlUtil.toRelativeYears(new Date(Date.UTC(2020, 11, 19, 3, 23, 16, 738)), staticDate)).toEqual(values[2]);
//       expect(IntlUtil.toRelativeYears(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[3]);
//     });
//   });

//   describe('toRelativeMonth', () => {
//     it.each([
//       ['en-US', ['in 24 months', 'last month', 'this month', 'this month']],
//       ['ja-JP', ['24 か月後', '先月', '今月', '今月']],
//       ['fr-FR', ['dans 24 mois', 'le mois dernier', 'ce mois-ci', 'ce mois-ci']],
//     ])('should return formatted relative months for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toRelativeMonth(new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[0]);
//       expect(IntlUtil.toRelativeMonth(new Date(Date.UTC(2020, 10, 15, 3, 23, 16, 738)), staticDate)).toEqual(values[1]);
//       expect(IntlUtil.toRelativeMonth(new Date(Date.UTC(2020, 11, 19, 3, 23, 16, 738)), staticDate)).toEqual(values[2]);
//       expect(IntlUtil.toRelativeMonth(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[3]);
//     });
//   });

//   describe('toRelativeDays', () => {
//     it.each([
//       ['en-US', ['in 730 days', '35 days ago', 'yesterday', 'today']],
//       ['ja-JP', ['730 日後', '35 日前', '昨日', '今日']],
//       ['fr-FR', ['dans 730 jours', 'il y a 35 jours', 'hier', 'aujourd’hui']],
//     ])('should return formatted relative days for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toRelativeDays(new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[0]);
//       expect(IntlUtil.toRelativeDays(new Date(Date.UTC(2020, 10, 15, 3, 23, 16, 738)), staticDate)).toEqual(values[1]);
//       expect(IntlUtil.toRelativeDays(new Date(Date.UTC(2020, 11, 19, 3, 23, 16, 738)), staticDate)).toEqual(values[2]);
//       expect(IntlUtil.toRelativeDays(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[3]);
//     });
//   });

//   describe('toRelativeHours', () => {
//     it.each([
//       ['en-US', ['in 17,520 hours', '840 hours ago', '24 hours ago', 'this hour']],
//       ['ja-JP', ['17,520 時間後', '840 時間前', '24 時間前', '1 時間以内']],
//       ['fr-FR', ['dans 17 520 heures', 'il y a 840 heures', 'il y a 24 heures', 'cette heure-ci']],
//     ])('should return formatted relative hours for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toRelativeHours(new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[0]);
//       expect(IntlUtil.toRelativeHours(new Date(Date.UTC(2020, 10, 15, 3, 23, 16, 738)), staticDate)).toEqual(values[1]);
//       expect(IntlUtil.toRelativeHours(new Date(Date.UTC(2020, 11, 19, 3, 23, 16, 738)), staticDate)).toEqual(values[2]);
//       expect(IntlUtil.toRelativeHours(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(values[3]);
//     });
//   });

//   describe('toRelativeMinutes', () => {
//     it.each([
//       ['en-US', ['in 1,051,200 minutes', '50,400 minutes ago', '1,440 minutes ago', 'this minute']],
//       ['ja-JP', ['1,051,200 分後', '50,400 分前', '1,440 分前', '1 分以内']],
//       ['fr-FR', ['dans 1 051 200 minutes', 'il y a 50 400 minutes', 'il y a 1 440 minutes', 'cette minute-ci']],
//     ])('should return formatted relative minutes for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toRelativeMinutes(new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[0],
//       );
//       expect(IntlUtil.toRelativeMinutes(new Date(Date.UTC(2020, 10, 15, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[1],
//       );
//       expect(IntlUtil.toRelativeMinutes(new Date(Date.UTC(2020, 11, 19, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[2],
//       );
//       expect(IntlUtil.toRelativeMinutes(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[3],
//       );
//     });
//   });

//   describe('toRelativeSeconds', () => {
//     it.each([
//       ['en-US', ['in 63,072,000 seconds', '3,024,000 seconds ago', '86,400 seconds ago', 'now']],
//       ['ja-JP', ['63,072,000 秒後', '3,024,000 秒前', '86,400 秒前', '今']],
//       ['fr-FR', ['dans 63 072 000 secondes', 'il y a 3 024 000 secondes', 'il y a 86 400 secondes', 'maintenant']],
//     ])('should return formatted relative seconds for language = %s', (langKey: string, values: string[]) => {
//       // GIVEN
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);

//       // WHEN & THEN
//       expect(IntlUtil.toRelativeSeconds(new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[0],
//       );
//       expect(IntlUtil.toRelativeSeconds(new Date(Date.UTC(2020, 10, 15, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[1],
//       );
//       expect(IntlUtil.toRelativeSeconds(new Date(Date.UTC(2020, 11, 19, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[2],
//       );
//       expect(IntlUtil.toRelativeSeconds(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738)), staticDate)).toEqual(
//         values[3],
//       );
//     });
//   });

//   describe('toDurationDifference', () => {
//     it.each([
//       ['en-US', ['1 year, 8 days, 1 hour, 30 minutes, 4 seconds', '1 year, 8 days']],
//       ['ja-JP', ['1 年、8 日、1 時間、30 分、4 秒', '1 年、8 日']],
//       ['fr-FR', ['1 an, 8 jours, 1 heure, 30 minutes, 4 secondes', '1 an, 8 jours']],
//     ])(
//       'should return when both startTime and endTime are provided with year difference for language = %s',
//       (langKey: string, values: string[]) => {
//         // GIVEN
//         vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//         const input = {
//           startTime: new Date(Date.UTC(2022, 11, 20, 3, 23, 16, 738)),
//           endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)),
//         };

//         // WHEN & THEN
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, true)).toEqual(values[0]);
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, false)).toEqual(values[1]);
//       },
//     );

//     it.each([
//       ['en-US', ['1 month, 8 days, 1 hour, 30 minutes, 4 seconds', '1 month, 8 days']],
//       ['ja-JP', ['1 か月、8 日、1 時間、30 分、4 秒', '1 か月、8 日']],
//       ['fr-FR', ['1 mois, 8 jours, 1 heure, 30 minutes, 4 secondes', '1 mois, 8 jours']],
//     ])(
//       'should return when both startTime and endTime are provided with month difference for language = %s',
//       (langKey: string, values: string[]) => {
//         // GIVEN
//         vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//         const input = {
//           startTime: new Date(Date.UTC(2023, 10, 20, 3, 23, 16, 738)),
//           endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)),
//         };

//         // WHEN & THEN
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, true)).toEqual(values[0]);
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, false)).toEqual(values[1]);
//       },
//     );

//     it.each([
//       ['en-US', ['8 days, 1 hour, 30 minutes, 4 seconds', '8 days, 1 hour']],
//       ['ja-JP', ['8 日、1 時間、30 分、4 秒', '8 日、1 時間']],
//       ['fr-FR', ['8 jours, 1 heure, 30 minutes, 4 secondes', '8 jours, 1 heure']],
//     ])(
//       'should return when both startTime and endTime are provided with days difference for language = %s',
//       (langKey: string, values: string[]) => {
//         // GIVEN
//         vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//         const input = {
//           startTime: new Date(Date.UTC(2023, 11, 20, 3, 23, 16, 738)),
//           endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)),
//         };

//         // WHEN & THEN
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, true)).toEqual(values[0]);
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, false)).toEqual(values[1]);
//       },
//     );

//     it.each([
//       ['en-US', ['1 year, 1 hour, 30 minutes, 4 seconds', '1 year, 1 hour']],
//       ['ja-JP', ['1 年、1 時間、30 分、4 秒', '1 年、1 時間']],
//       ['fr-FR', ['1 an, 1 heure, 30 minutes, 4 secondes', '1 an, 1 heure']],
//     ])(
//       'should return when both startTime and endTime are provided with hours difference for language = %s',
//       (langKey: string, values: string[]) => {
//         // GIVEN
//         vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//         const input = {
//           startTime: new Date(Date.UTC(2022, 11, 28, 3, 23, 16, 738)),
//           endTime: new Date(Date.UTC(2023, 11, 28, 4, 53, 20, 740)),
//         };

//         // WHEN & THEN
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, true)).toEqual(values[0]);
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, false)).toEqual(values[1]);
//       },
//     );

//     it.each([
//       ['en-US', ['', '']],
//       ['ja-JP', ['', '']],
//       ['fr-FR', ['', '']],
//     ])(
//       'should return when both startTime and endTime are provided with no difference for language = %s',
//       (langKey: string, values: string[]) => {
//         // GIVEN
//         vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue(langKey);
//         const input = {
//           startTime: new Date(Date.UTC(2022, 11, 28, 3, 23, 16, 738)),
//           endTime: new Date(Date.UTC(2022, 11, 28, 3, 23, 16, 738)),
//         };

//         // WHEN & THEN
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, true)).toEqual(values[0]);
//         expect(IntlUtil.toDurationDifference(input.startTime, input.endTime, false)).toEqual(values[1]);
//       },
//     );
//   });

//   describe('secondsToDuration', () => {
//     it('should return formatted duration for 0 seconds', () => {
//       // GIVEN
//       const seconds = 0;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToDuration(seconds)).toEqual('');
//     });

//     it('should return formatted duration for 24212 seconds', () => {
//       // GIVEN
//       const seconds = 24212;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToDuration(seconds)).toEqual('6 h, 43 min');
//     });
//   });

//   describe('secondsToHours', () => {
//     beforeEach(() => {
//       vi.spyOn(IntlUtil, 'getLanguage').mockReturnValue('en-US');
//     });

//     it('should return formatted hours for 0 seconds', () => {
//       // GIVEN
//       const seconds = 0;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToHours(seconds)).toEqual('0 hr');
//     });

//     it('should return formatted hours for 24212 seconds', () => {
//       // GIVEN
//       const seconds = 24212;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToHours(seconds)).toEqual('6.726 hr');
//     });

//     it('should return formatted hours for 3600 seconds', () => {
//       // GIVEN
//       const seconds = 3600;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToHours(seconds)).toEqual('1 hr');
//     });

//     it('should return formatted hours for 3661 seconds', () => {
//       // GIVEN
//       const seconds = 3661;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToHours(seconds)).toEqual('1.017 hr');
//     });

//     it('should return formatted hours for negative seconds', () => {
//       // GIVEN
//       const seconds = -3661;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToHours(seconds)).toEqual('-1.017 hr');
//     });

//     it('should return formatted hours for null seconds', () => {
//       // GIVEN
//       const seconds = null;

//       // WHEN & THEN
//       expect(IntlUtil.secondsToHours(seconds)).toEqual('0 hr');
//     });
//   });
});
