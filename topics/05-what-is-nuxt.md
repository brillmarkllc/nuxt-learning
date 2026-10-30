# 05. What is NUXT ?

Course section: 1: Introduction

## What you will learn

Understand Nuxt as a framework built around Vue.

In this lesson, **Nuxt** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Nuxt:** A framework built on Vue that provides page routing, rendering, and server tools.
- **Vue:** A JavaScript framework for building interfaces from reusable components.
- **Framework:** A set of tools and conventions that helps you organize and build an application.
- **SSR:** Server-side rendering: creating a page’s initial HTML on the server.
- **Hydration:** Vue connecting JavaScript behavior to HTML that the server already rendered.

## What this topic includes

The examples show the main jobs Nuxt handles. Create app/app.vue with a NuxtPage outlet when using pages.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. File-based routing

A file creates /about without manually registering a route.

**Where:** app/pages/about.vue

```vue
<template><h1>About this application</h1></template>
```

### 2. Rendering

The heading is rendered on the server; the button becomes interactive after hydration.

**Where:** app/pages/index.vue

```vue
<script setup>
const count = ref(0)
</script>
<template><main><h1>SSR counter</h1><button @click="count++">{{ count }}</button></main></template>
```

### 3. Client/server integration

This page reads JSON from server/api/hello.get.js, whose example is in lesson 1.

**Where:** app/pages/server-message.vue

```vue
<script setup>
const { data } = await useFetch('/api/hello')
</script>
<template><p>{{ data?.message }}</p></template>
```

### 4. Full-stack features

Backend logic lives next to frontend code. Visiting /api/time returns server-generated data.

**Where:** server/api/time.get.js

```js
export default defineEventHandler(() => ({ generatedAt: new Date().toISOString() }))
```
## Simple example

A Vue profile component becomes a routed page in a Nuxt application.

## Remember

- Nuxt adds conventions and server capabilities; Vue knowledge still matters.

## Best practices and edge cases

- Nuxt combines Vue with routing, auto-imports, rendering, and a server engine. Learn which code executes on the server and which also reaches the browser.
- Prefer framework conventions first: pages for routes, components for UI, and server handlers for private operations.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Introduction](https://nuxt.com/docs/4.x/getting-started/introduction)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
