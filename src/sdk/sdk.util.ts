
export class SdkUtil {

  private static prefix = 'causely-app';

  public static withPrefix(className: string): string {
    return `${SdkUtil.prefix}--${className.replace(`${SdkUtil.prefix}--`, '')}`;
  }

  

}
