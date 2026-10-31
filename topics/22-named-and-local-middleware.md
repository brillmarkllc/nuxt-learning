# 22. Named and Local Middleware

Course section: 2: The Pages

Use **named middleware** when several selected pages need the same check. Use **inline middleware** when the check belongs to just one page. Neither runs globally unless you explicitly make it global.

**Additional example:** Send visitors away from a closed promotion. Create `app/middleware/promotion-closed.js`:

```js
export default defineNuxtRouteMiddleware(() => {
  return navigateTo('/offers')
})
```

Create `app/pages/summer-sale.vue`:

```vue
<script setup>
definePageMeta({ middleware: ['promotion-closed'] })
</script>

<template>
  <main><h1>Summer sale</h1></main>
</template>
```

Visit `/summer-sale`: Nuxt sends you to the `/offers` page created in topic 17. The middleware filename becomes its name without `.js`. The square brackets in the settings hold a list of middleware names.

Do not attach this same redirect to `/offers`, or it will redirect to itself.

## Keep a one-page rule in the page

As an alternative, remove the `middleware: ['promotion-closed']` setting and use this inside that page's existing `<script setup>`:

```js
definePageMeta({
  middleware: [() => navigateTo('/offers')]
})
```

This short function returns the navigation result automatically. Choose either the named or inline version; you do not need both.

Global middleware runs first, followed by the page's middleware in its listed order. Sign-in checks use this same mechanism, but require a real session system. Redirecting a page alone never prevents someone from calling a private server endpoint directly.

## Official documentation

- [Nuxt 4: Middleware — usage and order](https://nuxt.com/docs/4.x/directory-structure/app/middleware)

[Back to course index](00-course-index.md)
