# 07. How routes work

Course section: 2: The Pages

## What you will learn

Understand how page files become URLs.

In this lesson, **Route** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Route:** A rule connecting a URL path to a page or server handler.
- **File-based routing:** Creating routes from page filenames and folders instead of configuring each route manually.
- **Page:** A Vue component displayed at a particular route.
- **URL:** The address of a page or resource, such as /users/42?tab=posts.
- **NuxtPage:** Nuxt’s component for displaying the page that matches the current route.

## What this topic includes

Create app/app.vue containing <template><NuxtPage /></template>. Each page below is a separate file.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Pages directory

Placing a Vue file under pages makes it a route: this file creates /about.

**Where:** app/pages/about.vue

```vue
<template><h1>About</h1></template>
```

### 2. Index files

The root index file creates the home route /.

**Where:** app/pages/index.vue

```vue
<template><h1>Welcome home</h1></template>
```

### 3. Directory-to-path mapping

Folders add URL segments: this file creates /users/profile.

**Where:** app/pages/users/profile.vue

```vue
<template><h1>User profile</h1></template>
```
## Simple example

`app/pages/about.vue` represents `/about` in the course structure.

## Remember

- Nuxt generates routing configuration using Vue Router underneath.

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
