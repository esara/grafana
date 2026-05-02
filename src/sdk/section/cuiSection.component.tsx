import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import clsx from 'clsx';

interface CuiSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const CUISection: React.FC<CuiSectionProps> = ({ children, className = '' }) => {
  const styles = useStyles2((theme) =>
    css({
      marginBottom: theme.spacing(2),
    }),
  );
  return <div className={clsx(styles, className)}>{children}</div>;
};
