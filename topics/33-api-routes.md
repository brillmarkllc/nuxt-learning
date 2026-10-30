# 33. API Routes

Course section: 3: The server

## What you will learn

Create HTTP API handlers using files.

In this lesson, **API** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **API:** An interface through which code requests data or actions from another part of a system.
- **Endpoint:** A URL and HTTP method that a server handles, such as POST /api/events.
- **Handler:** A function that processes a particular request or event.
- **defineEventHandler:** The helper used to declare a Nuxt server request handler.
- **GET:** An HTTP method used to retrieve a resource.
- **POST:** An HTTP method commonly used to create a resource or submit an action.

## What this topic includes

These independent endpoints demonstrate route names and HTTP method handling.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Server/api

A file under server/api gets the /api prefix automatically.

**Where:** server/api/hello.get.js

```js
export default defineEventHandler(() => ({ message: 'Hello' }))
```

### 2. DefineEventHandler

The handler receives the request event and returns a JSON object.

**Where:** server/api/method.js

```js
export default defineEventHandler((event) => ({ method: event.method, path: event.path }))
```

### 3. HTTP method suffixes

The .post suffix handles POST /api/echo. A GET request is not handled by this file.

**Where:** server/api/echo.post.js

```js
export default defineEventHandler(async event => ({ received: await readBody(event) }))
```
## Simple example

`server/api/hello.get.js` can export `defineEventHandler(() => ({ message: 'Hello' }))`.

## Remember

- A method suffix restricts which HTTP method the handler supports.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Authenticate the request and scope record queries to its verified owner; hiding a button or accepting a client-provided user ID does not enforce ownership.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
