# 19. Working with styles

Course section: 2: The Pages

**CSS** controls how a page looks: colours, spacing, fonts, and layout. Use a component's style block for local changes and a shared stylesheet for site-wide rules.

**Additional example:** Replace `app/components/ShopNotice.vue` with:

```vue
<template>
  <aside class="notice">Free delivery on orders over £30.</aside>
</template>

<style scoped>
.notice {
  background: #edf7ef;
  color: #174b28;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
```

Open `/offers`. The message now has a green background and space around its text. `.notice` selects the element with `class="notice"`. `padding` adds inside space; `border-radius` rounds the corners. `rem` is a size based on the document's font size.

`scoped` limits these rules to this component's markup. Without it, matching elements elsewhere can be affected. Scoped styles are not a complete barrier: a child component's outermost element can also receive parent scoped styles.

## Styles for every page

Create `app/assets/css/main.css`:

```css
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
main { max-width: 48rem; margin: 2rem auto; padding: 0 1rem; }
```

Add this property inside the existing `defineNuxtConfig({ ... })` object in `nuxt.config.ts`:

```ts
css: ['~/assets/css/main.css']
```

Keep any other configuration properties, separating them with commas. Nuxt includes this stylesheet across the app. Pages should now use the system font and more comfortable spacing.

`app/assets/` holds files processed by Nuxt's build tools. A stylesheet is not included merely because you put it there; reference it as shown above.

## Official documentation

- [Nuxt 4: Styling](https://nuxt.com/docs/4.x/getting-started/styling)

[Back to course index](00-course-index.md)
