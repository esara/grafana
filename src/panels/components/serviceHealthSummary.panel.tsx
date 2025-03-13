import React, {useEffect, useState} from 'react';
import {PanelProps} from '@grafana/data';
import {Button} from '@grafana/ui';
import { getBackendSrv } from "@grafana/runtime";
import {EntityHealthCard, EntityHealthCardData} from "./entityHealthCard/entityHealthCard.component";
import { ApiEntityTypeCount, EntityHealthCardsUtil } from './entityHealthCard/entityHealthCards.util';
import {Column, Theme, Grid} from '@carbon/react';

import './entityHealthCard/entityHealthCard.scss'

interface Props extends PanelProps<void> {}

interface ApiEntityTypeCounts {
    entityTypeCounts: ApiEntityTypeCount[];
};

const ServiceHealthSummaryPanel: React.FC<Props> = ({ }) => {
    const [entityHealthCardDatas, setEntityHealthCardDatas] = useState<EntityHealthCardData[]>([]);

    useEffect(() => {
        setEntityHealthCardDatas(EntityHealthCardsUtil.toEntityHealthCardDataList(
            mockDataDefectCounts.defectCounts,
            mockDataentityTypeCounts.entityTypeCounts as ApiEntityTypeCount[]
        ));
    }, [])
    const handleClick = () => {
        getBackendSrv()
        .post(`api/plugins/esara-causely-app/resources/query`)
        .then((response)=> {
            const data: ApiEntityTypeCounts = response.data;
            return data.entityTypeCounts;
        }).then((entityTypeCounts: ApiEntityTypeCount[]) => {
            setEntityHealthCardDatas(EntityHealthCardsUtil.toEntityHealthCardDataList(
                mockDataDefectCounts.defectCounts,//TODO Add api
                entityTypeCounts
            ));
        }).catch((error) => {
            console.error("Error", error);
        }).finally(() => {
            console.log("Finally");
        });
    }
    return (
            <div className="service-health-summary-panel">
                <div>
                    <Button variant="primary" onClick={() => handleClick()}>
                        Make api request
                    </Button>
                    <Theme theme="g100" id={"carbon-container"}>
                    <Grid>

                        {entityHealthCardDatas.map((entityHealthCardData, index) => {
                            return (
                                <Column lg={4} key={entityHealthCardData.severity} >
                                    {/*<Layer>*/}
                                        <EntityHealthCard
                                            key={entityHealthCardData.severity}
                                            data={entityHealthCardData}
                                            label="Services"
                                        />
                                    {/*</Layer>*/}
                                </Column>

                            )
                        })}
                    </Grid>
                    </Theme>
                </div>
            </div>
    );
}
const mockDataentityTypeCounts = {
    "entityTypeCounts": [
        {
            "entityType": "Service",
            "count": 50,
            "severity": "Normal",
        },
        {
            "entityType": "Service",
            "count": 2,
            "severity": "Warning",
        },
        {
            "entityType": "Service",
            "count": 1,
            "severity": "Major",
        },
        {
            "entityType": "Service",
            "count": 9,
            "severity": "Minor",
        },
        {
            "entityType": "Service",
            "count": 9,
            "severity": "Critical",
        }

    ]
}


const mockDataDefectCounts = {
    "defectCounts": [
    {
        "severity": "Critical",
        "defectAutoCount": 0,
        "defectCount": 1,
        "defectManualCount": 0,
        "defectName": "Congested",
        "entityType": "Service",
        "time": "2025-03-10T18:05:19Z",
        
    },
    {
        "severity": "Critical",
        "defectAutoCount": 0,
        "defectCount": 1,
        "defectManualCount": 0,
        "defectName": "DBConnections_Congested",
        "entityType": "Workload",
        "time": "2025-03-10T18:05:19Z",
    },
    {
        "severity": "Medium",
        "defectAutoCount": 0,
        "defectCount": 1,
        "defectManualCount": 0,
        "defectName": "InefficientGC",
        "entityType": "Service",
        "time": "2025-03-10T18:05:19Z",
        
    },
    {
        "severity": "Low",
        "defectAutoCount": 0,
        "defectCount": 1,
        "defectManualCount": 0,
        "defectName": "Malfunction",
        "entityType": "Controller",
        "time": "2025-03-10T18:05:19Z",
        
    },
    {
        "severity": "Low",
        "defectAutoCount": 0,
        "defectCount": 1,
        "defectManualCount": 0,
        "defectName": "Malfunction",
        "entityType": "Service",
        "time": "2025-03-10T18:05:19Z",
    },
    {
        "severity": "Low",
        "defectAutoCount": 0,
        "defectCount": 1,
        "defectManualCount": 0,
        "defectName": "Memory_NoisyNeighbor",
        "entityType": "Container",
        "time": "2025-03-10T18:05:19Z",
    },
    {
        "severity": "Low",
        "defectAutoCount": 0,
        "defectCount": 1,
        "defectManualCount": 0,
        "defectName": "SlowDatabaseServerQuery",
        "entityType": "Workload",
        "time": "2025-03-10T18:05:19Z",
    }
]

}

export default ServiceHealthSummaryPanel;
