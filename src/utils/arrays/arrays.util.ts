import { ObjectsUtil } from "utils/objects/objects.util";

export class ArraysUtil {
  public static isArray<T>(a?: readonly T[]): boolean {
    return Array.isArray(a);
  }

  public static size<T>(a?: readonly T[]): number {
    if (!a || !ArraysUtil.isArray(a)) {
      return 0;
    }
    return a.length ?? 0;
  }

  public static isEmpty<T>(a?: readonly T[]): boolean {
    return ArraysUtil.size(a) === 0;
  }

  public static isNotEmpty<T>(a?: readonly T[]): boolean {
    return !ArraysUtil.isEmpty(a);
  }


  public static groupBy<T, U extends T[]>(items: T[], key: keyof T): Record<string, U> {
    if (ArraysUtil.isEmpty(items)) {
      return {};
    }
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key] as string]: [...(result[item[key] as string] || []), item],
      }),
      // TODO: correct typing

      {} as Record<string, any>,
    );
  }

  public static flatten<T>(array: Array<T | T[]>): T[] {
    const result: T[] = [];

    for (const element of array) {
      if (Array.isArray(element)) {
        result.push(...element);
      } else {
        result.push(element);
      }
    }

    return result;
  }

  public static unique<T>(array: T[]): T[] {
    const uniqueItems = new Set();

    return array.filter((item) => {
      if (!uniqueItems.has(item)) {
        uniqueItems.add(item);
        return true;
      }

      return false;
    });
  }

  public static first<T>(array: T[]): T | undefined {
    if (ArraysUtil.isEmpty(array)) {
      return undefined;
    }
    return array[0];
  }

  public static last<T>(array: T[]): T | undefined {
    if (ArraysUtil.isEmpty(array)) {
      return undefined;
    }
    return array[array.length - 1];
  }

  public static lastN<T>(array: T[], n: number): T[] {
    if (n <= 0) {
      return [];
    }

    if (ArraysUtil.isEmpty(array)) {
      return [];
    }

    return array.slice(-n);
  }

  public static firstN<T>(array: T[], n: number): T[] {
    if (n < 0) {
      return [];
    }

    if (ArraysUtil.isEmpty(array)) {
      return [];
    }

    return array.slice(0, n);
  }

  public static deepClone<T>(array: T[]): T[] {
    return array?.map((item) => ObjectsUtil.deepClone(item));
  }

  public static shallowClone<T>(array: T[]): T[] {
    return [...array];
  }

  public static reverse<T>(array: T[]): T[] {
    return array?.slice().reverse();
  }
}
