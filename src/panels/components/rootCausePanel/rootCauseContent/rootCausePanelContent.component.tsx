import React from "react"

import { RootCauseCard } from "./../rootCauseCard/rootCauseCard.component"
import './rootCausePanelContent.scss'
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { ApiDefect, ApiDefectEdge } from "api/api.types";
import { useRootCausePanelApi } from "./useRootCausePanelApi";
import { CUIRenderWhen } from "sdk/cuiRenderWhen/coreRenderWhen.component";
import { CUIText } from "sdk/text/cui-text.component";

export const RootCauseContent = () => {
    const { isLoading, data, error } = useRootCausePanelApi()
    
    const totalCount = data?.totalCount;

    const rootCauseEdges: ApiDefectEdge[] = data?.edges.length > 4 ? (data?.edges.slice(0, 3) as ApiDefectEdge[]) : (data?.edges as ApiDefectEdge[]);

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={'cui--root-cause-content'}>
                {rootCauseEdges?.map((rootCause: ApiDefectEdge) => {
                    const rootCauseData: ApiDefect = rootCause.node;

                    return (
                        <div key={rootCause.node.id} className={'cui--root-cause-content-card'}>
                            <RootCauseCard rootCause={rootCauseData} />
                        </div>
                    )
                })}

                <CUIRenderWhen condition={totalCount > 4}>
                    <div key={'AdditionalRC'} className={'cui--root-cause-content-card'}>
                        <CUIText size={'1.5'}>
                            {totalCount - 3} more urgent root causes are affecting you system.  Go to causely to see more.
                        </CUIText>
                    </div>
                </CUIRenderWhen>
            </div>
        </CuiLoadingErrorWrapper>
    )
};
