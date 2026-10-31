# 14. Page metadata

Course section: 2: The Pages

**Page metadata** is information attached to a route. It can select a layout, choose checks to run before navigation, or hold a label your app uses.

Use `definePageMeta` inside a page file. Nuxt reads this special instruction while preparing the app; you do not import it.

**Additional example:** Create `app/pages/reports.vue`:

```vue
<script setup>
definePageMeta({ title: 'Reading reports' })
const route = useRoute()
</script>

<template>
  <main>
    <h1>{{ route.meta.title }}</h1>
    <p>Your reading summary will appear here.</p>
  </main>
</template>
```

Visit `/reports`. “Reading reports” appears because the template reads `route.meta.title`. This custom field does not change the browser-tab title. Use `useSeoMeta` for that, as in topic 13.

Some fields have built-in meaning. For example, `layout: 'dashboard'` asks for `app/layouts/dashboard.vue`; it does not create that layout. The next topic shows how to create one.

Keep simple page settings independent of changing values inside the component. Nuxt extracts `definePageMeta` from the component during preparation, so an ordinary local `ref` is not a suitable source for custom metadata. Use page state and `useHead` or `useSeoMeta` for changing display information.

## Official documentation

- [Nuxt 4: Pages — page metadata](https://nuxt.com/docs/4.x/directory-structure/app/pages#page-metadata)
- [Nuxt 4: SEO and Meta](https://nuxt.com/docs/4.x/getting-started/seo-meta)

[Back to course index](00-course-index.md)
