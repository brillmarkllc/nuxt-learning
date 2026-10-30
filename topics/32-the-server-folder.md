# 32. The server folder

Course section: 3: The server

## What you will learn

Keep server-only code in its own directory.

In this lesson, **Server** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Server:** The environment that receives requests, accesses private data, and sends responses.
- **Handler:** A function that processes a particular request or event.
- **Endpoint:** A URL and HTTP method that a server handles, such as POST /api/events.
- **Runtime config:** Nuxt configuration available while the application runs, with private and public areas.

## What this topic includes

All server paths below are relative to the project root, alongside nuxt.config.ts.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Root server directory

The server directory is outside app, which separates backend files from page components.

**Where:** Project structure

```text
nuxt.config.ts
app/
  app.vue
server/
  api/
  middleware/
  plugins/
  utils/
```

### 2. API handlers

A GET API handler returns JSON at /api/ping.

**Where:** server/api/ping.get.js

```js
export default defineEventHandler(() => ({ pong: true }))
```

### 3. Middleware

Middleware attaches request-scoped information without sending a response itself.

**Where:** server/middleware/started.js

```js
export default defineEventHandler(event => { event.context.startedAt = Date.now() })
```

### 4. Plugins

A Nitro plugin runs when a server instance initializes.

**Where:** server/plugins/startup.js

```js
export default defineNitroPlugin(() => { console.log('Nitro instance ready') })
```

### 5. Utils

An exported server utility is available in server handlers.

**Where:** server/utils/greeting.js

```js
export const greeting = name => `Hello, ${name}`
// In a server handler: return { message: greeting('Ada') }
```
## Simple example

Place database access inside `server/` and expose only needed results.

## Remember

- Code in app components is not automatically private just because SSR executes it.

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
