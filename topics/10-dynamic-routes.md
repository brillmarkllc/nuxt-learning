# 10. Dynamic routes

Course section: 2: The Pages

## What you will learn

Match URLs containing variable values.

In this lesson, **Dynamic segment** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Dynamic segment:** A variable part of a URL path, represented by a filename such as [id].vue.
- **Parameter:** A value extracted from a matched route, such as 42 from /users/42.
- **Route:** A rule connecting a URL path to a page or server handler.
- **Record:** One stored item, such as an employee or event.

## What this topic includes

Use separate routes below; values in square brackets come from the URL.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Bracketed filenames

Open /users/42. The bracketed filename matches a changing ID.

**Where:** app/pages/users/[id].vue

```vue
<script setup>
const route = useRoute()
</script>
<template><h1>User {{ route.params.id }}</h1></template>
```

### 2. User IDs

IDs arrive as URL input. This example accepts only digits and returns 404 for /member/abc.

**Where:** app/pages/member/[id].vue

```vue
<script setup>
definePageMeta({ validate: route => /^\d+$/.test(String(route.params.id)) })
</script>
<template><h1>Valid numeric member ID</h1></template>
```

### 3. Dynamic path segments

For /teams/5/users/42, both dynamic segments are available by name.

**Where:** app/pages/teams/[teamId]/users/[userId].vue

```vue
<script setup>
const route = useRoute()
</script>
<template><p>Team {{ route.params.teamId }}, user {{ route.params.userId }}</p></template>
```
## Simple example

`app/pages/users/[id].vue` matches `/users/42`.

## Remember

- A matching ID is input, not proof that a database record exists.

## Best practices and edge cases

- Use app/pages in the Nuxt 4 application structure. A parent page that displays nested child pages needs a NuxtPage outlet.
- A page should have a single root element for page transitions. HTML comments also count when diagnosing multiple-root issues.
- Use Nuxt’s useRoute rather than importing it directly from vue-router; route updates are coordinated with Nuxt page rendering.
- Read a changing route parameter reactively. A value copied once during setup may become stale when navigation reuses a component.

## Practical tip

Optional parameters use double brackets, such as [[slug]].vue. Choose deliberately whether the route should also match without that segment.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
