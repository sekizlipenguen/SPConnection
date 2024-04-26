import {connection} from "@sekizlipenguen/connection";

declare module "@sekizlipenguen/connection" {

    export interface Config {
        connectType?: string,
        headers?: object,
        timeout?: number
    }

    export interface ReturnTypeConfig {
        data?: any,
        request?: any,
        statusCode?: number
    }

    export interface connection {
        get: (url: string, config?: Config) => Promise<ReturnTypeConfig>,
        post: (url: string, data?: object, config?: Config) => Promise<ReturnTypeConfig>,
        put: (url: string, data?: object, config?: Config) => Promise<ReturnTypeConfig>,
        patch: (url: string, data?: object, config?: Config) => Promise<ReturnTypeConfig>,
        delete: (url: string, config?: Config) => Promise<ReturnTypeConfig>,
        setConfig: (config: Config) => void
    }

    export const connection: connection;
}
export default connection;
