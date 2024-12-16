import {connection} from "@sekizlipenguen/connection";

declare module "@sekizlipenguen/connection" {
    export interface Config {
        connectType?: 'fetch' | 'xhr';
        headers?: Record<string, string>;
        timeout?: number;
        progress?: (event: ProgressEvent) => void;
    }

    export interface ReturnTypeConfig<T = any> {
        data?: T;
        request?: XMLHttpRequest | Response;
        statusCode?: number;
    }

    export interface connection {
        get: <T = any>(url: string, config?: Config) => Promise<ReturnTypeConfig<T>>;
        post: <T = any>(url: string, data?: object, config?: Config) => Promise<ReturnTypeConfig<T>>;
        put: <T = any>(url: string, data?: object, config?: Config) => Promise<ReturnTypeConfig<T>>;
        patch: <T = any>(url: string, data?: object, config?: Config) => Promise<ReturnTypeConfig<T>>;
        delete: <T = any>(url: string, data?: object, config?: Config) => Promise<ReturnTypeConfig<T>>;
        setConfig: (config: Config) => void;
    }

    export const connection: connection;
}
export default connection;

