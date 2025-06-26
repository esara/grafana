import { ApiEntity } from "api/api.types";
import { StringsUtil } from "utils/strings/strings.util";

export type DeploymentCountLayering =
  | 'service'
  | 'containerOrchestrator'
  | 'infrastructure'
  | 'assetAndOperation'
  | 'network';

export type TopologyContextInfo = {
  clusterName?: string;
};


export class TopologyUtil {

  private static AccessingKeyword = ' accessing ';

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

  public static toHumanizedEntityType(entity: ApiEntity): string {
    return StringsUtil.splitCamelCase(entity?.typeName ?? '');
  }

  public static getNamespaceNames(entity: ApiEntity): string[] {
    if (!TopologyUtil.hasNamespace(entity)) {
      return [];
    }

    // special case when we append 'accessing' in backend
    if (TopologyUtil.doesEntityNameContainsAccessing(entity?.name)) {
      return TopologyUtil.splitAccessingEntityName(entity)
        .filter((part) => StringsUtil.containsPath(part))
        .map((part) => StringsUtil.getFirstItemOfPath(part))
        .filter(StringsUtil.isNotBlank);
    }

    return [StringsUtil.getFirstItemOfPath(entity.name)].filter(StringsUtil.isNotBlank);
  }

  public static doesEntityNameContainsAccessing(entityName: string): boolean {
    return StringsUtil.containsIgnoreCase(entityName, TopologyUtil.AccessingKeyword);
  }

  public static splitAccessingEntityName(entity: ApiEntity): string[] {
    return entity?.name?.split(TopologyUtil.AccessingKeyword) ?? [];
  }

  public static getClusterName(entity: ApiEntity): string {
    const skipKeySet = new Set<string>(['Id', 'k8s.cluster.uid']);

    const knownKeyPropMap = new Map<string, { field: string }>([
      ['k8s.cluster.name', { field: 'clusterName' }],
      ['causely.ai/cluster', { field: 'clusterName' }],
    ]);

    const contextInfo: TopologyContextInfo = (entity?.labels ?? [])
      .filter((label) => !skipKeySet.has(label.key) && StringsUtil.isNotBlank(label.key) && StringsUtil.isNotBlank(label.value))
      .reduce(
        (map, label) => {
          if (knownKeyPropMap.has(label.key)) {
            const { field } = knownKeyPropMap.get(label.key);
            if (StringsUtil.isNotBlank(field)) {
              map[field] = label.value;
            }
          }

          return map;
        }, {} as TopologyContextInfo);
        return contextInfo.clusterName ?? '';
  }
}
