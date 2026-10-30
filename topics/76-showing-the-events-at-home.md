# 76. Showing the events at home

Course section: 6: Practice app: EventO

## What you will learn

Fetch and render the signed-in user's events.

In this lesson, **useFetch** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **useFetch:** An SSR-aware Nuxt composable for loading an HTTP resource and tracking its result.
- **Pending state:** The period while a request or action is still in progress.
- **Empty state:** UI shown when a request succeeds but there are no items to display.
- **Ownership check:** A server-side check that a record belongs to, or is accessible by, the current user.

## What this topic includes

Requires nuxt-auth-utils, connectDB (61), and the complete Event model (71). The GET handler enforces ownership. The MyEvents component is only mounted when signed in, as shown in lesson 75.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Events component

A component displays events returned by the protected endpoint and handles loading and failure states.

**Where:** app/components/MyEvents.vue

```vue
<script setup>
const { data: events, status, error } = await useFetch('/api/events', { key: 'my-events' })
</script>
<template><section><h2>My events</h2><p v-if="status === 'pending'">Loading…</p><p v-else-if="error">Unable to load events</p><ul v-else><li v-for="item in events || []" :key="item._id">{{ item.title }}</li></ul></section></template>
```

### 2. API fetching

Use a stable key so actions can refresh the same fetched data later. Clear it on logout to avoid stale user data.

**Where:** A signed-in component — script setup

```js
const { data: events, refresh } = await useFetch('/api/events', { key: 'my-events', default: () => [] })
```

### 3. User filtering

Filter by the server-verified owner, never by an arbitrary query userId supplied by the browser.

**Where:** server/api/events/index.get.js

```js
import Event from '../../models/Event'
export default defineEventHandler(async event => {
  const { user } = await requireUserSession(event)
  if (!user.id) throw createError({ statusCode: 401, statusMessage: 'Sign in again' })
  await connectDB(useRuntimeConfig(event).mongodbUri)
  return await Event.find({ owner: user.id }).sort({ createdAt: -1 }).lean()
})
```

### 4. Empty state

An empty successful result is different from a failure or an in-progress request.

**Where:** Template fragment inside MyEvents, with events/status/error from above

```vue
<p v-if="!error && status === 'success' && events?.length === 0">No events yet. Create your first event.</p>
```
## Simple example

Show event cards for the current user or a “No events yet” message.

## Remember

- The server must restrict results to the authenticated owner.

## Best practices and edge cases

- Use useFetch for an HTTP resource or useAsyncData with a custom fetcher during setup. Their payload integration avoids repeating the initial request during hydration.
- Use $fetch for user-triggered mutations such as submitting a form, then refresh the affected list after success.
- Pass a getter or computed URL when a request depends on a route parameter. Handle pending, error, empty, and successful results separately.
- Calls sharing a data key share state. Keep their important options consistent and avoid keys that mix results from different users.
- During SSR, relative useFetch requests can forward request context; a plain server-side $fetch does not automatically forward the browser’s cookies.

## Official documentation

- [Nuxt 4: Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
