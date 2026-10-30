# 78. Deleting events

Course section: 6: Practice app: EventO

## What you will learn

Perform event actions and refresh the displayed list.

In this lesson, **DELETE** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **DELETE:** An HTTP method used to request removal of a resource.
- **Refresh:** Loading data again so the UI reflects the latest server result.
- **Pending state:** The period while a request or action is still in progress.
- **Status transition:** A change between allowed record states, such as pending to completed.

## What this topic includes

Requires the event GET endpoint (76), completion PATCH endpoint (77), the complete Event model (71), connectDB, and nuxt-auth-utils. The examples below use separate completion and deletion endpoints rather than the course’s combined DELETE action.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Action request

Choose the HTTP method by the operation; completion is an update, not removal.

**Where:** A signed-in component — script setup

```js
async function complete(id) { return await $fetch(`/api/events/${encodeURIComponent(String(id))}`, { method: 'PATCH', body: { status: 'completed' } }) }
async function remove(id) { return await $fetch(`/api/events/${encodeURIComponent(String(id))}`, { method: 'DELETE' }) }
```

### 2. Event ID

Take the target ID from the rendered record; the server must still validate and authorize it.

**Where:** A signed-in component — script setup

```js
const busyId = ref(null)
function pathFor(item) { return `/api/events/${encodeURIComponent(String(item._id))}` }
// In a list: <button @click="remove(item._id)">Delete</button>
```

### 3. Completion/deletion

Delete only a completed event owned by the session user. One database condition enforces ownership and state even when requests race.

**Where:** server/api/events/[id].delete.js

```js
import mongoose from 'mongoose'
import Event from '../../models/Event'
export default defineEventHandler(async event => {
  const { user } = await requireUserSession(event)
  const id = getRouterParam(event, 'id')
  if (!user.id) throw createError({ statusCode: 401, statusMessage: 'Sign in again' })
  if (!id || !mongoose.isObjectIdOrHexString(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const removed = await Event.findOneAndDelete({ _id: id, owner: user.id, status: 'completed' })
  if (!removed) throw createError({ statusCode: 404, statusMessage: 'Completed event not found' })
  return { deleted: true }
})
```

### 4. UseFetch refresh

Refresh after a successful mutation and track which record is busy. Use with the list template from lesson 76 and buttons from lesson 77.

**Where:** app/components/MyEvents.vue — replacement script setup

```js
const { data: events, status, error, refresh } = await useFetch('/api/events', { key: 'my-events' })
const busyId = ref(null)
const actionError = ref('')
async function act(id, method, body) {
  if (busyId.value) return
  busyId.value = id
  actionError.value = ''
  try {
    await $fetch(`/api/events/${encodeURIComponent(String(id))}`, { method, ...(body ? { body } : {}) })
    await refresh()
  } catch { actionError.value = 'Action failed. Reload or try again.' }
  finally { busyId.value = null }
}
const complete = id => act(id, 'PATCH', { status: 'completed' })
const remove = id => act(id, 'DELETE')
// Add <p role="alert">{{ actionError }}</p> to the component template.
```
## Simple example

After a successful event action, refresh the list so the changed record is reflected.

## Remember

- The course reuses a DELETE request for actions. The practical examples here use PATCH for completion and DELETE for removal, with separate handlers.

## Best practices and edge cases

- Use useFetch for an HTTP resource or useAsyncData with a custom fetcher during setup. Their payload integration avoids repeating the initial request during hydration.
- Use $fetch for user-triggered mutations such as submitting a form, then refresh the affected list after success.
- Pass a getter or computed URL when a request depends on a route parameter. Handle pending, error, empty, and successful results separately.
- Calls sharing a data key share state. Keep their important options consistent and avoid keys that mix results from different users.
- During SSR, relative useFetch requests can forward request context; a plain server-side $fetch does not automatically forward the browser’s cookies.

## Practical tip

Refresh only after the mutation succeeds. Disable the action while it is pending to avoid duplicate submissions.

## Official documentation

- [Nuxt 4: Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
