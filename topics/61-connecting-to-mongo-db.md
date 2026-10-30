# 61. Connecting to Mongo DB

Course section: 5: Authentication

## What you will learn

Connect server code to MongoDB through Mongoose.

In this lesson, **Connection URI** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Connection URI:** A string identifying a database location and its connection options, sometimes including credentials.
- **Mongoose:** A library that models and queries MongoDB documents from Node.js.
- **Promise:** An object representing the eventual success or failure of asynchronous work.
- **await:** JavaScript syntax that waits for a promise to settle inside a supported context.

## What this topic includes

Requires npm install mongoose, private runtimeConfig.mongodbUri, and NUXT_MONGODB_URI. The utility below is reused in database lessons. It accepts the URI explicitly and shares only a connection promise, never per-user state.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Connection URI

Declare the private URI setting; the environment supplies its actual value.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ runtimeConfig: { mongodbUri: '' } })
```

### 2. Server helper

Cache an in-progress connection, and clear it on failure so a later request can retry.

**Where:** server/utils/connectDB.js

```js
import mongoose from 'mongoose'
let connectionPromise
export async function connectDB(uri) {
  if (!uri) throw createError({ statusCode: 500, statusMessage: 'Database not configured' })
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri).catch(error => { connectionPromise = undefined; throw error })
  }
  return await connectionPromise
}
```

### 3. Asynchronous connection

Await the connection before database work. Keep this diagnostic endpoint private or remove it before production.

**Where:** server/api/database-health.get.js

```js
export default defineEventHandler(async event => {
  await connectDB(useRuntimeConfig(event).mongodbUri)
  return { connected: true }
})
```
## Simple example

An API handler awaits a shared database connection before querying users.

## Remember

- Connection errors must be handled; avoid exposing the connection URI in responses.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Authenticate the request and scope record queries to its verified owner; hiding a button or accepting a client-provided user ID does not enforce ownership.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
