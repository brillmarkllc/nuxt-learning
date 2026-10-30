# 53. Prefetching

Course section: 4: Building

## What you will learn

Prepare linked pages before the user visits them.

In this lesson, **Prefetching** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Prefetching:** Loading likely-needed resources before the user navigates to them.
- **NuxtLink:** Nuxt’s component for linking between pages with router integration.
- **Lazy loading:** Downloading code or another resource only when it is needed.
- **Payload:** Data sent with a request or transferred from server rendering to the browser.

## What this topic includes

Create /reports before using these links. Inspect network requests in a production preview to study prefetching.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. NuxtLink prefetching

NuxtLink can prefetch the destination’s resources before navigation.

**Where:** app/pages/index.vue

```vue
<template><NuxtLink to="/reports">Reports</NuxtLink></template>
```

### 2. Resource loading

Choose interaction as the prefetch trigger for a link rather than loading it as soon as it is visible.

**Where:** app/pages/index.vue

```vue
<template><NuxtLink to="/reports" prefetch-on="interaction">Reports</NuxtLink></template>
```

### 3. Per-link controls

Disable prefetch only for this particular link when eager loading is not useful.

**Where:** app/pages/index.vue

```vue
<template><NuxtLink to="/reports" :prefetch="false">Reports</NuxtLink></template>
```
## Simple example

Disable prefetch on a rarely used link when early loading is unnecessary.

## Remember

- Prefetching trades network work now for potentially faster navigation later.

## Best practices and edge cases

- Use NuxtLink for internal navigation. Prefetching may improve navigation speed but increases early network work.
- Tune prefetch behavior for large or rarely visited destinations and check behavior in a production build.
- Use appropriate external-link handling for off-site URLs and provide meaningful link labels.

## Official documentation

- [Nuxt 4: Nuxt Link](https://nuxt.com/docs/4.x/api/components/nuxt-link)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
