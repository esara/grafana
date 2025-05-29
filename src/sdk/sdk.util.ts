
export class SdkUtil {

  private static prefix = 'cui';

  public static withPrefix(className: string): string {
    return `${SdkUtil.prefix}--${className.replace(`${SdkUtil.prefix}--`, '')}`;
  }

  

}
