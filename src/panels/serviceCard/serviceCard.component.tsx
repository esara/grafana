import React from "react";
import { ServiceCardEntity } from "panels/components/causely-serviceCard-panel/serviceCards/useServiceCardsApi";
import { CUIHeading } from "sdk/heading/cui-heading.component";
import { CUISection } from "sdk/section/cuiSection.component";
import { CUISectionDescription } from "sdk/sectionDescription/cuiSectionDescription.component";
import { CUIText } from "sdk/text/cui-text.component";
import { RouteUtil } from "utils/route/route.util";
import { ObjectsUtil } from "utils/objects/objects.util";
import { DefectsUtil } from "utils/defects/defects.util";
import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { ArraysUtil } from "utils/arrays/arrays.util";
import { CUIRenderWhen } from "sdk/cuiRenderWhen/coreRenderWhen.component";
import { SloConnectionComponent } from "./sloConnection/sloConnection.component";
import { SdkUtil } from "sdk/sdk.util";
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';
import clsx from "clsx";

import './serviceCard.scss';
import { Divider } from "@grafana/ui";
import { EntityUtil } from "utils/entity/entity.util";
import { ServiceUtil } from "utils/service/service.util";

interface ServiceCardProps {
    serviceCardEntity: ServiceCardEntity;
}

const renderCUISectionDescription = (value: React.ReactNode, className?: string) => {
    return (
        <CUISectionDescription>
            <CUIText variant="secondary" className={className}>
                {value}
            </CUIText>
        </CUISectionDescription>
    )
}

const renderCUISectionDescriptionWithServiceDegradingHighlight = (value: React.ReactNode, isServiceDegrading: boolean) => {
    if (isServiceDegrading) {
        return renderCUISectionDescription(value, SdkUtil.withPrefix('text-color-urgent'));
    }
    return renderCUISectionDescription(value);
    
    
}
export const ServiceCardComponent: React.FC<ServiceCardProps> = ({ serviceCardEntity }) => {
    const openNewTab = useOpenNewTab();
    
    const relatedDefects = serviceCardEntity.relatedDefects;
    const noRootCauses = ArraysUtil.isEmpty(relatedDefects?.aggregatingDefects) && ArraysUtil.isEmpty(relatedDefects?.directDefects) && ArraysUtil.isEmpty(relatedDefects?.impactingDefects);

    const sloConnection = serviceCardEntity.sloConnections;

    const entityTypeDefs = EntityTypeDefs.getInstance();
    const activeSymptoms = serviceCardEntity.symptoms.filter((symptom) => symptom.active)

    const rootCauseCount = relatedDefects?.aggregatingDefects?.length + relatedDefects?.directDefects?.length + relatedDefects?.impactingDefects?.length;

    return (
        <div className={SdkUtil.withPrefix('service-card')} onClick={() => {
            openNewTab(RouteUtil.getSingleTopologyRoutePath(serviceCardEntity.id));
        }}>

            <CUIHeading>{EntityUtil.simplifyEntityname(serviceCardEntity)}</CUIHeading>
            <CUISectionDescription>
                        <CUIText variant="secondary">
                            {ServiceUtil.getNameSpaceAndClusterNameInfo(serviceCardEntity)}
                        </CUIText>
                    </CUISectionDescription>
            <Divider />
            
            <CUISection>
                <CUIHeading>{rootCauseCount < 2 ? 'Root Cause' : `Root Causes (${rootCauseCount})`}</CUIHeading>
                <CUIRenderWhen condition={ObjectsUtil.isUnset(relatedDefects)}>
                    <CUISectionDescription>
                        <CUIText variant="secondary">
                            No related defects
                        </CUIText>
                    </CUISectionDescription>
                </CUIRenderWhen>

                <CUIRenderWhen condition={noRootCauses}>
                    {renderCUISectionDescription('No root cause identified impacting this service')}
                </CUIRenderWhen>

                <CUIRenderWhen condition={!noRootCauses}>
                    <div className={clsx(SdkUtil.withPrefix('service-card__root-cause-container'))}>
                        <CUIRenderWhen condition={relatedDefects?.aggregatingDefects?.length > 0}>
                            {
                                relatedDefects?.aggregatingDefects?.map((defect) => (
                                    renderCUISectionDescriptionWithServiceDegradingHighlight(DefectsUtil.defectOnEntityDescription(defect), DefectsUtil.isServiceDegrading(defect))
                                ))
                            }
                        </CUIRenderWhen>
                        <CUIRenderWhen condition={relatedDefects?.directDefects?.length > 0} >
                            {
                                relatedDefects?.directDefects?.map((defect) => (
                                    renderCUISectionDescriptionWithServiceDegradingHighlight(DefectsUtil.defectOnEntityDescription(defect), DefectsUtil.isServiceDegrading(defect))
                                ))
                            }
                        </CUIRenderWhen>
                        <CUIRenderWhen condition={relatedDefects?.impactingDefects?.length > 0} >
                            {
                                relatedDefects?.impactingDefects?.map((defect) => (
                                    renderCUISectionDescriptionWithServiceDegradingHighlight(`Cross-Service Root Cause - ${DefectsUtil.defectOnEntityDescription(defect)}`, DefectsUtil.isServiceDegrading(defect))
                                ))
                            }
                        </CUIRenderWhen>
                    </div>
                </CUIRenderWhen>
            </CUISection>

            <Divider />

            <CUISection>
                <CUIHeading>Symptoms</CUIHeading>
                <CUIRenderWhen condition={ArraysUtil.isEmpty(activeSymptoms)}>
                    {renderCUISectionDescription('No active symptoms on this service')}
                </CUIRenderWhen>
                <CUIRenderWhen condition={ArraysUtil.isNotEmpty(activeSymptoms)}>
                    {serviceCardEntity.symptoms
                        .filter((symptom) => symptom.active)
                        .map((symptom) => (
                            <div key={symptom.id}>
                                {renderCUISectionDescription(entityTypeDefs.getSymptomDef(serviceCardEntity.typeName, symptom.name).displayName)}
                            </div>
                        ))}
                </CUIRenderWhen>
            </CUISection>

            <Divider />

            <CUISection>
                <CUIHeading className={SdkUtil.withPrefix('slo-budget-heading')}>
                    <span className={SdkUtil.withPrefix('slo-budget-heading__slo')}>SLO</span>
                    <span className={SdkUtil.withPrefix('slo-budget-heading__budget')}>Budget</span>
                </CUIHeading>
                <CUIRenderWhen condition={ArraysUtil.isEmpty(sloConnection)}>
                    {renderCUISectionDescription('No traffic observed for this service')}
                </CUIRenderWhen>
                <CUIRenderWhen condition={ArraysUtil.isNotEmpty(sloConnection)}>
                    {
                        sloConnection?.map((slo) => (
                            <div key={slo.id}>
                                {renderCUISectionDescription(<SloConnectionComponent slo={slo} />)}
                            </div>
                        ))

                    }
                </CUIRenderWhen>
            </CUISection>
        </div>
    );
}