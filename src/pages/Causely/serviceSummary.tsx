import React, {useEffect, useState} from 'react';
import { GrafanaTheme2, PageLayoutType } from '@grafana/data';
import {Button, useStyles2} from '@grafana/ui';
import { getBackendSrv, PluginPage } from "@grafana/runtime";
import { css } from "@emotion/css";
import { testIds } from 'components/testIds';
import {SceneComponentProps, SceneObjectBase, SceneObjectState} from "@grafana/scenes";
import {EntityHealthCard, EntityHealthCardData} from "./entityHealthCard/entityHealthCard.component";
import { ApiEntityTypeCount, EntityHealthCardsUtil } from './entityHealthCard/entityHealthCards.util';
import {Column, Theme, Grid} from '@carbon/react';

import ('./entityHealthCard/entityHealthCard.scss');

interface ApiEntityTypeCounts extends SceneObjectState {
    entityTypeCounts: ApiEntityTypeCount[];
};


export class ServiceSummaryObject extends SceneObjectBase<ApiEntityTypeCounts> {
    static Component = ServiceSummaryObjectRenderer;

    onValueChange = (etcValues: ApiEntityTypeCount[]) => {
        this.setState({ entityTypeCounts: etcValues });
    };
}


function ServiceSummaryObjectRenderer({ model }: SceneComponentProps<ServiceSummaryObject>) {
    const [data, setData] = useState<any>(null);
    const [entityHealthCardDatas, setEntityHealthCardDatas] = useState<EntityHealthCardData[]>([]);
    const s = useStyles2(getStyles);

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
            console.log("Response", data);
            setData(response);
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
        <PluginPage layout={PageLayoutType.Canvas}>
            <div className={s.page} data-testid={testIds.serviceSummary.container}>
                <div className={s.container}>
                    <Button variant="primary" onClick={() => handleClick()}>
                        Make api request
                    </Button>

                    {data && (
                        <div>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
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
        </PluginPage>
    );
}

const getStyles = (theme: GrafanaTheme2) => ({
    page: css`
    padding: ${theme.spacing(3)};
    background-color: ${theme.colors.background.secondary};
    display: flex;
    justify-content: center;
  `,
    container: css`
    width: 100%;
    max-width: 100%;
    min-height: 500px;
  `,
    content: css`
    margin-top: ${theme.spacing(6)};
  `,
});

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
