import React from "react";

import './serviceCard.scss';
import { SdkUtil } from "sdk/sdk.util";
export const ServiceCardComponent = () => {
    return (
        <div className={SdkUtil.withPrefix('service-card')}>
            <h1>Service Card</h1>
        </div>
    );
}