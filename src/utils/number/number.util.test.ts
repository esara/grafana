import { NumberUtil } from 'utils/number/number.util';

describe('NumberUtil', () => {
  describe('isNumber', () => {
    it('should return true if the value is a number', () => {
      // WHEN & THEN
      expect(NumberUtil.isNumber(1)).toBe(true);
    });

    it('should return false if the value is not a number', () => {
      // WHEN & THEN
      expect(NumberUtil.isNumber(null)).toBe(false);
      expect(NumberUtil.isNumber(undefined)).toBe(false);
      expect(NumberUtil.isNumber('test' as any)).toBe(false);
    });
  });

  describe('isNotNumber', () => {
    it('should return false if the value is a number', () => {
      // WHEN & THEN
      expect(NumberUtil.isNotNumber(1)).toBe(false);
    });

    it('should return true if the value is not a number', () => {
      // WHEN & THEN
      expect(NumberUtil.isNotNumber(null)).toBe(true);
      expect(NumberUtil.isNotNumber(undefined)).toBe(true);
      expect(NumberUtil.isNotNumber('test' as any)).toBe(true);
    });
  });

  describe('isInfinity', () => {
    it('should return true if the value is a Negative Infinity', () => {
      // WHEN & THEN
      expect(NumberUtil.isInfinity(Number.NEGATIVE_INFINITY)).toBe(true);
      expect(NumberUtil.isInfinity(Number.POSITIVE_INFINITY)).toBe(true);
    });

    it('should return false if the value is not a number', () => {
      // WHEN & THEN
      expect(NumberUtil.isInfinity(1)).toBe(false);
      expect(NumberUtil.isInfinity(null)).toBe(false);
      expect(NumberUtil.isInfinity(undefined)).toBe(false);
      expect(NumberUtil.isInfinity('test' as any)).toBe(false);
    });
  });

  describe('mustGetNumber', () => {
    it('should return the number if the value is a number', () => {
      // WHEN & THEN
      expect(NumberUtil.mustGetNumber(1)).toBe(1);
    });

    it('should return 0 if the value is not a number', () => {
      // WHEN & THEN
      expect(NumberUtil.mustGetNumber(null)).toBe(0);
      expect(NumberUtil.mustGetNumber(undefined)).toBe(0);
      expect(NumberUtil.mustGetNumber('test' as any)).toBe(0);
    });
  });
});
