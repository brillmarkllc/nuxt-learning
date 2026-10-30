# 23. Composables

Course section: 2: The Pages

## What you will learn

Reuse reactive Vue logic in functions.

In this lesson, **Composable** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Composable:** A function that packages reusable Vue or Nuxt logic, often using reactive state.
- **Reactive value:** A value Vue tracks so dependent UI or calculations can update when it changes.
- **State:** Data the application remembers and uses to decide what to display.
- **Auto-import:** Nuxt making supported components or helpers available without a manual import statement.

## What this topic includes

Create the composable once, then use it inside a component’s script setup.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Composables directory

Files in this directory expose reusable reactive logic through auto-imports.

**Where:** app/composables/useCounter.js

```js
export function useCounter() {
  const count = ref(0)
  const increment = () => { count.value++ }
  return { count, increment }
}
```

### 2. Reactive state

ref holds reactive state, and Vue unwraps it automatically in templates.

**Where:** app/pages/counter.vue

```vue
<script setup>
const { count, increment } = useCounter()
</script>
<template><button @click="increment">Count: {{ count }}</button></template>
```

### 3. Reusable functions

Calling this composable twice creates independent state because each call creates its own ref.

**Where:** app/pages/two-counters.vue

```vue
<script setup>
const first = useCounter()
const second = useCounter()
</script>
<template><div><button @click="first.increment">{{ first.count.value }}</button><button @click="second.increment">{{ second.count.value }}</button></div></template>
```
## Simple example

A `useCounter` composable returns a counter and an increment function.

## Remember

- Decide whether state should be independent for each caller or shared.

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
