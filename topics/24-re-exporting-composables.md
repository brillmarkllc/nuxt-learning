# 24. Re-Exporting composables

Course section: 2: The Pages

## What you will learn

Expose composables stored in subdirectories.

In this lesson, **Export** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Export:** Making a value or function available for another file to import.
- **Re-export:** Exporting something from another file through a shared entry file.
- **Composable:** A function that packages reusable Vue or Nuxt logic, often using reactive state.
- **Auto-import:** Nuxt making supported components or helpers available without a manual import statement.

## What this topic includes

Use these files together to expose a composable stored below the top-level scanned directory.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Auto-import discovery

A top-level entry file is discovered by Nuxt and can re-export nested helpers.

**Where:** app/composables/index.js

```js
export { useEventTitle } from './events/useEventTitle'
```

### 2. Nested files

The nested file contains the implementation but should be exposed through the top-level export.

**Where:** app/composables/events/useEventTitle.js

```js
export const useEventTitle = () => ref('Untitled event')
```

### 3. Explicit re-exports

The re-export makes useEventTitle available in setup without a manual import.

**Where:** app/pages/index.vue

```vue
<script setup>
const title = useEventTitle()
</script>
<template><input v-model="title" aria-label="Event title" /></template>
```
## Simple example

Re-export a nested helper from `app/composables/index.js`.

## Remember

- Do not assume every nested file is automatically discovered by the course configuration.

## Best practices and edge cases

- Auto-import discovery follows configured directories. Re-export nested composables from a scanned entry file when needed.
- Call Nuxt composables in a supported Nuxt context, usually setup, a plugin, or route middleware. A generic asynchronous callback can lose that context.
- Keep per-user reactive state out of module-level variables on the server; use SSR-aware state management when sharing state.

## Practical tip

Re-export deliberately: export { useExample } from "./nested/useExample" in a scanned composables entry file.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Composables](https://nuxt.com/docs/4.x/directory-structure/app/composables)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
