import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";
import { CauselyCredentials } from "utils/credentials/CauselyCredentials.singleton";

export class AppState {
    public static instantiate = async () => {
        await Promise.all(
            [
                EntityTypeDefs.create(),
                CauselyCredentials.create()
            ]
        )
    }
}
