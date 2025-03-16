import {SceneAppPage} from "@grafana/scenes";
import {prefixRoute} from "../../utils/utils.routing";
import {ROUTES} from "../../constants";
import {causelyScene} from "./causely.scene";

export const serviceSummaryPage = new SceneAppPage({
    title: 'Causely Service Overview',
    url: prefixRoute(ROUTES.ServiceOverview),
    getScene: causelyScene,
});
