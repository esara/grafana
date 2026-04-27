import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import clsx from 'clsx';

type TextVariant = 'primary' | 'secondary' | 'disabled';
type TextSize = '0.75' | '0.875' | '1' | '1.125' | '1.25' | '1.5' | '1.875' | '2.25';

interface CUITextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  className?: string;
}

function textSizeToFontSize(theme: GrafanaTheme2, size: TextSize): string {
  const map: Record<TextSize, string> = {
    '0.75': theme.typography.pxToRem(12),
    '0.875': theme.typography.pxToRem(14),
    '1': theme.typography.pxToRem(16),
    '1.125': theme.typography.pxToRem(18),
    '1.25': theme.typography.pxToRem(20),
    '1.5': theme.typography.pxToRem(24),
    '1.875': theme.typography.pxToRem(30),
    '2.25': theme.typography.pxToRem(36),
  };
  return map[size];
}

const getTextStyles = (theme: GrafanaTheme2, variant: TextVariant, size: TextSize) => {
  const variantColor = {
    primary: theme.colors.text.primary,
    secondary: theme.colors.text.secondary,
    disabled: theme.colors.text.disabled,
  }[variant];

  return css({
    margin: 0,
    color: variantColor,
    fontSize: textSizeToFontSize(theme, size),
  });
};

export const CUIText: React.FC<CUITextProps> = ({
  children,
  variant = 'primary',
  size = '0.875',
  className = '',
}) => {
  const styles = useStyles2(getTextStyles, variant, size);
  return <div className={clsx(styles, className)}>{children}</div>;
};
