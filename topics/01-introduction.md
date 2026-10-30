# 01. Introduction

Course section: 1: Introduction

## What you will learn

Learn the course roadmap for building a full-stack Nuxt application.

In this lesson, **Nuxt** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Nuxt:** A framework built on Vue that provides page routing, rendering, and server tools.
- **Vue:** A JavaScript framework for building interfaces from reusable components.
- **Client:** The browser that displays the application and handles user interactions.
- **Server:** The environment that receives requests, accesses private data, and sends responses.
- **SSR:** Server-side rendering: creating a page’s initial HTML on the server.

## What this topic includes

Use a Nuxt project with pages enabled. These are small previews of topics taught later.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Vue basics

Clicking the button changes reactive state and updates its label.

**Where:** app/components/WelcomeCounter.vue

```vue
<script setup>
const count = ref(0)
</script>
<template><button @click="count++">Clicks: {{ count }}</button></template>
```

### 2. Pages and routing

The index page is shown at /. NuxtLink navigates to an about page you create at app/pages/about.vue.

**Where:** app/pages/index.vue

```vue
<template><main><h1>Home</h1><NuxtLink to="/about">About</NuxtLink></main></template>
```

### 3. Server APIs

Visit /api/hello to receive JSON from your own server.

**Where:** server/api/hello.get.js

```js
export default defineEventHandler(() => ({ message: 'Hello from the server' }))
```

### 4. Authentication and databases

With nuxt-auth-utils installed, a signed-in user receives their session user. A signed-out request gets 401. Database-backed accounts are introduced in lessons 60–66.

**Where:** server/api/me.get.js

```js
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  return { user }
})
```
## Simple example

Build an event planner with pages, login, and saved events.

## Remember

- Practice each section before starting the final project.

## Best practices and edge cases

- Use the Node.js version required by the Nuxt installation guide and keep a lockfile so teammates install the same dependencies.
- Run development commands from the project root. Inspect package.json scripts before assuming a build or preview command exists.
- Use the lesson repository branch matching the exercise; do not overwrite an existing project when scaffolding.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Installation](https://nuxt.com/docs/4.x/getting-started/installation)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
