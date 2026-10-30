# 31. Fetching data

Course section: 3: The server

## What you will learn

Choose a data-fetching approach for Nuxt pages.

In this lesson, **useFetch** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **useFetch:** An SSR-aware Nuxt composable for loading an HTTP resource and tracking its result.
- **useAsyncData:** An SSR-aware Nuxt composable for managing data returned by an asynchronous function.
- **$fetch:** Nuxt’s HTTP request helper, useful inside server handlers and user-triggered actions.
- **Payload:** Data sent with a request or transferred from server rendering to the browser.
- **Asynchronous:** Work that finishes later, such as a network request, without completing immediately.

## What this topic includes

For /api/employees, create a GET handler that returns [{ id: 1, name: "Ada" }]. Page script fragments are alternatives, not one combined script.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. $fetch

Use $fetch for an action triggered later by the user, such as manually loading records.

**Where:** app/pages/employees.vue — script setup

```js
const employees = ref([])
async function loadEmployees() {
  employees.value = await $fetch('/api/employees')
}
// Connect to a button: <button @click="loadEmployees">Load</button>
```

### 2. UseFetch

useFetch loads initial page data and exposes request state.

**Where:** app/pages/employees.vue

```vue
<script setup>
const { data: employees, status, error } = await useFetch('/api/employees')
</script>
<template><div><p v-if="error">Load failed</p><p v-else-if="status === 'pending'">Loading…</p><pre v-else>{{ employees }}</pre></div></template>
```

### 3. UseAsyncData

useAsyncData can wrap a custom fetcher under an explicit state key.

**Where:** app/pages/employees.vue — script setup

```js
const { data: names } = await useAsyncData('employee-names', async () => {
  const employees = await $fetch('/api/employees')
  return employees.map(employee => employee.name)
})
```

### 4. SSR data transfer

Nuxt transfers successful SSR data in its payload so hydration can reuse it instead of immediately requesting it again.

**Where:** app/pages/employees.vue — script setup

```js
const { data } = await useAsyncData('initial-employees', () => $fetch('/api/employees'))
// Avoid replacing this with a bare top-level await $fetch(...) for initial page data.
```
## Simple example

`const { data, error } = await useFetch('/api/employees')` loads page data.

## Remember

- The transcript sometimes garbles API names; useAsyncData is the intended helper, not useAsyncFetch.

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
