# 29. The NUXT lifecycle

Course section: 3: The server

The **lifecycle** is the sequence Nuxt follows to turn a request into a working page. Knowing which steps happen on the server helps explain why some code runs twice and why browser-only code can fail.

On a normal first visit:

1. Nitro receives the request and runs server middleware. Server plugins were registered when that server instance started.
2. Nuxt creates the Vue app, runs app plugins, checks the route, and runs route middleware.
3. Nuxt renders the page and loads required data, then sends HTML and page data to the browser.
4. The browser starts the app and connects interactive behaviour to the HTML. This is **hydration**.

Later internal navigation usually happens in the browser, though loading data can still make server requests.

## See both environments

**Additional example:** Create `app/pages/lifecycle.vue` in `employee-lab`:

```vue
<script setup>
const count = ref(0)
if (import.meta.server) console.log('Page setup on the server')
if (import.meta.client) console.log('Page setup in the browser')
onMounted(() => console.log('Page mounted in the browser'))
</script>

<template>
  <main>
    <h1>Lifecycle check</h1>
    <button @click="count++">Clicks: {{ count }}</button>
  </main>
</template>
```

Open `/lifecycle` directly. Look in the development terminal for the server message and the browser console for the browser messages. Click the button: its count increases.

`onMounted` runs after Vue has attached the component in the browser; it does not run during server rendering. Put code that needs browser objects there, or deliberately guard it with `import.meta.client`.

The initial HTML must agree on both sides. Starting at `0` is predictable; generating unrelated random values while rendering can produce a mismatch. Nuxt's data-loading helpers pass server-loaded data to the browser to help avoid duplicate loading.

Do not start repeating timers during server page setup. Browser cleanup hooks will not run there to stop them.

## Official documentation

- [Nuxt 4: Nuxt lifecycle](https://nuxt.com/docs/4.x/guide/concepts/nuxt-lifecycle)

[Back to course index](00-course-index.md)
