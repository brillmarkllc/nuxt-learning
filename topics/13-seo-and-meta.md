# 13. SEO and Meta

Course section: 2: The Pages

## What you will learn

Describe pages through HTML head metadata.

In this lesson, **SEO** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **SEO:** Search engine optimization: helping search engines understand and present public pages.
- **HTML head:** The part of an HTML document containing its title, meta tags, and resource links.
- **useHead:** A composable for managing document-head content such as titles and links.
- **useSeoMeta:** A composable for declaring common SEO metadata with typed field names.

## What this topic includes

Each script is an alternative inside a page’s <script setup>. Inspect the browser tab and document head.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. UseHead

useHead can manage document language and other head settings, not only SEO descriptions.

**Where:** app/pages/index.vue — script setup

```js
useHead({ htmlAttrs: { lang: 'en' }, title: 'Event planner' })
```

### 2. UseSeoMeta

useSeoMeta provides named SEO fields, including social sharing metadata.

**Where:** app/pages/index.vue — script setup

```js
useSeoMeta({ title: 'Event planner', description: 'Plan your next meetup.', ogTitle: 'Event planner' })
```

### 3. Titles

A getter keeps the document title connected to changing page state.

**Where:** app/pages/index.vue — script setup

```js
const eventName = ref('Community meetup')
useHead({ title: () => `${eventName.value} | Event planner` })
```

### 4. Descriptions

The description summarizes the current public page for search engines and previews.

**Where:** app/pages/index.vue — script setup

```js
useSeoMeta({ description: 'Create events, choose dates, and track what is complete.' })
```
## Simple example

`useHead({ title: 'Event planner' })` sets a page title.

## Remember

- HTML head metadata and route metadata serve different purposes.

## Best practices and edge cases

- Use useSeoMeta for typed SEO fields and useHead for broader head configuration. Route metadata does not automatically generate HTML meta tags.
- Pass a getter when metadata must track changing data, such as a title loaded asynchronously.
- Keep titles and descriptions meaningful for each public page; check rendered HTML as well as the browser tab.

## Official documentation

- [Nuxt 4: Seo Meta](https://nuxt.com/docs/4.x/getting-started/seo-meta)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
