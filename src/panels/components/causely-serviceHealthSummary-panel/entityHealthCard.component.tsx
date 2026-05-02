import React, { FC, ReactElement } from 'react';
import { Card, useStyles2 } from '@grafana/ui';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { RouteUtil } from 'utils/route/route.util';
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';

export type EntityHealthCardData = {
  title: string;
  percentage: string;
  severity: string;
  count: number;
  rootCauseCount: number;
  total: number;
};

type EntityHealthCardProps = {
  data: EntityHealthCardData;
  label: string;
};

function severityColor(theme: GrafanaTheme2, severity: string): string {
  const s = severity.toLowerCase();
  if (s === 'critical') {
    return theme.colors.error.main;
  }
  if (s === 'major') {
    return theme.colors.warning.shade;
  }
  if (s === 'minor' || s === 'warning') {
    return theme.colors.warning.main;
  }
  if (s === 'normal') {
    return theme.colors.success.main;
  }
  return theme.colors.text.primary;
}

const getEntityHealthCardStyles = (theme: GrafanaTheme2, severity: string) => ({
  root: css({}),
  content: css({
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  }),
  count: css({
    margin: theme.spacing(1, 0),
    fontSize: theme.typography.h4.fontSize,
    color: severityColor(theme, severity),
  }),
  percentage: css({
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.text.secondary,
  }),
  total: css({}),
  rootCauseSummary: css({}),
});

export const EntityHealthCard: FC<EntityHealthCardProps> = (props: EntityHealthCardProps): ReactElement => {
  const { data, label } = props;
  const { severity, count, total, percentage, rootCauseCount, title } = data;

  const openNewTab = useOpenNewTab();
  const styles = useStyles2(getEntityHealthCardStyles, severity);

  const handleOnClick = () => {
    openNewTab(RouteUtil.getServicesRoute());
  };

  return (
    <div className={styles.root}>
      <Card id="causely-entity-health-card" onClick={handleOnClick}>
        <Card.Heading>{title}</Card.Heading>
        <Card.Description>
          <p className={styles.content}>
            <span className={styles.count}>{count}</span>
            <span className={styles.percentage}>({percentage})</span>
            <span className={styles.total}>{`out of ${total} ${label.toLowerCase()}.`}</span>
          </p>
          {rootCauseCount > 0 && (
            <p className={styles.rootCauseSummary}>{`Caused by ${rootCauseCount} root cause(s).`}</p>
          )}
        </Card.Description>
      </Card>
    </div>
  );
};
