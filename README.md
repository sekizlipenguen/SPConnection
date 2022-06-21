![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/@sekizlipenguen/connection.svg?style=flat-square)](https://www.npmjs.com/package/@sekizlipenguen/connection)
[![npm](https://img.shields.io/npm/dm/@sekizlipenguen/connection.svg?style=flat-square&colorB=007ec6)](https://www.npmjs.com/package/@sekizlipenguen/connection)

> Promise based HTTP client for the browser and react, react-native

### Release notes(0.1.2) 🐧 🐐

- global setConfig method
- response timeout(status code) 408 added
- connectType default null - fetch (not progressbar)

## Installation

```
yarn add @sekizlipenguen/connection
or
npm install @sekizlipenguen/connection
```

### Performing a `GET` request

```js

import connection from "@sekizlipenguen/connection";
//or const connection = require('@sekizlipenguen/connection');

connection.get('https://mocki.io/v1/8cecbd39-4cde-448f-9149-bccae2b66a0c').then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});

//example `async`
async function getPenguin() {
    try {
        const response = await connection.get('https://penguin.example.com?p=1&d=1');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

```

### Performing a `POST` request

```js

connection.post('https://mocki.io/v1/8cecbd39-4cde-448f-9149-bccae2b66a0c', {
    first_name: 'CM',
    last_name: 'Penguen'
}).then((response) => {
    console.log(response);

}).catch((error) => {
    console.log(error);
});

```

### Methods

| Method Name              | Description |
|--------------------------|-------------|
| get(url,config)          |             |
| post(url,data, config)   |             |
| put(url, data, config)   |             |
| patch(url, data, config) |             |
| delete(url, config)      |             |

### Global Config

```js
connection.setConfig({
    timeout: 6000 //ms
})
```

### Config

```object
{
    headers: {
        "content-type": "application/json",
        "X-Custom-Header": "foobar"
    },
    progress: function (e) {
        //post-put data upload event
    },
    timeout: "default 5000 ms",
    async:"default true"
}
```
