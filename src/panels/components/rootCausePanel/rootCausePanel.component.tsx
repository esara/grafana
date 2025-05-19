import { CuiRenderWhenAuthenticated } from "sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component";
import React from "react";

export const RootCausePanel: React.FC = () => {
   
    return (
        <CuiRenderWhenAuthenticated>
            <RootCauseContent/>
        </CuiRenderWhenAuthenticated>
    );
};
