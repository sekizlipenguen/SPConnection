//import React from 'react';

const timeout = 5000;

const initProps = (defaultInit, config) => {
    return Object.assign({}, defaultInit, config);
}
const isObject = (v) => {
    while (Object.prototype.toString.call(v) === '[object Object]') {
        if ((v = Object.getPrototypeOf(v)) === null) {
            return true;
        }
    }
    return false;
}

const connect = (url, data = {}, config = {}) => {

    let body = (isObject(data) && config.files !== true) ? JSON.stringify(data) : data;
    const defaultInit = {
        method: 'GET',
        timeout: timeout,
        progress: null,
        headers: {},
        async: true
    };
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
        request.onreadystatechange = (e) => {
            const responseHeaders = request.responseHeaders;
            if (request.readyState !== 4) {
                return;
            }
            let result = request.response;
            if (responseHeaders && responseHeaders['Content-Type'] && responseHeaders['Content-Type'].match(/application\/json/)) {
                result = JSON.parse(request.response);
            }
            if (request.status >= 200 && request.status <= 300) {
                resolve(result);
            } else {
                reject(result);
            }
        };

        Object.keys(init.headers).forEach(function (item) {
            request.setRequestHeader(item, init.headers[item]);
        });

        if (init.timeout) {
            request.ontimeout = function () {
                const e = new Error('Connection timed out');
                reject(e);
            };
        }
        request.send(body);
    });
}

const SPConnection = {
    get: function (url, config) {
        const defaultInit = {
            method: 'GET',
        };
        const init = initProps(defaultInit, config);
        return connect(url, init?.data, init);
    },
    post: function (url, data, config) {
        const isData = typeof data;
        const body = isData === 'object' ? JSON.stringify(data) : data;
        const defaultInit = {
            method: 'POST',
            body: body,
        };
        const init = initProps(defaultInit, config);
        return connect(url, data, init);
    },
    put: function (url, data, config) {
        const isData = typeof data;
        const body = isData === 'object' ? JSON.stringify(data) : data;
        const defaultInit = {
            method: 'PUT',
            body: body,
            timeout: timeout,
        };
        const init = initProps(defaultInit, config);
        return connect(url, data, init);
    },
    delete: function (url, config) {
        const defaultInit = {
            method: 'DELETE',
            timeout: timeout,
        };
        const init = initProps(defaultInit, config);
        return connect(url, init?.data, init);
    }
};

export default SPConnection;