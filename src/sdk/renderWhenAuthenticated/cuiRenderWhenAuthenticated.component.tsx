import React, { useEffect, useState } from 'react';
import { TextLink } from '@grafana/ui';
import { JsonData } from '../../components/AppConfig/AppConfig';
import { AppPluginId } from '../../constants';
import { AppStateProvider } from 'components/AppStateProvider/AppStateProvider';
import { CauselyCredentials } from 'utils/credentials/CauselyCredentials.singleton';

interface Props {
  children: React.ReactNode;
}

  export const CuiRenderWhenAuthenticated: React.FC<Props> = ({ children }) => {
  const [credentialsSet, setCredentialsSet] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const causelyCreds: JsonData = (await CauselyCredentials.create())?.getCredentials() || {};
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
    
    return <AppStateProvider>{children}</AppStateProvider>;
  }

  return (
    <div>
      Please configure the plugin with Causely credentials in the{' '}
      <TextLink href={`/plugins/${AppPluginId}`}>app configuration page</TextLink>.
    </div>
  );
};
