# 36. Body and QueryP

Course section: 3: The server

## What you will learn

Read submitted payloads and URL query values.

In this lesson, **Request body** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Request body:** Data sent inside an HTTP request, often used for form submissions.
- **Query string:** Optional URL values after ?, such as ?page=2&sort=name.
- **POST:** An HTTP method commonly used to create a resource or submit an action.
- **$fetch:** Nuxt’s HTTP request helper, useful inside server handlers and user-triggered actions.
- **await:** JavaScript syntax that waits for a promise to settle inside a supported context.

## What this topic includes

Server examples are independent handlers. Page snippets belong in script setup; connect the named function to a button or form.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. ReadBody

readBody reads the JSON body supplied by a POST request.

**Where:** server/api/echo.post.js

```js
export default defineEventHandler(async event => {
  const body = await readBody(event)
  return { received: body }
})
```

### 2. GetQuery

getQuery reads URL values: /api/search?name=Ada returns the name value.

**Where:** server/api/search.get.js

```js
export default defineEventHandler(event => {
  const query = getQuery(event)
  return { name: typeof query.name === 'string' ? query.name : '' }
})
```

### 3. POST requests

curl sends JSON in a POST body to the echo endpoint above.

**Where:** Terminal

```sh
curl http://localhost:3000/api/echo -X POST -H 'Content-Type: application/json' -d '{"name":"Ada"}'
```

### 4. $fetch in event handlers

Call $fetch inside a click handler rather than creating a new useFetch instance on every click.

**Where:** A page — script setup

```js
const result = ref(null)
async function sendExample() {
  result.value = await $fetch('/api/echo', { method: 'POST', body: { name: 'Ada' } })
}
```
## Simple example

An API handler reads `await readBody(event)` and `getQuery(event)`.

## Remember

- Body fields and query parameters are separate input channels and both need validation.

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
