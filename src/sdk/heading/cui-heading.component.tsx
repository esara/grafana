import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import clsx from 'clsx';

interface CUIHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const CUIHeading: React.FC<CUIHeadingProps> = ({ children, className = '' }) => {
  const styles = useStyles2((theme) =>
    css({
      margin: 0,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: 1.2,
      color: theme.colors.text.primary,
    }),
  );
  return <div className={clsx(styles, className)}>{children}</div>;
};
