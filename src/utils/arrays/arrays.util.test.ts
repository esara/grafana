import { ArraysUtil } from './arrays.util';

describe('ArraysUtil', () => {
  describe('isArray', () => {
    it('should return false when given something that is not an array', () => {
      // GIVEN
      const a = 'cats' as unknown as unknown[];
      const b = 9 as unknown as unknown[];
      const c = { cats: 'dogs' } as unknown as unknown[];
      const d = undefined;
      const e = null;

      // WHEN & THEN
      expect(ArraysUtil.isArray(a)).toBe(false);
      expect(ArraysUtil.isArray(b)).toBe(false);
      expect(ArraysUtil.isArray(c)).toBe(false);
      expect(ArraysUtil.isArray(d)).toBe(false);
      expect(ArraysUtil.isArray(e)).toBe(false);
    });

    it('should return true when given an empty array', () => {
      // GIVEN
      const a: never[] = [];

      // WHEN & THEN
      expect(ArraysUtil.isArray(a)).toBe(true);
    });

    it('should return true when given an array with items', () => {
      // GIVEN
      const a = ['cats', 'dogs'];
      const b = [{ cats: 'dogs' }];

      // WHEN & THEN
      expect(ArraysUtil.isArray(a)).toBe(true);
      expect(ArraysUtil.isArray(b)).toBe(true);
    });
  });

  describe('size', () => {
    it('should correctly return the size of the array', () => {
      // GIVEN
      const array = [1, 2, 3, 4, 5];

      // WHEN
      const size = ArraysUtil.size(array);

      // THEN
      expect(size).toBe(5);
    });

    it('should return 0 when the array is null', () => {
      // GIVEN
      const array = null;

      // WHEN
      const size = ArraysUtil.size(array);

      // THEN
      expect(size).toBe(0);
    });

    it('should return 0 when the array is undefined', () => {
      // GIVEN
      const array = undefined;

      // WHEN
      const size = ArraysUtil.size(array);

      // THEN
      expect(size).toBe(0);
    });
  });

  describe('isEmpty', () => {
    it('should return true when given something that is not an array', () => {
      // GIVEN
      const a = 'cats' as unknown as unknown[];
      const b = 9 as unknown as unknown[];
      const c = { cats: 'dogs' } as unknown as unknown[];
      const d = undefined;
      const e = null;

      // WHEN & THEN
      expect(ArraysUtil.isEmpty(a)).toBe(true);
      expect(ArraysUtil.isEmpty(b)).toBe(true);
      expect(ArraysUtil.isEmpty(c)).toBe(true);
      expect(ArraysUtil.isEmpty(d)).toBe(true);
      expect(ArraysUtil.isEmpty(e)).toBe(true);
    });

    it('should return true when given an empty array', () => {
      // GIVEN
      const a: never[] = [];

      // WHEN & THEN
      expect(ArraysUtil.isEmpty(a)).toBe(true);
    });

    it('should return false when given an array with items', () => {
      // GIVEN
      const a = ['cats', 'dogs'];
      const b = [{ cats: 'dogs' }];

      // WHEN & THEN
      expect(ArraysUtil.isEmpty(a)).toBe(false);
      expect(ArraysUtil.isEmpty(b)).toBe(false);
    });
  });

  describe('groupBy', () => {
    it('should group items in an array by a key', () => {
      const items = [
        { id: 1, category: 'A' },
        { id: 2, category: 'B' },
        { id: 3, category: 'A' },
        { id: 4, category: 'B' },
      ];
      const grouped = ArraysUtil.groupBy(items, 'category');
      expect(grouped).toEqual({
        A: [
          { id: 1, category: 'A' },
          { id: 3, category: 'A' },
        ],
        B: [
          { id: 2, category: 'B' },
          { id: 4, category: 'B' },
        ],
      });
    });

    it('should return an empty object for an empty array', () => {
      const items: any[] = [];
      const grouped = ArraysUtil.groupBy(items, 'category');
      expect(grouped).toEqual({});
    });
  });

  describe('flatten', () => {
    it('should flatten an array of arrays', () => {
      const array = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      const flattened = ArraysUtil.flatten(array);
      expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should keep the elements as-is for a flat array', () => {
      const array = [1, 2, 3, 4];
      const flattened = ArraysUtil.flatten(array);
      expect(flattened).toEqual([1, 2, 3, 4]);
    });
  });

  describe('unique', () => {
    it('should remove duplicate items from an array', () => {
      const array = [1, 2, 2, 3, 4, 4, 5];
      const unique = ArraysUtil.unique(array);
      expect(unique).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
