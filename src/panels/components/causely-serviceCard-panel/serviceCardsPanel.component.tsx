// import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import React from "react";
import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import { PanelProps } from "@grafana/data";
import { ServiceCardsPanelOptions } from "./module";
import { ServiceCardsComponent } from "./serviceCards/serviceCards.component";

export const ServiceCardsPanel: React.FC<PanelProps<ServiceCardsPanelOptions>> = ({ options }) => {
    return (
        <CuiRenderWhenAuthenticated>
            <ServiceCardsComponent userScope={options.apiUserScope} />
        </CuiRenderWhenAuthenticated>
    );
}
