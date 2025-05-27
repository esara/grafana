import React, { useState } from 'react';
import { Combobox, ComboboxOption, LoadingBar } from '@grafana/ui';
import { StandardEditorProps } from '@grafana/data';
import { GetUserScopesQueryData, QueryGetUserScopes } from 'api/graphql/queries/queryGetUserScopes';
import { QueryResult } from 'api/apiUtil';
import { ApiUserScope, ApiUserScopeAudience, ApiUserScopeEdge } from 'api/api.types';
import { StringsUtil } from 'utils/strings/strings.util';
import { CUIRenderWhen } from 'sdk/cuiRenderWhen/coreRenderWhen.component';

export type UserScopeComboboxOption = ComboboxOption<string> & {
  meta: ApiUserScope
};

const GlobalOption: UserScopeComboboxOption = {
  label: 'Global',
  value: '9999',
  group: null,
  meta: { id: '9999', name: 'Global', scopes: [] } as ApiUserScope
};

export const ScopeSelectEditor: React.FC<StandardEditorProps<ApiUserScope>> = ({ value, onChange }) => {
  const [options, setOptions] = useState<UserScopeComboboxOption[]>([]);
  const [selected, setSelected] = useState<ApiUserScope | undefined>(GlobalOption.meta);

  React.useEffect(() => {
    QueryGetUserScopes().then((res: QueryResult<GetUserScopesQueryData>) => {
      const userScopeOptions: UserScopeComboboxOption[] = [];
      res.data?.getUserScopes?.edges?.forEach((edge: ApiUserScopeEdge) => {
        userScopeOptions.push({
          label: edge.node.name,
          value: edge.node.id,
          group: StringsUtil.equalsIgnoreCase(edge.node.audience, ApiUserScopeAudience.Global) ? 'Public' : 'Private',
          meta: edge.node
        });
      });
      setOptions([GlobalOption, ...userScopeOptions]);
    }).catch((error) => {
      console.error("Scope Select Editor Error: ", error);
    });
  }, []);


  const handleChange = (item: UserScopeComboboxOption) => {
    setSelected(item.meta);
    onChange(item.meta); // update panel option state
  };

  return (
    <>
      <CUIRenderWhen condition={options.length < 1}>
        <LoadingBar width={100} />
      </CUIRenderWhen>
      <CUIRenderWhen condition={options.length > 0}>
        <Combobox
          placeholder="Choose a scope"
          options={options}
          // @ts-ignore
          onChange={handleChange}
          value={selected?.id}
        />
      </CUIRenderWhen>
    </>
  );
};
