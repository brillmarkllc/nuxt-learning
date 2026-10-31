# 24. Re-Exporting composables

Course section: 2: The Pages

Nuxt scans the top level of `app/composables/` by default. If you organise functions into subfolders, expose them through a file Nuxt does scan. This is called a **re-export**: making another file's export available through a shared entry point.

**Additional example:** Create `app/composables/books/useReadingGoal.js`:

```js
export function useReadingGoal() {
  return ref(12)
}
```

Create `app/composables/index.js`, or add this line if it already exists:

```js
export { useReadingGoal } from './books/useReadingGoal.js'
```

Create `app/pages/goal.vue`:

```vue
<script setup>
const goal = useReadingGoal()
</script>

<template>
  <main>
    <h1>Reading goal: {{ goal }}</h1>
    <button @click="goal++">Add one book</button>
  </main>
</template>
```

At `/goal`, the starting goal is 12 and the button increases it. The nested file holds the behaviour; `index.js` makes its name discoverable. `export` means other files can use the function, and `./` starts a path from the current folder.

If the editor cannot find the function, check its spelling and re-export path, then start `npm run dev` so Nuxt can refresh its generated import information. Do not edit `.nuxt/imports.d.ts` yourself.

Nuxt also supports configuring deeper directory scans, but a small explicit re-export is often easier to follow.

## Official documentation

- [Nuxt 4: Composables — how files are scanned](https://nuxt.com/docs/4.x/directory-structure/app/composables#how-files-are-scanned)

[Back to course index](00-course-index.md)
