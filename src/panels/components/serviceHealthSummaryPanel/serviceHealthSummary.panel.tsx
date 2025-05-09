import React, { useEffect, useState } from 'react';
import { AppPluginMeta, PanelProps } from '@grafana/data';
import { TextLink } from '@grafana/ui';
import { getBackendSrv } from '@grafana/runtime';
import { JsonData } from "../../../components/AppConfig/AppConfig";
import { AppPluginId } from "../../../constants";
import { ServiceHealthSummaryContent } from "./serveHealthSummaryContent.component";
interface Props extends PanelProps<void> {}

const ServiceHealthSummaryPanel: React.FC<Props> = () => {
  const  [credentialsSet, setCredentialsSet] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getBackendSrv().get<AppPluginMeta<JsonData>>(`/api/plugins/${AppPluginId}/settings`);
      const causelyCreds: JsonData = response?.jsonData || {};

      setCredentialsSet(!!(
        causelyCreds.causelyDomain &&
        (
          (causelyCreds.isCauselySecretSet && causelyCreds.causelyClientId) ||
          (causelyCreds.isCauselyPasswordSet && causelyCreds.causelyUsername)
        )
      ));
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
