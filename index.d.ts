import {connection} from "@sekizlipenguen/connection";

declare module "@sekizlipenguen/connection" {

    export interface Config {
        connectType?: string,
        headers?: object
    }

    export interface connection {
        get: (url: string, config: Config) => Promise<any>,
        post: (url: string, data?: object, config?: Config) => Promise<any>,
        put: (url: string, data?: object, config?: Config) => Promise<any>,
        patch: (url: string, data?: object, config?: Config) => Promise<any>,
        delete: (url: string, config: Config) => Promise<any>,
        setConfig: (config: Config) => void
    }

    export const connection: connection;
}
export default connection;
