import React, { useEffect, useState } from 'react';
import { AppPluginMeta, PanelProps } from '@grafana/data';
import { TextLink } from '@grafana/ui';
import { FetchResponse, getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from "rxjs";
import { JsonData } from "../../../components/AppConfig/AppConfig";
import { AppPluginId } from "../../../constants";
import { ServiceHealthSummaryContent } from "./serveHealthSummaryContent.component";
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
    return <ServiceHealthSummaryContent/>;
  }
  return(
      <>
        <div>Please configure the plugin with Causely credentials in the  <TextLink href={`/plugins/${AppPluginId}`} >app configuration page</TextLink>.</div>
      </>
  )
}

export default ServiceHealthSummaryPanel;
