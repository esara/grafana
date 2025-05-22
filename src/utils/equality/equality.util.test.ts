import { describe, expect, it } from "vitest";

import { EqualityUtil } from 'utils/equality/equality.util';

describe('EqualityUtil', () => {
  describe('areEqual', () => {
    it('should return true when properties are equal', () => {
      // GIVEN & WHEN
      const isObjectEqual = EqualityUtil.areEqual({ test: 10 }, { test: 10 });

      // THEN
      expect(isObjectEqual).toBe(true);
    });

    it('should return false when properties are not equal', () => {
      // GIVEN & WHEN
      const isObjectEqual = EqualityUtil.areEqual({ test: 10 }, { test: 20 });

      // THEN
      expect(isObjectEqual).toBe(false);
    });

    it('should return true when properties are nested equal', () => {
      // GIVEN & WHEN
      const isObjectEqual = EqualityUtil.areEqual({ test: { value: { level: 1 } } }, { test: { value: { level: 1 } } });

      // THEN
      expect(isObjectEqual).toBe(false);
    });

    it('should return true when properties are nested not equal', () => {
      // GIVEN & WHEN
      const isObjectEqual = EqualityUtil.areEqual(
        { test: { value: { level: 10 } } },
        { test: { value: { level: 1 } } },
      );

      // THEN
      expect(isObjectEqual).toBe(false);
    });
  });

  describe('isEqual', () => {
    it('should return false when objects are not equal', () => {
      // GIVEN
      const obj1 = {
        name: 'test_obj1_name',
        value: 'test_obj1_value',
      };
      const obj2 = {
        name: 'test_obj2_name',
        value: 'test_obj2_value',
      };

      // WHEN & THEN
      expect(EqualityUtil.isEqual(obj1, obj2)).toBe(false);
    });

    it('should return true when objects are equal', () => {
      // GIVEN
      const obj1 = {
        name: 'test_obj1_name',
        value: 'test_obj1_value',
      };
      const obj2 = {
        name: 'test_obj1_name',
        value: 'test_obj1_value',
      };

      // WHEN & THEN
      expect(EqualityUtil.isEqual(obj1, obj2)).toBe(true);
    });

    it('should handle circular references', () => {
      // GIVEN
      const circularObject1 = { a: 1, circularRef: null };
      circularObject1.circularRef = circularObject1;

      const circularObject2 = { a: 1, circularRef: null };
      circularObject2.circularRef = circularObject2;

      // WHEN & THEN
      expect(EqualityUtil.isEqual(circularObject1, circularObject2)).toBe(true);
    });

    it('should handle non-circular references', () => {
      // GIVEN
      const object1 = { a: 1, b: { c: 2 } };
      const object2 = { a: 1, b: { c: 2 } };

      // WHEN & THEN
      expect(EqualityUtil.isEqual(object1, object2)).toBe(true);
    });
  });
});
