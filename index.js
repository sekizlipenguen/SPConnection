let timeout = 5000;
let connectType = null; //fetch
const initProps = (defaultInit, config) => {
    return Object.assign({}, defaultInit, config);
}
const isObject = (v) => {
    if (v) {
        while (Object.prototype.toString.call(v) === '[object Object]') {
            if ((v = Object.getPrototypeOf(v)) === null) {
                return true;
            }
        }
    }
    return false;
}

const connect = (url, data = {}, config = {}) => {
    let body = (isObject(data) && config.files !== true) ? JSON.stringify(data) : data;
    const defaultInit = {method: 'GET', timeout: timeout, progress: null, headers: {}, async: true};
    const init = initProps(defaultInit, config);
    return new Promise((resolve, reject) => {

        const request = new XMLHttpRequest();
        request.open(init.method, url, init.async);
        if (init.timeout) {
            request.timeout = init.timeout;
        }

        request.upload.addEventListener('progress', function (e) {
            if (init.progress) {
                return init.progress(e);
            }
        });

        request.ontimeout = function () {
            request['isTimeout'] = true
        }

        request.onreadystatechange = (e) => {
            const responseHeaders = request && request.responseHeaders ? request.responseHeaders : null;
            let statusCode = request.status;
            if (request.readyState !== 4) {
                return;
            }
            let result = request.response;
            if (
                (responseHeaders && responseHeaders['Content-Type'] && responseHeaders['Content-Type'].match(/application\/json/)) ||
                (request.getResponseHeader("Content-Type") && request.getResponseHeader("Content-Type").match(/application\/json/))
            ) {
                result = JSON.parse(request.response);
            }
            if (statusCode === 0) {
                return setTimeout(() => {
                    if (request['isTimeout'] === true) {
                        request['isTimeout'] = false;
                        reject({statusCode: 408, message: 'Timeout'});
                    } else {
                        reject({statusCode: 0, message: 'ERR_INTERNET_DISCONNECTED'});
                    }
                }, 1)
            } else if (statusCode >= 200 && statusCode < 300) {
                resolve({
                    data: result,
                    request: request,
                    statusCode: request.status
                });
            } else {
                reject({
                    data: result,
                    request: request,
                    statusCode: request.status,
                });
            }
        };

        Object.keys(init.headers).forEach(function (item) {
            request.setRequestHeader(item, init.headers[item]);
        });
        request.send(body);
    });
}

const connectFetch = (url, data = {}, config = {}) => {
    let then1 = {};
    let body = (isObject(data) && config.files !== true) ? JSON.stringify(data) : data;
    const defaultInit = {method: 'GET', timeout: timeout, progress: null, headers: {}, async: true};
    const init = initProps(defaultInit, config);
    return new Promise((resolve, reject) => {
        fetch(url, init).then((response) => {
            then1 = response;
            if (response.headers.get('content-type') && response.headers.get('content-type').match(/application\/json/)) {
                return response.json();
            }
            return response;
        }).then(res2 => {
            const then2 = {data: res2};
            const result = Object.assign({}, then2, then1, {config: init});
            if (then1.ok) {
                resolve(result);
            } else {
                reject(result);
            }
        }).catch(err => reject(err));

        if (init && init.timeout) {
            const e = new Error('Connection timed out');
            setTimeout(reject, init.timeout, e);
        }
    })

}

class connection {

    static get(url, config) {
        const defaultInit = {method: 'GET', connectType: connectType};
        const init = initProps(defaultInit, config);
        return init.connectType && init.connectType === 'fetch' ? connectFetch(url, init.data, init) : connect(url, init.data, init);
    }

    static post(url, data, config) {
        const isData = typeof data;
        const body = isData === 'object' ? JSON.stringify(data) : data;
        const defaultInit = {method: 'POST', body: body, connectType: connectType};
        const init = initProps(defaultInit, config);
        return connect(url, data, init);
    }

    static put(url, data, config) {
        const isData = typeof data;
        const body = isData === 'object' ? JSON.stringify(data) : data;
        const defaultInit = {method: 'PUT', body: body, connectType: connectType};
        const init = initProps(defaultInit, config);
        return connect(url, data, init);
    }

    static patch(url, data, config) {
        const isData = typeof data;
        const body = isData === 'object' ? JSON.stringify(data) : data;
        const defaultInit = {method: 'PATCH', body: body, connectType: connectType};
        const init = initProps(defaultInit, config);
        return connect(url, data, init);
    }

    static delete(url, config) {
        const defaultInit = {method: 'DELETE', connectType: connectType};
        const init = initProps(defaultInit, config);
        return connect(url, init.data, init);
    }

    static setConfig(config) {
        const defaultInit = {timeout: timeout, connectType: connectType};
        const init = initProps(defaultInit, config);
        if (init && init.timeout) timeout = init.timeout;
        if (init && init.connectType) connectType = init.connectType;

    }
}

export default connection;
