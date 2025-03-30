import React from "react";
import useServiceHealthApi from "./useServiceHealthApi";
import { LoadingPlaceholder } from "@grafana/ui";
import { EntityHealthCard, EntityHealthCardData } from "./entityHealthCard.component";

export const ServiceHealthSummaryContent: React.FC = () => {
    const {isLoading, data, error} = useServiceHealthApi();

    if (isLoading) {
        return (
            <LoadingPlaceholder text="Loading..." />
        )
    }
    if (error) {
        return (
            <div>Error: {error}</div>
        )
    }
    return (
        <div className="service-health-summary-panel">
            {data.map((entityHealthCardData: EntityHealthCardData) => {
                return (
                    <div key={entityHealthCardData.severity}>
                        <EntityHealthCard key={entityHealthCardData.severity} data={entityHealthCardData} label="Services" />
                    </div>
                );
            })}
        </div>
    );
};
