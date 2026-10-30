# 20. Fonts and Pre-Processors

Course section: 2: The Pages

## What you will learn

Load fonts and use CSS preprocessing.

In this lesson, **Asset** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Asset:** A file such as an image, font, or stylesheet used by the application.
- **Public directory:** The folder for files served unchanged from the site root.
- **Preprocessor:** A tool that converts a language such as Sass into standard CSS.
- **CSS:** The language used to control colors, spacing, fonts, and page layout.

## What this topic includes

Supply your own font file at public/fonts/example.woff2. External network examples require the network to be available.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Public font files

A public font URL starts with /fonts, not /public/fonts.

**Where:** app/assets/css/main.css

```css
@font-face { font-family: 'Example'; src: url('/fonts/example.woff2') format('woff2'); font-display: swap; }
```

### 2. Font-face

font-face registers the font; font-family actually applies it to text.

**Where:** app/assets/css/main.css

```css
@font-face { font-family: 'Example'; src: url('/fonts/example.woff2') format('woff2'); font-display: swap; }
body { font-family: 'Example', sans-serif; }
```

### 3. External fonts

useHead can load a stylesheet from a font provider. This example uses an external Google Fonts stylesheet.

**Where:** app/app.vue

```vue
<script setup>
useHead({ link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' }] })
</script>
<template><NuxtPage /></template>
```

### 4. Preprocessors

Install Sass before using a Vue style block with lang="scss".

**Where:** Terminal and a component style block

```sh
npm install -D sass
# Then in a .vue file:
# <style lang="scss" scoped>
# $accent: #047857;
# h1 { color: $accent; }
# </style>
```
## Simple example

A font stored at `public/fonts/example.woff2` is referenced as `/fonts/example.woff2`.

## Remember

- A preprocessor requires its supporting dependency; a filename alone is insufficient.

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
