# 38. Server routes

Course section: 3: The server

## What you will learn

Create server endpoints without an API prefix.

In this lesson, **Route** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Route:** A rule connecting a URL path to a page or server handler.
- **Endpoint:** A URL and HTTP method that a server handles, such as POST /api/events.
- **Handler:** A function that processes a particular request or event.
- **defineEventHandler:** The helper used to declare a Nuxt server request handler.

## What this topic includes

These routes do not receive the automatic /api prefix.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Server/routes

Visit /hello to receive plain text from a server route, not a Vue page.

**Where:** server/routes/hello.get.js

```js
export default defineEventHandler(() => 'Hello from a server route')
```

### 2. Event handlers

Server routes receive the same event-handler API as files under server/api.

**Where:** server/routes/request-info.get.js

```js
export default defineEventHandler(event => ({ method: event.method }))
```

### 3. Response content

Returned objects are serialized as JSON; strings can be used for text responses.

**Where:** server/routes/site-info.get.js

```js
export default defineEventHandler(() => ({ name: 'EventO', version: 1 }))
```
## Simple example

`server/routes/hello.js` exposes `/hello` rather than `/api/hello`.

## Remember

- These are HTTP handlers, not Vue page components.

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
