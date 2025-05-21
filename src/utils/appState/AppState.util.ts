import { EntityTypeDefs } from "utils/entityTypeDefs/EntityTypeDefs.singleton";

export class AppState {
    public static instantiate =  async () => {
        await EntityTypeDefs.create();
    }    


}
