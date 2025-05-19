import { RenderWhenAuthenticated } from "components/sdk/renderWhenAuthenticated/renderWhenAuthenticated.component";
import React from "react";

export const RootCausePanel: React.FC = () => {
   
    return (
        <RenderWhenAuthenticated>
            Hello World
        </RenderWhenAuthenticated>
    );
};
