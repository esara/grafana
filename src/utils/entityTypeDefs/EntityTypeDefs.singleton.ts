import { ApiAttributeDef, ApiResourceDef, ApiIndicatorDef, ApiDefectDef, ApiSymptomDef, ApiEventDef, ApiEntityTypeDef } from "api/api.types";
import { StringsUtil } from "../strings/strings.util";
import { QueryEntityTypeDefs } from "api/graphql/queries/queryEntityTypeDefs";

export type AppStateEntityTypeDefModel = {
  getAttributeDef: (entityType: string, attributeName: string) => ApiAttributeDef;
  getResourceDef: (entityType: string, resourceName: string) => ApiResourceDef;
  getIndicatorDef: (entityType: string, indicatorName: string) => ApiIndicatorDef;
  getDefectDef: (entityType: string, defectName: string) => ApiDefectDef;
  getSymptomDef: (entityType: string, symptomName: string) => ApiSymptomDef;
  getEventDef: (entityType: string, eventName: string) => ApiEventDef;
  getEntityTypeDef: (entityType: string) => ApiEntityTypeDef;

  getAttributeDefs: (entityType: string) => ApiAttributeDef[];
  getIndicatorDefs: (entityType: string) => ApiIndicatorDef[];
  getResourceDefs: (entityType: string) => ApiResourceDef[];
  getDefectDefs: (entityType: string) => ApiDefectDef[];
  getSymptomDefs: (entityType: string) => ApiSymptomDef[];
  getEventDefs: (entityType: string) => ApiEventDef[];
};

type AppStateEntityTypeDefItem = {
  indicatorLookup: Record<string, ApiIndicatorDef>;
  attributeLookup: Record<string, ApiAttributeDef>;
  resourceLookup: Record<string, ApiResourceDef>;
  defectDefLookup: Record<string, ApiDefectDef>;
  symptomDefLookup: Record<string, ApiSymptomDef>;
  eventDefLookup: Record<string, ApiEventDef>;
  originalDef: ApiEntityTypeDef;
};

/**
 * EntityTypeDefs is the implementation of {@link AppStateEntityTypeDefModel}.
 * This class provides methods to get the definition of an entity type.
 */
export class EntityTypeDefs implements AppStateEntityTypeDefModel {
  private readonly entityTypeDefLookup: Record<string, AppStateEntityTypeDefItem>;
  private static instance: EntityTypeDefs;

  private constructor(entityTypeDefs: ApiEntityTypeDef[]) {
    this.entityTypeDefLookup = this.toEntityDefLookups(entityTypeDefs);
  }

  public static async create(): Promise<EntityTypeDefs | null> {
    if (EntityTypeDefs.instance) {
      Promise.resolve(EntityTypeDefs.instance)
    }

    return QueryEntityTypeDefs()
      .then((result) => {
        EntityTypeDefs.instance = new EntityTypeDefs(result.data?.entityTypeDefs ?? []);
        return EntityTypeDefs.instance;
      })
      .catch((error) => {
        console.error('Error fetching entity type defs', error);
        return null;
      });
  }

  public static getInstance(): EntityTypeDefs {
    return this.instance ?? new EntityTypeDefs([]);
  }

  // --- Single Definition ---
  public getAttributeDef(entityType: string, attributeName: string): ApiAttributeDef {
    const def = this.entityTypeDefLookup?.[entityType]?.attributeLookup?.[attributeName];
    if (def) {
      return def;
    }

    return {
      name: attributeName,
      description: StringsUtil.splitCamelCase(attributeName),
      type: 'string',
    };
  }

  public getResourceDef(entityType: string, resourceName: string): ApiResourceDef {
    const def = this.entityTypeDefLookup?.[entityType]?.resourceLookup?.[resourceName];
    if (def) {
      return def;
    }

    return {
      name: resourceName,
      defects: [],
      symptoms: [],
      attributes: [],
      type: 'string',
    };
  }

  public getIndicatorDef(entityType: string, indicatorName: string): ApiIndicatorDef {
    const def = this.entityTypeDefLookup?.[entityType]?.indicatorLookup?.[indicatorName];
    if (def) {
      return def;
    }

    return {
      name: indicatorName,
      description: StringsUtil.splitCamelCase(indicatorName),
      attributes: [],
      symptoms: [],
      type: 'string',
    };
  }

  public getDefectDef(entityType: string, defectName: string): ApiDefectDef {
    const def = this.entityTypeDefLookup?.[entityType]?.defectDefLookup?.[defectName];
    if (def) {
      return {
        ...def,
        displayName: StringsUtil.isNotBlank(def.displayName) ? def.displayName : StringsUtil.splitCamelCase(defectName),
      };
    }

    return {
      entityTypeName: entityType,
      events: [],
      symptoms: [],
      name: defectName,
      displayName: StringsUtil.splitCamelCase(defectName),
      description: {
        summary: '',
        details: '',
        remediationOptions: [],
      },
    } as unknown as ApiDefectDef;
  }

