# 61. Connecting to Mongo DB

Course section: 5: Authentication

Mongoose is the library server code uses to connect to MongoDB and work with records. The database URI from topic 60 identifies the database and its connection details.

**Additional working example:** Create `server/utils/connectDB.js` in `evento`:

```js
import mongoose from 'mongoose'

let connectionPromise

export async function connectDB(uri) {
  if (!uri) {
    throw createError({ status: 500, statusText: 'Database not configured' })
  }
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
      .catch(() => {
        connectionPromise = undefined
        throw createError({ status: 503, statusText: 'Database unavailable' })
      })
  }
  return await connectionPromise
}
```

A **promise** represents work that will finish later. The shared variable lets simultaneous requests wait for the same connection attempt rather than opening new connections for every request. If the first attempt fails, it is cleared so another request can retry. The example uses one fixed database per server instance.

The timeout sets how long the driver tries to find a server for an operation; it does not set a universal deadline for every database task. Mongoose also manages reconnection after an established connection drops.

## Test the connection

Create a temporary `server/api/database-health.get.js`:

```js
export default defineEventHandler(async (event) => {
  await connectDB(useRuntimeConfig(event).mongodbUri)
  return { connected: true }
})
```

Restart `npm run dev` after setting `.env`, then open `/api/database-health`. With a reachable database, the response should contain `connected: true`.

If it fails, check the URI, database-user credentials, Atlas IP access list, and whether the cluster or local MongoDB server is running. Keep credentials out of logs and screenshots. Remove this temporary diagnostic endpoint after checking.

Connection code belongs under `server/`. The helper shares a database connection, never a visitor's session or password. Later handlers must still check each request's identity and permissions.

## Official documentation

- [Nuxt 4: Server utilities and runtime config](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Runtime config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)
- [Mongoose: Connections](https://mongoosejs.com/docs/connections.html)

[Back to course index](00-course-index.md)
