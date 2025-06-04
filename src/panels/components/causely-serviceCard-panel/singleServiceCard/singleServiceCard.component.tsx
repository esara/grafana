import React from "react";
import { SdkUtil } from "sdk/sdk.util";
import { useSingleServiceCardApi } from "./useSingleServiceCardApi";
import { ServiceCardsPanelOptions } from "../module";
import { ServiceCardComponent } from "panels/serviceCard/serviceCard.component";
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";

import './singleServiceCard.scss';

export type SingleServiceCardComponentProps = {
    panelOptions: ServiceCardsPanelOptions;
}

export const SingleServiceCardComponent: React.FC<SingleServiceCardComponentProps> = ({ panelOptions }) => {
    const { isLoading, data, error } = useSingleServiceCardApi(panelOptions.singleServiceData);

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={SdkUtil.withPrefix('single-service-wrapper')}>
                <div className={SdkUtil.withPrefix('single-service-wrapper-card')}>
                    {data && (
                        <ServiceCardComponent serviceCardEntity={data} />
                    )}
                </div>
            </div>
        </CuiLoadingErrorWrapper>
    );
}