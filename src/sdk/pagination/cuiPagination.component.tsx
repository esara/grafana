import React from 'react';
import { IconButton, useStyles2 } from '@grafana/ui';
import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import clsx from 'clsx';

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
  NEXT = 'next',
}

const getPaginationStyles = (theme: GrafanaTheme2) => ({
  root: css({
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    justifyContent: 'center',
  }),
  iconBtn: css({
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover:not(:disabled)': {
      transform: 'scale(1.05)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  }),
});

export const CuiPagination: React.FC<CuiPaginationProps> = ({
  onLeftScroll,
  onRightScroll,
  onPageOneScroll,
  className = '',
  leftDisabled = false,
  rightDisabled = false,
}) => {
  const styles = useStyles2(getPaginationStyles);

  return (
    <div className={clsx(styles.root, className)}>
      <IconButton
        name="angle-left"
        size="lg"
        onClick={onLeftScroll}
        disabled={leftDisabled}
        tooltip="Previous Page"
        className={styles.iconBtn}
      />
      <IconButton
        name="compress-arrows"
        size="lg"
        onClick={onPageOneScroll}
        disabled={(rightDisabled && leftDisabled) || (leftDisabled && !rightDisabled)}
        tooltip="First page"
        className={styles.iconBtn}
      />
      <IconButton
        name="angle-right"
        size="lg"
        onClick={onRightScroll}
        disabled={rightDisabled}
        tooltip="Next Page"
        className={styles.iconBtn}
      />
    </div>
  );
};
