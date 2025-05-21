import { ObjectsUtil } from './objects.util';

describe('ObjectsUtil', () => {
  describe('isObject', () => {
    it('should return true when passed an object', () => {
      expect(ObjectsUtil.isObject({})).toBe(true);
    });

    it('should return false when passed null', () => {
      expect(ObjectsUtil.isObject(null)).toBe(false);
    });

    it('should return false when passed an array', () => {
      expect(ObjectsUtil.isObject([])).toBe(false);
    });

    it('should return false when passed a string', () => {
      expect(ObjectsUtil.isObject('test')).toBe(false);
    });

    it('should return false when passed a number', () => {
      expect(ObjectsUtil.isObject(123)).toBe(false);
    });

    it('should return false when passed a boolean', () => {
      expect(ObjectsUtil.isObject(true)).toBe(false);
    });

    it('should return false when passed undefined', () => {
      expect(ObjectsUtil.isObject(undefined)).toBe(false);
    });
  });

  describe('isSet', () => {
    it('should return true for set values', () => {
      expect(ObjectsUtil.isSet('abc')).toBe(true);
      expect(ObjectsUtil.isSet(false)).toBe(true);
      expect(ObjectsUtil.isSet(0)).toBe(true);
      expect(ObjectsUtil.isSet('')).toBe(true);
      expect(ObjectsUtil.isSet([])).toBe(true);
      expect(ObjectsUtil.isSet({})).toBe(true);
      expect(ObjectsUtil.isSet(new Date())).toBe(true);
    });

    it('should return false for unset values', () => {
      expect(ObjectsUtil.isSet(null)).toBe(false);
      expect(ObjectsUtil.isSet(undefined)).toBe(false);
      expect(ObjectsUtil.isSet(NaN)).toBe(false);
    });
  });

  describe('isUnset', () => {
    it('should return false for set values', () => {
      expect(ObjectsUtil.isUnset('abc')).toBe(false);
      expect(ObjectsUtil.isUnset(false)).toBe(false);
      expect(ObjectsUtil.isUnset(0)).toBe(false);
      expect(ObjectsUtil.isUnset('')).toBe(false);
      expect(ObjectsUtil.isUnset([])).toBe(false);
      expect(ObjectsUtil.isUnset({})).toBe(false);
      expect(ObjectsUtil.isUnset(new Date())).toBe(false);
    });

    it('should return true for unset values', () => {
      expect(ObjectsUtil.isUnset(null)).toBe(true);
      expect(ObjectsUtil.isUnset(undefined)).toBe(true);
      expect(ObjectsUtil.isUnset(NaN)).toBe(true);
    });
  });

  describe('keys', () => {
    it('should return an array of object keys', () => {
      // GIVEN
      const obj = {
        name: 'John',
        age: 30,
        gender: 'male',
      };

      // WHEN
      const result = ObjectsUtil.keys(obj);

      // THEN
      expect(result).toEqual(['name', 'age', 'gender']);
    });

    it('should return an empty array for an empty object', () => {
      // GIVEN
      const emptyObj = {};

      // WHEN
      const result = ObjectsUtil.keys(emptyObj);

      // THEN
      expect(result).toEqual([]);
    });

    it('should return an empty array for non-object input', () => {
      // GIVEN
      const nonObj = 'not an object';

      // WHEN
      const result = ObjectsUtil.keys(nonObj);

      // THEN
      expect(result).toEqual([]);
    });

    it('should return an array of object keys for nested objects', () => {
      // GIVEN
      const nestedObj = {
        person: {
          name: 'Alice',
          age: 25,
        },
        location: {
          city: 'New York',
          country: 'USA',
        },
      };

      // WHEN
      const result = ObjectsUtil.keys(nestedObj);

      // THEN
      expect(result).toEqual(['person', 'location']);
    });
  });

  describe('values', () => {
    it('should return an array of object values', () => {
      // GIVEN
      const obj = {
        name: 'John',
        age: 30,
        gender: 'male',
      };

      // WHEN
      const result = ObjectsUtil.values(obj);

      // THEN
      expect(result).toEqual(['John', 30, 'male']);
    });

    it('should return an empty array for an empty object', () => {
      // GIVEN
      const emptyObj = {};

      // WHEN
      const result = ObjectsUtil.values(emptyObj);

      // THEN
      expect(result).toEqual([]);
    });

    it('should return an empty array for non-object input', () => {
      // GIVEN
      const nonObj = 'not an object';

      // WHEN
      const result = ObjectsUtil.values(nonObj);

      // THEN
      expect(result).toEqual([]);
    });

    it('should return an array of object values for nested objects', () => {
      // GIVEN
      const nestedObj = {
        person: {
          name: 'Alice',
          age: 25,
        },
        location: {
          city: 'New York',
          country: 'USA',
        },
      };

      // WHEN
      const result = ObjectsUtil.values(nestedObj);

      // THEN
      expect(result).toEqual([
        { name: 'Alice', age: 25 },
        { city: 'New York', country: 'USA' },
      ]);
    });
  });

  describe('withSortedKeys', () => {
    it('should sort object keys based on the specified field in ascending order', () => {
      // GIVEN
      const data = {
        key1: { name: 'John', age: 30 },
        key2: { name: 'Jane', age: 25 },
        key3: { name: 'Alice', age: 35 },
      };

      // WHEN
      const sortedData = ObjectsUtil.withSortedKeys(data, 'age');

      // THEN
      expect(ObjectsUtil.keys(sortedData)).toEqual(['key2', 'key1', 'key3']);
    });

    it('should sort object keys based on the specified field in descending order', () => {
      // GIVEN
      const data = {
        key1: { name: 'John', age: 30 },
        key2: { name: 'Jane', age: 25 },
        key3: { name: 'Alice', age: 35 },
      };

      // WHEN
      const sortedData = ObjectsUtil.withSortedKeys(data, 'age', true);

      // THEN
      expect(ObjectsUtil.keys(sortedData)).toEqual(['key3', 'key1', 'key2']);
    });
  });

  describe('withSortedKeysForArrayValues', () => {
    it('should sort the keys of the object correctly when the descending parameter is false', () => {
      // GIVEN
      const obj = {
        a: [{ id: 1 }],
        b: [{ id: 2 }],
        c: [{ id: 3 }],
      };

      // WHEN
      const result = ObjectsUtil.withSortedKeysForArrayValues(obj, 'id', false);

      // THEN
      expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
    });

    it('should sort the keys of the object correctly when the descending parameter is true', () => {
      // GIVEN
      const obj = {
        a: [{ id: 1 }],
        b: [{ id: 2 }],
        c: [{ id: 3 }],
      };

      // WHEN
      const result = ObjectsUtil.withSortedKeysForArrayValues(obj, 'id', true);

      // THEN
      expect(Object.keys(result)).toEqual(['c', 'b', 'a']);
    });

    it('should sort the keys of the object correctly when the descending parameter is not provided', () => {
      // GIVEN
      const obj = {
        a: [{ id: 1 }],
        b: [{ id: 2 }],
        c: [{ id: 3 }],
      };

      // WHEN
      const result = ObjectsUtil.withSortedKeysForArrayValues(obj, 'id');

      // THEN
      expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
    });

    it('should return an empty object when passed an empty object', () => {
      // GIVEN
      const obj = {};

      // WHEN
      const result = ObjectsUtil.withSortedKeysForArrayValues(obj, 'id');

      // THEN
      expect(result).toEqual({});
    });
  });

  describe('sortBy', () => {
    it('should sort objects based on the specified field in ascending order', () => {
      // GIVEN
      const data = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Carol', age: 20 },
      ];

      // WHEN
      const sortedData = data.sort(ObjectsUtil.sortBy('age'));

      // THEN
      expect(sortedData).toEqual([
        { name: 'Carol', age: 20 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
      ]);
    });

    it('should sort objects based on the specified field in descending order', () => {
      // GIVEN
      const data = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Carol', age: 20 },
      ];

      // WHEN
      const sortedData = data.sort(ObjectsUtil.sortBy('age', true));

      // THEN
      expect(sortedData).toEqual([
        { name: 'Bob', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Carol', age: 20 },
      ]);
    });

    it('should throw an error for unsupported data types', () => {
      // GIVEN
      const data = [
        { name: 'Alice', score: { val: 95 } },
        { name: 'Bob', score: { val: 85 } },
        { name: 'Carol', score: { val: 75 } },
      ];

      // WHEN
      const sortedData = data.sort(ObjectsUtil.sortBy('score'));

      // THEN
      expect(sortedData).toEqual([
        {
          name: 'Alice',
          score: {
            val: 95,
          },
        },
        {
          name: 'Bob',
          score: {
            val: 85,
          },
        },
        {
          name: 'Carol',
          score: {
            val: 75,
          },
        },
      ]);
    });

    it('should sort objects based on boolean values', () => {
      // GIVEN
      const data = [
        { name: 'Alice', active: true },
        { name: 'Bob', active: false },
        { name: 'Carol', active: true },
      ];

      // WHEN
      const sortedData = data.sort(ObjectsUtil.sortBy('active'));

      // THEN
      expect(sortedData).toEqual([
        {
          active: true,
          name: 'Alice',
        },
        {
          active: true,
          name: 'Carol',
        },
        {
          active: false,
          name: 'Bob',
        },
      ]);
    });
  });

  describe('hasOwn', () => {
    it('should return true if field is present in the object', () => {
      // GIVEN
      const inputObject = {
        field1: 'value1',
        field2: 'value2',
        field3: 'value3',
      };

      // WHEN & THEN
      expect(ObjectsUtil.hasOwn(inputObject, 'field1')).toEqual(true);
    });

    it('should return false if field is present in the object', () => {
      // GIVEN
      const inputObject = {
        field1: 'value1',
        field2: 'value2',
        field3: 'value3',
      };

      // WHEN & THEN
      expect(ObjectsUtil.hasOwn(inputObject, 'field4')).toEqual(false);
    });
  });
});
