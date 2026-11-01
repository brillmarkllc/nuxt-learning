# 76. Showing the events at home

Course section: 6: Practice app: EventO

The event list should contain only the signed-in person's records. The server applies that filter; a browser-supplied user ID must not decide whose events are returned.

**Additional working example:** Create `server/api/events/index.get.js`:

```js
import Event from '../../models/Event.js'

export default defineEventHandler(async (event) => {
  const user = await requirePlannerUser(event)
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const rows = await Event.find({ owner: user.id }).sort({ createdAt: -1 }).lean()
  return rows.map(row => ({
    id: String(row._id), title: row.title, content: row.content,
    date: row.date, status: row.status
  }))
})
```

`find` selects matching records. `owner: user.id` restricts them to the verified user. `sort` puts the newest first; `lean` requests plain objects instead of full Mongoose documents. The final mapping returns only display fields.

Create `app/components/MyEvents.vue`:

```vue
<script setup>
const { user } = useUserSession()
const { data: events, status, error, refresh } = await useFetch('/api/events', {
  key: () => `my-events:${user.value?.id || 'guest'}`,
  default: () => []
})
</script>

<template>
  <section>
    <h2>My events</h2>
    <button :disabled="status === 'pending'" @click="() => refresh()">Reload events</button>
    <p v-if="status === 'pending'">Loading events…</p>
    <p v-else-if="error">Could not load your events. Check your session and retry.</p>
    <p v-else-if="!events.length">No events yet. Create your first meetup.</p>
    <ul v-else>
      <li v-for="item in events" :key="item.id">
        <article>
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
          <p>{{ item.date || 'No date set' }}</p>
          <p>Status: {{ item.status }}</p>
        </article>
      </li>
    </ul>
  </section>
</template>
```

In the signed-in section of `app/pages/index.vue`, replace the “next topic” placeholder with:

```vue
<MyEvents :key="user.id" />
```

Keep it inside `v-if="loggedIn"`. The component is recreated when the account ID changes, and its data key also includes that ID. Logout and event creation clear matching data keys as established earlier.

Create an event, return home, and check that it appears. Use Reload events after any external change. A successful empty list shows its own message; loading and failures have different messages.

Test with two accounts: each should see only its own events. During server rendering, the relative `useFetch('/api/events')` call forwards the request context needed for the session. A plain top-level server-side `$fetch` does not automatically provide the same cookie forwarding.

This small app loads all of a user's events. A larger list needs pagination, meaning loading a limited page of records at a time.

## Official documentation

- [Nuxt 4: Data fetching — state and cookies](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Nuxt 4: Protect API routes](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#protect-api-routes)
- [Mongoose: Queries](https://mongoosejs.com/docs/queries.html)

[Back to course index](00-course-index.md)
