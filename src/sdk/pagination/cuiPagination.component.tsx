import React from 'react';
import { IconButton } from '@grafana/ui';
import { SdkUtil } from '../sdk.util';
import './cuiPagination.scss';

interface CuiPaginationProps {
  onLeftScroll: () => void;
  onRightScroll: () => void;
  onPageOneScroll: () => void;
  className?: string;
  disabled?: boolean;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

export enum CuiPaginationDirection {
  PREVIOUS = 'previous',
  NEXT = 'next'
}
export const CuiPagination: React.FC<CuiPaginationProps> = ({
  onLeftScroll,
  onRightScroll,
  onPageOneScroll,
  className = '',
  leftDisabled = false,
  rightDisabled = false,
}) => {
  return (
    <div className={`${SdkUtil.withPrefix('pagination')} ${className}`}>
      <IconButton
        name="angle-left"
        size="lg"
        onClick={onLeftScroll}
        disabled={leftDisabled}
        tooltip="Previous Page"
        className={SdkUtil.withPrefix('pagination__button-left')}
      />
      <IconButton
        name="compress-arrows"
        size="lg"
        onClick={onPageOneScroll}
        disabled={(rightDisabled && leftDisabled) || (leftDisabled && !rightDisabled)}
        tooltip="First page"
        className={SdkUtil.withPrefix('pagination__button-right')}
      />
      <IconButton
        name="angle-right"
        size="lg"
        onClick={onRightScroll}
        disabled={rightDisabled}
        tooltip="Next Page"
        className={SdkUtil.withPrefix('pagination__button-right')}
      />
    </div>
  );
};
