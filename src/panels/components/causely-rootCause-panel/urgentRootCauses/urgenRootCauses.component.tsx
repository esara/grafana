import React from "react"
import { RootCauseCard } from "./rootCauseCard/rootCauseCard.component"
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { ApiDefect, ApiDefectEdge, ApiUserScope } from "api/api.types";
import { CUIRenderWhen } from "sdk/cuiRenderWhen/coreRenderWhen.component";
import { CUIText } from "sdk/text/cui-text.component";
import { Spinner } from "@grafana/ui";
import { useRootCausePanelApi } from "./useUrgentRootCausesApi";

import './urgentRootCauses.scss'
import { SdkUtil } from "sdk/sdk.util";

export const UrgentRootCauseComponent = ({ userScope }: { userScope: ApiUserScope }) => {
    const { isLoading, data, error } = useRootCausePanelApi(userScope)

    const totalCount = data?.totalCount;

    const rootCauseEdges: ApiDefectEdge[] = data?.edges.length > 4 ? (data?.edges.slice(0, 3) as ApiDefectEdge[]) : (data?.edges as ApiDefectEdge[]);

    const isEmptyState = !data ||data?.edges.length === 0;
    
    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={SdkUtil.withPrefix('root-cause-content')}>

                <CUIRenderWhen condition={isEmptyState}>
                    <div className={SdkUtil.withPrefix('root-cause-content-empty-state')}>
                        <CUIText size={'1.5'}>
                        There are no urgent root causes. Causely actively monitoring and if anything comes up, we will update here.
                        </CUIText>
                        <Spinner />
                    </div>
                </CUIRenderWhen>
                <CUIRenderWhen condition={!isEmptyState}>
                    {rootCauseEdges?.map((rootCause: ApiDefectEdge) => {
                        const rootCauseData: ApiDefect = rootCause.node;

                        return (
                            <div key={rootCause.node.id} className={SdkUtil.withPrefix('root-cause-content-card')}>
                                <RootCauseCard rootCause={rootCauseData} />
                            </div>
                        )
                    })}

                    <CUIRenderWhen condition={totalCount > 4}>
                        <div key={'AdditionalRC'} className={SdkUtil.withPrefix('root-cause-content-card')}>
                            <CUIText size={'1.5'}>
                                {totalCount - 3} more urgent root causes are affecting you system.  Go to causely to see more.
                            </CUIText>
                        </div>
                    </CUIRenderWhen>
                </CUIRenderWhen>

            </div>
        </CuiLoadingErrorWrapper>
    )
};
