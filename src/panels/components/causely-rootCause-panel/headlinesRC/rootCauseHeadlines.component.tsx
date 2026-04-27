import { ApiHeadlineItem, ApiUserScope } from 'api/api.types';
import React from 'react';
import { CUIRenderWhen } from 'sdk/cuiRenderWhen/coreRenderWhen.component';
import { CUIHeading } from 'sdk/heading/cui-heading.component';
import { CuiLoadingErrorWrapper } from 'sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component';
import { ArraysUtil } from 'utils/arrays/arrays.util';
import { RootCauseHeadline } from './headline/rootCauseHeadline.component';
import { DefectsUtil } from 'utils/defects/defects.util';
import clsx from 'clsx';
import { useRootCauseHeadlinesApi } from './useRootCauseHeadlinesApi.hook';
import { CUIText } from 'sdk/text/cui-text.component';
import { RouteUtil } from 'utils/route/route.util';
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';

import { CUISection } from 'sdk/section/cuiSection.component';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';

const getRootCauseHeadlinesStyles = (theme: GrafanaTheme2) => ({
  root: css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    height: '100%',
    overflow: 'auto',
  }),
  emptyState: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    padding: theme.spacing(4),
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.shape.radius.default,
  }),
  headlineCard: css({
    cursor: 'pointer',
    borderRadius: theme.shape.radius.default,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    transition: theme.transitions.create(['transform', 'background-color'], {
      duration: theme.transitions.duration.short,
    }),
  }),
  headlineCardDefault: css({
    backgroundColor: theme.colors.background.secondary,
    '&:hover': {
      transform: 'scale(1.01)',
      backgroundColor: theme.colors.secondary.transparent,
    },
  }),
  headlineCardUrgent: css({
    backgroundColor: theme.colors.error.transparent,
    '&:hover': {
      transform: 'scale(1.01)',
      backgroundColor: theme.colors.error.borderTransparent,
    },
  }),
});

function getHeadlineCardClassName(
  styles: ReturnType<typeof getRootCauseHeadlinesStyles>,
  headline: ApiHeadlineItem | null,
): string {
  const isActive = headline ? DefectsUtil.isDetected(headline.defect) : false;
  const isUrgent = headline ? DefectsUtil.isUrgent(headline.defect) : false;
  const urgent = isActive && isUrgent;

  return clsx(styles.headlineCard, urgent ? styles.headlineCardUrgent : styles.headlineCardDefault);
}

export const RootCauseHeadlines = ({ userScope }: { userScope: ApiUserScope }) => {
  const { isLoading, headlinesData, error } = useRootCauseHeadlinesApi(userScope);
  const openNewTab = useOpenNewTab();
  const styles = useStyles2(getRootCauseHeadlinesStyles);

  const { headlines, urgentRcActiveCount } = headlinesData;

  const isEmptyState: boolean = ArraysUtil.isEmpty(headlines);

  return (
    <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
      <div className={styles.root}>
        <CUISection>
          <CUIHeading>RootCause Headlines</CUIHeading>
        </CUISection>

        <CUIRenderWhen condition={isEmptyState}>
          <div className={styles.emptyState}>No notable headlines in the last 24hrs</div>
          <div
            className={getHeadlineCardClassName(styles, null)}
            onClick={() => {
              openNewTab(RouteUtil.getDiagnoseRoutePath());
            }}
          >
            <CUIHeading>Not all root cause announce themselves</CUIHeading>

            <CUIText>Spot the cracks before they spread— view all root causes in Causely</CUIText>
          </div>
        </CUIRenderWhen>

        <CUIRenderWhen condition={!isEmptyState}>
          {headlines.map((headline: ApiHeadlineItem) => (
            <div key={headline.defect.id} className={getHeadlineCardClassName(styles, headline)}>
              <RootCauseHeadline key={headline.defect.id} headline={headline} />
            </div>
          ))}

          <CUIRenderWhen condition={urgentRcActiveCount > 3}>
            <div
              className={getHeadlineCardClassName(styles, headlines[0])}
              onClick={() => {
                openNewTab(RouteUtil.getDiagnoseRoutePath());
              }}
            >
              <CUIHeading>
                {`There is another ${urgentRcActiveCount - 3} Urgent Root Cause(s) active. View in Causely`}
              </CUIHeading>
            </div>
          </CUIRenderWhen>

          <CUIRenderWhen condition={urgentRcActiveCount < 4}>
            <div
              className={getHeadlineCardClassName(styles, null)}
              onClick={() => {
                openNewTab(RouteUtil.getDiagnoseRoutePath());
              }}
            >
              <CUIHeading>Not all root cause announce themselves</CUIHeading>

              <CUIText>Spot the cracks before they spread— view all root causes in Causely</CUIText>
            </div>
          </CUIRenderWhen>
        </CUIRenderWhen>
      </div>
    </CuiLoadingErrorWrapper>
  );
};
