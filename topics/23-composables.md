# 23. Composables

Course section: 2: The Pages

A **composable** is a function that packages reusable Vue or Nuxt behaviour. Components reuse visible pieces; composables reuse behaviour such as a counter or a shared preference.

**Additional working example:** Create `app/composables/useReadingCount.js`:

```js
export function useReadingCount() {
  const count = ref(0)
  function addBook() {
    count.value++
  }
  return { count, addBook }
}
```

Create `app/pages/reading.vue`:

```vue
<script setup>
const { count, addBook } = useReadingCount()
</script>

<template>
  <main>
    <h1>Books read: {{ count }}</h1>
    <button @click="addBook">Finished a book</button>
  </main>
</template>
```

Visit `/reading` and click the button. Each click adds one. `ref(0)` creates a value Vue watches for changes. JavaScript reads or changes it through `.value`; the template unwraps it automatically. `++` adds one. `return` exposes the value and function, and `{ count, addBook }` takes those named parts from the result.

Nuxt discovers the exported function in `app/composables/`. The folder does not itself make anything reactive; `ref` does that.

Each call creates its own counter because `ref` is inside the function. The counter is not saved to a database and resets when this page instance is recreated.

For state shared between components, Nuxt provides `useState` with a shared key. Do not move a user's `ref` outside the function to share it: server code could then share that value between visitors. Call composables from a supported place such as `<script setup>`, rather than arbitrary delayed callbacks.

## Official documentation

- [Nuxt 4: Composables](https://nuxt.com/docs/4.x/directory-structure/app/composables)
- [Nuxt 4: State management](https://nuxt.com/docs/4.x/getting-started/state-management)

[Back to course index](00-course-index.md)
