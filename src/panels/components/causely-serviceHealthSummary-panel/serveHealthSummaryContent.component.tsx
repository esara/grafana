import React from "react";
import { useServiceHealthApi } from "./useServiceHealthApi";
import { EntityHealthCard, EntityHealthCardData } from "./entityHealthCard.component";
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { SdkUtil } from "sdk/sdk.util";

export const ServiceHealthSummaryContent: React.FC = () => {
    const {isLoading, data, error} = useServiceHealthApi();

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={SdkUtil.withPrefix('service-health-summary-panel')}>
                {data.map((entityHealthCardData: EntityHealthCardData) => {
                    return (
                        <div key={entityHealthCardData.severity}>
                            <EntityHealthCard key={entityHealthCardData.severity} data={entityHealthCardData} label="Services" />
                        </div>
                    );
                })}
            </div>
        </CuiLoadingErrorWrapper>
    );
};
