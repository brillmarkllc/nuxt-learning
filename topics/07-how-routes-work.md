# 07. How routes work

Course section: 2: The Pages

A **route** connects a web address to the page shown there. Nuxt creates these connections from filenames, so you normally do not write a separate list of routes.

Using the app from topic 06, compare these paths:

| File | Address |
| --- | --- |
| `app/pages/index.vue` | `/` |
| `app/pages/about.vue` | `/about` |
| `app/pages/books/index.vue` | `/books` |
| `app/pages/books/reviews.vue` | `/books/reviews` |

`index.vue` means the starting page of that folder. The `.vue` ending is not part of the web address.

**Additional example:** Create `app/pages/about.vue`:

```vue
<template>
  <main>
    <h1>About the bookshop</h1>
    <p>We help readers find a good story.</p>
  </main>
</template>
```

With `npm run dev` running, visit `/about` at your local website address. Nuxt finds the file and displays it inside `<NuxtPage />` in `app/app.vue`.

Files in `app/components/` do not become pages. Use that folder for pieces reused inside pages. Nuxt also loads page code in separate pieces, so the first visit does not need every page's code.

## Official documentation

- [Nuxt 4: Routing](https://nuxt.com/docs/4.x/getting-started/routing)

[Back to course index](00-course-index.md)
