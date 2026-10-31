# 10. Dynamic routes

Course section: 2: The Pages

A **dynamic route** uses one page file for many addresses. A bookshop can show `/books/101` and `/books/102` with the same page design.

**Additional example:** Create `app/pages/books/[id].vue`. Include the square brackets in the filename:

```vue
<script setup>
const route = useRoute()
</script>

<template>
  <main>
    <h1>Book {{ route.params.id }}</h1>
    <NuxtLink to="/books/102">View book 102</NuxtLink>
  </main>
</template>
```

`<script setup>` holds the page's JavaScript. `const route = useRoute()` gives the name `route` to the current address information. Nuxt supplies `useRoute` automatically. The double braces `{{ ... }}` display a value in the page.

Visit `/books/101`, then follow the link. The heading should change from “Book 101” to “Book 102”. `[id]` captures one part of the address and makes it available as `route.params.id`.

This only displays an address value. It does not look up a book or prove that one exists. Treat route values as visitor input when you later use them to load information.

Single brackets require a value. Double brackets, such as `[[id]].vue`, make it optional. Use the single-bracket version for this example, and do not create both versions for the same route.

## Official documentation

- [Nuxt 4: Pages — dynamic routes](https://nuxt.com/docs/4.x/directory-structure/app/pages#dynamic-routes)
- [Nuxt 4: Routing — route parameters](https://nuxt.com/docs/4.x/getting-started/routing#route-parameters)

[Back to course index](00-course-index.md)
