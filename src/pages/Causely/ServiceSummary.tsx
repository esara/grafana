import React, { useState } from 'react';
import { prefixRoute } from "../../utils/utils.routing";
import { ROUTES } from "../../constants";
import { GrafanaTheme2, PageLayoutType } from '@grafana/data';
import {Button, LinkButton, useStyles2} from '@grafana/ui';
import { getBackendSrv, PluginPage } from "@grafana/runtime";
import { css } from "@emotion/css";
import { testIds } from 'components/testIds';
import {SceneComponentProps, SceneObjectBase, SceneObjectState} from "@grafana/scenes";

export type ApiEntityTypeCount = {
    __typename?: 'EntityTypeCount';
    count: number;
    entityType: string;
    severity?: string;
};

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
    const s = useStyles2(getStyles);
    const handleClick = () => {

        getBackendSrv().get(`api/plugins/esara-causely-app/resources/ping`),
        getBackendSrv().post(`api/plugins/esara-causely-app/resources/query`).then((response)=> {
            const data: ApiEntityTypeCounts = response.data;
            console.log("Response", data);
            setData(response);
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
                    <LinkButton data-testid={testIds.serviceSummary.navigateBack} icon="arrow-left" href={prefixRoute(ROUTES.Causely)}>
                        Back
                    </LinkButton>

                    <Button variant="primary" onClick={() => handleClick()}>
                        Make api request
                    </Button>

                    {data && (
                        <div>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}

                    <div className={s.content}>Playground</div>
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
    width: 900px;
    max-width: 100%;
    min-height: 500px;
  `,
    content: css`
    margin-top: ${theme.spacing(6)};
  `,
});
