import { ServiceCardComponent } from "panels/serviceCard/serviceCard.component";
import React from "react";
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { ServiceCardEntity, useServiceCardsApi } from "./useServiceCardsApi";
import { ObjectsUtil } from "utils/objects/objects.util";
import { SdkUtil } from "sdk/sdk.util";
import './serviceCards.scss';
import { CuiPagination, CuiPaginationDirection } from "sdk/pagination/cuiPagination.component";
import { CUIText } from "sdk/text/cui-text.component";
import { CUIRenderWhen } from "sdk/cuiRenderWhen/coreRenderWhen.component";
import { ServiceCardsPanelOptions } from "../module";

export type ServiceCardsComponentProps = {
    panelOptions: ServiceCardsPanelOptions;
}
export const ServiceCardsComponent: React.FC<ServiceCardsComponentProps> = ({ panelOptions }) => {
    const { isLoading, data, error, fetchData, pageInfo, serviceCounts } = useServiceCardsApi(panelOptions);

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <CUIRenderWhen condition={serviceCounts.unhealthy < 1}>
                <div className={SdkUtil.withPrefix('service-cards-card')}>
                    <CUIText size="1.125">
                        All <span className={SdkUtil.withPrefix('service-cards-card__total')}>{serviceCounts.total}</span> services in good health
                    </CUIText>
                    <CUIText size="1">
                        {`We will continue to actively monitor your environment and provide further information as it becomes available.`}
                    </CUIText>
                </div>
            </CUIRenderWhen>

            <CUIRenderWhen condition={serviceCounts.unhealthy > 0}>
                <div className={SdkUtil.withPrefix('service-cards__description')}>
                    <CUIText size="1.125">
                        {serviceCounts.unhealthy} of out {serviceCounts.total} services unhealthy
                    </CUIText>
                </div>
                <div className={SdkUtil.withPrefix('service-cards')}>
                    {(ObjectsUtil.values(data) as ServiceCardEntity[]).map((entity: ServiceCardEntity) => {
                        return (
                            <div key={entity.id} className={SdkUtil.withPrefix('service-cards-card')}>
                                <ServiceCardComponent serviceCardEntity={entity} />
                            </div>

                        )
                    })
                    }
                </div>
                <div className={SdkUtil.withPrefix('service-cards__pagination')}>
                    <CuiPagination
                        onLeftScroll={() => fetchData(CuiPaginationDirection.PREVIOUS)}
                        onRightScroll={() => fetchData(CuiPaginationDirection.NEXT)}
                        onPageOneScroll={() => fetchData()}
                        leftDisabled={!pageInfo?.hasPreviousPage}
                        rightDisabled={!pageInfo?.hasNextPage}
                    />
                </div>
            </CUIRenderWhen>
        </CuiLoadingErrorWrapper>
    );
}