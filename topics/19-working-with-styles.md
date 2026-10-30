# 19. Working with styles

Course section: 2: The Pages

## What you will learn

Apply styles locally or across the application.

In this lesson, **CSS** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **CSS:** The language used to control colors, spacing, fonts, and page layout.
- **Scoped style:** A Vue style block whose selectors are limited primarily to that component’s markup.
- **Component:** A reusable piece of UI containing markup, behavior, and optional styles.
- **Asset:** A file such as an image, font, or stylesheet used by the application.

## What this topic includes

These files demonstrate component-local CSS and a separate global stylesheet.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Vue style blocks

A normal style block can affect matching elements anywhere in the application.

**Where:** app/components/Notice.vue

```vue
<template><p class="notice">Saved</p></template>
<style>.notice { color: green; }</style>
```

### 2. Scoped styles

Scoped selectors apply primarily to this component’s own markup.

**Where:** app/components/Notice.vue

```vue
<template><p>Saved</p></template>
<style scoped>p { color: green; }</style>
```

### 3. Global CSS

Load a shared stylesheet once. Create the referenced file with body { margin: 0; }.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ css: ['~/assets/css/main.css'] })
```

### 4. Assets

Assets under app/assets are processed by the build. This shared file establishes a basic font stack.

**Where:** app/assets/css/main.css

```css
body { font-family: system-ui, sans-serif; }
button { cursor: pointer; }
```
## Simple example

`<style scoped>h1 { color: blue; }</style>` styles headings in that component.

## Remember

- Global styles can affect unrelated pages; use them deliberately.

## Best practices and edge cases

- Use public for files served unchanged and assets for files processed by the build tool. Public paths start at the site root, without /public.
- Scoped styles limit selectors to component markup, but a child component’s root can still be affected by parent scoped styles.
- Install the matching preprocessor dependency before using Sass or another preprocessor; include global styles through Nuxt configuration.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Styling](https://nuxt.com/docs/4.x/getting-started/styling)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
