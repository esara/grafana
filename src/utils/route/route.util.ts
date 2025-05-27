const CauselyPortalBaseUrl = 'https://portal.causely.app';
// const CauselyPortalBaseUrl = 'https://portal.staging.causely.app';

export enum AppRoute {
  dashboard = '/dashboard',
  rootCauses = '/rootCauses',
  manifestations = '/symptoms',
  slos = '/slos',
  topology = '/topology',
  constraintAnalysis = '/constraint-analysis',

  welcome = '/welcome',
  ask = '/ask',
  logout = '/logout',
  integrations = '/integrations',
  settings = '/settings',
  notFound = '/404-not-found',

  // new routes
  observe = '/observe',
  observeOverview = '/observe/overview',
  observeServices = '/observe/services',
  observeSLOs = '/observe/slos',
  observeTopology = '/observe/topology',
  observeSymptoms = '/observe/symptoms',
  diagnose = '/diagnose',
  diagnoseOverview = '/diagnose/overview',
  diagnoseRootCauses = '/diagnose/rootCauses',
  prevent = '/prevent',
  preventOverview = '/prevent/overview',
  preventRootCauses = '/prevent/rootCauses',
  assure = '/assure',
  assureOverview = '/assure/overview',
  assureAnalysis = '/assure/analysis',
}


export class RouteUtil {


  public static getSingleRootCauseRoutePath(rootCauseId: string): string {
    return `${CauselyPortalBaseUrl}${AppRoute.rootCauses}/${rootCauseId}`;
  }

  public static getServicesRoute(): string {
    return `${CauselyPortalBaseUrl}${AppRoute.observeServices}`;
  }

  public static getCauselyPortalBaseUrl(): string {
    return CauselyPortalBaseUrl;
  }

  public static getDiagnoseRoutePath(): string {
    return `${CauselyPortalBaseUrl}${AppRoute.diagnoseRootCauses}`;
  }

}
