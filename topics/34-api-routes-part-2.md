# 34. API Routes part 2

Course section: 3: The server

## What you will learn

Use your API as a bridge to another data source.

In this lesson, **API** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **API:** An interface through which code requests data or actions from another part of a system.
- **Endpoint:** A URL and HTTP method that a server handles, such as POST /api/events.
- **$fetch:** Nuxt’s HTTP request helper, useful inside server handlers and user-triggered actions.
- **useFetch:** An SSR-aware Nuxt composable for loading an HTTP resource and tracking its result.
- **Response:** The result a server sends back after handling a request.

## What this topic includes

Run JSON Server from lesson 30. Add runtimeConfig.employeeApiBase: "http://localhost:3001" to nuxt.config.ts; this setting stays server-side.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. API organization

Organize collection handlers together under a resource folder.

**Where:** Project structure

```text
server/api/employees/
  index.get.js
  index.post.js
  [id].get.js
```

### 2. Server-side $fetch

A server-side request forwards the data source result to your own frontend API.

**Where:** server/api/employees/index.get.js

```js
export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  return await $fetch(`${config.employeeApiBase}/employees`)
})
```

### 3. Returned responses

Return only the shape the page needs instead of exposing the whole upstream response.

**Where:** server/api/employees/count.get.js

```js
export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const employees = await $fetch(`${config.employeeApiBase}/employees`)
  return { total: employees.length }
})
```
## Simple example

The page requests `/api/employees`; its handler requests the local mock API.

## Remember

- Server handlers use ordinary request helpers rather than page composables.

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
