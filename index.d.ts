import {connection} from "@sekizlipenguen/connection";

declare module "@sekizlipenguen/connection" {

    export interface Config {
        connectType?: string,
        headers?: object
    }

    export interface connection {
        get: (url: string, config: Config) => void,
        post: (url: string, data?: object, config?: Config) => void,
        put: (url: string, data?: object, config?: Config) => void,
        patch: (url: string, data?: object, config?: Config) => void,
        delete: (url: string, config: Config) => void,
        setConfig: (config: Config) => void
    }

    export const connection: connection;
}
export default connection;
