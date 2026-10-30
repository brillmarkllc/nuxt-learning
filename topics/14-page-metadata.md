# 14. Page metadata

Course section: 2: The Pages

## What you will learn

Attach configuration to a page route.

In this lesson, **Metadata** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Metadata:** Information describing a page or configuring its behavior.
- **definePageMeta:** A Nuxt compiler macro that declares route-level configuration for a page.
- **Compiler macro:** A special function-like instruction processed when the application is built.
- **Layout:** A reusable page frame, such as a sidebar and header around changing page content.

## What this topic includes

Use these as alternative page script examples. Route metadata configures the route; useHead changes the HTML head.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. DefinePageMeta

A compiler macro selects a named layout. Create app/layouts/dashboard.vue before using it.

**Where:** app/pages/dashboard.vue — script setup

```js
definePageMeta({ layout: 'dashboard' })
```

### 2. Custom metadata

Custom metadata can be read from the current route; it does not automatically set the browser title.

**Where:** app/pages/reports.vue

```vue
<script setup>
definePageMeta({ title: 'Reports' })
const route = useRoute()
</script>
<template><h1>{{ route.meta.title }}</h1></template>
```

### 3. Route configuration

Route validation rejects invalid IDs before showing the page.

**Where:** app/pages/members/[id].vue — script setup

```js
definePageMeta({ validate: route => /^\d+$/.test(String(route.params.id)) })
```
## Simple example

`definePageMeta({ layout: 'dashboard' })` selects a page layout.

## Remember

- A custom title in page metadata does not automatically become the HTML document title.

## Best practices and edge cases

- Use useSeoMeta for typed SEO fields and useHead for broader head configuration. Route metadata does not automatically generate HTML meta tags.
- Pass a getter when metadata must track changing data, such as a title loaded asynchronously.
- Keep titles and descriptions meaningful for each public page; check rendered HTML as well as the browser tab.

## Practical tip

definePageMeta is a compiler macro: do not make its configuration depend on component-local reactive values.

## Official documentation

- [Nuxt 4: Seo Meta](https://nuxt.com/docs/4.x/getting-started/seo-meta)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
