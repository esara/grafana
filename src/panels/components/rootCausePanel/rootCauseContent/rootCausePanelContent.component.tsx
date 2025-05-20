import React from "react"
import mockData from "./mockData.json"

import { RootCauseCard } from "./../rootCauseCard/rootCauseCard.component"
import './rootCausePanelContent.scss'

export const RootCauseContent = () => {
    const data = mockData;

    return (
        <div className={'cui--root-cause-content'}>
            {data.map((rootCause) => {
                return (
                        <div key={rootCause.id} className={'cui--root-cause-content-card'}>
                            <RootCauseCard />
                        </div>

                )
            })}
        </div >
    )
};