  public getSymptomDef(entityType: string, symptomName: string): ApiSymptomDef {
    const def = this.entityTypeDefLookup?.[entityType]?.symptomDefLookup?.[symptomName];
    if (def) {
      return {
        ...def,
        displayName: StringsUtil.isNotBlank(def.displayName)
          ? def.displayName
          : StringsUtil.splitCamelCase(symptomName),
      };
    }

    return {
      entityTypeName: entityType,
      impacts: [],
      name: symptomName,
      displayName: StringsUtil.splitCamelCase(symptomName),
    } as unknown as ApiSymptomDef;
  }

  public getEventDef(entityType: string, eventName: string): ApiEventDef {
    const def = this.entityTypeDefLookup?.[entityType]?.eventDefLookup?.[eventName];
    if (def) {
      return def;
    }

    return {
      entityTypeName: entityType,
      impacts: [],
      name: eventName,
    } as unknown as ApiEventDef;
  }

  public getEntityTypeDef(entityType: string): ApiEntityTypeDef {
    const def = this.entityTypeDefLookup?.[entityType]?.originalDef;
    if (def) {
      return def;
    }

    return {
      name: entityType,
      events: [],
      relations: [],
      attributes: [],
      indicators: [],
      resources: [],
      defects: [],
      symptoms: [],
    };
  }

  // --- Multiple Definitions ---
  public getAttributeDefs(entityType: string): ApiAttributeDef[] {
    return Array.from(Object.values(this.entityTypeDefLookup?.[entityType]?.attributeLookup));
  }

  public getIndicatorDefs(entityType: string): ApiIndicatorDef[] {
    return Array.from(Object.values(this.entityTypeDefLookup?.[entityType]?.indicatorLookup));
  }

  public getResourceDefs(entityType: string): ApiResourceDef[] {
    return Array.from(Object.values(this.entityTypeDefLookup?.[entityType]?.resourceLookup));
  }

  public getDefectDefs(entityType: string): ApiDefectDef[] {
    return Array.from(Object.values(this.entityTypeDefLookup?.[entityType]?.defectDefLookup));
  }

  public getSymptomDefs(entityType: string): ApiSymptomDef[] {
    return Array.from(Object.values(this.entityTypeDefLookup?.[entityType]?.symptomDefLookup));
  }

  public getEventDefs(entityType: string): ApiEventDef[] {
    return Array.from(Object.values(this.entityTypeDefLookup?.[entityType]?.eventDefLookup));
  }

  // --- Private Methods ---
  private toEntityDefLookups(entityTypeDefs: ApiEntityTypeDef[]): Record<string, AppStateEntityTypeDefItem> {
    return (entityTypeDefs ?? []).reduce(
      (lookup, entityTypeDef) => {
        const entityType = entityTypeDef.name;

        lookup[entityType] = {
          // generic lookup for definitions
          attributeLookup: (entityTypeDef.attributes ?? []).reduce((attributeLookup: Record<string, ApiAttributeDef>, attribute) => {
            attributeLookup[attribute.name] = attribute;
            return attributeLookup;
          }, {}),
          resourceLookup: (entityTypeDef.resources ?? []).reduce((resourceLookup: Record<string, ApiResourceDef>, resource) => {
            resourceLookup[resource.name] = resource;
            return resourceLookup;
          }, {}),
          indicatorLookup: (entityTypeDef.indicators ?? []).reduce((indicatorLookup: Record<string, ApiIndicatorDef>, indicator) => {
            indicatorLookup[indicator.name] = indicator;
            return indicatorLookup;
          }, {}),
          defectDefLookup: (entityTypeDef.defects ?? []).reduce((defectDefLookup: Record<string, ApiDefectDef>, defect) => {
            defectDefLookup[defect.name] = defect;
            return defectDefLookup;
          }, {}),
          symptomDefLookup: (entityTypeDef.symptoms ?? []).reduce((symptomDefLookup: Record<string, ApiSymptomDef>, symptom) => {
            symptomDefLookup[symptom.name] = symptom;
            return symptomDefLookup;
          }, {}),
          eventDefLookup: (entityTypeDef.events ?? []).reduce((eventDefLookup: Record<string, ApiEventDef>, event) => {
            eventDefLookup[event.name] = event;
            return eventDefLookup;
          }, {}),

          // original def
          originalDef: entityTypeDef,
        };

        return lookup;
      },
      {} as Record<string, AppStateEntityTypeDefItem>,
    );
  }
}
