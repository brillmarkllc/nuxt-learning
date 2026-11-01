# 73. Posting events

Course section: 6: Practice app: EventO

The event form can now send its values to the protected POST endpoint. Keep the visitor on the form if saving fails, so their work is available for retry.

**Additional walkthrough:** In `app/pages/events/create.vue`, keep `form` and the auth middleware. Remove `preview` and replace the old `submit` function with these setup lines:

```js
const pending = ref(false)
const message = ref('')
const fieldErrors = ref({})
const toast = useToast()

async function submit() {
  if (pending.value) return
  pending.value = true
  message.value = ''
  fieldErrors.value = {}
  try {
    await $fetch('/api/events', {
      method: 'POST',
      body: { title: form.title.trim(), content: form.content.trim(), date: form.date || null }
    })
    clearNuxtData(key => key.startsWith('my-events:'))
    toast.add({ title: 'Event created', color: 'success' })
    await navigateTo('/')
  } catch (error) {
    fieldErrors.value = error.data?.data?.fields || {}
    message.value = error.response?.status === 401
      ? 'Your session has ended. Sign in again before saving.'
      : 'Could not save this event. Check the details and retry.'
  } finally {
    pending.value = false
  }
}
```

Replace the preview button with:

```vue
<button type="submit" :disabled="pending">{{ pending ? 'Saving…' : 'Create event' }}</button>
```

Remove the `<pre>` preview. After the form, add:

```vue
<p role="status">{{ message }}</p>
<ul v-if="Object.keys(fieldErrors).length" role="alert">
  <li v-for="(text, field) in fieldErrors" :key="field">{{ text }}</li>
</ul>
```

With the session and database ready, create a fictional “Book club meetup”. Successful saving returns home and shows an “Event created” notification. This **toast** is supplied by Nuxt UI; it requires the `<UApp>` wrapper from topic 56.

Check the database: the event should have the current user's owner ID and `pending` status. The home list is added in topic 76, so a saved event is not yet displayed there.

The button is disabled while the request runs. Failure leaves the fields untouched. Clearing event-data keys after success ensures an existing list will reload when revisited. The request deliberately sends no owner or status; the server controls both.

## Official documentation

- [Nuxt 4: Data fetching — $fetch actions](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Nuxt 4: clearNuxtData](https://nuxt.com/docs/4.x/api/utils/clear-nuxt-data)
- [Nuxt UI: useToast](https://ui.nuxt.com/docs/composables/use-toast)
- [Nuxt 4: API route protection](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#protect-api-routes)

[Back to course index](00-course-index.md)
