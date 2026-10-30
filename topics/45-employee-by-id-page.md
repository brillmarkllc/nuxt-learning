# 45. Employee by ID page

Course section: 3: The server

## What you will learn

Display a single employee record.

In this lesson, **Parameter** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Parameter:** A value extracted from a matched route, such as 42 from /users/42.
- **Record:** One stored item, such as an employee or event.
- **useFetch:** An SSR-aware Nuxt composable for loading an HTTP resource and tracking its result.
- **404:** The HTTP status indicating that the requested resource was not found.

## What this topic includes

Use the mock API and private employeeApiBase setting from lesson 34. Create the GET proxy below before opening the page.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Route ID

Read the ID from the current route instead of hardcoding a record.

**Where:** app/pages/employees/[id].vue — script setup

```js
const route = useRoute()
const id = computed(() => String(route.params.id))
```

### 2. Fetching details

The backend fetches one employee and preserves a missing-record response from the upstream API.

**Where:** server/api/employees/[id].get.js

```js
export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  if (!id || !/^\d+$/.test(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  const config = useRuntimeConfig(event)
  return await $fetch(`${config.employeeApiBase}/employees/${id}`)
})
```

### 3. Rendering fields

Load the record, show an error when needed, and render fields only after data exists.

**Where:** app/pages/employees/[id].vue

```vue
<script setup>
const route = useRoute()
const { data: employee, error } = await useFetch(() => `/api/employees/${encodeURIComponent(String(route.params.id))}`)
</script>
<template><main><p v-if="error">Employee unavailable</p><article v-else-if="employee"><h1>{{ employee.name }}</h1><p>{{ employee.position }}</p></article></main></template>
```

### 4. Edit link

Build an edit link from the loaded record’s ID. Use with the page above.

**Where:** Inside the loaded employee article

```vue
<NuxtLink :to="`/employees/${employee.id}/edit`">Edit this employee</NuxtLink>
```
## Simple example

A details page shows employee 42 and links to its edit page.

## Remember

- Handle a nonexistent employee instead of assuming every ID resolves.

## Best practices and edge cases

- Use app/pages in the Nuxt 4 application structure. A parent page that displays nested child pages needs a NuxtPage outlet.
- A page should have a single root element for page transitions. HTML comments also count when diagnosing multiple-root issues.
- Use Nuxt’s useRoute rather than importing it directly from vue-router; route updates are coordinated with Nuxt page rendering.
- Read a changing route parameter reactively. A value copied once during setup may become stale when navigation reuses a component.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
