export class NumberUtil {
  public static isNumber(value: unknown): boolean {
    return (typeof value === 'number' || value instanceof Number) && isFinite(value as number);
  }

  public static isNotNumber(value: number): boolean {
    return !NumberUtil.isNumber(value);
  }

  public static isFloat(value: number): boolean {
    return NumberUtil.isNumber(value) && value % 1 !== 0;
  }

  public static isInfinity(value: number): boolean {
    return value === Number.NEGATIVE_INFINITY || value === Number.POSITIVE_INFINITY;
  }

  public static toPercentageChange(current: number, result: number): number {
    if (NumberUtil.isNotNumber(current) || NumberUtil.isNotNumber(result) || current === 0) {
      return 0;
    }
    return ((result - current) / current) * 100;
  }

  public static mustGetNumber(value: unknown): number {
    if (NumberUtil.isNumber(value)) {
      return value as number;
    }
    return 0;
  }

  public static toRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
