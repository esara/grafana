// import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import React from "react";
import { RootCauseContent } from "./rootCauseContent/rootCausePanelContent.component";
import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import { PanelProps } from "@grafana/data";
import { RootCausePanelOptions } from "./module";


export const RootCausePanel: React.FC<PanelProps<RootCausePanelOptions>> = ({ options }) => {

    return (
        <CuiRenderWhenAuthenticated>
            <RootCauseContent userScope={options.apiUserScope} />
        </CuiRenderWhenAuthenticated>
    );
}
