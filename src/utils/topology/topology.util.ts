import { ApiEntity } from "api/api.types";
import { StringsUtil } from "utils/strings/strings.util";

export type DeploymentCountLayering =
  | 'service'
  | 'containerOrchestrator'
  | 'infrastructure'
  | 'assetAndOperation'
  | 'network';

export class TopologyUtil {

  private static namespaceRestrictedEntityTypesSet: Set<string> = new Set<string>([
    'HTTPPath',
    'HTTPPathAccess',
    'RPCMethod',
    'RPCMethodAccess',
    'Disk',
  ]);

  public static hasNamespace(entity: ApiEntity): boolean {
    return (
      !TopologyUtil.namespaceRestrictedEntityTypesSet.has(entity?.typeName) &&
      StringsUtil.containsPath(entity?.name)
    );
  }

}
