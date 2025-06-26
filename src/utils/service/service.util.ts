import { ApiEntity } from 'api/api.types';
import { ArraysUtil } from 'utils/arrays/arrays.util';
import { TopologyUtil } from 'utils/topology/topology.util';

export class ServiceUtil {
  private static getNamespaceNameDescriptions = (entity: ApiEntity) => {
    const namespaceNames = ArraysUtil.unique(TopologyUtil.getNamespaceNames(entity));
    return namespaceNames.map((ns) => `ns:${ns}`).join(', ');
  };

  private static getClusterName = (entity: ApiEntity) => {
    const clusterName = TopologyUtil.getClusterName(entity);
    return clusterName ? `cl:${clusterName}` : '';
  };

  public static getNameSpaceAndClusterNameInfo(entity: ApiEntity): string {
    return `${this.getNamespaceNameDescriptions(entity)} ${this.getClusterName(entity)}`;
  }
}
