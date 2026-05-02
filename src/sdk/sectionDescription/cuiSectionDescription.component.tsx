import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import clsx from 'clsx';

interface CuiSectionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CUISectionDescription: React.FC<CuiSectionDescriptionProps> = ({ children, className = '' }) => {
  const styles = useStyles2((theme) =>
    css({
      marginTop: theme.spacing(1),
    }),
  );
  return <div className={clsx(styles, className)}>{children}</div>;
};
