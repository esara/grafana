import {SceneAppPage} from "@grafana/scenes";
import {serviceSummaryScene} from "./serviceSummaryScene";
import {prefixRoute} from "../../utils/utils.routing";
import {ROUTES} from "../../constants";

export const serviceSummaryPage = new SceneAppPage({
    title: 'Service Summary Page',
    url: prefixRoute(ROUTES.Causely),
    subTitle:
        'This scene showcases a basic scene functionality, including query runner, variable and a custom scene object.',
    getScene: () => serviceSummaryScene(),
});
