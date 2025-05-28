import React from "react"
import { CUIHeading } from "sdk/heading/cui-heading.component";
import { CUIText } from "sdk/text/cui-text.component";

import { ApiDefect } from "api/api.types";
import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { RouteUtil } from "utils/route/route.util";
import { EntityUtil } from "utils/entity/entity.util";
import { RootCauseCardUtil } from "./rootCauseCardUtil/rootCauseCard.util";
import { DefectsUtil } from "utils/defects/defects.util";
import { RootCauseEvidence, useRootCauseEvidence } from "./useRootCauseEvidence";
import { CuiTagList } from "sdk/tagList/cuiTagList.component";

import { CUISection } from "sdk/section/cuiSection.component";
import { CUISectionDescription } from "sdk/sectionDescription/cuiSectionDescription.component";

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
        tagsList.push(`Impacts ${rootCause.serviceCount} Service(s)`);
    }

    return tagsList;
}

export const RootCauseCard = ({ rootCause }: RootCauseCardProps) => {
    const evidence: RootCauseEvidence = useRootCauseEvidence(rootCause.id);

    const activeSymptomsCount = rootCause.symptoms.filter((symptom) => symptom.active).length;
    const rootCauseName = EntityTypeDefs.getInstance().getDefectDef(rootCause.entity.typeName, rootCause.name).displayName;
    const symptomDescriptions = RootCauseCardUtil.getSymptomDescription(rootCause);

    return (
        <div className="root-cause-card" onClick={() => {
            window.open(RouteUtil.getSingleRootCauseRoutePath(rootCause.id), '_blank');
        }}>
            <CUISection>
                <CuiTagList tags={getTagsList(rootCause)} />
            </CUISection>

            <CUISection>
                <CUIHeading>Root Cause</CUIHeading>
                <CUISectionDescription>
                    <CUIText variant="secondary" >
                        {rootCauseName} on {EntityUtil.simplifyEntityname(rootCause.entity)}
                    </CUIText>
                </CUISectionDescription>
            </CUISection>

            <CUISection>
                <CUIHeading>Symptoms ({activeSymptomsCount})</CUIHeading>
                <CUISectionDescription>
                    <CUIText variant="secondary" >
                        {symptomDescriptions.masterSentence}
                    </CUIText>
                </CUISectionDescription>
                <CUISectionDescription>
                    <CUIText variant="secondary" >
                        {symptomDescriptions.secondarySentence}
                    </CUIText>
                </CUISectionDescription>
            </CUISection>

            <CUISection>
                <CUIHeading>Time</CUIHeading>
                <CUISectionDescription>
                    <CUIText variant="secondary">
                        {DefectsUtil.toTimeInfo(rootCause)}
                    </CUIText>
                </CUISectionDescription>
            </CUISection>

            <CUISection>
                <CUIHeading>Additional Information</CUIHeading>
                <CUISectionDescription>
                    <CUIText variant="secondary">
                        {getEvidenceList(evidence)}
                    </CUIText>
                </CUISectionDescription>


            </CUISection>
        </div>
    )
}
