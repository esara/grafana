import React from 'react';
import { useSingleServiceCardApi } from './useSingleServiceCardApi';
import { ServiceCardsPanelOptions } from '../module';
import { ServiceCardComponent } from 'panels/serviceCard/serviceCard.component';
import { CuiLoadingErrorWrapper } from 'sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';

export type SingleServiceCardComponentProps = {
  panelOptions: ServiceCardsPanelOptions;
};

const getSingleServiceStyles = (theme: GrafanaTheme2) => ({
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    height: '100%',
    overflow: 'auto',
  }),
  card: css({
    cursor: 'pointer',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.short,
    }),
    backgroundColor: `${theme.colors.background.secondary} !important`,
    flex: '1 1 10rem',
    minWidth: '25rem',
    maxWidth: '25rem',
    margin: theme.spacing(1),
    height: '23rem',
    padding: theme.spacing(2),
    '&:hover': {
      transform: 'scale(1.02)',
    },
  }),
});

export const SingleServiceCardComponent: React.FC<SingleServiceCardComponentProps> = ({ panelOptions }) => {
  const { isLoading, data, error } = useSingleServiceCardApi(panelOptions.singleServiceData);
  const styles = useStyles2(getSingleServiceStyles);

  return (
    <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
      <div className={styles.wrapper}>
        <div className={styles.card}>{data && <ServiceCardComponent serviceCardEntity={data} />}</div>
      </div>
    </CuiLoadingErrorWrapper>
  );
};
