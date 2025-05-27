import React from "react";
import { SdkUtil } from "sdk/sdk.util";

import './cuiSection.scss';

interface CuiSectionProps {
    children: React.ReactNode;
    className?: string;
}

export const CUISection: React.FC<CuiSectionProps> = ({ children, className = '' }) => {
    return <div className={`${SdkUtil.withPrefix('section')} ${className}`}>{children}</div>;
};