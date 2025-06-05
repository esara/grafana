import { ApiHeadlineItem, ApiUserScope } from 'api/api.types';
import React from 'react';
import { CUIRenderWhen } from 'sdk/cuiRenderWhen/coreRenderWhen.component';
import { CUIHeading } from 'sdk/heading/cui-heading.component';
import { CuiLoadingErrorWrapper } from 'sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component';
import { SdkUtil } from 'sdk/sdk.util';
import { ArraysUtil } from 'utils/arrays/arrays.util';
import { RootCauseHeadline } from './headline/rootCauseHeadline.component';
import { DefectsUtil } from 'utils/defects/defects.util';
import clsx from 'clsx';
import { useRootCauseHeadlinesApi } from './useRootCauseHeadlinesApi.hook';
import { CUIText } from 'sdk/text/cui-text.component';
import { RouteUtil } from 'utils/route/route.util';

import './rootCauseHeadlines.scss';
import { CUISection } from 'sdk/section/cuiSection.component';
const getCardClassName = (headline: ApiHeadlineItem): string => {
    const isActive = DefectsUtil.isDetected(headline?.defect);
    const isUrgent = DefectsUtil.isDiagnose(headline?.defect);

    return clsx(SdkUtil.withPrefix('rootCause__headlines__headline-card'), {
        [SdkUtil.withPrefix('rootCause__headlines__headline-card--urgent')]: isActive && isUrgent,
        [SdkUtil.withPrefix('rootCause__headlines__headline-card--not-urgent')]: !isActive || !isUrgent,
    });
}

export const RootCauseHeadlines = ({ userScope }: { userScope: ApiUserScope }) => {
    const { isLoading, headlinesData, error } = useRootCauseHeadlinesApi(userScope);
    
    const { headlines, urgentRcActiveCount } = headlinesData;
    
    const isEmptyState: boolean = ArraysUtil.isEmpty(headlines);

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={SdkUtil.withPrefix('rootCause__headlines')}>
                <CUISection>
                    <CUIHeading className={SdkUtil.withPrefix('rootCause__headlines__title')}>
                        RootCause Headlines
                    </CUIHeading>
                </CUISection>

                <CUIRenderWhen condition={isEmptyState}>
                    <div className={SdkUtil.withPrefix('rootCause__headlines__empty-state')}>
                        No notable headlines in the last 24hrs
                    </div>
                    <div className={getCardClassName(null)} onClick={() => {
                        window.open(RouteUtil.getDiagnoseRoutePath(), '_blank');
                    }}>
                        <CUIHeading>
                            Not all root cause announce themselves
                        </CUIHeading>

                        <CUIText>
                            Spot the cracks before they spread— view all root causes in Causely
                        </CUIText>

                    </div>
                </CUIRenderWhen>

                <CUIRenderWhen condition={!isEmptyState}>
                    {headlines.map((headline: ApiHeadlineItem) => (
                        <div key={headline.defect.id} className={getCardClassName(headline)}>
                            <RootCauseHeadline key={headline.defect.id} headline={headline} />
                        </div>
                    ))}

                    <CUIRenderWhen condition={urgentRcActiveCount > 3}>
                        <div className={getCardClassName(headlines[0])} onClick={() => {
                            window.open(RouteUtil.getDiagnoseRoutePath(), '_blank');
                        }}>
                            <CUIHeading>
                                {`There is another ${urgentRcActiveCount - 3} Urgent Root Cause(s) active. View in Causely`}
                            </CUIHeading>
                        </div>
                    </CUIRenderWhen>

                    <CUIRenderWhen condition={urgentRcActiveCount < 4}>
                        <div className={getCardClassName(null)} onClick={() => {
                            window.open(RouteUtil.getDiagnoseRoutePath(), '_blank');
                        }}>
                            <CUIHeading>
                                Not all root cause announce themselves
                            </CUIHeading>

                            <CUIText>
                                Spot the cracks before they spread— view all root causes in Causely
                            </CUIText>

                        </div>
                    </CUIRenderWhen>
                </CUIRenderWhen>
            </div>
        </CuiLoadingErrorWrapper>
    );
};
