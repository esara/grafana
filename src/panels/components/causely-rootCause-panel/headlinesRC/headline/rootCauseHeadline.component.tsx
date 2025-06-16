import { ApiHeadlineItem } from 'api/api.types';
import React, { FC } from 'react';
import { SdkUtil } from 'sdk/sdk.util';
import { DefectsUtil } from 'utils/defects/defects.util';
import { StringsUtil } from 'utils/strings/strings.util';
import { TopologyUtil } from 'utils/topology/topology.util';
import { EntityTypeDefs } from 'utils/entityTypeDefs/EntityTypeDefs.singleton';
import { CUIText } from 'sdk/text/cui-text.component';
import { CuiTagList } from 'sdk/tagList/cuiTagList.component';
import { RouteUtil } from 'utils/route/route.util';
import { CUISection } from 'sdk/section/cuiSection.component';
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';

type RootCauseHeadlineProps = {
    headline: ApiHeadlineItem;
}

const sanitizeDefectName = (headline: ApiHeadlineItem, masterSentence: string): string => {
    const defectName = headline.defect.name;

    const entityTypeDefModel = EntityTypeDefs.getInstance();
    const { displayName } = entityTypeDefModel.getDefectDef(headline.defect.entity.typeName, headline.defect.name);

    return masterSentence.replace(defectName, displayName);
}

const sanitizeEntityName = (headline: ApiHeadlineItem, masterSentence: string): string => {
    const entityName = headline.defect.entity.name;

    const hasNamespace = TopologyUtil.hasNamespace(headline.defect.entity);
    const simplifiedEntityName = hasNamespace ? StringsUtil.getPathExceptFirstItem(entityName) : entityName;

    return masterSentence.replace(entityName, simplifiedEntityName);
}

const sanitizeEntityType = (headline: ApiHeadlineItem, masterSentence: string): string => {
    const entityTypeName = headline.defect.entity.typeName;
    const humanEntityTypeName = TopologyUtil.toHumanizedEntityType(headline.defect.entity)

    return masterSentence.replace(entityTypeName, humanEntityTypeName);
}

const sanitizeRootCauseSentence = (headline: ApiHeadlineItem): string => {
    let rootCauseSentence = sanitizeDefectName(headline, headline.headlineContext.renderedText);
    rootCauseSentence = sanitizeEntityType(headline, rootCauseSentence);
    rootCauseSentence = sanitizeEntityName(headline, rootCauseSentence);
    return rootCauseSentence;
}

export const RootCauseHeadline: FC<RootCauseHeadlineProps> = ({ headline }) => {
    const openNewTab = useOpenNewTab();
    
    const rootCauseSanitizedSentence = sanitizeRootCauseSentence(headline);
    const statusInfo = DefectsUtil.isDetected(headline.defect) ? 'active' : 'inactive';
    const isServiceImpacting = headline.defect.serviceCount > 0;

    const tagsList = isServiceImpacting ? [`${StringsUtil.firstToUpperCase(statusInfo)}`, `Impacts ${headline.defect.serviceCount } Service(s)`] : [`${StringsUtil.firstToUpperCase(statusInfo)}` ];
    
    return (
        <div onClick={() => {
            openNewTab(RouteUtil.getSingleRootCauseRoutePath(headline.defect.id));
            }}
        >
            <CUISection>
                <div className={SdkUtil.withPrefix('rootCause__headlines__headline-card__tag-container')}>
                    <CuiTagList tags={tagsList}></CuiTagList>     
                </div>
            </CUISection>
            <CUIText>
                {rootCauseSanitizedSentence}
            </CUIText>
        </div>
    );
};
