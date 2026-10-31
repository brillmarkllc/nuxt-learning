# 08. Static routes

Course section: 2: The Pages

A **static route** has a fixed address, such as `/contact`. “Static” here describes the address, not whether the content changes or how the page is published.

**Additional example:** In the app from topic 06, create `app/pages/contact.vue`:

```vue
<template>
  <main>
    <h1>Contact the bookshop</h1>
    <p>Visit us on Saturday from 10 am.</p>
    <NuxtLink to="/">Back home</NuxtLink>
  </main>
</template>
```

Visit `/contact`. You should see the opening time and a link to the existing home page. `NuxtLink` is Nuxt's link component; `to="/"` gives its destination.

Keep the page inside one outer element, here `<main>`. Nuxt needs a single root element for page transitions to work reliably.

If the welcome screen still appears, check `app/app.vue`: it should contain `<NuxtPage />`, as shown in topic 06. If you get a missing-page error, check that the file is under `app/pages/`, not `app/components/`.

Try creating `app/pages/delivery.vue` with a heading and a delivery message. Its address will be `/delivery`.

## Official documentation

- [Nuxt 4: Pages — usage and navigation](https://nuxt.com/docs/4.x/directory-structure/app/pages)

[Back to course index](00-course-index.md)
