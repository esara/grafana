import React, { useEffect, useState } from 'react';
import { getBackendSrv } from '@grafana/runtime';
import { TextLink } from '@grafana/ui';
import { AppPluginMeta } from '@grafana/data';
import { JsonData } from '../../AppConfig/AppConfig';
import { AppPluginId } from '../../../constants';

interface Props {
  children: React.ReactNode;
}

export const RenderWhenAuthenticated: React.FC<Props> = ({ children }) => {
  const [credentialsSet, setCredentialsSet] = useState<boolean>(false);

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
  }, []);

  if (credentialsSet) {
    return <>{children}</>;
  }

  return (
    <div>
      Please configure the plugin with Causely credentials in the{' '}
      <TextLink href={`/plugins/${AppPluginId}`}>app configuration page</TextLink>.
    </div>
  );
};
