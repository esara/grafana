import { ApiSloState } from 'api/api.types';
import clsx from 'clsx';
import React, { FC, ReactElement } from 'react';
import { SdkUtil } from 'sdk/sdk.util';
import { EqualityUtil } from 'utils/equality/equality.util';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';

type SloConnectionComponentProps = {
  slo: ApiSloNodeWithMetaData;
};

type SLOBudgetStats = {
  displayText: string;
  className: string;
}

const getSloBudgetStatus = (slo: ApiSloNodeWithMetaData): SLOBudgetStats => {
  switch (slo.state) {
    case ApiSloState.Normal:
      return {
        displayText: 'Stable',
        className: SdkUtil.withPrefix('slo-budget-heading--stable')
      };
    case ApiSloState.AtRisk:
      return {
        displayText: 'Escalating',
        className: SdkUtil.withPrefix('slo-budget-heading--escalating')
      };
    case ApiSloState.Violated:
      return {
        displayText: 'Exhausted',
        className: SdkUtil.withPrefix('slo-budget-heading--exhausted')
      };
    default:
      return {
        displayText: 'Unknown',
        className: SdkUtil.withPrefix('slo-budget-heading--unknown')
      };
  }
}


export const SloConnectionComponent: FC<SloConnectionComponentProps> = React.memo(function SloCompactRow(
  props: SloConnectionComponentProps,
): ReactElement {
  const { slo } = props;
  const sloName = SloUtil.toSloName(slo);
  const budgetStatus: SLOBudgetStats = getSloBudgetStatus(slo);

  // const { tooltipContent, percentage } = SloUtil.toErrorBudgetRemainingInfo(slo);
  // const mergedTooltipContent = `${statusInfo.statusTooltip} <br/> ${tooltipContent}`;
  // const percentageDisplay = IntlUtil.toPercentage(percentage / 100, 0);
  // const errorBudgetRemainingClass = clsx(statusInfo.className, SdkUtil.withPrefix('slo__compact-row__icon'));

  return (
    <div
      className={SdkUtil.withPrefix('slo__compact-row')}
    >
      <span className={clsx(SdkUtil.withPrefix('slo-budget-heading__slo'))}>{sloName}</span>
      <span className={clsx(SdkUtil.withPrefix('slo-budget-heading__budget'), budgetStatus.className)}>
        {budgetStatus.displayText}
      </span>
    </div>
  );
}, EqualityUtil.areEqual);
