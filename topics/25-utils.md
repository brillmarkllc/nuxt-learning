# 25. Utils

Course section: 2: The Pages

## What you will learn

Share small general-purpose functions.

In this lesson, **Utility** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Utility:** A small reusable helper function, often independent of Vue.
- **Export:** Making a value or function available for another file to import.
- **Composable:** A function that packages reusable Vue or Nuxt logic, often using reactive state.
- **State:** Data the application remembers and uses to decide what to display.

## What this topic includes

This helper is pure JavaScript and can be reused from a page.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Utils directory

An exported utility under app/utils is eligible for Nuxt auto-import discovery.

**Where:** app/utils/formatName.js

```js
export const formatName = (first, last) => `${first} ${last}`.trim()
```

### 2. Exported helpers

Use the exported helper in a template without repeating its string manipulation.

**Where:** app/pages/index.vue

```vue
<template><p>{{ formatName('Ada', 'Lovelace') }}</p></template>
```

### 3. Ordinary JavaScript

Plain JavaScript utilities do not require refs, a component, or the Nuxt application context.

**Where:** app/utils/initials.js

```js
export function initials(name) {
  return String(name).trim().split(/\s+/).filter(Boolean).map(word => word[0]).join('').toUpperCase()
}
```
## Simple example

A `formatName(first, last)` helper combines and trims name parts.

## Remember

- Utilities need not depend on Vue reactivity or component lifecycle.

## Best practices and edge cases

- Auto-import discovery follows configured directories. Re-export nested composables from a scanned entry file when needed.
- Call Nuxt composables in a supported Nuxt context, usually setup, a plugin, or route middleware. A generic asynchronous callback can lose that context.
- Keep per-user reactive state out of module-level variables on the server; use SSR-aware state management when sharing state.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Composables](https://nuxt.com/docs/4.x/directory-structure/app/composables)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
