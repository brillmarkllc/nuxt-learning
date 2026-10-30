# 77. Handling status

Course section: 6: Practice app: EventO

## What you will learn

Introduce the event completion workflow.

In this lesson, **Status transition** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Status transition:** A change between allowed record states, such as pending to completed.
- **Authorization:** Checking whether that user may perform an action on a particular resource.
- **Ownership check:** A server-side check that a record belongs to, or is accessible by, the current user.
- **Record:** One stored item, such as an employee or event.

## What this topic includes

Requires the event model, connection utility, and nuxt-auth-utils. Use PATCH for completion and DELETE for removal, giving each operation its own endpoint. This is a clearer variant of the course’s combined-action endpoint.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Pending/completed states

Model status as one of two explicit values and display a readable label.

**Where:** app/components/EventStatus.vue

```vue
<script setup>
defineProps({ status: { type: String, required: true } })
</script>
<template><span>{{ status === 'completed' ? 'Completed' : 'Pending' }}</span></template>
```

### 2. Conditional actions

Use with an item from v-for and the complete/remove functions in lesson 78. Disable controls while that record’s action is pending.

**Where:** Inside an event-list template

```vue
<div><button v-if="item.status === 'pending'" :disabled="busyId === item._id" @click="complete(item._id)">Complete and archive</button><button v-else :disabled="busyId === item._id" @click="remove(item._id)">Delete</button></div>
```

### 3. Server action handling

Atomically complete only a pending event owned by the signed-in user. A missing, foreign, or already-completed target returns 404.

**Where:** server/api/events/[id].patch.js

```js
import mongoose from 'mongoose'
import Event from '../../models/Event'
export default defineEventHandler(async event => {
  const { user } = await requireUserSession(event)
  const id = getRouterParam(event, 'id')
  if (!user.id) throw createError({ statusCode: 401, statusMessage: 'Sign in again' })
  if (!id || !mongoose.isObjectIdOrHexString(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  const body = await readBody(event)
  if (body?.status !== 'completed') throw createError({ statusCode: 400, statusMessage: 'Unsupported status' })
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const updated = await Event.findOneAndUpdate({ _id: id, owner: user.id, status: 'pending' }, { $set: { status: 'completed' } }, { new: true, runValidators: true })
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Pending event not found' })
  return updated
})
```
## Simple example

A pending event shows “Complete and archive”; a completed event shows “Delete”.

## Remember

- Validate requested actions and record ownership on the server.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Authenticate the request and scope record queries to its verified owner; hiding a button or accepting a client-provided user ID does not enforce ownership.

## Practical tip

Accept only explicitly supported actions and legal state transitions; reject unknown action values.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
