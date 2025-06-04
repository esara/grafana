import { ApiUserScope } from "api/api.types";
import { ServiceCardComponent } from "panels/serviceCard/serviceCard.component";
import React from "react";
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { SdkUtil } from "sdk/sdk.util";
import { useSingleServiceCardApi } from "./useSingleServiceCardApi";

import './singleServiceCard.scss';

export const SingleServiceCardComponent = ({ 
    userScope, 
}: { 
    userScope: ApiUserScope;
}) => {
    const { isLoading, data, error } = useSingleServiceCardApi(userScope);

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={SdkUtil.withPrefix('single-service-card')}>
                {data && (
                        <ServiceCardComponent serviceCardEntity={data} />
                )}
            </div>
        </CuiLoadingErrorWrapper>
    );
}