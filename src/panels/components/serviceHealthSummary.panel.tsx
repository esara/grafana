import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { Button, Grid } from '@grafana/ui';
import { getBackendSrv } from '@grafana/runtime';
import { EntityHealthCard, EntityHealthCardData } from './entityHealthCard/entityHealthCard.component';
import { ApiDefectCount, ApiEntityTypeCount, EntityHealthCardsUtil } from './entityHealthCard/entityHealthCards.util';

interface Props extends PanelProps<void> {}


const ServiceHealthSummaryPanel: React.FC<Props> = ({}) => {
  const [entityHealthCardDatas, setEntityHealthCardDatas] = useState<EntityHealthCardData[]>([]);

  useEffect(() => {
    setEntityHealthCardDatas(
      EntityHealthCardsUtil.toEntityHealthCardDataList(
        mockDataDefectCounts.defectCounts,
        mockDataentityTypeCounts.entityTypeCounts as ApiEntityTypeCount[]
      )
    );
  }, []);

  const entityCountPayload = {
    operationName: 'entityTypeCounts',
    variables: {
      entityFilter: {
        entityTypes: ['Service'],
      },
    },
    query:
      'query entityTypeCounts($entityFilter: EntityFilter) {\n  entityTypeCounts(entityFilter: $entityFilter) {\n    entityType\n    count\n    severity    __typename }}',
  };

  const defectCountPayload = {
    operationName: 'defectCounts',
    query:
      'query defectCounts($bucketSize: String, $filter: DefectFilter, $groupRecurring: Boolean) {\n  defectCounts(\n    bucketSize: $bucketSize\n    filter: $filter\n    groupRecurring: $groupRecurring\n  ) {\n    severity\n    defectAutoCount\n    defectCount\n    defectManualCount\n    defectName\n    entityType\n    time\n    __typename\n  }\n}',
  };

  const handleClick = () => {
    const promises = [
      getBackendSrv().post(`api/plugins/esara-causely-app/resources/query`, entityCountPayload),
      getBackendSrv().post(`api/plugins/esara-causely-app/resources/query`, defectCountPayload),
    ];

    Promise.all(promises)
      .then((response) => {
        const entityCounts: ApiEntityTypeCount[] = response[0].data?.entityTypeCounts ?? [];
        const defectCounts: ApiDefectCount[] = response[1]?.data?.defectCounts ?? [];
        return { entityCounts, defectCounts };
      })
      .then(({ entityCounts, defectCounts }) => {
        setEntityHealthCardDatas(EntityHealthCardsUtil.toEntityHealthCardDataList(defectCounts, entityCounts));
      })
      .catch((error) => {
        console.error('Error', error);
      })
      .finally(() => {
        console.log('Finally');
      });
  };
  return (
    <div className="service-health-summary-panel">
      <div>
        <Button variant="primary" onClick={() => handleClick()}>
          Make api request
        </Button>
        <Grid columns={5} alignItems={'stretch'} gap={4}>
          {entityHealthCardDatas.map((entityHealthCardData, index) => {
            return (
              <div key={entityHealthCardData.severity}>
                <EntityHealthCard key={entityHealthCardData.severity} data={entityHealthCardData} label="Services" />
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
const mockDataentityTypeCounts = {
  entityTypeCounts: [
    {
      entityType: 'Service',
      count: 50,
      severity: 'Normal',
    },
    {
      entityType: 'Service',
      count: 2,
      severity: 'Warning',
    },
    {
      entityType: 'Service',
      count: 1,
      severity: 'Major',
    },
    {
      entityType: 'Service',
      count: 9,
      severity: 'Minor',
    },
    {
      entityType: 'Service',
      count: 9,
      severity: 'Critical',
    },
  ],
};

const mockDataDefectCounts = {
  defectCounts: [
    {
      severity: 'Critical',
      defectAutoCount: 0,
      defectCount: 1,
      defectManualCount: 0,
      defectName: 'Congested',
      entityType: 'Service',
      time: '2025-03-10T18:05:19Z',
    },
    {
      severity: 'Critical',
      defectAutoCount: 0,
      defectCount: 1,
      defectManualCount: 0,
      defectName: 'DBConnections_Congested',
      entityType: 'Workload',
      time: '2025-03-10T18:05:19Z',
    },
    {
      severity: 'Medium',
      defectAutoCount: 0,
      defectCount: 1,
      defectManualCount: 0,
      defectName: 'InefficientGC',
      entityType: 'Service',
      time: '2025-03-10T18:05:19Z',
    },
    {
      severity: 'Low',
      defectAutoCount: 0,
      defectCount: 1,
      defectManualCount: 0,
      defectName: 'Malfunction',
      entityType: 'Controller',
      time: '2025-03-10T18:05:19Z',
    },
    {
      severity: 'Low',
      defectAutoCount: 0,
      defectCount: 1,
      defectManualCount: 0,
      defectName: 'Malfunction',
      entityType: 'Service',
      time: '2025-03-10T18:05:19Z',
    },
    {
      severity: 'Low',
      defectAutoCount: 0,
      defectCount: 1,
      defectManualCount: 0,
      defectName: 'Memory_NoisyNeighbor',
      entityType: 'Container',
      time: '2025-03-10T18:05:19Z',
    },
    {
      severity: 'Low',
      defectAutoCount: 0,
      defectCount: 1,
      defectManualCount: 0,
      defectName: 'SlowDatabaseServerQuery',
      entityType: 'Workload',
      time: '2025-03-10T18:05:19Z',
    },
  ],
};

export default ServiceHealthSummaryPanel;
