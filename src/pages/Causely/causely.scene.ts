import { EmbeddedScene, SceneFlexLayout, SceneFlexItem } from '@grafana/scenes';
import {ServiceSummaryObject} from "./serviceSummary";

export function causelyScene() {
    return new EmbeddedScene({
        body: new SceneFlexLayout({
            children: [
                new SceneFlexItem({
                    width: '100%',
                    body: new ServiceSummaryObject({entityTypeCounts: []})
                }),
            ],
        }),
    });
}