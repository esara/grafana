// import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import React from "react";
import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import { PanelProps } from "@grafana/data";
import { PanelType, RootCausePanelOptions } from "./module";
import { CUIRenderWhen } from "sdk/cuiRenderWhen/coreRenderWhen.component";
import { UrgentRootCauseComponent } from "./urgentRootCauses/urgenRootCauses.component";
import { RootCauseHeadlines } from "./headlinesRC/rootCauseHeadlines.component";


export const RootCausePanel: React.FC<PanelProps<RootCausePanelOptions>> = ({ options }) => {
    return (
        <CuiRenderWhenAuthenticated>
            <CUIRenderWhen condition={options.panelType === PanelType.UrgentRootCause}>
                <UrgentRootCauseComponent userScope={options.apiUserScope} />
            </CUIRenderWhen>
            <CUIRenderWhen condition={options.panelType === PanelType.RootCauseHeadlines}>
                <RootCauseHeadlines userScope={options.apiUserScope} />
            </CUIRenderWhen>
        </CuiRenderWhenAuthenticated>
    );
}
