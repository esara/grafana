import React from 'react';
import { SdkUtil } from '../sdk.util';

import './cui-heading.styles.scss';

interface CUIHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const CUIHeading: React.FC<CUIHeadingProps> = ({ 
  children, 
  className = ''
}) => {
  
  return (
    <div 
      className={`${SdkUtil.withPrefix('heading')} ${className}`}
    >
      {children}
    </div>
  );
}; 
