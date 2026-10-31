# 11. Getting params

Course section: 2: The Pages

An address can carry two kinds of information. In `/books/101?tab=reviews`, `101` is a **route parameter** matched by `[id].vue`. `tab=reviews` is a **query value**, an optional setting after `?`.

**Additional example:** Replace `app/pages/books/[id].vue` from topic 10 with:

```vue
<script setup>
const route = useRoute()
const tab = computed(() =>
  route.query.tab === 'reviews' ? 'reviews' : 'details'
)
</script>

<template>
  <main>
    <h1>Book {{ route.params.id }}</h1>
    <p>Selected section: {{ tab }}</p>
    <NuxtLink :to="{ path: route.path, query: { tab: 'reviews' } }">
      Read reviews
    </NuxtLink>
  </main>
</template>
```

Visit `/books/101`, then click “Read reviews”. The selected section changes from `details` to `reviews`, and the address gains `?tab=reviews`.

`computed` creates a value that is recalculated when the route information changes. The `? ... : ...` expression chooses between two values: use `reviews` only for that exact query value; otherwise use `details`. This also handles missing or unexpected input.

The colon in `:to` tells Vue that the link destination is a JavaScript value rather than plain text. Here it contains the current path and a query setting.

Nuxt supplies `computed` and `useRoute` automatically. Use Nuxt's `useRoute`, not a separate import from `vue-router`. Avoid copying an ID just once with `const id = route.params.id` if it must update during navigation; read it from `route` or use a computed value.

## Official documentation

- [Nuxt 4: useRoute](https://nuxt.com/docs/4.x/api/composables/use-route)
- [Nuxt 4: Pages — navigation](https://nuxt.com/docs/4.x/directory-structure/app/pages#navigation)

[Back to course index](00-course-index.md)
