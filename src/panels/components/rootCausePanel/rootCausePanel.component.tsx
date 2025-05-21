// import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import React from "react";
import { RootCauseContent } from "./rootCauseContent/rootCausePanelContent.component";
import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
export const RootCausePanel: React.FC = () => {

    return (
        <CuiRenderWhenAuthenticated>
            <RootCauseContent />
        </CuiRenderWhenAuthenticated>
    );
}
