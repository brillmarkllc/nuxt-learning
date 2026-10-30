# 09. Nested routes

Course section: 2: The Pages

## What you will learn

Organize pages into deeper URL paths.

In this lesson, **Nested route** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Nested route:** A route beneath another path, such as /users/profile.
- **Outlet:** A component location where the active page or nested child page is rendered.
- **NuxtPage:** Nuxt’s component for displaying the page that matches the current route.
- **Layout:** A reusable page frame, such as a sidebar and header around changing page content.

## What this topic includes

These examples demonstrate nested URL paths. A parent component is only needed when you want a shared parent UI.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Subfolders

A subfolder adds the users segment, producing /users/profile.

**Where:** app/pages/users/profile.vue

```vue
<template><h1>Profile</h1></template>
```

### 2. Directory index pages

An index file represents its containing directory, so this page is /users.

**Where:** app/pages/users/index.vue

```vue
<template><h1>All users</h1></template>
```

### 3. Nested URL structure

Each folder becomes another path segment: open /users/settings/security.

**Where:** app/pages/users/settings/security.vue

```vue
<template><h1>Security settings</h1></template>
```
## Simple example

`app/pages/users/profile.vue` maps to `/users/profile`.

## Remember

- Nested URL folders alone do not imply a shared parent page layout.

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
