# 50. Prerender configs

Course section: 4: Building

Nuxt's crawler follows page links when generating a site. It cannot invent every value for a dynamic address. List public addresses explicitly when they are not discoverable.

**Additional example:** In `render-lab`, create `app/pages/books/[id].vue`:

```vue
<script setup>
const route = useRoute()
</script>

<template>
  <main><h1>Public book {{ route.params.id }}</h1></main>
</template>
```

Add the following inside the existing `defineNuxtConfig({ ... })` object in `nuxt.config.ts`:

```ts
nitro: {
  prerender: {
    routes: ['/books/101', '/books/102']
  }
}
```

This uses Nitro's prerender configuration. The current Nuxt guide also documents a top-level `prerender` option; use one configuration location consistently rather than duplicating the route list.

Run:

```sh
npx nuxt generate
npx serve .output/public
```

Open `/books/101` and `/books/102` directly at the printed preview address. Both should display their headings. Look for their generated HTML under `.output/public/books/`.

Listing addresses schedules visits; it does not create a page file or supply missing database records. If the page loads external data, that source must be reachable while generation runs.

## Exclude pages that must stay dynamic

In a server build, route rules can prerender `/about` while leaving other pages to the server. `prerender: false` prevents generation; it does not create a server in static output.

Do not list account pages containing private information. Generated HTML and page data can be shared files, and changing their source information later does not update them until another build.

## Official documentation

- [Nuxt 4: Prerendering — route lists and rules](https://nuxt.com/docs/4.x/getting-started/prerendering)
- [Nuxt 4: Hybrid rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering#hybrid-rendering)

[Back to course index](00-course-index.md)
