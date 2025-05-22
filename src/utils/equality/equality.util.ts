export class EqualityUtil {
  public static areEqual<T extends object>(prevProps: T, nextProps: T): boolean {
    return !EqualityUtil.shallowDiffers(prevProps, nextProps);
  }

  public static isEqual(obj1: unknown, obj2: unknown): boolean {
    const seen = new WeakSet();

    const circularReplacer = (key: string, value: any): any => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    };

    try {
      return JSON.stringify(obj1, circularReplacer) === JSON.stringify(obj2, circularReplacer);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private static shallowDiffers(prev: object, next: object): boolean {
    for (const attribute in prev) {
      if (!(attribute in next)) {
        return true;
      }
    }
    for (const attribute in next) {
      if (typeof prev[attribute] === 'bigint' || typeof next[attribute] === 'bigint') {
        if (prev[attribute] !== next[attribute]) {
          return true;
        }
      } else if (prev[attribute] !== next[attribute]) {
        return true;
      }
    }
    return false;
  }
}
