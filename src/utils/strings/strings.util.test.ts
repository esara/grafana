
import { StringsUtil } from './strings.util';

describe('StringsUtil', () => {
  describe('isString', () => {
    it('should return true when input is a string', () => {
      expect(StringsUtil.isString('cats')).toBe(true);
      expect(StringsUtil.isString('')).toBe(true);
    });

    it('should return false when input is undefined/null', () => {
      expect(StringsUtil.isString(undefined)).toBe(false);
      expect(StringsUtil.isString(null)).toBe(false);
    });

    it('should return false when input not a string', () => {
      expect(StringsUtil.isString({})).toBe(false);
      expect(StringsUtil.isString(8)).toBe(false);
      expect(StringsUtil.isString(false)).toBe(false);
      expect(StringsUtil.isString(NaN)).toBe(false);
      expect(StringsUtil.isString(() => 'cats')).toBe(false);
      expect(StringsUtil.isString(new Date())).toBe(false);
    });
  });

  describe('trimToEmptyString', () => {
    it('should return empty string for unset values', () => {
      expect(StringsUtil.trimToEmptyString(null)).toBe('');
      expect(StringsUtil.trimToEmptyString(undefined)).toBe('');
      expect(StringsUtil.trimToEmptyString(NaN as never)).toBe('');
    });

    it('should trim leading and trailing whitespace', () => {
      expect(StringsUtil.trimToEmptyString('\n\tfoo bar\n\t')).toBe('foo bar');
    });

    it('should convert non-numeric values to string', () => {
      expect(StringsUtil.trimToEmptyString(123 as never)).toBe('123');
      expect(StringsUtil.trimToEmptyString([1, 2, 3] as never)).toBe('1,2,3');
    });
  });

  describe('isBlank', () => {
    it('should return true if the string is only white space', () => {
      expect(StringsUtil.isBlank('')).toBe(true);
      expect(StringsUtil.isBlank('   ')).toBe(true);
      expect(StringsUtil.isBlank('\n\t   \r\n')).toBe(true);
    });

    it('should return false if the string contains non-white-space characters', () => {
      expect(StringsUtil.isBlank(' abc ')).toBe(false);
    });

    it('should be null and type safe', () => {
      expect(StringsUtil.isBlank(null)).toBe(true);
      expect(StringsUtil.isBlank(undefined)).toBe(true);
      expect(StringsUtil.isBlank(NaN as never)).toBe(true);

      expect(StringsUtil.isBlank([] as never)).toBe(true);
      expect(StringsUtil.isBlank({} as never)).toBe(false);
      expect(StringsUtil.isBlank(123 as never)).toBe(false);
    });
  });

  describe('isNotBlank', () => {
    it('should return false if the string is only white space', () => {
      expect(StringsUtil.isNotBlank('')).toBe(false);
      expect(StringsUtil.isNotBlank('   ')).toBe(false);
      expect(StringsUtil.isNotBlank('\n\t   \r\n')).toBe(false);
    });

    it('should return true if the string contains non-white-space characters', () => {
      expect(StringsUtil.isNotBlank(' abc ')).toBe(true);
    });

    it('should be null and type safe', () => {
      expect(StringsUtil.isNotBlank(null)).toBe(false);
      expect(StringsUtil.isNotBlank(undefined)).toBe(false);
      expect(StringsUtil.isNotBlank(NaN as never)).toBe(false);

      expect(StringsUtil.isNotBlank([] as never)).toBe(false);
      expect(StringsUtil.isNotBlank({} as never)).toBe(true);
      expect(StringsUtil.isNotBlank(123 as never)).toBe(true);
    });
  });

  describe('splitCamelCase', () => {
    it('should return empty when input is not a valid string', () => {
      expect(StringsUtil.splitCamelCase('')).toEqual('');
      expect(StringsUtil.splitCamelCase(12 as never)).toEqual('');
    });

    it('should return camel case converted to a sentence', () => {
      expect(StringsUtil.splitCamelCase('CamelCaseStringToBeFormatted')).toEqual('Camel Case String To Be Formatted');
      expect(StringsUtil.splitCamelCase('Camel_Case_String_To_Be_Formatted')).toEqual(
        'Camel Case String To Be Formatted',
      );
    });

    it('should split camel case words correctly and preserve "IOps" as a single word', () => {
      // GIVEN
      const input = 'WriteIOps_Congested';

      // WHEN
      const result = StringsUtil.splitCamelCase(input);

      // THEN
      expect(result).toEqual('Write IOps Congested');
    });

    it('should handle a string with multiple IOps instances correctly', () => {
      // GIVEN
      const input = 'ReadIOps_WriteIOps_Congested';

      // WHEN
      const result = StringsUtil.splitCamelCase(input);

      // THEN
      expect(result).toEqual('Read IOps Write IOps Congested');
    });

    it('should handle a string where IOps is part of a longer word', () => {
      // GIVEN
      const input = 'HandleIOpsMetrics';

      // WHEN
      const result = StringsUtil.splitCamelCase(input);

      // THEN
      expect(result).toEqual('Handle IOps Metrics');
    });
  });

  // describe('startsWith', () => {
  //   describe('startsWith - case-sensitive (default)', () => {
  //     it.each([
  //       ['helloworld', 'hello', true],
  //       ['Helloworld', 'hello', false], // not matched due to case-sensitive matching
  //       ['shelloworld', 'hello', false],
  //       [' helloworld', 'hello', false],
  //       [ undefined, 'hello', false],
  //       [ undefined, undefined, false],
  //     ])('should test if "%s" === "%s" case', (s1: string, s2: string, expected: boolean) => {

  //       expect(StringsUtil.startsWith(s1, s2)).toEqual(expected);
  //     });
  //   });
  //   describe('startsWith - not case-sensitive', () => {
  //     it.each([
  //       ['helloworld', 'hello', true],
  //       ['Helloworld', 'hello', true],
  //     ])('should test if "%s" === "%s" case (ignore case sensitivity)', (s1: string, s2: string, expected: boolean) => {
  //       expect(StringsUtil.startsWith(s1, s2, true)).toEqual(expected);
  //     });
  //   });
  // })

  // describe('equals', () => {
  //   it.each([
  //     ['hello', 'Hello', false],
  //     ['world', 'WORLD', false],
  //     ['abc', 'def', false],
  //     ['same', 'same', true],
  //     ['', '', true],
  //     [null, 'null', false],
  //     [undefined, 'undefined', false],
  //   ])('should test if "%s" === "%s" case', (s1: string, s2: string, expected: boolean) => {
  //     // WHEN
  //     const isEqual = StringsUtil.equals(s1, s2);

  //     // THEN
  //     expect(isEqual).toBe(expected);
  //   });
  // });

  // describe('notEquals', () => {
  //   it.each([
  //     ['hello', 'Hell', true],
  //     ['world', 'WORL', true],
  //     ['abc', 'def', true],
  //     ['same', 'same', false],
  //     ['', '', false],
  //     [null, 'null', true],
  //     [undefined, 'undefined', true],
  //   ])('should test if "%s" !== "%s" case', (s1: string, s2: string, expected: boolean) => {
  //     // WHEN
  //     const isEqual = StringsUtil.notEquals(s1, s2);

  //     // THEN
  //     expect(isEqual).toBe(expected);
  //   });
  // });

  // describe('equalsIgnoreCase', () => {
  //   it.each([
  //     ['hello', 'Hello', true],
  //     ['world', 'WORLD', true],
  //     ['abc', 'def', false],
  //     ['same', 'same', true],
  //     ['', '', true],
  //     [null, 'null', false],
  //     [undefined, 'undefined', false],
  //   ])('should test if "%s" === "%s" ignoring case', (s1: string, s2: string, expected: boolean) => {
  //     // WHEN
  //     const isEqual = StringsUtil.equalsIgnoreCase(s1, s2);

  //     // THEN
  //     expect(isEqual).toBe(expected);
  //   });
  // });

  // describe('notEqualsIgnoreCase', () => {
  //   it.each([
  //     ['hello', 'Hell', true],
  //     ['hello', 'Hello', false],
  //     ['world', 'WORL', true],
  //     ['abc', 'def', true],
  //     ['same', 'same', false],
  //     ['', '', false],
  //     [null, 'null', true],
  //     [undefined, 'undefined', true],
  //   ])('should test if "%s" !== "%s" ignoring case', (s1: string, s2: string, expected: boolean) => {
  //     // WHEN
  //     const isEqual = StringsUtil.notEqualsIgnoreCase(s1, s2);

  //     // THEN
  //     expect(isEqual).toBe(expected);
  //   });
  // });

  // describe('contains', () => {
  //   it.each([
  //     ['Hello, world!', 'hello', false],
  //     ['This is a test', 'test', true],
  //     ['Case Sensitive', 'Sensitive', true],
  //     ['abc', 'def', false],
  //     ['', '', true],
  //     [null, 'null', false],
  //     [undefined, 'undefined', false],
  //   ])('should test if "%s" contains "%s" ignoring case', (s1: string, s2: string, expected: boolean) => {
  //     // WHEN
  //     const isEqual = StringsUtil.contains(s1, s2);

  //     // THEN
  //     expect(isEqual).toBe(expected);
  //   });
  // });

  // describe('containsIgnoreCase', () => {
  //   it.each([
  //     ['Hello, world!', 'hello', true],
  //     ['This is a test', 'test', true],
  //     ['Case Sensitive', 'Sensitive', true],
  //     ['abc', 'def', false],
  //     ['', '', true],
  //     [null, 'null', false],
  //     [undefined, 'undefined', false],
  //   ])('should test if "%s" contains "%s" ignoring case', (s1: string, s2: string, expected: boolean) => {
  //     // WHEN
  //     const isEqual = StringsUtil.containsIgnoreCase(s1, s2);

  //     // THEN
  //     expect(isEqual).toBe(expected);
  //   });
  // });

  describe('getFirstItemOfPath', () => {
    it('should return the first item of a path', () => {
      expect(StringsUtil.getFirstItemOfPath('a/b/c')).toEqual('a');
    });

    it('should return the input if it is not a string', () => {
      expect(StringsUtil.getFirstItemOfPath(123 as never)).toEqual(123);
    });
  });

  describe('getLastItemOfPath', () => {
    it('should return the last item of a path', () => {
      expect(StringsUtil.getLastItemOfPath('a/b/c')).toEqual('c');
    });

    it('should return the input if it is not a string', () => {
      expect(StringsUtil.getLastItemOfPath(123 as never)).toEqual(123);
    });
  });

  describe('getFolderOfPath', () => {
    it('should return the folder of a path', () => {
      expect(StringsUtil.getFolderOfPath('a/b/c')).toEqual('a/b');
    });

    it('should return the input if it is not a string', () => {
      expect(StringsUtil.getFolderOfPath(123 as never)).toEqual(123);
    });
  });

  describe('getPathExceptFirstItem', () => {
    it('should return the path without first item', () => {
      expect(StringsUtil.getPathExceptFirstItem('a/b/c')).toEqual('b/c');
    });

    it('should return the input if it is not a string', () => {
      expect(StringsUtil.getPathExceptFirstItem(123 as never)).toEqual(123);
    });
  });

  describe('firstToUpperCase', () => {
    it('should return the first character of a string capitalized', () => {
      expect(StringsUtil.firstToUpperCase('hello')).toEqual('Hello');
    });

    it('should return the input if it is not a string', () => {
      expect(StringsUtil.firstToUpperCase(123 as never)).toEqual(123);
    });
  });

  describe('firstToLowerCase', () => {
    it('should return the first character of a string lowercased', () => {
      expect(StringsUtil.firstToLowerCase('Hello')).toEqual('hello');
    });

    it('should return the input if it is not a string', () => {
      expect(StringsUtil.firstToLowerCase(123 as never)).toEqual(123);
    });
  });

  describe('toBoolean', () => {
    it('should return true for "true" and false for "false"', () => {
      expect(StringsUtil.toBoolean('true')).toBe(true);
      expect(StringsUtil.toBoolean('false')).toBe(false);
    });
  });

  describe('truncateMid', () => {
    it('should return the input if it is not a string', () => {
      expect(StringsUtil.truncateMid(123 as never)).toEqual(123);
    });

    it('should return the input if it is blank', () => {
      expect(StringsUtil.truncateMid('')).toEqual('');
    });

    it('should return the input if it is shorter than the max length', () => {
      expect(StringsUtil.truncateMid('hello', 10)).toEqual('hello');
    });

    it('should return the input truncated to the max length', () => {
      expect(StringsUtil.truncateMid('hello world', 25)).toEqual('hello world');
      expect(StringsUtil.truncateMid('abs-ss-dede', 25)).toEqual('abs-ss-dede');
      expect(StringsUtil.truncateMid('konnectivity-agent-64959bbbbb-s5s94', 25)).toEqual('konnecti...bb-s5s94');
      expect(StringsUtil.truncateMid('abs.ss.dede', 25)).toEqual('abs.ss.dede');
      expect(StringsUtil.truncateMid('konnectivity.agent.64959bbbbb.s5s94', 25)).toEqual('konnecti...bb.s5s94');
      expect(StringsUtil.truncateMid('konnect.ivity.ag.ent.649.59b.bb.bb.s5s9.4', 25)).toEqual('konnect...b.s5s9.4');
      expect(StringsUtil.truncateMid('abcdefghijklmnopqrstuvwxyz', 25)).toEqual('abcdefgh...stuvwxyz');
    });
  });

  describe('compare', () => {
    it('should return 1 for identical strings', () => {
      expect(StringsUtil.compare('hello', 'hello')).toBe(1);
    });

    it('should return 0 for completely different strings', () => {
      expect(StringsUtil.compare('hello', 'world')).toBe(0);
    });

    it('should return a value between 0 and 1 for similar but not identical strings', () => {
      // WHEN
      const result = StringsUtil.compare('hello', 'helo');

      // THEN
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should return a similarity score of 0 for empty strings', () => {
      expect(StringsUtil.compare('', '')).toBe(0);
      expect(StringsUtil.compare('hello', '')).toBe(0);
      expect(StringsUtil.compare('', 'world')).toBe(0);
    });

    it('should return the correct similarity for strings with common bigrams', () => {
      expect(StringsUtil.compare('hello', 'hell')).toEqual(0.85714);
    });

    it('should handle case insensitivity', () => {
      expect(StringsUtil.compare('Hello', 'hello')).toBe(1);
      expect(StringsUtil.compare('Hello', 'HELLO')).toBe(1);
    });

    it('should work for single-character strings', () => {
      expect(StringsUtil.compare('a', 'a')).toBe(1);
      expect(StringsUtil.compare('a', 'b')).toBe(0);
    });
  });
});
