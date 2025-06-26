import React from "react"
import { CUIHeading } from "sdk/heading/cui-heading.component";
import { CUIText } from "sdk/text/cui-text.component";

import { ApiDefect } from "api/api.types";
import { RouteUtil } from "utils/route/route.util";
import { RootCauseCardUtil } from "./rootCauseCardUtil/rootCauseCard.util";
import { DefectsUtil } from "utils/defects/defects.util";
import { RootCauseEvidence, useRootCauseEvidence } from "./useRootCauseEvidence";
import { CuiTagList } from "sdk/tagList/cuiTagList.component";

import { CUISection } from "sdk/section/cuiSection.component";
import { CUISectionDescription } from "sdk/sectionDescription/cuiSectionDescription.component";

import './rootCauseCard.scss';
import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { ArraysUtil } from "utils/arrays/arrays.util";
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';

type RootCauseCardProps = {
    rootCause: ApiDefect
}

const getEvidenceList = (evidence: RootCauseEvidence, rootCause: ApiDefect): string => {
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

    //Remediation
    const entityTypeDefModel = EntityTypeDefs.getInstance();
    const { description } = entityTypeDefModel.getDefectDef(rootCause.entity.typeName, rootCause.name);
    const hasRemediationOptions = ArraysUtil.isNotEmpty(description?.remediationOptions);

    if (hasRemediationOptions) {
        evidenceList.push('Remediation');
    }

    if (ArraysUtil.isEmpty(evidenceList)) {
        return 'None available';
    }

    return evidenceList.join(', ');
}

const getTagsList = (rootCause: ApiDefect): string[] => {
    const tagsList: string[] = [];
    tagsList.push('Active');

    if (rootCause?.serviceCount > 0) {
        tagsList.push(`${rootCause.serviceCount} Service(s) Degraded`);
    }

    return tagsList;
}

export const RootCauseCard = ({ rootCause }: RootCauseCardProps) => {
    const openNewTab = useOpenNewTab();
    const evidence: RootCauseEvidence = useRootCauseEvidence(rootCause.id);

    const activeSymptomsCount = rootCause.symptoms.filter((symptom) => symptom.active).length;
    const symptomDescriptions = RootCauseCardUtil.getSymptomDescription(rootCause);

    return (
        <div className="root-cause-card" onClick={() => {
            openNewTab(RouteUtil.getSingleRootCauseRoutePath(rootCause.id));
        }}>
            <CUISection>
                <CuiTagList tags={getTagsList(rootCause)} />
            </CUISection>

            <CUISection>
                <CUIHeading>Root Cause</CUIHeading>
                <CUISectionDescription>
                    <CUIText variant="secondary" >
                        {DefectsUtil.defectOnEntityDescription(rootCause)}
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
                        {getEvidenceList(evidence, rootCause)}
                    </CUIText>
                </CUISectionDescription>


            </CUISection>
        </div>
    )
}
