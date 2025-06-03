import { ApiUserScope } from "api/api.types";
import { ServiceCardComponent } from "panels/serviceCard/serviceCard.component";
import React from "react";
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { ServiceCardEntity, useServiceCardsApi } from "./useServiceCardsApi";
import { ObjectsUtil } from "utils/objects/objects.util";
import { SdkUtil } from "sdk/sdk.util";
import './serviceCards.scss';
import { CuiPagination, CuiPaginationDirection } from "sdk/pagination/cuiPagination.component";

export const ServiceCardsComponent = ({ userScope }: { userScope: ApiUserScope }) => {
    const { isLoading, data, error, fetchData, pageInfo } = useServiceCardsApi(userScope);

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>

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
        </CuiLoadingErrorWrapper>
    );
}