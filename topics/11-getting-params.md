# 11. Getting params

Course section: 2: The Pages

## What you will learn

Read dynamic and query values from the active route.

In this lesson, **useRoute** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **useRoute:** Nuxt’s composable for reading the current route and its parameters.
- **Parameter:** A value extracted from a matched route, such as 42 from /users/42.
- **Query string:** Optional URL values after ?, such as ?page=2&sort=name.
- **Reactive value:** A value Vue tracks so dependent UI or calculations can update when it changes.

## What this topic includes

Open /users/42?tab=posts&page=2 when using these snippets in app/pages/users/[id].vue. Script snippets belong inside <script setup>.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. UseRoute

Nuxt supplies useRoute automatically; do not import it from vue-router.

**Where:** app/pages/users/[id].vue — script setup

```js
const route = useRoute()
```

### 2. Params

A computed value stays up to date if this page instance is reused for another user.

**Where:** app/pages/users/[id].vue — script setup

```js
const route = useRoute()
const userId = computed(() => String(route.params.id))
```

### 3. Query strings

Query values need defaults and validation. This example converts page to a positive integer.

**Where:** app/pages/users/[id].vue — script setup

```js
const route = useRoute()
const page = computed(() => {
  const number = Number(route.query.page ?? 1)
  return Number.isInteger(number) && number > 0 ? number : 1
})
```

### 4. Script and template access

The script creates tab; the template can read tab and the current route directly.

**Where:** app/pages/users/[id].vue

```vue
<script setup>
const route = useRoute()
const tab = computed(() => String(route.query.tab ?? 'overview'))
</script>
<template><p>User {{ $route.params.id }} — tab: {{ tab }}</p></template>
```
## Simple example

For `/users/42?tab=posts`, read `useRoute().params.id` and `useRoute().query.tab`.

## Remember

- URL values need validation before use in queries or calculations.

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
