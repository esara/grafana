import React, { useState } from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme2, PageLayoutType } from '@grafana/data';
import { Button, LinkButton, useStyles2 } from '@grafana/ui';
import { ROUTES } from '../../constants';
import { getBackendSrv, PluginPage } from '@grafana/runtime';
import { testIds } from 'components/testIds';
import { prefixRoute } from 'utils/utils.routing';

export type ApiEntityTypeCount = {
  __typename?: 'EntityTypeCount';
  count: number;
  entityType: string;
  severity?: string;
};

type ApiEntityTypeCounts = {
  entityTypeCounts: ApiEntityTypeCount[];
};

function Causely() {
  const [data, setData] = useState<any>(null);
  
  const s = useStyles2(getStyles);

  const handleClick = () => {
    
        // getBackendSrv().get(`api/plugins/esara-causely-app/resources/ping`),
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
      <div className={s.page} data-testid={testIds.pageFour.container}>
        <div className={s.container}>
          <LinkButton data-testid={testIds.pageFour.navigateBack} icon="arrow-left" href={prefixRoute(ROUTES.HelloWorld)}>
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

export default Causely;

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
// dataContainer: css`
  //   margin-top: ${theme.spacing(4)};
  //   padding: ${theme.spacing(2)};
  //   background-color: ${theme.colors.background.primary};
  //   border-radius: ${theme.border.radius.sm};
  // `,
});
