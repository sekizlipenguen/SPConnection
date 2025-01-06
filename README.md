![platforms](https://img.shields.io/badge/platforms-Web%20%7C%20Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/@sekizlipenguen/connection.svg?style=flat-square)](https://www.npmjs.com/package/@sekizlipenguen/connection)
[![npm](https://img.shields.io/npm/dm/@sekizlipenguen/connection.svg?style=flat-square&colorB=007ec6)](https://www.npmjs.com/package/@sekizlipenguen/connection)

# @sekizlipenguen/connection

A powerful and customizable HTTP client designed for simplicity and flexibility in React Native, React, and Web environments. This library was created to address common challenges in RESTful API integrations, providing support for both `fetch` and `XMLHttpRequest` (XHR) as connection types. It includes features like upload progress tracking and a lightweight minified version (~5KB) for optimal performance. Perfect for handling both basic and advanced API needs, including file uploads, custom headers, and timeout management. With built-in logging, you can easily debug and monitor network
requests, ensuring a seamless developer experience. Additionally, we have added the ability to toggle debug mode for React Native, allowing developers to easily activate or deactivate network monitoring, helping to address challenges in observing network activities during development.

---

## Installation

Install the library using `npm` or `yarn`:

```bash
npm install @sekizlipenguen/connection
```

```bash
yarn add @sekizlipenguen/connection
```

---

## Features

- Supports both `fetch` and `XMLHttpRequest` (XHR) as connection types.
- Global configuration for timeout and headers.
- Event-driven progress handling for uploads.
- Fully compatible with React Native 0.60+ and Web.
- Lightweight and easy to use.
- Logging functionality for debugging (optional).

---

## Usage

### Basic Example (GET Request)

```javascript
import connection from "@sekizlipenguen/connection";

// GET request example
connection.get("https://example.com/api/data").then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.error(error);
});

// Using async/await
async function fetchData() {
  try {
    const response = await connection.get("https://example.com/api/data");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
```

### POST Request Example

```javascript
connection.post("https://example.com/api/data", {
  firstName: "John",
  lastName: "Doe",
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.error(error);
});
```

---

## API Methods

| Method   | Description            |
|----------|------------------------|
| `get`    | Sends a GET request    |
| `post`   | Sends a POST request   |
| `put`    | Sends a PUT request    |
| `patch`  | Sends a PATCH request  |
| `delete` | Sends a DELETE request |

Each method accepts the following parameters:

- `url`: The API endpoint.
- `data` (optional): The payload for POST, PUT, PATCH requests.
- `config` (optional): Configuration object (e.g., headers, timeout).

---

## Global Configuration

You can set global configurations such as timeout and headers using `setConfig`.

```javascript
connection.setConfig({
  timeout: 10000, // 10 seconds
  headers: {
    "Authorization": "Bearer token",
    "Content-Type": "application/json",
  },
});
```

---

## Config Options

| Option        | Type                     | Default   | Description                              |
|---------------|--------------------------|-----------|------------------------------------------|
| `connectType` | `'fetch'` \| `'xhr'`     | `'fetch'` | The connection type to use.              |
| `headers`     | `Record<string, any>`    | `{}`      | HTTP headers for the request.            |
| `timeout`     | `number`                 | `5000` ms | Request timeout in milliseconds.         |
| `progress`    | `(event: ProgressEvent)` | `null`    | Upload progress callback (for XHR only). |
| `logEnabled`  | `boolean`                | `false`   | Enable or disable logging for debugging. |

---

## Advanced Example

### Custom Headers and Timeout

```javascript
connection.get("https://example.com/api/data", {
  headers: {
    "Authorization": "Bearer token",
  },
  timeout: 10000, // 10 seconds
});
```

### Handling Progress Events (File Upload)

```javascript
connection.post("https://example.com/api/upload", fileData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  progress: (event) => {
    const percentCompleted = Math.round((event.loaded * 100) / event.total);
    console.log(`Upload progress: ${percentCompleted}%`);
  },
});
```

### Enabling Logging

```javascript
connection.enableLogs(true); // Enable logging
connection.enableLogs(false); // Disable logging
```

---

## TypeScript Support

This library provides TypeScript definitions for better type safety and autocompletion.

### Example

```typescript
import connection, {Config, ReturnTypeConfig} from "@sekizlipenguen/connection";

const config: Config = {
    headers: {
        "Authorization": "Bearer token",
    },
    timeout: 10000,
};

async function fetchData() {
    try {
        const response: ReturnTypeConfig = await connection.get("https://example.com/api/data", config);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

fetchData();
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
