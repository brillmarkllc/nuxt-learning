# 78. Deleting events

Course section: 6: Practice app: EventO

Deleting removes the stored event. EventO's example rule allows deletion only after an event is completed. The server enforces that rule even if someone bypasses the button.

**Additional working example:** Create `server/api/events/[id].delete.js`:

```js
import Event from '../../models/Event.js'

export default defineEventHandler(async (event) => {
  const user = await requirePlannerUser(event)
  const id = getRouterParam(event, 'id')
  if (!id || !/^[a-f\d]{24}$/i.test(id)) {
    throw createError({ status: 400, statusText: 'Invalid event ID' })
  }
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const removed = await Event.findOneAndDelete({
    _id: id, owner: user.id, status: 'completed'
  })
  if (!removed) {
    throw createError({ status: 404, statusText: 'Completed event not found' })
  }
  return { deleted: true }
})
```

The database matches the record ID, owner, and allowed status in one operation. A missing, foreign, or still-pending event returns the same 404 response.

In `app/components/MyEvents.vue`, keep the setup and `complete` function from topic 77. Add:

```js
async function remove(item) {
  if (busyId.value) return
  if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return
  busyId.value = item.id
  actionMessage.value = ''
  try {
    await $fetch(`/api/events/${encodeURIComponent(item.id)}`, { method: 'DELETE' })
    await refresh()
  } catch {
    actionMessage.value = 'Could not delete the event. Reload the list and retry.'
  } finally {
    busyId.value = null
  }
}
```

After the completion button inside each event article, add:

```vue
<button v-if="item.status === 'completed'" :disabled="busyId !== null" @click="remove(item)">
  Delete event
</button>
```

`window.confirm` runs only after a browser click, so it is not called during server rendering. Cancelling sends no request. Confirming waits for a successful deletion, then refreshes the list. The shared `busyId` prevents overlapping actions.

## Check the finished flow

Create a disposable event, complete it, cancel deletion once, then confirm deletion. It should disappear and stay absent after a reload. Pending events should offer completion, while completed events offer deletion.

Use two test accounts and try calling the action endpoint with an event ID belonging to the other account. It should return 404 and leave the record unchanged. A signed-out call should return 401. Hiding a button alone would not provide those protections.

Completion and deletion use separate endpoints: PATCH changes status and DELETE removes the record. Keep the field names consistent with the list response (`id`, rather than MongoDB's internal `_id`).

## Official documentation

- [Nuxt 4: Server — method handlers](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Data fetching — mutations and refresh](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Nuxt 4: API route protection](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#protect-api-routes)
- [Mongoose: Query operations](https://mongoosejs.com/docs/queries.html)

[Back to course index](00-course-index.md)
