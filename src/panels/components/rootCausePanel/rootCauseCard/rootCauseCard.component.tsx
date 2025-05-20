import { TagList } from "@grafana/ui";
import React from "react"
import { CUIHeading } from "sdk/heading/cui-heading.component";
import { SdkUtil } from "sdk/sdk.util";
import { CUIText } from "sdk/text/cui-text.component";
import './rootCauseCard.scss';

export const RootCauseCard = () => {
    return (
        <div className="root-cause-card">
            <TagList tags={['Active', 'Impacts Service']} />

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Root Cause</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    Service Congestion on <b>fights</b> service
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Symptoms (4)</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    High Request Duration on 3 services<br />
                    and 1 other
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Time</CUIHeading>
                <CUIText variant="secondary" className={SdkUtil.withPrefix('root-cause-card-description')}>
                    Identified 3 days ago with<br />
                    recurrence
                </CUIText>
            </div>

            <div className={SdkUtil.withPrefix('root-cause-card-section')}>
                <CUIHeading>Additional Information</CUIHeading>
                <TagList tags={['Exception', 'Logs', 'Events', 'Remediation']} />
                
            </div>
        </div>
    )
}
