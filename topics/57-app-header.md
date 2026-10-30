# 57. App Header

Course section: 5: Authentication

## What you will learn

Create a shared navigation header.

In this lesson, **Component** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Component:** A reusable piece of UI containing markup, behavior, and optional styles.
- **Layout:** A reusable page frame, such as a sidebar and header around changing page content.
- **NuxtLink:** Nuxt’s component for linking between pages with router integration.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.

## What this topic includes

Requires the Nuxt UI setup in lesson 56. Render AppHeader in your default layout.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Nuxt UI components

Use a Nuxt UI button as an internal navigation link.

**Where:** app/components/AppHeader.vue

```vue
<template><header><UButton to="/">EventO</UButton></header></template>
```

### 2. Navigation links

A semantic navigation element groups links to existing pages.

**Where:** app/components/AppHeader.vue

```vue
<template><header><nav aria-label="Main"><NuxtLink to="/">Home</NuxtLink><NuxtLink to="/events/create">Create event</NuxtLink></nav></header></template>
```

### 3. Header layout

The header remains shared while the slot receives different page contents.

**Where:** app/layouts/default.vue

```vue
<template><div><AppHeader /><main><slot /></main></div></template>
```
## Simple example

Show a brand link, home link, and sign-in entry in a shared header.

## Remember

- Keep navigation consistent across pages that use the same layout.

## Best practices and edge cases

- Use NuxtLink for internal navigation. Prefetching may improve navigation speed but increases early network work.
- Tune prefetch behavior for large or rarely visited destinations and check behavior in a production build.
- Use appropriate external-link handling for off-site URLs and provide meaningful link labels.

## Official documentation

- [Nuxt 4: Nuxt Link](https://nuxt.com/docs/4.x/api/components/nuxt-link)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Nuxt UI setup](https://nuxt.com/modules/ui)

[Back to course index](00-course-index.md)
