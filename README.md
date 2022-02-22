![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/@sekizlipenguen/connection.svg?style=flat-square)](https://www.npmjs.com/package/@sekizlipenguen/connection)
[![npm](https://img.shields.io/npm/dm/@sekizlipenguen/connection.svg?style=flat-square&colorB=007ec6)](https://www.npmjs.com/package/@sekizlipenguen/connection)

> Promise based HTTP client for the browser and react, react-native
## Installation

```
yarn add @sekizlipenguen/connection
or
npm install @sekizlipenguen/connection
```

### Performing a `GET` request

```js

const connection = require('@sekizlipenguen/connection');

connection.get('https://penguin.example.com?p=1&d=1')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
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

### Methods

| Method Name | Description |
|-------------|------------|
| get         | -          |
| post        | -          |
| put         | -          |
| delete      | -          |
