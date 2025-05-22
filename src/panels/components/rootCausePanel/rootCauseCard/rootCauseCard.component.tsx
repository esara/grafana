import React from "react"
import { CUIHeading } from "sdk/heading/cui-heading.component";
import { SdkUtil } from "sdk/sdk.util";
import { CUIText } from "sdk/text/cui-text.component";

import { ApiDefect } from "api/api.types";
import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { RouteUtil } from "utils/route/route.util";
import { EntityUtil } from "utils/entity/entity.util";
import { RootCauseCardUtil } from "./rootCauseCardUtil/rootCauseCard.util";
import { DefectsUtil } from "utils/defects/defects.util";
import { RootCauseEvidence, useRootCauseEvidence } from "./useRootCauseEvidence";
import { CuiTagList } from "sdk/tagList/cuiTagList.component";

import './rootCauseCard.scss';
type RootCauseCardProps = {
    rootCause: ApiDefect
}

const getEvidenceList = (evidence: RootCauseEvidence): string => {
    const evidenceList: string[] = [];

    if (evidence.hasEvents) {
        evidenceList.push('Events');
    }
    if (evidence.hasExceptions) {
        evidenceList.push('Exceptions');
    }
    if (evidence.hasLogs) {
        evidenceList.push('Logs');
    }

    evidenceList.push('Remediation');

    return evidenceList.join(', ');
}

const getTagsList = (rootCause: ApiDefect): string[] => {
    const tagsList: string[] = [];
    tagsList.push('Active');

    if (rootCause?.serviceCount > 0) {
        tagsList.push('Impacts Service');
    }

    return tagsList;
}

export const RootCauseCard = ({ rootCause }: RootCauseCardProps) => {
    const evidence: RootCauseEvidence = useRootCauseEvidence(rootCause.id);

    const symptomCount = rootCause.symptoms.length;
    const activeSymptomsCount = rootCause.symptoms.filter((symptom) => symptom.active).length;
    const rootCauseName = EntityTypeDefs.getInstance().getDefectDef(rootCause.entity.typeName, rootCause.name).displayName;
    const symptomDescriptions = RootCauseCardUtil.getSymptomDescription(rootCause);

    

    return (
        <div className="root-cause-card" onClick={() => {
            window.open(RouteUtil.getSingleRootCauseRoutePath(rootCause.id), '_blank');
        }}>
            
            <CuiTagList tags={getTagsList(rootCause)} />

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Root Cause</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    {rootCauseName} on {EntityUtil.simplifyEntityname(rootCause.entity)}
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Symptoms ({activeSymptomsCount})/{symptomCount}</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    {symptomDescriptions.masterSentence}
                </CUIText>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    {symptomDescriptions.secondarySentence}
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Time</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    {DefectsUtil.toTimeInfo(rootCause)}
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Additional Information</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    {getEvidenceList(evidence)}
                </CUIText>

            </div>
        </div>
    )
}
