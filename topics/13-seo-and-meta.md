# 13. SEO and Meta

Course section: 2: The Pages

A page has information that is not shown in its main content: its browser-tab title, a short description, and details used when a link is shared. This information lives in the HTML **head**.

**SEO** means helping search engines understand a public page. A clear title and description help describe it; they do not guarantee a search ranking.

**Additional example:** Replace `app/pages/about.vue` with:

```vue
<script setup>
useSeoMeta({
  title: 'About our bookshop',
  description: 'Meet the readers behind the little bookshop.',
  ogTitle: 'About our bookshop',
  ogDescription: 'Meet the readers behind the little bookshop.'
})
</script>

<template>
  <main><h1>Books chosen by readers</h1></main>
</template>
```

Open `/about`. The browser tab should say “About our bookshop”; the visible heading is deliberately different. `ogTitle` and `ogDescription` describe the page for services that use Open Graph link previews.

Nuxt supplies `useSeoMeta` and creates the corresponding head tags. Inspect the page's HTML head in your browser's developer tools to see the description.

For broader settings, use `useHead`. For example, add this inside a `<script setup>` block in `app/app.vue` to declare the language:

```js
useHead({ htmlAttrs: { lang: 'en' } })
```

When a title depends on changing data, pass a function that reads the current value, such as `title: () => book.value.title`, after ensuring the book exists. A copied string will not follow future changes.

Route settings from `definePageMeta` do not automatically set browser titles or descriptions.

## Official documentation

- [Nuxt 4: SEO and Meta](https://nuxt.com/docs/4.x/getting-started/seo-meta)

[Back to course index](00-course-index.md)
