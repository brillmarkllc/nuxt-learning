# 40. Server Nitro plugins

Course section: 3: The server

## What you will learn

Hook into the Nitro server lifecycle.

In this lesson, **Nitro** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Nitro:** The server engine used by Nuxt for backend routes and deployment output.
- **Plugin:** Code that extends or initializes a running Nuxt application.
- **Hook:** A callback registered to run at a particular lifecycle stage or event.
- **Lifecycle:** The stages an application or component passes through, from creation to cleanup.

## What this topic includes

These are independent Nitro plugin examples. Logs appear in the server terminal.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Nitro plugins

defineNitroPlugin registers backend initialization code.

**Where:** server/plugins/startup.js

```js
export default defineNitroPlugin((nitroApp) => {
  console.log('Server plugin registered')
})
```

### 2. Server initialization

Initialization occurs for each server instance, so do not treat it as a once-only database migration.

**Where:** server/plugins/initialized.js

```js
export default defineNitroPlugin(() => {
  const initializedAt = new Date().toISOString()
  console.log('This server instance initialized at', initializedAt)
})
```

### 3. Lifecycle hooks

The error hook can record failures centrally. Keep private details out of client responses.

**Where:** server/plugins/errors.js

```js
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', () => { console.error('A server error occurred') })
})
```
## Simple example

A server plugin can register a hook to observe server errors.

## Remember

- Use server plugins for server lifecycle concerns, not browser UI setup.

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
