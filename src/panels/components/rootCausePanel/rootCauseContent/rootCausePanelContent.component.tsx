import React from "react"

import { RootCauseCard } from "./../rootCauseCard/rootCauseCard.component"
import './rootCausePanelContent.scss'
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";
import { ApiDefect, ApiDefectEdge } from "api/api.types";
import { useRootCausePanelApi } from "./useRootCausePanelApi";

export const RootCauseContent = () => {
    const {isLoading, data, error} = useRootCausePanelApi()

    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={'cui--root-cause-content'}>
                {data?.edges.map((rootCause: ApiDefectEdge) => {
                    const rootCauseData: ApiDefect= rootCause.node;

                    return (
                        <div key={rootCause.node.id} className={'cui--root-cause-content-card'}>
                            <RootCauseCard rootCause={rootCauseData} />
                        </div>
                    )
                })}
            </div>
        </CuiLoadingErrorWrapper>
    )
};
