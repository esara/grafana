import {SceneAppPage} from "@grafana/scenes";
import {prefixRoute} from "../../utils/utils.routing";
import {ROUTES} from "../../constants";
import {causelyScene} from "./causely.scene";

export const causelyPage = new SceneAppPage({
    title: 'Hello Causely',
    url: prefixRoute(ROUTES.Causely),
    getScene: causelyScene,
});
