import React from 'react';
import { SdkUtil } from '../sdk.util';
import './cui-text.styles.scss';

type TextVariant = 'primary' | 'secondary' | 'disabled';
type TextSize = '0.75' | '0.875' | '1' | '1.125' | '1.25' | '1.5' | '1.875' | '2.25';

interface CUITextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  className?: string;
}

export const CUIText: React.FC<CUITextProps> = ({ 
  children,
  variant = 'primary',
  size = '0.875', // Default to 0.875rem (14px)
  className = ''
}) => {
  return (
    <div 
      className={`${SdkUtil.withPrefix('text')} ${SdkUtil.withPrefix(`text-${variant}`)} ${SdkUtil.withPrefix(`text-size-${size}`)} ${className}`}
    >
      {children}
    </div>
  );
}; 
