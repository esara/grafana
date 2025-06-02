import React, { FC, ReactElement } from 'react';
import { SdkUtil } from 'sdk/sdk.util';
import { EqualityUtil } from 'utils/equality/equality.util';
import { IntlUtil } from 'utils/intl/intl.util';
import { ApiSloNodeWithMetaData, SloUtil } from 'utils/slo/slo.util';

type SloConnectionComponentProps = {
  slo: ApiSloNodeWithMetaData;
};

export const SloConnectionComponent: FC<SloConnectionComponentProps> = React.memo(function SloCompactRow(
  props: SloConnectionComponentProps,
): ReactElement {
  const { slo } = props;
//   const statusInfo = SloUtil.toStatusInfo(slo);
  const { tooltipContent, percentage } = SloUtil.toErrorBudgetRemainingInfo(slo);
//   const mergedTooltipContent = `${statusInfo.statusTooltip} <br/> ${tooltipContent}`;
  const sloName = SloUtil.toSloName(slo);
  const percentageDisplay = IntlUtil.toPercentage(percentage / 100, 0);

//   const errorBudgetRemainingClass = clsx(statusInfo.className, SdkUtil.withPrefix('slo__compact-row__icon'));

  return (
    <div
      className={SdkUtil.withPrefix('slo__compact-row')}
    >
        {sloName}
        <span>{percentageDisplay}</span>
        {/* <CuiIcon
          dataAutomationId={AutoLocatorUtil.getDataAutomationId('sloCompactRow', `slo-${slo.id}-icon`)}
          name={statusInfo.iconName}
          className={errorBudgetRemainingClass}
        /> */}
    </div>
  );
}, EqualityUtil.areEqual);
