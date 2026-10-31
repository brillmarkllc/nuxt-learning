# 15. Layouts

Course section: 2: The Pages

A **layout** is a reusable frame around a page, such as a shop header and footer. Use different layouts when some pages need a different frame. If every page shares just one frame, placing it directly in `app/app.vue` is simpler.

## Give reports their own frame

**Additional working example:** Replace the template in `app/app.vue` with the following. Preserve any existing `<script setup>` settings:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

Create `app/layouts/default.vue`:

```vue
<template>
  <div>
    <header>The little bookshop</header>
    <slot />
    <footer>Happy reading</footer>
  </div>
</template>
```

Create `app/layouts/dashboard.vue`:

```vue
<template>
  <div>
    <header>Reading dashboard</header>
    <nav><NuxtLink to="/">Visit the shop</NuxtLink></nav>
    <slot />
  </div>
</template>
```

In `app/pages/reports.vue`, add `layout: 'dashboard'` to the existing page settings:

```js
definePageMeta({ title: 'Reading reports', layout: 'dashboard' })
```

Visit `/`: the shop header and footer should appear. Visit `/reports`: the dashboard frame should appear instead.

`NuxtLayout` selects the frame. `NuxtPage` supplies the current page. The layout's `<slot />` marks where that page content goes; it is a placeholder for content passed into a component.

The default layout is used when a page does not select another one. Layout names follow filenames, using hyphens between words. Keep one outer element around each layout; a bare `<slot />` cannot be the layout's root.

## Official documentation

- [Nuxt 4: Layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)

[Back to course index](00-course-index.md)
