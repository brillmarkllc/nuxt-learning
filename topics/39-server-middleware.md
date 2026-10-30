# 39. Server middleware

Course section: 3: The server

## What you will learn

Process incoming requests before their handlers.

In this lesson, **Middleware** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Middleware:** Code that runs before a route or request handler to perform checks or add context.
- **Request context:** Information attached to the current server request for its handlers to use.
- **Cookie:** A small value a browser stores and sends with matching requests.
- **Handler:** A function that processes a particular request or event.

## What this topic includes

Middleware examples are independent files under server/middleware. They inspect requests rather than render pages.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Server middleware

Record a timestamp on the current event so later handlers can use it.

**Where:** server/middleware/timing.js

```js
export default defineEventHandler(event => { event.context.requestStartedAt = Date.now() })
```

### 2. Logging

Log only the method and pathname, avoiding cookies and potentially sensitive query values.

**Where:** server/middleware/logger.js

```js
export default defineEventHandler(event => { console.log(event.method, getRequestURL(event).pathname) })
```

### 3. Cookies

Read a harmless preference cookie; this cookie is not authentication evidence.

**Where:** server/middleware/preferences.js

```js
export default defineEventHandler(event => { event.context.theme = getCookie(event, 'theme') === 'dark' ? 'dark' : 'light' })
```

### 4. Request context

A handler can read the request-scoped value set by preferences middleware.

**Where:** server/api/theme.get.js

```js
export default defineEventHandler(event => ({ theme: event.context.theme ?? 'light' }))
```
## Simple example

Attach request information to `event.context` for later handlers.

## Remember

- Server middleware differs from page navigation middleware.

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
