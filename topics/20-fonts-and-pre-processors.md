# 20. Fonts and Pre-Processors

Course section: 2: The Pages

A system font works without downloading a font file. Add a custom font only when you want a particular appearance. A **preprocessor**, such as Sass, is a separate tool that converts extra styling syntax into normal CSS.

## Use a local font

**Additional example:** Supply a font you are allowed to use and save it as `public/fonts/bookshop.woff2`. This file is not included with these notes. Add the following to the stylesheet loaded in topic 19:

```css
@font-face {
  font-family: 'Bookshop';
  src: url('/fonts/bookshop.woff2') format('woff2');
  font-display: swap;
}
body { font-family: 'Bookshop', system-ui, sans-serif; }
```

`@font-face` gives the file a name; `font-family` applies it. `swap` allows a fallback font to appear while the custom font loads. Files in `public/` use addresses starting at the site root: `/fonts/...`, not `/public/fonts/...`.

If the appearance does not change, check that the file exists and its name matches exactly. Without that file, the fallback font remains available.

An external font stylesheet is another option. The Nuxt styling guide shows how to add a stylesheet link with `useHead`; that option needs access to the font provider.

## Try Sass separately

From the project root, run:

```sh
npm install -D sass
```

Create `app/pages/style-demo.vue`:

```vue
<template>
  <main><h1>A new reading list</h1></main>
</template>

<style lang="scss" scoped>
$accent: #175b44;
h1 { color: $accent; }
</style>
```

Visit `/style-demo`: the heading should be green. `$accent` is a Sass variable, a name for a reusable value. Nuxt's build tools convert it to CSS. The `lang="scss"` label alone is not enough; the Sass package must be installed. Ordinary CSS remains a good choice for simple styling.

## Official documentation

- [Nuxt 4: Styling — fonts and preprocessors](https://nuxt.com/docs/4.x/getting-started/styling)

[Back to course index](00-course-index.md)
