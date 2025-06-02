import { ApiUserScope } from "api/api.types";
import { ServiceCardComponent } from "panels/serviceCard/serviceCard.component";
import React from "react";
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { ServiceCardEntity, useServiceCardsApi } from "./useServiceCardsApi";
import { ObjectsUtil } from "utils/objects/objects.util";
import { SdkUtil } from "sdk/sdk.util";
import './serviceCards.scss';
export const ServiceCardsComponent = ({ userScope }: { userScope: ApiUserScope }) => {
    const { isLoading, data, error } = useServiceCardsApi(userScope);

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
        </CuiLoadingErrorWrapper>
    );
}