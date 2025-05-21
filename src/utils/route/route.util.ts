const CauselyPortalBaseUrl = 'https://portal.causely.app';

export class RouteUtil {
    
    
    public static getSingleRootCauseRoutePath(rootCauseId: string): string {
        return `${CauselyPortalBaseUrl}/defect/${rootCauseId}`;
      }

      public static getServicesRoute(): string {
        return `${CauselyPortalBaseUrl}/observe/services`;
      }

    public static getCauselyPortalBaseUrl(): string {
        return CauselyPortalBaseUrl;
    }
    
}
