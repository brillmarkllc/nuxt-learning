# 26. Plugins

Course section: 2: The Pages

A **plugin** runs when Nuxt creates the Vue app. It is useful for setting up a library that must connect to the whole app. It is not a function that runs on every button click.

## See how a plugin provides a helper

**Additional example:** Create `app/plugins/greeting.js`:

```js
export default defineNuxtPlugin(() => {
  return {
    provide: {
      greeting: (name) => `Welcome, ${name}!`
    }
  }
})
```

Create `app/pages/welcome.vue`:

```vue
<script setup>
const { $greeting } = useNuxtApp()
</script>

<template>
  <main><h1>{{ $greeting('Asha') }}</h1></main>
</template>
```

At `/welcome`, you should see “Welcome, Asha!”. Nuxt discovers the top-level plugin file automatically. `provide` adds the helper to the app; its name receives a `$` prefix when accessed through `useNuxtApp`.

This small example demonstrates the connection. For a simple greeting in a real app, a utility or composable would be easier than adding an app-wide helper.

## Choose where it runs

An ordinary app plugin can run on the server and in the browser. A `.client.js` ending limits it to the browser; `.server.js` limits it to server-side app creation. Browser-only libraries should use a client plugin.

Keep startup work small because it can delay the page. If one plugin needs another, use documented ordering or `dependsOn` rather than relying on chance.

Files in `server/plugins/` are different: they extend the Nitro server and are covered in topic 40. An app plugin is not a place to keep a visitor's private data in a global variable.

## Official documentation

- [Nuxt 4: Plugins](https://nuxt.com/docs/4.x/directory-structure/app/plugins)

[Back to course index](00-course-index.md)
