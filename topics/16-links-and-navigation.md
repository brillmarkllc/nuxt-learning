# 16. Links and Navigation

Course section: 2: The Pages

Use `NuxtLink` when a visitor should follow a link. Use `navigateTo` when code needs to send the visitor somewhere after an action, such as saving a form.

**Additional example:** Create `app/pages/navigation.vue` in the existing app:

```vue
<script setup>
async function openReports() {
  await navigateTo('/reports')
}
</script>

<template>
  <main>
    <h1>Explore the bookshop</h1>
    <p><NuxtLink to="/about">About the shop</NuxtLink></p>
    <p>
      <NuxtLink :to="{ path: '/books/101', query: { tab: 'reviews' } }">
        Reviews for book 101
      </NuxtLink>
    </p>
    <button @click="openReports">Open reading reports</button>
    <p><NuxtLink to="https://nuxt.com">Nuxt website</NuxtLink></p>
  </main>
</template>
```

Visit `/navigation`. The internal links use pages created earlier. The reviews link includes a query value; Nuxt handles its URL formatting. After the app becomes interactive, internal links normally change pages without reloading the entire website.

`@click` runs the named function when the button is clicked. `async` allows that function to wait; `await` waits for the navigation result. Always return or await `navigateTo`.

The button demonstrates navigation from code; for an ordinary destination, prefer a link so visitors can open it in a new tab.

To link to a file such as a PDF in `public/`, use a normal `<a>` link or add `external` to `NuxtLink`. That bypasses page routing. In server request handlers, use the server redirect helper rather than `navigateTo`.

## Official documentation

- [Nuxt 4: NuxtLink](https://nuxt.com/docs/4.x/api/components/nuxt-link)
- [Nuxt 4: navigateTo](https://nuxt.com/docs/4.x/api/utils/navigate-to)

[Back to course index](00-course-index.md)
