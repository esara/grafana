import { ArraysUtil } from 'utils/arrays/arrays.util';

type ObjectWithKeys<T> = { [key: string]: T };

export class ObjectsUtil {
  public static isObject(input: unknown): boolean {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
  }

  public static hasOwn(obj: object, key: string): boolean {
    return Object.hasOwn(obj, key);
  }

  /**
   * Returns true if the value is not null, undefined, or NaN
   */
  public static isSet(obj: unknown): boolean {
    return obj !== null && obj !== undefined && !Number.isNaN(obj);
  }

  /**
   * Returns true if the value is null, undefined, or NaN
   */
  public static isUnset(obj: unknown): boolean {
    return !ObjectsUtil.isSet(obj);
  }

  public static isEmpty(obj1: unknown): boolean {
    return ObjectsUtil.keys(obj1).length === 0;
  }

  public static isNotEmpty(obj1: unknown): boolean {
    return !ObjectsUtil.isEmpty(obj1);
  }

  public static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  public static shallowClone<T>(obj: T): T {
    return { ...obj };
  }

  public static size(obj: unknown): number {
    if (!ObjectsUtil.isObject(obj)) {
      return 0;
    }
    return Object.keys(obj as {})?.length ?? 0;
  }

  public static keys(obj: unknown): string[] {
    if (!ObjectsUtil.isObject(obj)) {
      return [];
    }
    return Object.keys(obj as {});
  }

  public static values<T>(obj: unknown): T[] {
    if (!ObjectsUtil.isObject(obj)) {
      return [];
    }

    return Object.values(obj as {});
  }

  public static entries(obj: unknown): unknown[] {
    if (!ObjectsUtil.isObject(obj)) {
      return [];
    }

    return Object.entries(obj as {});
  }

  public static fromEntries(entries: Array<[string, unknown]>): Record<string, unknown> {
    return Object.fromEntries(entries);
  }

  public static withSortedKeys<T>(obj: ObjectWithKeys<T>, field: keyof T, descending = false): ObjectWithKeys<T> {
    const sortedKeys = Object.keys(obj).sort((a, b) => ObjectsUtil.sortBy(field, descending)(obj[a], obj[b]));
    return Object.fromEntries(sortedKeys.map((key) => [key, obj[key]]));
  }

  public static withSortedKeysForArrayValues<T>(
    obj: ObjectWithKeys<T[]>,
    field: string,
    descending = false,
  ): ObjectWithKeys<T[]> {
    const isArray = (value: any): value is T[] => Array.isArray(value);

    const sortedKeys = Object.keys(obj).sort((a, b) => {
      const valA = isArray(obj[a]) ? obj[a][0] : obj[a];
      const valB = isArray(obj[b]) ? obj[b][0] : obj[b];
      return ObjectsUtil.sortBy(field, descending)(valA as any, valB as any);
    });

    const newObj: ObjectWithKeys<T[]> = {};
    for (const key of sortedKeys) {
      newObj[key] = obj[key];
    }

    return newObj;
  }

  /**
   * Sorts by a field.
   * @param field - The field to sort by.
   * @param descending - Optional flag to sort in descending order.
   */
  public static sortBy<T>(field: keyof T, descending = false): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      const aValue = a?.[field];
      const bValue = b?.[field];
      return ObjectsUtil.sortInternal(aValue, bValue, descending);
    };
  }

  /**
   * Sorts by a field with a priority function.
   *
   * @param field - The field to sort by.
   * @param priority - A function that takes the field value and returns a priority number. Lower numbers are
   * higher priority.
   * @param descending - Optional flag to sort in descending order.
   */
  public static sortByPriority<T>(
    field: keyof T,
    priority: (fieldValue: any) => number,
    descending = false,
  ): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      const aValue = a[field];
      const bValue = b[field];
      const priorityA = priority(aValue) ?? Infinity;
      const priorityB = priority(bValue) ?? Infinity;
      return descending ? priorityB - priorityA : priorityA - priorityB;
    };
  }

  public static flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
    const result: Record<string, any> = {};

    // Guard against null, undefined, and arrays early
    if (obj === null || obj === undefined) {
      return result;
    }

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}_${key}` : key;

      // If value is an object (excluding arrays), recursively flatten
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively flatten nested objects
        Object.assign(result, ObjectsUtil.flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }

    return result;
  }

  public static toParsedObject(text: string): { origMsg: string; [key: string]: unknown } {
    try {
      const safeRaw = text.replace(/: ?NaN/g, ': null');
      const parsed = JSON.parse(safeRaw);

      if (parsed && typeof parsed === 'object') {
        return parsed;
      }

      return { origMsg: String(parsed) };
    } catch (error) {
      console.log('Failed to parse JSON ', error);
      return { origMsg: text };
    }
  }

  private static sortInternal(aValue: any, bValue: any, descending: boolean): number {
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return descending ? bValue - aValue : aValue - bValue;
    }

    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return descending ? (bValue === aValue ? 0 : bValue ? -1 : 1) : aValue === bValue ? 0 : aValue ? -1 : 1;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return descending ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return descending ? bValue.getTime() - aValue.getTime() : aValue.getTime() - bValue.getTime();
    }

    if (ArraysUtil.isArray(aValue) && ArraysUtil.isArray(bValue)) {
      return descending ? bValue.length - aValue.length : aValue.length - bValue.length;
    }

    return 0;
  }
}
