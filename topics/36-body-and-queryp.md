# 36. Body and QueryP

Course section: 3: The server

A **query string** carries values in the address, such as `/api/search?name=Asha`. A **request body** carries submitted content separately from the address, such as the fields in a POST request.

Use query values for searches and filters. Use a body for submitted records. Both are visitor input and need checks.

**Additional example:** Create `server/api/search.get.js`:

```js
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const name = typeof query.name === 'string' ? query.name.trim() : ''
  return { searchedFor: name }
})
```

Visit `/api/search?name=Asha`. The response should contain `"searchedFor":"Asha"`. `typeof` checks that the value is text; repeated query fields can produce another shape, so this example falls back to empty text.

The POST handler from topic 33 uses:

```js
const body = await readBody(event)
```

That line belongs inside an asynchronous server handler. Reading a body is not the same as validating its fields, and GET handlers should use query values instead of `readBody`.

## Send a body from a page

Create `app/pages/send-message.vue`:

```vue
<script setup>
const message = ref('')
async function send() {
  try {
    const result = await $fetch('/api/message', {
      method: 'POST', body: { message: 'Hello, bookshop' }
    })
    message.value = result.received.message
  } catch {
    message.value = 'The message could not be sent.'
  }
}
</script>

<template>
  <main>
    <button @click="send">Send example</button>
    <p aria-live="polite">{{ message }}</p>
  </main>
</template>
```

With `server/api/message.post.js` from topic 33 present, open `/send-message` and click the button. “Hello, bookshop” should appear. `$fetch` encodes the object as JSON and reads the JSON response for you.

## Official documentation

- [Nuxt 4: Server — body and query handling](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Data fetching — $fetch](https://nuxt.com/docs/4.x/getting-started/data-fetching#fetch)

[Back to course index](00-course-index.md)
