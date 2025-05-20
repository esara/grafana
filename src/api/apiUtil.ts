import { getBackendSrv } from "@grafana/runtime";
import { AppPluginId } from "../constants";

export interface QueryResult<TData> {
    data: TData;
}

export class ApiUtil {
    public static postQuery<TData>(payload: unknown): Promise<QueryResult<TData>> {
        return getBackendSrv().post(
            `api/plugins/${AppPluginId}/resources/query`,
            payload
        );
    }
}
