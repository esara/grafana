import { ApiEntity } from "api/api.types";
import { StringsUtil } from "utils/strings/strings.util";
import { TopologyUtil } from "utils/topology/topology.util";

export class EntityUtil {
    public static simplifyEntityname(entity: ApiEntity): string {
        const entityName = entity.name;

        const hasNamespace = TopologyUtil.hasNamespace(entity);
        const simplifiedEntityName = hasNamespace ? StringsUtil.getPathExceptFirstItem(entityName) : entityName;

        return simplifiedEntityName;
    }
};
