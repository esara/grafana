import React from 'react';
import { SdkUtil } from '../sdk.util';
import './cui-text.styles.scss';

type TextVariant = 'primary' | 'secondary' | 'disabled';

interface CUITextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
}

export const CUIText: React.FC<CUITextProps> = ({ 
  children,
  variant = 'primary',
  className = ''
}) => {
  return (
    <div 
      className={`${SdkUtil.withPrefix('text')} ${SdkUtil.withPrefix(`text-${variant}`)} ${className}`}
    >
      {children}
    </div>
  );
}; 
