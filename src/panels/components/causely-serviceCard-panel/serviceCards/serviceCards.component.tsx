import { ApiUserScope } from "api/api.types";
import { ServiceCardComponent } from "panels/serviceCard/serviceCard.component";
import React from "react";
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";

export const ServiceCardsComponent = ({ userScope }: { userScope: ApiUserScope }) => {
    
    
    return (
        <CuiLoadingErrorWrapper isLoading={false} error={''}>
            <ServiceCardComponent />
        </CuiLoadingErrorWrapper>
    );
}