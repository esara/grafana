import React from "react";
import useServiceHealthApi from "./useServiceHealthApi";
import {Button, Grid, LoadingPlaceholder} from "@grafana/ui";
import {EntityHealthCard, EntityHealthCardData} from "./entityHealthCard/entityHealthCard.component";

export const ServiceHealthSummaryContent: React.FC = () => {
    const {isLoading, data, error, fetchData} = useServiceHealthApi();

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
            <div>
                <Button variant="primary" onClick={() => fetchData()}>
                    Make api request
                </Button>
                <Grid columns={5} alignItems={'stretch'} gap={4}>
                    {data.map((entityHealthCardData: EntityHealthCardData) => {
                        return (
                            <div key={entityHealthCardData.severity}>
                                <EntityHealthCard key={entityHealthCardData.severity} data={entityHealthCardData} label="Services" />
                            </div>
                        );
                    })}
                </Grid>
            </div>
        </div>
    );
};