import { ServiceCardComponent } from 'panels/serviceCard/serviceCard.component';
import React from 'react';
import { CuiLoadingErrorWrapper } from 'sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component';
import { ServiceCardEntity, useServiceCardsApi } from './useServiceCardsApi';
import { ObjectsUtil } from 'utils/objects/objects.util';
import { CuiPagination, CuiPaginationDirection } from 'sdk/pagination/cuiPagination.component';
import { CUIText } from 'sdk/text/cui-text.component';
import { CUIRenderWhen } from 'sdk/cuiRenderWhen/coreRenderWhen.component';
import { ServiceCardsPanelOptions } from '../module';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';

export type ServiceCardsComponentProps = {
  panelOptions: ServiceCardsPanelOptions;
};

const getServiceCardsStyles = (theme: GrafanaTheme2) => ({
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))',
    gap: theme.spacing(2),
    maxHeight: '84%',
    overflow: 'auto',
    padding: theme.spacing(1),
  }),
  card: css({
    cursor: 'pointer',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.short,
    }),
    backgroundColor: `${theme.colors.background.secondary} !important`,
    minWidth: '25rem',
    maxWidth: '25rem',
    height: 'auto',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    '& *': {
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    },
    '&:hover': {
      transform: 'scale(1.02)',
    },
  }),
  total: css({
    color: theme.colors.success.main,
  }),
  description: css({
    marginBottom: theme.spacing(1),
  }),
  pagination: css({
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.colors.secondary.border}`,
    zIndex: theme.zIndex.dropdown,
    overflow: 'hidden',
  }),
});

export const ServiceCardsComponent: React.FC<ServiceCardsComponentProps> = ({ panelOptions }) => {
  const { isLoading, data, error, fetchData, pageInfo, serviceCounts } = useServiceCardsApi(panelOptions);
  const styles = useStyles2(getServiceCardsStyles);

  return (
    <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
      <CUIRenderWhen condition={serviceCounts.unhealthy < 1}>
        <div className={styles.card}>
          <CUIText size="1.125">
            All <span className={styles.total}>{serviceCounts.total}</span> services in good health
          </CUIText>
          <CUIText size="1">
            {`We will continue to actively monitor your environment and provide further information as it becomes available.`}
          </CUIText>
        </div>
      </CUIRenderWhen>

      <CUIRenderWhen condition={serviceCounts.unhealthy > 0}>
        <div className={styles.description}>
          <CUIText size="1.125">
            {serviceCounts.unhealthy} of out {serviceCounts.total} services unhealthy
          </CUIText>
        </div>
        <div className={styles.grid}>
          {(ObjectsUtil.values(data) as ServiceCardEntity[]).map((entity: ServiceCardEntity) => {
            return (
              <div key={entity.id} className={styles.card}>
                <ServiceCardComponent serviceCardEntity={entity} />
              </div>
            );
          })}
        </div>
        <div className={styles.pagination}>
          <CuiPagination
            onLeftScroll={() => fetchData(CuiPaginationDirection.PREVIOUS)}
            onRightScroll={() => fetchData(CuiPaginationDirection.NEXT)}
            onPageOneScroll={() => fetchData()}
            leftDisabled={!pageInfo?.hasPreviousPage}
            rightDisabled={!pageInfo?.hasNextPage}
          />
        </div>
      </CUIRenderWhen>
    </CuiLoadingErrorWrapper>
  );
};
