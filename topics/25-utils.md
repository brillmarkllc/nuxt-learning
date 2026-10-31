# 25. Utils

Course section: 2: The Pages

A **utility** is a small reusable function, such as formatting a name. It usually takes an input and returns a result without keeping page state.

**Additional example:** Create `app/utils/formatName.js`:

```js
export function formatName(first, last) {
  return `${first} ${last}`.trim()
}
```

Create `app/pages/member.vue`:

```vue
<template>
  <main><h1>{{ formatName('Asha', 'Patel') }}</h1></main>
</template>
```

Visit `/member`: the heading should be “Asha Patel”. The text between backticks combines the two inputs with a space. `${...}` inserts each value, and `trim()` removes spare spaces at either end. This helper expects text inputs.

Nuxt discovers exports at the top level of `app/utils/`, so no manual import is needed in the page. Nested files follow the same re-export rules as composables.

Use `app/composables/` for reusable Vue behaviour and `app/utils/` for general helpers. This distinction keeps files easier to find; the folder does not change how JavaScript functions work.

These app utilities are not automatically imported into server handlers. Server helpers belong in `server/utils/`, covered in topic 41.

## Official documentation

- [Nuxt 4: Utils](https://nuxt.com/docs/4.x/directory-structure/app/utils)

[Back to course index](00-course-index.md)
