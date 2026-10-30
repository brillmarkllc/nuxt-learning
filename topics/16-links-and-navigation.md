# 16. Links and Navigation

Course section: 2: The Pages

## What you will learn

Move between pages using Nuxt navigation.

In this lesson, **NuxtLink** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **NuxtLink:** Nuxt’s component for linking between pages with router integration.
- **navigateTo:** A Nuxt helper for navigating or redirecting to another location.
- **Route:** A rule connecting a URL path to a page or server handler.
- **Redirect:** Sending a visitor or request to another location.

## What this topic includes

Create the destination pages before clicking the links. The examples are independent page contents.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. NuxtLink

NuxtLink performs internal navigation without a full browser reload.

**Where:** app/pages/index.vue

```vue
<template><NuxtLink to="/about">Read about us</NuxtLink></template>
```

### 2. Internal links

An object destination can include a query string without manual URL concatenation.

**Where:** app/pages/index.vue

```vue
<template><NuxtLink :to="{ path: '/users', query: { page: 2 } }">Users page 2</NuxtLink></template>
```

### 3. Programmatic navigation

A button can navigate after an action finishes. Await navigation when later work depends on it.

**Where:** app/pages/index.vue

```vue
<script setup>
async function openEvents() { await navigateTo('/events') }
</script>
<template><button @click="openEvents">View events</button></template>
```
## Simple example

`<NuxtLink to="/users">Users</NuxtLink>` opens the users page.

## Remember

- Return or await navigation where the surrounding flow depends on it.

## Best practices and edge cases

- Return navigateTo or abortNavigation from middleware when navigation should stop or redirect.
- Use the to and from arguments inside route middleware instead of useRoute. Guard against redirects back to the same destination.
- Initial route middleware can execute during SSR and again during hydration. Keep repeated work and browser-only APIs under control.
- A navigation guard does not secure an API: check authentication and authorization in each protected server operation.

## Official documentation

- [Nuxt 4: Routing](https://nuxt.com/docs/4.x/getting-started/routing)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
