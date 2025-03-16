import React, { useEffect, useState } from 'react';
import {AppPluginMeta, PanelProps} from '@grafana/data';
import {Button, Grid, LoadingPlaceholder, TextLink} from '@grafana/ui';
import {FetchResponse, getBackendSrv} from '@grafana/runtime';
import { EntityHealthCard, EntityHealthCardData } from './entityHealthCard/entityHealthCard.component';
import {lastValueFrom} from "rxjs";
import {JsonData} from "../../components/AppConfig/AppConfig";
import {AppPluginId} from "../../constants";
import useServiceHealthApi from "./useServiceHealthApi";
interface Props extends PanelProps<void> {}


const ServiceHealthSummaryPanel: React.FC<Props> = () => {
  const  [credentialsSet, setCredentialsSet] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const response = getBackendSrv().fetch({
        url: `/api/plugins/${AppPluginId}/settings`,
        method: 'GET',
      });

      // @ts-ignore
      const dataResponse: FetchResponse<AppPluginMeta<JsonData>> = await lastValueFrom<>(response);
      const causelyCreds: JsonData = dataResponse?.data?.jsonData || {};

      setCredentialsSet(!!(causelyCreds.isCauselyPasswordSet && causelyCreds.causelyUsername && causelyCreds.causelyDomain));
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  if (credentialsSet) {
    return <ServiceHealthSummary/>;
  }
  return(
      <>
        <div>Please configure the plugin with Causely credentials in the  <TextLink href={`/plugins/${AppPluginId}`} >app configuration page</TextLink>.</div>
      </>
  )
}

const ServiceHealthSummary: React.FC = () => {
  const {isLoading, data, error, fetchData} = useServiceHealthApi();

  if (isLoading) {
    return (
        <LoadingPlaceholder text="Loading..." />
    )
  }
  if (error) {
      return (
          <div>Error: {error}</div>
      )
  }
  return (
    <div className="service-health-summary-panel">
      <div>
        <Button variant="primary" onClick={() => fetchData()}>
          Make api request
        </Button>
        <Grid columns={5} alignItems={'stretch'} gap={4}>
          {data.map((entityHealthCardData: EntityHealthCardData) => {
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

export default ServiceHealthSummaryPanel;
