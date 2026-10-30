# 46. Deleting employees

Course section: 3: The server

## What you will learn

Remove an employee through an API request.

In this lesson, **DELETE** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **DELETE:** An HTTP method used to request removal of a resource.
- **Endpoint:** A URL and HTTP method that a server handles, such as POST /api/events.
- **Record:** One stored item, such as an employee or event.
- **HTTP status:** A response number describing an outcome, such as 200 for success or 404 for missing content.

## What this topic includes

Use the JSON Server setup and employeeApiBase setting from lesson 34. These are local practice CRUD endpoints, without production authentication.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. DELETE endpoint

Validate the target ID, await the upstream deletion, and return an explicit result.

**Where:** server/api/employees/[id].delete.js

```js
export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  if (!id || !/^\d+$/.test(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  const config = useRuntimeConfig(event)
  await $fetch(`${config.employeeApiBase}/employees/${id}`, { method: 'DELETE' })
  return { deleted: true }
})
```

### 2. ID input

URL-encode an ID before interpolating it into a request path; the server validates it too.

**Where:** A page — script setup

```js
async function removeById(id) {
  return await $fetch(`/api/employees/${encodeURIComponent(String(id))}`, { method: 'DELETE' })
}
```

### 3. Error handling

Failed deletions keep the user on the page with a retry message.

**Where:** A page — script setup

```js
const errorMessage = ref('')
async function removeEmployee(id) {
  try { await $fetch(`/api/employees/${encodeURIComponent(String(id))}`, { method: 'DELETE' }) }
  catch { errorMessage.value = 'Deletion failed. Please try again.' }
}
```

### 4. Navigation

Navigate only after deletion succeeds. Call this from a clearly labeled Delete button.

**Where:** A page — script setup

```js
async function removeAndLeave(id) {
  await $fetch(`/api/employees/${encodeURIComponent(String(id))}`, { method: 'DELETE' })
  await navigateTo('/employees')
}
```
## Simple example

Delete a selected employee, then return to the list after success.

## Remember

- Deletion changes stored data; show clear intent and handle failures.

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
