# 12. Catch all routes

Course section: 2: The Pages

A **catch-all route** lets one page handle several parts of an address. It is useful for a help area with paths such as `/help/orders/delivery`.

**Additional example:** Create `app/pages/help/[...slug].vue`:

```vue
<script setup>
const route = useRoute()
const parts = computed(() => {
  const slug = route.params.slug
  if (Array.isArray(slug)) return slug
  return slug ? [slug] : []
})
</script>

<template>
  <main>
    <h1>Help</h1>
    <p>{{ parts.join(' / ') || 'Help home' }}</p>
  </main>
</template>
```

Visit `/help/orders/delivery`. You should see `orders / delivery`. The three dots in `[...slug]` tell Nuxt to collect the remaining path parts. The name `slug` is simply the name chosen for that value.

An **array** is a list of values. `Array.isArray` checks whether the value is already a list; `[slug]` turns a single value into a list, and `[]` represents an empty one. `join(' / ')` joins its items for display. The `||` supplies “Help home” when there is nothing to display.

A catch-all page does not automatically load an article or return a missing-page error. It matches addresses broadly. If only some help articles exist, your later data-loading code must check for a match and report missing content.

## Official documentation

- [Nuxt 4: Pages — catch-all route](https://nuxt.com/docs/4.x/directory-structure/app/pages#catch-all-route)
- [Nuxt 4: useRoute](https://nuxt.com/docs/4.x/api/composables/use-route)

[Back to course index](00-course-index.md)
