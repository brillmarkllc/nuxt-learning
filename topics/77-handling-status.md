# 77. Handling status

Course section: 6: Practice app: EventO

An event starts as `pending`. Completing it changes its status to `completed`; the record remains stored. This example allows only that one-way change.

**Additional working example:** Create `server/api/events/[id].patch.js`:

```js
import Event from '../../models/Event.js'

export default defineEventHandler(async (event) => {
  const user = await requirePlannerUser(event)
  const id = getRouterParam(event, 'id')
  if (!id || !/^[a-f\d]{24}$/i.test(id)) {
    throw createError({ status: 400, statusText: 'Invalid event ID' })
  }
  const body = await readBody(event)
  if (body?.status !== 'completed') {
    throw createError({ status: 400, statusText: 'Unsupported status change' })
  }
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const updated = await Event.findOneAndUpdate(
    { _id: id, owner: user.id, status: 'pending' },
    { $set: { status: 'completed' } },
    { returnDocument: 'after', runValidators: true }
  )
  if (!updated) {
    throw createError({ status: 404, statusText: 'Pending event not found' })
  }
  return { id: String(updated._id), status: updated.status }
})
```

The database matches the ID, verified owner, and current status in the same update. This avoids changing someone else's event or repeating a completed transition. `$set` changes just the allowed status. `returnDocument: 'after'` asks for the updated result, and `runValidators` enables update validation.

A missing, foreign, or already completed event returns the same 404 message. The endpoint does not reveal which of those cases occurred.

## Add the completion button

In `app/components/MyEvents.vue`, add inside the existing script:

```js
const busyId = ref(null)
const actionMessage = ref('')
async function complete(id) {
  if (busyId.value) return
  busyId.value = id
  actionMessage.value = ''
  try {
    await $fetch(`/api/events/${encodeURIComponent(id)}`, {
      method: 'PATCH', body: { status: 'completed' }
    })
    await refresh()
  } catch {
    actionMessage.value = 'Could not complete the event. Reload the list and retry.'
  } finally {
    busyId.value = null
  }
}
```

After each event's status paragraph, add:

```vue
<button v-if="item.status === 'pending'" :disabled="busyId !== null" @click="complete(item.id)">
  Mark completed
</button>
```

Add `<p role="status">{{ actionMessage }}</p>` after the event list, inside the section.

Complete one of your pending events. The list should refresh, its status should become `completed`, and the completion button should disappear. It remains completed after reloading. Deletion is a separate operation, added next.

## Official documentation

- [Nuxt 4: Server — methods and request checks](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: API protection](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#protect-api-routes)
- [Nuxt 4: Data fetching — refreshing data](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Mongoose: findOneAndUpdate](https://mongoosejs.com/docs/tutorials/findoneandupdate.html)
- [Mongoose: Update validators](https://mongoosejs.com/docs/validation.html#update-validators)

[Back to course index](00-course-index.md)
