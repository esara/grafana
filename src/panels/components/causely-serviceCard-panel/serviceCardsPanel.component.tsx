// import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import React from "react";
import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import { PanelProps } from "@grafana/data";
import { PanelType, ServiceCardsPanelOptions } from "./module";
import { CUIRenderWhen } from "sdk/cuiRenderWhen/coreRenderWhen.component";
import { ServiceCardsComponent } from "./serviceCards/serviceCards.component";
import { SingleServiceCardComponent } from "./singleServiceCard/singleServiceCard.component";

export const ServiceCardsPanel: React.FC<PanelProps<ServiceCardsPanelOptions>> = ({ options }) => {
    return (
        <CuiRenderWhenAuthenticated>
            <CUIRenderWhen condition={options.panelType === PanelType.Single}>
                <SingleServiceCardComponent userScope={options.apiUserScope}/>
            </CUIRenderWhen>
            <CUIRenderWhen condition={options.panelType === PanelType.Collection}>
                <ServiceCardsComponent userScope={options.apiUserScope} />
            </CUIRenderWhen>
        </CuiRenderWhenAuthenticated>
    );
}
