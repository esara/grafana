import { ObjectsUtil } from "utils/objects/objects.util";


export class StringsUtil {
  public static isString(value: unknown): boolean {
    return typeof value === 'string';
  }

  public static trimToEmptyString(value: Readonly<string | null | undefined>): string {
    if (ObjectsUtil.isUnset(value)) {
      return '';
    }
    return (value + '').trim();
  }

  public static isBlank(value: Readonly<string | null | undefined>): boolean {
    return StringsUtil.trimToEmptyString(value).length === 0;
  }

  public static isNotBlank(value: Readonly<string | null | undefined>): boolean {
    return !StringsUtil.isBlank(value);
  }

  public static splitCamelCase(string: string): string {
    if (!StringsUtil.isString(string) || StringsUtil.isBlank(string)) {
      return '';
    }

    return string
      .split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)
      .join(' ')
      .replace(/_/g, ' ')
      .replace(/I Ops/g, 'IOps');
  }

  public static equals(s1: Readonly<string>, s2: Readonly<string>): boolean {
    return s1 === s2;
  }

  /**
   * Determines if a given string starts with the provided substring.
   * The check is case-sensitive by default.
   * @param s1 - primary string
   * @param subStr - substring to check for
   * @param ignoreCase - optional (default = false)
   * @returns true if the string starts with contained substring
   */
  public static startsWith(s1: Readonly<string>, subStr: Readonly<string> = '', ignoreCase?: boolean): boolean {
    if (!StringsUtil.isString(s1)) {
      return false;
    }
    if (ignoreCase) {
      return s1.toLowerCase().startsWith(subStr.toLowerCase());
    }
    return s1.startsWith(subStr);
  }

  public static equalsIgnoreCase(s1: Readonly<string>, s2: Readonly<string>): boolean {
    return s1?.toLowerCase() === s2?.toLowerCase();
  }

  public static notEquals(s1: Readonly<string>, s2: Readonly<string>): boolean {
    return s1 !== s2;
  }

  public static notEqualsIgnoreCase(s1: Readonly<string>, s2: Readonly<string>): boolean {
    return s1?.toLowerCase() !== s2?.toLowerCase();
  }

  public static contains(haystack: Readonly<string>, needle: Readonly<string>): boolean {
    if (!StringsUtil.isString(haystack) || !StringsUtil.isString(needle)) {
      return false;
    }

    return haystack.indexOf(needle) > -1;
  }

  public static containsIgnoreCase(haystack: Readonly<string>, needle: Readonly<string>): boolean {
    if (!StringsUtil.isString(haystack) || !StringsUtil.isString(needle)) {
      return false;
    }
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
  }

  public static containsPath(path: Readonly<string>): boolean {
    return StringsUtil.contains(path, '/');
  }

  /**
   * Returns a similarity score based on the shared bi-grams between the two strings.
   */
  public static compare(str1: string, str2: string): number {
    if (!str1.length || !str2.length) { return 0 };
    if (str1 === str2) { return 1 };

    // Handle cases where one or both strings are less than 2 characters
    if (str1.length < 2 || str2.length < 2) {
      // If single characters match, return 1, else return 0
      return str1[0] === str2[0] ? 1 : 0;
    }

    const toBiGrams = (s: string): Set<string> => {
      const result = new Set<string>();
      for (let i = 0; i < s.length - 1; i++) {
        // Extract bi-grams
        result.add(s.slice(i, i + 2));
      }
      return result;
    };

    const biGrams1 = toBiGrams(str1.toLowerCase());
    const biGrams2 = toBiGrams(str2.toLowerCase());

    const intersection = new Set(Array.from(biGrams1).filter((x) => biGrams2.has(x)));

    // Dice's Coefficient formula: (2 * |Intersection|) / (|Set1| + |Set2|)
    const totalBigrams = biGrams1.size + biGrams2.size;
    if (totalBigrams === 0) { return 0 }; // Avoid division by zero for empty sets

    return parseFloat(((2 * intersection.size) / totalBigrams).toFixed(5));
  }

  public static getFirstItemOfPath(path: Readonly<string>): string {
    if (!StringsUtil.isString(path)) {
      return path;
    }

    if (!StringsUtil.containsPath(path)) {
      return path;
    }

    const pathArray = path.split('/');
    return pathArray[0];
  }

  public static getLastItemOfPath(path: Readonly<string>): string {
    if (!StringsUtil.isString(path)) {
      return path;
    }

    if (!StringsUtil.containsPath(path)) {
      return path;
    }

    return path.substring(path.lastIndexOf('/') + 1);
  }

  public static getPathExceptFirstItem(path: Readonly<string>): string {
    if (!StringsUtil.isString(path)) {
      return path;
    }

    if (!StringsUtil.containsPath(path)) {
      return path;
    }

    const pathArray = path.split('/');
    return pathArray.slice(1, pathArray.length).join('/');
  }

  public static getFolderOfPath(path: Readonly<string>): string {
    if (!StringsUtil.isString(path)) {
      return path;
    }

    if (!StringsUtil.containsPath(path)) {
      return path;
    }

    const pathArray = path.split('/');
    return pathArray.slice(0, pathArray.length - 1).join('/');
  }

  public static firstToUpperCase(value: Readonly<string>): string {
    if (!StringsUtil.isString(value)) {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  public static firstToLowerCase(value: Readonly<string>): string {
    if (!StringsUtil.isString(value)) {
      return value;
    }
    return value.charAt(0).toLowerCase() + value.slice(1);
  }

  public static toBoolean(value: Readonly<string>): boolean {
    const lowerCaseValue = value?.toLowerCase().trim();
    return lowerCaseValue === 'true';
  }

  public static truncateMid(value: Readonly<string>, maxLength = 33): string {
    if (!StringsUtil.isString(value) || StringsUtil.isBlank(value)) {
      return value;
    }

    if (value.length <= maxLength - 8) {
      return value;
    }

    let excess = maxLength / 2 - 5;

    if (excess <= 0) {
      return value;
    }

    let fillerStart = '';
    let fillerEnd = '';
    let startIndex = 0;
    let endIndex = value.length - 1;
    while (excess > 0 && startIndex < endIndex) {
      fillerStart += value[startIndex];
      fillerEnd = value[endIndex] + fillerEnd;
      startIndex++;
      endIndex--;
      excess--;
    }

    return `${fillerStart.replace(/[-._]+$/, '')}...${fillerEnd.replace(/^[-._]+/, '')}`;
  }



  public static formatHeaderName(header: string): string {
    const formattedHeader = StringsUtil.splitCamelCase(header);
    return formattedHeader
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
      .replace(/^./, (char) => char.toUpperCase()); // Capitalize first letter
  }

  public static firstNonBlankValue(...values: readonly string[]): string {
    return (values ?? []).filter(StringsUtil.isNotBlank)[0];
  }
}
