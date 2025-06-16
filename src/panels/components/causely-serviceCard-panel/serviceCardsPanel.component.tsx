// import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import React from "react";
import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import { PanelProps } from "@grafana/data";
import { PanelType, ServiceCardsPanelOptions } from "./module";
import { CUIRenderWhen } from "sdk/cuiRenderWhen/coreRenderWhen.component";
import { ServiceCardsComponent } from "./serviceCards/serviceCards.component";
import { SingleServiceCardComponent } from "./singleServiceCard/singleServiceCard.component";
import { ThemeVariables } from "components/ThemeVariables/ThemeVariables";

export const ServiceCardsPanel: React.FC<PanelProps<ServiceCardsPanelOptions>> = ({ options }) => {
    return (
        <ThemeVariables>
            <CuiRenderWhenAuthenticated>
                <CUIRenderWhen condition={options.panelType === PanelType.Single}>
                    <SingleServiceCardComponent panelOptions={options} />
                </CUIRenderWhen>
                <CUIRenderWhen condition={options.panelType === PanelType.Collection}>
                    <ServiceCardsComponent panelOptions={options} />
                </CUIRenderWhen>
            </CuiRenderWhenAuthenticated>
        </ThemeVariables>
    );
}
