import React from 'react';
import { RootCauseCard } from './rootCauseCard/rootCauseCard.component';
import { CuiLoadingErrorWrapper } from 'sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component';
import { ApiDefect, ApiDefectEdge, ApiUserScope } from 'api/api.types';
import { CUIRenderWhen } from 'sdk/cuiRenderWhen/coreRenderWhen.component';
import { CUIText } from 'sdk/text/cui-text.component';
import { Spinner, useStyles2 } from '@grafana/ui';
import { useRootCausePanelApi } from './useUrgentRootCausesApi';
import { RouteUtil } from 'utils/route/route.util';
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

const getUrgentRootCauseStyles = (theme: GrafanaTheme2) => ({
  content: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    height: '100%',
    overflow: 'auto',
    gap: theme.spacing(4),
  }),
  emptyState: css({
    backgroundColor: theme.colors.background.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(4),
  }),
  card: css({
    cursor: 'pointer',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.short,
    }),
    backgroundColor: `${theme.colors.error.transparent} !important`,
    flex: '1 1 10rem',
    minWidth: '25rem',
    maxWidth: '25rem',
    margin: theme.spacing(1),
    height: '23rem',
    padding: theme.spacing(2),
    '&:hover': {
      transform: 'scale(1.02)',
      backgroundColor: `${theme.colors.error.borderTransparent} !important`,
    },
    '& *': {
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    },
  }),
});

export const UrgentRootCauseComponent = ({ userScope }: { userScope: ApiUserScope }) => {
  const { isLoading, data, error } = useRootCausePanelApi(userScope);

  const totalCount = data?.totalCount;
  const openNewTab = useOpenNewTab();

  const rootCauseEdges: ApiDefectEdge[] = data?.edges ?? [];

  const isEmptyState = !data || data?.edges.length === 0;
  const styles = useStyles2(getUrgentRootCauseStyles);

  return (
    <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
      <div className={styles.content}>
        <CUIRenderWhen condition={isEmptyState}>
          <div className={styles.emptyState}>
            <CUIText size={'1.5'}>
              There are no urgent root causes. Causely actively monitoring and if anything comes up, we will update here.
            </CUIText>
            <Spinner />
          </div>
        </CUIRenderWhen>
        <CUIRenderWhen condition={!isEmptyState}>
          {rootCauseEdges?.map((rootCause: ApiDefectEdge) => {
            const rootCauseData: ApiDefect = rootCause.node;

            return (
              <div key={rootCause.node.id} className={styles.card}>
                <RootCauseCard rootCause={rootCauseData} />
              </div>
            );
          })}

          <CUIRenderWhen condition={(totalCount ?? 0) > 3}>
            <div
              key={'AdditionalRC'}
              className={styles.card}
              onClick={() => openNewTab(RouteUtil.getUrgentRootCausesRoutePath())}
            >
              <CUIText size={'1.5'}>
                Review the {(totalCount ?? 0) - 3} additional service degrading root causes affecting your system. Go
                to Causely.
              </CUIText>
            </div>
          </CUIRenderWhen>
        </CUIRenderWhen>
      </div>
    </CuiLoadingErrorWrapper>
  );
};
