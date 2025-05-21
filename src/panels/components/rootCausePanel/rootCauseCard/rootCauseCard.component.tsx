import { TagList } from "@grafana/ui";
import React from "react"
import { CUIHeading } from "sdk/heading/cui-heading.component";
import { SdkUtil } from "sdk/sdk.util";
import { CUIText } from "sdk/text/cui-text.component";
import './rootCauseCard.scss';
import { ApiDefect } from "api/api.types";
import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { RouteUtil } from "utils/route/route.util";
import { EntityUtil } from "utils/entity/entity.util";

type RootCauseCardProps = {
    rootCause: ApiDefect
}

const getTagsList = (rootCause: ApiDefect): string[] => {
    const tagsList: string[] = ['Remediation'];
    
    if (rootCause.events.length > 0) {  
        tagsList.push('Events');
    }

    return tagsList;
}

export const RootCauseCard = ({ rootCause }: RootCauseCardProps) => {
    const symptomCount = rootCause.symptoms.length;
    const rootCauseName = EntityTypeDefs.getInstance().getDefectDef(rootCause.entity.typeName, rootCause.name).displayName;
    return (
        <div className="root-cause-card" onClick={() => {
            window.open(RouteUtil.getSingleRootCauseRoutePath(rootCause.id), '_blank');
        }}>
            <TagList tags={['Active', 'Impacts Service']} />

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Root Cause</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    {rootCauseName} on {EntityUtil.simplifyEntityname(rootCause.entity)}
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Symptoms {symptomCount}</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    High Request Duration on 3 services<br />
                    and 1 other
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Time</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    {rootCause.fromTime}
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Additional Information</CUIHeading>
                <TagList tags={getTagsList(rootCause)} />
            </div>
        </div>
    )
}
