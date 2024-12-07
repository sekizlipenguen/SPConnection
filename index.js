let timeout = 5000;
let connectType = null; // Varsayılan olarak 'fetch'

const initProps = (defaultInit, config) => Object.assign({}, defaultInit, config);

const isObject = (v) => v && Object.prototype.toString.call(v) === '[object Object]';
const isArray = (v) => Array.isArray(v);

const handleError = (error, reject) => {
    if (error.statusCode === 408) {
        reject({statusCode: 408, message: 'Timeout occurred'});
    } else if (error.statusCode === 0) {
        reject({statusCode: 0, message: 'Network disconnected'});
    } else {
        reject(error);
    }
};

const connect = (url, data = {}, config = {}) => {
    let body = (isObject(data) || isArray(data)) && config.files !== true ? JSON.stringify(data) : data;
    const defaultInit = {method: 'GET', timeout, progress: null, headers: {}, async: true};
    const init = initProps(defaultInit, config);

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(init.method, url, init.async);

        if (init.timeout) {
            request.timeout = init.timeout;
        }

        request.upload.addEventListener('progress', (e) => init.progress && init.progress(e));

        request.ontimeout = () => (request.isTimeout = true);

        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }

            let result = request.response;
            const contentType = request.getResponseHeader('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                result = JSON.parse(request.response);
            }

            if (request.status === 0) {
                setTimeout(() => {
                    if (request.isTimeout) {
                        request.isTimeout = false;
                        handleError({statusCode: 408}, reject);
                    } else {
                        handleError({statusCode: 0}, reject);
                    }
                }, 1);
            } else if (request.status >= 200 && request.status < 300) {
                resolve({data: result, request, statusCode: request.status});
            } else {
                reject({data: result, request, statusCode: request.status});
            }
        };

        Object.keys(init.headers).forEach((key) => request.setRequestHeader(key, init.headers[key]));
        request.send(body);
    });
};

const connectFetch = (url, data = {}, config = {}) => {
    let then1 = {};
    let body = (isObject(data) || isArray(data)) && config.files !== true ? JSON.stringify(data) : data;

    const defaultInit = {method: 'GET', timeout, progress: null, headers: {}, async: true};
    const init = initProps(defaultInit, config);
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), init.timeout);

        fetch(url, {
            ...init,
            ...(init.method !== 'GET' ? {body} : {}), // Sadece GET dışında body eklenir
            signal: controller.signal,
        }).then((response) => {
            then1 = response;
            if (response.headers.get('content-type')?.includes('application/json')) {
                return response.json();
            }
            return response;
        }).then((res2) => {
            const then2 = {data: res2};
            const result = Object.assign({}, then2, then1, {config: init});
            if (then1.ok) {
                resolve(result);
            } else {
                reject(result);
            }
        }).catch((err) => reject(err)).finally(() => clearTimeout(timeoutId));
    });
};

class connection {
    static get(url, config) {
        const defaultInit = {method: 'GET', connectType};
        const init = initProps(defaultInit, config);
        return init.connectType === 'fetch'
            ? connectFetch(url, init.data, init)
            : connect(url, init.data, init);
    }

    static post(url, data, config) {
        const defaultInit = {method: 'POST', connectType};
        const init = initProps(defaultInit, config);
        return init.connectType === 'fetch'
            ? connectFetch(url, data, init)
            : connect(url, data, init);
    }

    static put(url, data, config) {
        const defaultInit = {method: 'PUT', connectType};
        const init = initProps(defaultInit, config);
        return init.connectType === 'fetch'
            ? connectFetch(url, data, init)
            : connect(url, data, init);
    }

    static patch(url, data, config) {
        const defaultInit = {method: 'PATCH', connectType};
        const init = initProps(defaultInit, config);
        return init.connectType === 'fetch'
            ? connectFetch(url, data, init)
            : connect(url, data, init);
    }

    static delete(url, config) {
        const defaultInit = {method: 'DELETE', connectType};
        const init = initProps(defaultInit, config);
        return init.connectType === 'fetch'
            ? connectFetch(url, init.data, init)
            : connect(url, init.data, init);
    }

    static setConfig(config) {
        const defaultInit = {timeout, connectType};
        const init = initProps(defaultInit, config);
        if (init.timeout) {
            timeout = init.timeout;
        }
        if (init.connectType) {
            connectType = init.connectType;
        }
    }
}

export default connection;
