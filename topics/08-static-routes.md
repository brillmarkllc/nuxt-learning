# 08. Static routes

Course section: 2: The Pages

## What you will learn

Create pages with fixed URLs.

In this lesson, **Static route** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Static route:** A route with a fixed path, such as /about; this does not mean the page is pre-rendered.
- **Page:** A Vue component displayed at a particular route.
- **NuxtPage:** Nuxt’s component for displaying the page that matches the current route.
- **Template:** The markup describing what a Vue component displays; the course also uses this word for starter project files.

## What this topic includes

Use all three files together to enable these pages.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Home page

Open / to see the home heading.

**Where:** app/pages/index.vue

```vue
<template><h1>Home page</h1></template>
```

### 2. Named pages

Open /contact to see a fixed named route.

**Where:** app/pages/contact.vue

```vue
<template><h1>Contact us</h1></template>
```

### 3. NuxtPage outlet

NuxtPage renders the current page. Without it, the files may exist but their page UI will not appear here.

**Where:** app/app.vue

```vue
<template><NuxtPage /></template>
```
## Simple example

Use `<NuxtPage />` in the app entry and create `app/pages/contact.vue`.

## Remember

- A page file needs component content; check the outlet if the starter screen remains visible.

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
