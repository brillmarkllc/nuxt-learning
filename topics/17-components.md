# 17. Components

Course section: 2: The Pages

A **component** is a reusable piece of a page. A shop announcement can appear on several pages while its wording stays in one file.

**Additional working example:** Create `app/components/ShopNotice.vue`:

```vue
<template>
  <aside>Free delivery on orders over £30.</aside>
</template>
```

Create `app/pages/offers.vue`:

```vue
<template>
  <main>
    <h1>Bookshop offers</h1>
    <ShopNotice />
  </main>
</template>
```

Visit `/offers`. The delivery message appears below the heading. Nuxt finds `ShopNotice.vue` in `app/components/` and makes `<ShopNotice />` available automatically. You do not need an import statement.

Add `<ShopNotice />` inside another page's template to reuse it. Changing the component updates every place that uses it.

A component file does not create a web address; a page file does. Keep shared pieces in `app/components/` and route-specific content in `app/pages/`.

Folder names affect component names. For example, `app/components/profile/UserBadge.vue` is available as `<ProfileUserBadge />`. Start with simple, descriptive filenames so the names are easy to recognise.

## Official documentation

- [Nuxt 4: Components](https://nuxt.com/docs/4.x/directory-structure/app/components)

[Back to course index](00-course-index.md)
