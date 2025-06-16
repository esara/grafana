import React from 'react';
import { SdkUtil } from 'sdk/sdk.util';

import './cuiTag.scss';

interface CuiTagProps {
  children: React.ReactNode;
  backgroundColor?: string;
  size?: string;
  className?: string;
}

export const CuiTag: React.FC<CuiTagProps> = ({
  children,
  backgroundColor,
  size = '0.75rem',
  className = '',
}) => {
  const style = {
    backgroundColor,
    fontSize: size,
  };

  return (
    <span className={`${SdkUtil.withPrefix('tag')} ${className}`} style={style}>
      {children}
    </span>
  );
};
