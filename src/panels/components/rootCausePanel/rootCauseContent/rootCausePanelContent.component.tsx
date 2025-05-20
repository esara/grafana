import React from "react"

import { RootCauseCard } from "./../rootCauseCard/rootCauseCard.component"
import { useCriticalRootCause } from './useCriticalRootCause'
import './rootCausePanelContent.scss'
import { CuiLoadingErrorWrapper } from "sdk/loadingErrorWrapper/cuiLoadingErrorWrapper.component";

export const RootCauseContent = () => {
    const {isLoading, data, error} = useCriticalRootCause()
    
    return (
        <CuiLoadingErrorWrapper isLoading={isLoading} error={error}>
            <div className={'cui--root-cause-content'}>
                {data.map((rootCause) => {
                    return (
                        <div key={rootCause.id} className={'cui--root-cause-content-card'}>
                            <RootCauseCard rootCause={rootCause} />
                        </div>
                    )
                })}
            </div>
        </CuiLoadingErrorWrapper>
    )
};
