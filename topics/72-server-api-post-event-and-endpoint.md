# 72. Server API post event and endpoint

Course section: 6: Practice app: EventO

## What you will learn

Create an event from an authenticated request.

In this lesson, **POST** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **POST:** An HTTP method commonly used to create a resource or submit an action.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.
- **Ownership check:** A server-side check that a record belongs to, or is accessible by, the current user.
- **Request body:** Data sent inside an HTTP request, often used for form submissions.

## What this topic includes

Requires nuxt-auth-utils (56), connectDB (61), the complete Event model (71), and eventSchema from lesson 74. Create those files before running the complete POST handler. Setup fragments show the stages; the final block combines them.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Database connection

Read the private setting in the current request and await the shared connection utility.

**Where:** server/api/events/index.post.js — database stage

```js
async function prepareDatabase(event) {
  await connectDB(useRuntimeConfig(event).mongodbUri)
}
// Inside a protected handler: await prepareDatabase(event)
```

### 2. Request body

The server reads the payload and keeps only validated fields.

**Where:** server/api/events/index.post.js — body stage

```js
import { eventSchema } from '../../utils/schemas/event'
async function readEventInput(event) {
  return await eventSchema.validate(await readBody(event), { stripUnknown: true })
}
// Inside the handler: const input = await readEventInput(event)
```

### 3. Session check

requireUserSession stops signed-out requests with 401. The saved session must include user.id from the sign-in lessons.

**Where:** server/api/whoami.get.js

```js
export default defineEventHandler(async event => {
  const { user } = await requireUserSession(event)
  if (!user.id) throw createError({ statusCode: 401, statusMessage: 'Sign in again' })
  return { id: user.id }
})
```

### 4. Model creation

Validate, connect, and create an event owned by the verified user. Expected result: 201 and the created event.

**Where:** server/api/events/index.post.js — complete handler

```js
import * as yup from 'yup'
import Event from '../../models/Event'
import { eventSchema } from '../../utils/schemas/event'
export default defineEventHandler(async event => {
  const { user } = await requireUserSession(event)
  if (!user.id) throw createError({ statusCode: 401, statusMessage: 'Sign in again' })
  let input
  try { input = await eventSchema.validate(await readBody(event), { abortEarly: false, stripUnknown: true }) }
  catch (error) {
    if (error instanceof yup.ValidationError) throw createError({ statusCode: 400, statusMessage: 'Validation failed', data: { fields: Object.fromEntries(error.inner.map(issue => [issue.path || 'form', issue.message])) } })
    throw error
  }
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const created = await Event.create({ title: input.title, content: input.content, date: input.date ?? null, owner: user.id })
  setResponseStatus(event, 201)
  return created
})
```
## Simple example

The handler checks the session, associates the user, and saves the event.

## Remember

- Reject unauthenticated writes and do not trust a client-supplied owner ID.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Authenticate the request and scope record queries to its verified owner; hiding a button or accepting a client-provided user ID does not enforce ownership.

## Practical tip

Create two test users and verify that one cannot read, modify, or delete an event owned by the other.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Yup schema and validation API](https://github.com/jquense/yup)
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
