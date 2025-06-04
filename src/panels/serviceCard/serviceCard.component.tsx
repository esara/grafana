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
import clsx from "clsx";

import './serviceCard.scss';
import { Divider } from "@grafana/ui";

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
export const ServiceCardComponent: React.FC<ServiceCardProps> = ({ serviceCardEntity }) => {

    const relatedDefects = serviceCardEntity.relatedDefects;
    const noRootCauses = ArraysUtil.isEmpty(relatedDefects?.aggregatingDefects) && ArraysUtil.isEmpty(relatedDefects?.directDefects) && ArraysUtil.isEmpty(relatedDefects?.impactingDefects);

    const sloConnection = serviceCardEntity.sloConnections;

    const entityTypeDefs = EntityTypeDefs.getInstance();
    const activeSymptoms = serviceCardEntity.symptoms.filter((symptom) => symptom.active)

    return (
        <div className="root-cause-card" onClick={() => {
            window.open(RouteUtil.getSingleTopologyRoutePath(serviceCardEntity.id), '_blank');
        }}>

            <CUIHeading>{serviceCardEntity.name}</CUIHeading>
            
            <Divider />
            
            <CUISection>
                <CUIHeading>Root Cause</CUIHeading>
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
                                    renderCUISectionDescription(DefectsUtil.defectOnEntityDescription(defect), SdkUtil.withPrefix('text-color-urgent'))
                                ))
                            }
                        </CUIRenderWhen>
                        <CUIRenderWhen condition={relatedDefects?.directDefects?.length > 0} >
                            {
                                relatedDefects?.directDefects?.map((defect) => (
                                    renderCUISectionDescription(DefectsUtil.defectOnEntityDescription(defect), SdkUtil.withPrefix('text-color-urgent'))
                                ))
                            }
                        </CUIRenderWhen>
                        <CUIRenderWhen condition={relatedDefects?.impactingDefects?.length > 0} >
                            {
                                relatedDefects?.impactingDefects?.map((defect) => (
                                    renderCUISectionDescription(`Cross-Service Root Cause - ${DefectsUtil.defectOnEntityDescription(defect)}`, SdkUtil.withPrefix('text-color-urgent'))
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