# 12. Catch all routes

Course section: 2: The Pages

## What you will learn

Handle multiple path segments with one route.

In this lesson, **Catch-all route** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Catch-all route:** A route using [...slug] to collect multiple path segments.
- **Slug:** A readable URL segment, such as learning-nuxt; catch-all slugs may contain several segments.
- **Array:** An ordered collection of values, such as ['cars', 'blue'].
- **Parameter:** A value extracted from a matched route, such as 42 from /users/42.

## What this topic includes

These examples use app/pages/docs/[...slug].vue. The route /docs/guide/install supplies two segments.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Catch-all filenames

The catch-all filename matches several segments under /docs.

**Where:** app/pages/docs/[...slug].vue

```vue
<template><h1>Documentation page</h1></template>
```

### 2. Slug parameters

Normalize the slug before using it because it can be absent or represented differently at the boundary.

**Where:** app/pages/docs/[...slug].vue — script setup

```js
const route = useRoute()
const segments = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug : slug ? [slug] : []
})
```

### 3. Arrays of segments

Join the array for display while preserving it as structured route data.

**Where:** app/pages/docs/[...slug].vue

```vue
<script setup>
const route = useRoute()
const segments = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug : slug ? [slug] : []
})
</script>
<template><p>Reading: {{ segments.join(' / ') || 'Documentation home' }}</p></template>
```
## Simple example

`app/pages/cars/[...slug].vue` can handle `/cars/electric/blue`.

## Remember

- Treat catch-all parameters as multiple segments rather than assuming a single ID.

## Best practices and edge cases

- Use app/pages in the Nuxt 4 application structure. A parent page that displays nested child pages needs a NuxtPage outlet.
- A page should have a single root element for page transitions. HTML comments also count when diagnosing multiple-root issues.
- Use Nuxt’s useRoute rather than importing it directly from vue-router; route updates are coordinated with Nuxt page rendering.
- Read a changing route parameter reactively. A value copied once during setup may become stale when navigation reuses a component.

## Practical tip

A catch-all parameter is an array of segments. Handle an empty or missing value before calling array methods.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
