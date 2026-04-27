import { ApiSloState } from 'api/api.types';
import { colorManipulator, GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import clsx from 'clsx';
import React, { FC, ReactElement } from 'react';
import { EqualityUtil } from 'utils/equality/equality.util';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';

type SloConnectionComponentProps = {
  slo: ApiSloNodeWithMetaData;
};

const getSloRowStyles = (theme: GrafanaTheme2) => ({
  row: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  sloLabel: css({
    flex: 1,
  }),
  budget: css({
    float: 'right',
  }),
  budgetStable: css({
    color: colorManipulator.alpha(theme.colors.success.main, 0.8),
  }),
  budgetEscalating: css({
    color: colorManipulator.alpha(theme.colors.warning.main, 0.8),
  }),
  budgetExhausted: css({
    color: colorManipulator.alpha(theme.colors.error.main, 0.8),
  }),
  budgetUnknown: css({
    color: theme.colors.text.secondary,
  }),
});

function budgetClassForState(
  styles: ReturnType<typeof getSloRowStyles>,
  state: ApiSloState | undefined,
): string {
  switch (state) {
    case ApiSloState.Normal:
      return styles.budgetStable;
    case ApiSloState.AtRisk:
      return styles.budgetEscalating;
    case ApiSloState.Violated:
      return styles.budgetExhausted;
    default:
      return styles.budgetUnknown;
  }
}

export const SloConnectionComponent: FC<SloConnectionComponentProps> = React.memo(function SloCompactRow(
  props: SloConnectionComponentProps,
): ReactElement {
  const { slo } = props;
  const sloName = SloUtil.toSloName(slo);
  const styles = useStyles2(getSloRowStyles);
  const budgetStateClass = budgetClassForState(styles, slo.state);

  let displayText = 'Unknown';
  switch (slo.state) {
    case ApiSloState.Normal:
      displayText = 'Stable';
      break;
    case ApiSloState.AtRisk:
      displayText = 'Escalating';
      break;
    case ApiSloState.Violated:
      displayText = 'Exhausted';
      break;
    default:
      displayText = 'Unknown';
  }

  return (
    <div className={styles.row}>
      <span className={styles.sloLabel}>{sloName}</span>
      <span className={clsx(styles.budget, budgetStateClass)}>{displayText}</span>
    </div>
  );
}, EqualityUtil.areEqual);
