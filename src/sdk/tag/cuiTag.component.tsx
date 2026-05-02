import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import clsx from 'clsx';

interface CuiTagProps {
  children: React.ReactNode;
  backgroundColor?: string;
  size?: string;
  className?: string;
}

export const CuiTag: React.FC<CuiTagProps> = ({
  children,
  backgroundColor,
  size,
  className = '',
}) => {
  const styles = useStyles2((theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 1),
      borderRadius: theme.shape.radius.sm,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      backgroundColor: theme.colors.action.hover,
      color: theme.colors.text.primary,
      fontSize: theme.typography.bodySmall.fontSize,
    }),
  );

  return (
    <span
      className={clsx(styles, className)}
      style={{
        ...(backgroundColor ? { backgroundColor } : {}),
        ...(size ? { fontSize: size } : {}),
      }}
    >
      {children}
    </span>
  );
};
