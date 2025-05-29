import React from "react";
import { SdkUtil } from "sdk/sdk.util";

import './cuiSectionDescription.scss';

interface CuiSectionDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export const CUISectionDescription: React.FC<CuiSectionDescriptionProps> = ({ children, className = '' }) => {
    return <div className={`${SdkUtil.withPrefix('section-description')} ${className}`}>{children}</div>;
};