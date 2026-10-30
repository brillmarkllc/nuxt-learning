# 37. Posting employees

Course section: 3: The server

## What you will learn

Persist an employee through the server API.

In this lesson, **POST** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **POST:** An HTTP method commonly used to create a resource or submit an action.
- **Record:** One stored item, such as an employee or event.
- **Request:** A message asking a server to return data or perform an action.
- **Response:** The result a server sends back after handling a request.
- **await:** JavaScript syntax that waits for a promise to settle inside a supported context.

## What this topic includes

Run JSON Server and configure the private employeeApiBase setting from lesson 34. Snippets are alternative versions of the POST handler.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Forwarding POST requests

Validate a name, then forward only allowed fields to the mock API.

**Where:** server/api/employees/index.post.js

```js
export default defineEventHandler(async event => {
  const body = await readBody(event)
  if (typeof body?.name !== 'string' || !body.name.trim()) throw createError({ statusCode: 400, statusMessage: 'Name required' })
  const config = useRuntimeConfig(event)
  return await $fetch(`${config.employeeApiBase}/employees`, { method: 'POST', body: { name: body.name.trim() } })
})
```

### 2. Returning results

Set 201 after creation and return the saved record, which includes its generated ID.

**Where:** server/api/employees/index.post.js

```js
export default defineEventHandler(async event => {
  const body = await readBody(event)
  if (typeof body?.name !== 'string' || !body.name.trim()) throw createError({ statusCode: 400, statusMessage: 'Name required' })
  const config = useRuntimeConfig(event)
  const created = await $fetch(`${config.employeeApiBase}/employees`, { method: 'POST', body: { name: body.name.trim() } })
  setResponseStatus(event, 201)
  return created
})
```

### 3. Error handling

A client handler catches a failed API request and keeps the input available for retry.

**Where:** app/pages/employees/new.vue — script setup

```js
const name = ref('Ada')
const message = ref('')
async function save() {
  try { await $fetch('/api/employees', { method: 'POST', body: { name: name.value } }); message.value = 'Saved' }
  catch { message.value = 'Save failed; your input has been kept.' }
}
```
## Simple example

Submit an employee form, save the record in JSON Server, then return the created record.

## Remember

- Await the save before reporting success or redirecting.

## Best practices and edge cases

- Use useFetch for an HTTP resource or useAsyncData with a custom fetcher during setup. Their payload integration avoids repeating the initial request during hydration.
- Use $fetch for user-triggered mutations such as submitting a form, then refresh the affected list after success.
- Pass a getter or computed URL when a request depends on a route parameter. Handle pending, error, empty, and successful results separately.
- Calls sharing a data key share state. Keep their important options consistent and avoid keys that mix results from different users.
- During SSR, relative useFetch requests can forward request context; a plain server-side $fetch does not automatically forward the browser’s cookies.

## Official documentation

- [Nuxt 4: Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
