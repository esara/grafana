
import { TopologyUtil } from 'utils/topology/topology.util';

describe('TopologyUtil', () => {
  describe('getSimplifiedEntityName', () => {
    it('should return simplified entity name when name has "/"', () => {
      // GIVEN
      const entity = {
        name: 'namespaceName/podName/testName/entityName',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getSimplifiedEntityName(entity?.name);

      // THEN
      expect(result).toEqual('entityName');
    });

    it('should return simplified entity name when name does not have "/"', () => {
      // GIVEN
      const entity = {
        name: 'namespaceName_podName_testName_entityName',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getSimplifiedEntityName(entity?.name);

      // THEN
      expect(result).toEqual('namespaceName_podName_testName_entityName');
    });
  });

  describe('getIconName', () => {
    describe('labeled = true', () => {
      it.each([
        ['Access', 'LabeledAccess'],
        ['AsyncAccess', 'LabeledAsyncAccess'],
        ['Service', 'LabeledSvc'],
        ['NetworkEndpoint', 'LabeledNetworkEndPoint'],
        ['Controller', 'LabeledController'],
        ['Node', 'LabeledNode'],
        ['Pod', 'LabeledPod'],
        ['Database', 'LabeledDatabase'],
        ['ApplicationLoadBalancer', 'LabeledAppLoadBalancer'],
        ['Workload', 'LabeledWorkload'],
        ['Container', 'LabeledContainer'],
        ['VirtualMachine', 'LabeledVirtualMachine'],
      ])('should return node icon name for entity type = "%s"', (type: string, expected: string) => {
        // WHEN
        const result = TopologyUtil.getIconName(type as EntityTypeName);

        // THEN
        expect(result).toEqual(expected as CuiSvgIconsName);
      });
    });

    describe('labeled = false', () => {
      it.each([
        ['Access', 'UnlabeledAccess'],
        ['AsyncAccess', 'UnlabeledAsyncAccess'],
        ['Service', 'UnlabeledSvc'],
        ['NetworkEndpoint', 'UnlabeledNetworkEndPoint'],
        ['Controller', 'UnlabeledController'],
        ['Node', 'UnlabeledNode'],
        ['Pod', 'UnlabeledPod'],
        ['Database', 'UnlabeledDatabase'],
        ['ApplicationLoadBalancer', 'UnlabeledAppLoadBalancer'],
        ['Workload', 'UnlabeledWorkload'],
        ['Container', 'UnlabeledContainer'],
        ['VirtualMachine', 'UnlabeledVirtualMachine'],
      ])('should return node icon name for entity type = "%s"', (type: string, expected: string) => {
        // WHEN
        const result = TopologyUtil.getIconName(type as EntityTypeName, false);

        // THEN
        expect(result).toEqual(expected as CuiSvgIconsName);
      });
    });
  });

  describe('getIconInfo', () => {
    it('should return icon for severity = "critical"', () => {
      // GIVEN
      const entity = {
        severity: 'Critical',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getIconInfo(entity);

      // THEN
      expect(result.iconName).toEqual(DomainIcon.Problem);
      expect(result.iconClassName).toEqual(SdkUtil.withPrefix(`icon--critical`));
      expect(result.description).toEqual('feature.topology.entityIcon.severity.critical.tooltip');
    });

    it('should return icon for severity = "warning"', () => {
      // GIVEN
      const entity = {
        severity: 'Warning',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getIconInfo(entity);

      // THEN
      expect(result.iconName).toEqual(DomainIcon.Symptom);
      expect(result.iconClassName).toEqual(SdkUtil.withPrefix(`icon--warning`));
      expect(result.description).toEqual('feature.topology.entityIcon.severity.warning.tooltip');
    });

    it('should return icon for severity = "Major"', () => {
      // GIVEN
      const entity = {
        severity: 'Major',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getIconInfo(entity);

      // THEN
      expect(result.iconName).toEqual(DomainIcon.Problem);
      expect(result.iconClassName).toEqual(SdkUtil.withPrefix(`icon--major`));
      expect(result.description).toEqual('feature.topology.entityIcon.severity.major.tooltip');
    });

    it('should return icon for severity = "Minor"', () => {
      // GIVEN
      const entity = {
        severity: 'Minor',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getIconInfo(entity);

      // THEN
      expect(result.iconName).toEqual(DomainIcon.Problem);
      expect(result.iconClassName).toEqual(SdkUtil.withPrefix(`icon--minor`));
      expect(result.description).toEqual('feature.topology.entityIcon.severity.minor.tooltip');
    });

    it('should return icon for severity = "Normal"', () => {
      // GIVEN
      const entity = {
        severity: 'Normal',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getIconInfo(entity);

      // THEN
      expect(result.iconName).toEqual(DomainIcon.Cleared);
      expect(result.iconClassName).toEqual(SdkUtil.withPrefix(`icon--normal`));
      expect(result.description).toEqual('feature.topology.entityIcon.severity.normal.tooltip');
    });

    it('should return icon for severity = "Unknown"', () => {
      // GIVEN
      const entity = {
        severity: 'Unknown',
      } as ApiEntity;

      // WHEN
      const result = TopologyUtil.getIconInfo(entity);

      // THEN
      expect(result.iconName).toEqual(DomainIcon.Unknown);
      expect(result.iconClassName).toEqual(SdkUtil.withPrefix(`icon--unknown`));
      expect(result.description).toEqual('feature.topology.entityIcon.severity.unknown.tooltip');
    });
  });

  describe('hasManifestations', () => {
    it('should return false when no manifestations', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const hasManifestations = TopologyUtil.hasManifestations(entity);

      // THEN
      expect(hasManifestations).toEqual(false);
    });

    it('should return false when no active manifestations', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [
          {
            id: 'symptomId1',
            active: false,
          },
        ],
        slos: [
          {
            id: 'sloId1',
            active: false,
          },
        ],
        events: [
          {
            id: 'eventId1',
            active: false,
          },
        ],
      } as ApiEntity;

      // WHEN
      const hasManifestations = TopologyUtil.hasManifestations(entity);

      // THEN
      expect(hasManifestations).toEqual(false);
    });

    it('should return true when has active symptoms', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [
          {
            id: 'symptomId1',
            active: true,
          },
        ],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const hasManifestations = TopologyUtil.hasManifestations(entity);

      // THEN
      expect(hasManifestations).toEqual(true);
    });

    it('should return true when has active events', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [
          {
            id: 'eventId1',
            active: true,
          },
        ],
      } as ApiEntity;

      // WHEN
      const hasManifestations = TopologyUtil.hasManifestations(entity);

      // THEN
      expect(hasManifestations).toEqual(true);
    });

    it('should return true when has active slos', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [
          {
            id: 'sloId1',
            active: true,
          },
        ],
        events: [],
      } as ApiEntity;

      // WHEN
      const hasManifestations = TopologyUtil.hasManifestations(entity);

      // THEN
      expect(hasManifestations).toEqual(true);
    });

    it('should return true when active symptoms, slos and events', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [
          {
            id: 'symptomId1',
            active: true,
          },
        ],
        slos: [
          {
            id: 'sloId1',
            active: true,
          },
        ],
        events: [
          {
            id: 'eventId1',
            active: true,
          },
        ],
      } as ApiEntity;

      // WHEN
      const hasManifestations = TopologyUtil.hasManifestations(entity);

      // THEN
      expect(hasManifestations).toEqual(true);
    });
  });

  describe('toActiveManifestationCount', () => {
    it('should return 0 when no manifestations', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const manifestationCount = TopologyUtil.toActiveManifestationCount(entity);

      // THEN
      expect(manifestationCount).toEqual(0);
    });

    it('should return 0 when no active manifestations', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [
          {
            id: 'symptomId1',
            active: false,
          },
        ],
        slos: [
          {
            id: 'sloId1',
            active: false,
          },
        ],
        events: [
          {
            id: 'eventId1',
            active: false,
          },
        ],
      } as ApiEntity;

      // WHEN
      const manifestationCount = TopologyUtil.toActiveManifestationCount(entity);

      // THEN
      expect(manifestationCount).toEqual(0);
    });

    it('should return 1 when has active symptoms', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [
          {
            id: 'symptomId1',
            active: true,
          },
        ],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const manifestationCount = TopologyUtil.toActiveManifestationCount(entity);

      // THEN
      expect(manifestationCount).toEqual(1);
    });

    it('should return 1 when has active events', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [
          {
            id: 'eventId1',
            active: true,
          },
        ],
      } as ApiEntity;

      // WHEN
      const manifestationCount = TopologyUtil.toActiveManifestationCount(entity);

      // THEN
      expect(manifestationCount).toEqual(1);
    });

    it('should return 1 when has active slos', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [
          {
            id: 'sloId1',
            active: true,
          },
        ],
        events: [],
      } as ApiEntity;

      // WHEN
      const manifestationCount = TopologyUtil.toActiveManifestationCount(entity);

      // THEN
      expect(manifestationCount).toEqual(1);
    });

    it('should return 3 when active symptoms, slos and events', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [
          {
            id: 'symptomId1',
            active: true,
          },
        ],
        slos: [
          {
            id: 'sloId1',
            active: true,
          },
        ],
        events: [
          {
            id: 'eventId1',
            active: true,
          },
        ],
      } as ApiEntity;

      // WHEN
      const manifestationCount = TopologyUtil.toActiveManifestationCount(entity);

      // THEN
      expect(manifestationCount).toEqual(3);
    });
  });

  describe('toActiveSymptoms', () => {
    it('should return empty when no active symptoms', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const symptoms = TopologyUtil.toActiveSymptoms(entity);

      // THEN
      expect(symptoms).toEqual([]);
    });

    it('should return active symptoms', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [
          {
            name: 'SymptomName1',
            active: true,
          },
          {
            name: 'SymptomName2',
            active: false,
          },
        ],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const symptoms = TopologyUtil.toActiveSymptoms(entity);

      // THEN
      expect(symptoms).toEqual([
        {
          name: 'SymptomName1',
          active: true,
        },
      ]);
    });
  });

  describe('toActiveEvents', () => {
    it('should return empty when no active events', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const events = TopologyUtil.toActiveEvents(entity);

      // THEN
      expect(events).toEqual([]);
    });

    it('should return active symptoms', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [
          {
            name: 'EventName1',
            active: true,
          },
          {
            name: 'EventName2',
            active: false,
          },
        ],
      } as ApiEntity;

      // WHEN
      const events = TopologyUtil.toActiveEvents(entity);

      // THEN
      expect(events).toEqual([
        {
          name: 'EventName1',
          active: true,
        },
      ]);
    });
  });

  describe('toActiveSLOs', () => {
    it('should return empty when no active events', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [],
        events: [],
      } as ApiEntity;

      // WHEN
      const slos = TopologyUtil.toActiveSLOs(entity);

      // THEN
      expect(slos).toEqual([]);
    });

    it('should return active symptoms', () => {
      // GIVEN
      const entity = {
        id: 'entityId',
        name: 'entityName',
        typeName: 'entityTypeName',
        symptoms: [],
        slos: [
          {
            name: 'SLOName1',
            active: true,
          },
          {
            name: 'SLOName2',
            active: false,
          },
        ],
        events: [],
      } as ApiEntity;

      // WHEN
      const slos = TopologyUtil.toActiveSLOs(entity);

      // THEN
      expect(slos).toEqual([
        {
          name: 'SLOName1',
          active: true,
        },
      ]);
    });
  });

  describe('getUnit', () => {
    it('should return unit when available', () => {
      // WHEN
      const unit = TopologyUtil.getUnit({ description: 'CPU', unit: 'cores' });

      // THEN
      expect(unit).toEqual('cores');
    });

    it('should return unit when not available or invalid input', () => {
      // WHEN
      const unit = TopologyUtil.getUnit(null);

      // THEN
      expect(unit).toEqual('');
    });
  });

  describe('isIndicatorUnitPercentage', () => {
    it('should return true when unit is percent', () => {
      // WHEN
      const isPercent = TopologyUtil.isIndicatorUnitPercentage('percent');

      // THEN
      expect(isPercent).toEqual(true);
    });

    it('should return false when unit is not percent', () => {
      // WHEN
      const isPercent = TopologyUtil.isIndicatorUnitPercentage('');

      // THEN
      expect(isPercent).toEqual(false);
    });
  });

  describe('toLabelWithUnit', () => {
    it('should return label with unit when unit is not blank', () => {
      // WHEN
      const labelWithUnit = TopologyUtil.toLabelWithUnit('label', 'unit');

      // THEN
      expect(labelWithUnit).toEqual('feature.indicator.label.unit_other');
    });

    it('should return label without unit when unit is blank', () => {
      // WHEN
      const labelWithUnit = TopologyUtil.toLabelWithUnit('label', '');

      // THEN
      expect(labelWithUnit).toEqual('label');
    });
  });

  describe('toDeploymentCountData', () => {
    it('should return correct deployment count data', () => {
      // GIVEN
      const topologyCounts = [
        { entityType: 'Workload', count: 5 },
        { entityType: 'Cluster', count: 7 },
        { entityType: 'VirtualMachine', count: 7 },
        { entityType: 'Node', count: 7 },
        { entityType: 'NetworkEndPoint', count: 7 },
        { entityType: 'Pod', count: 7 },
        { entityType: 'Container', count: 7 },
        { entityType: 'Access', count: 7 },
        { entityType: 'Service', count: 7 },
      ];

      // WHEN
      const result = TopologyUtil.toDeploymentCountData(topologyCounts);

      // THEN
      expect(result).toEqual({
        containerOrchestrator: [
          {
            className: 'cui--deployment-counts__node--containerOrchestrator',
            countType: 'Cluster',
            countValue: 7,
            groupType: 'containerOrchestrator',
          },
          {
            className: 'cui--deployment-counts__node--containerOrchestrator',
            countType: 'Node',
            countValue: 7,
            groupType: 'containerOrchestrator',
          },
          {
            className: 'cui--deployment-counts__node--containerOrchestrator',
            countType: 'Pod',
            countValue: 7,
            groupType: 'containerOrchestrator',
          },
          {
            className: 'cui--deployment-counts__node--containerOrchestrator',
            countType: 'Container',
            countValue: 7,
            groupType: 'containerOrchestrator',
          },
        ],
        infrastructure: [
          {
            className: 'cui--deployment-counts__node--infrastructure',
            countType: 'VirtualMachine',
            countValue: 7,
            groupType: 'infrastructure',
          },
        ],
        service: [
          {
            className: 'cui--deployment-counts__node--service',
            countType: 'Workload',
            countValue: 5,
            groupType: 'service',
          },
          {
            className: 'cui--deployment-counts__node--service',
            countType: 'Service',
            countValue: 7,
            groupType: 'service',
          },
        ],
      });
    });
  });
});
