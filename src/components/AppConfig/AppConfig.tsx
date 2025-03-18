import React, { useState, ChangeEvent } from 'react';
import { Button, Field, Input, useStyles2, FieldSet, SecretInput } from '@grafana/ui';
import { PluginConfigPageProps, AppPluginMeta, PluginMeta, GrafanaTheme2 } from '@grafana/data';
import { getBackendSrv, locationService } from '@grafana/runtime';
import { css } from '@emotion/css';
import { testIds } from '../testIds';
import { lastValueFrom } from 'rxjs';

export type JsonData = {
  causelyDomain?: string;
  isCauselyPasswordSet?: boolean;
  causelyUsername?: string;
};

type State = {
  // The URL to reach our custom API.
  causelyDomain: string;
  // Causely Username
  causelyUsername: string;
  // Causely Password
  isCauselyPasswordSet: boolean;
  causelyPassword: string;
};

export interface AppConfigProps extends PluginConfigPageProps<AppPluginMeta<JsonData>> {}

const AppConfig = ({ plugin }: AppConfigProps) => {
  const s = useStyles2(getStyles);
  const { enabled, pinned, jsonData } = plugin.meta;
  const [state, setState] = useState<State>({
    causelyDomain: jsonData?.causelyDomain || '',
    isCauselyPasswordSet: Boolean(jsonData?.isCauselyPasswordSet),
    causelyUsername: '',
    causelyPassword: '',
  });

  const isSubmitDisabled = Boolean(!state.causelyDomain || !state.causelyUsername || !state.causelyPassword);

  const onChangeCauselyDomain = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      causelyDomain: event.target.value.trim(),
    });
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      causelyUsername: event.target.value.trim(),
    });
  };

  const onResetCauselyPassword = () =>
    setState({
      ...state,
      causelyPassword: '',
      isCauselyPasswordSet: false,
    });

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      causelyPassword: event.target.value.trim(),
    });
  };

  const onSubmit = () => {
    updatePluginAndReload(plugin.meta.id, {
      enabled,
      pinned,
      jsonData: {
        causelyDomain: state.causelyDomain,
        isCauselyPasswordSet: true,
        causelyUsername: state.causelyUsername,
      },
      // This cannot be queried later by the frontend.
      // We don't want to override it in case it was set previously and left untouched now.
      secureJsonData: {
        ...(state.isCauselyPasswordSet ? {} : { causelyPassword: state.causelyPassword }),
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldSet label="Causely Settings" className={s.marginTopXl}>
        <Field label="Causely Domain" description="" className={s.marginTop}>
          <Input
            width={60}
            id="causely-dmain"
            data-testid={testIds.appConfig.causelyDomain}
            label={`Causely Domain`}
            value={state?.causelyDomain}
            placeholder={`causely.app`}
            onChange={onChangeCauselyDomain}
          />
        </Field>

        {/* Causely Username */}
        <Field label="Causely Username" description="" className={s.marginTop}>
          <Input
            width={60}
            id="causey-username"
            data-testid={testIds.appConfig.causelyUsername}
            label={`Causely Username`}
            value={state?.causelyUsername}
            placeholder={``}
            onChange={onChangeUsername}
          />
        </Field>

        {/* Causely Password */}
        <Field label="Causely Password" description="Causely Password for authernication" className={s.marginTop}>
          <SecretInput
            width={60}
            data-testid={testIds.appConfig.causelyPassword}
            id="causely-password"
            value={state?.causelyPassword}
            isConfigured={state.isCauselyPasswordSet}
            placeholder={'Causely Password'}
            onChange={onChangePassword}
            onReset={onResetCauselyPassword}
          />
        </Field>

        <div className={s.marginTop}>
          <Button type="submit" data-testid={testIds.appConfig.submit} disabled={isSubmitDisabled}>
            Save Causely Credentials
          </Button>
        </div>
      </FieldSet>
    </form>
  );
};

export default AppConfig;

const getStyles = (theme: GrafanaTheme2) => ({
  colorWeak: css`
    color: ${theme.colors.text.secondary};
  `,
  marginTop: css`
    margin-top: ${theme.spacing(3)};
  `,
  marginTopXl: css`
    margin-top: ${theme.spacing(6)};
  `,
});

const updatePluginAndReload = async (pluginId: string, data: Partial<PluginMeta<JsonData>>) => {
  try {
    await updatePlugin(pluginId, data);

    // Reloading the page as the changes made here wouldn't be propagated to the actual plugin otherwise.
    // This is not ideal, however unfortunately currently there is no supported way for updating the plugin state.
    locationService.reload();
  } catch (e) {
    console.error('Error while updating the plugin', e);
  }
};

const updatePlugin = async (pluginId: string, data: Partial<PluginMeta>) => {
  console.log('Updating plugin', pluginId, data);
  const response = getBackendSrv().fetch({
    url: `/api/plugins/${pluginId}/settings`,
    method: 'POST',
    data,
  });

  const dataResponse = await lastValueFrom(response);

  return dataResponse.data;
};
