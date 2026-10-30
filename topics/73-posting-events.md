# 73. Posting events

Course section: 6: Practice app: EventO

## What you will learn

Submit an event form to the API.

In this lesson, **POST** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **POST:** An HTTP method commonly used to create a resource or submit an action.
- **$fetch:** Nuxt’s HTTP request helper, useful inside server handlers and user-triggered actions.
- **Toast:** A brief on-screen message confirming an action or reporting a problem.
- **Redirect:** Sending a visitor or request to another location.

## What this topic includes

Requires the POST endpoint from lesson 72. The toast example additionally needs Nuxt UI and <UApp> around your app content. These page script fragments are progressive steps.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. POST request

A mutation uses $fetch inside the submit handler rather than an initial-data composable.

**Where:** A create-event page — script setup

```js
async function createEvent(payload) { return await $fetch('/api/events', { method: 'POST', body: payload }) }
```

### 2. Payload

Send only the editable fields. The server derives owner and status independently.

**Where:** A create-event page — script setup

```js
const form = reactive({ title: '', content: '', date: '' })
function makePayload() { return { title: form.title, content: form.content, date: form.date || null } }
```

### 3. Toast feedback

Show a toast only after saving succeeds; display a failure message otherwise.

**Where:** A create-event page — script setup

```js
const toast = useToast()
async function save(payload) {
  try { await $fetch('/api/events', { method: 'POST', body: payload }); toast.add({ title: 'Event created' }) }
  catch { toast.add({ title: 'Could not create event', color: 'error' }) }
}
```

### 4. Redirect

Disable the submit button while pending and redirect only on success.

**Where:** A create-event page — script setup

```js
const pending = ref(false)
const errorMessage = ref('')
async function submit(payload) {
  if (pending.value) return
  pending.value = true
  try { await $fetch('/api/events', { method: 'POST', body: payload }); await navigateTo('/') }
  catch { errorMessage.value = 'Could not save this event.' }
  finally { pending.value = false }
}
// Button: <button :disabled="pending">Create event</button>
```
## Simple example

Save an event and navigate home only after the request succeeds.

## Remember

- Preserve form input when the request fails so the learner can retry.

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
- [Nuxt UI setup](https://nuxt.com/modules/ui)

[Back to course index](00-course-index.md)
