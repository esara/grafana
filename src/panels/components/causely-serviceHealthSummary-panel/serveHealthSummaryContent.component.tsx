import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { useServiceHealthApi } from './useServiceHealthApi';
import { EntityHealthCard, EntityHealthCardData } from './entityHealthCard.component';
import { CuiLoadingErrorWrapper } from 'sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component';

export const ServiceHealthSummaryContent: React.FC = () => {
  const { isLoading, data, error } = useServiceHealthApi();
  const panelStyles = useStyles2((theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      alignItems: 'stretch',
      height: '100%',
      overflow: 'auto',
    }),
  );

  return (
    <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
      <div className={panelStyles}>
        {data.map((entityHealthCardData: EntityHealthCardData) => {
          return (
            <div key={entityHealthCardData.severity}>
              <EntityHealthCard key={entityHealthCardData.severity} data={entityHealthCardData} label="Services" />
            </div>
          );
        })}
      </div>
    </CuiLoadingErrorWrapper>
  );
};
