# 26. Plugins

Course section: 2: The Pages

## What you will learn

Extend the Nuxt application during initialization.

In this lesson, **Plugin** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Plugin:** Code that extends or initializes a running Nuxt application.
- **Injection:** Making a helper available through the Nuxt application context.
- **Lifecycle:** The stages an application or component passes through, from creation to cleanup.
- **Client:** The browser that displays the application and handles user interactions.
- **Server:** The environment that receives requests, accesses private data, and sends responses.

## What this topic includes

Use the plugin and consuming page together. A separate client-only plugin is shown as an optional variation.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. App plugins

Nuxt runs discovered app plugins during application creation.

**Where:** app/plugins/format.js

```js
export default defineNuxtPlugin(() => ({
  provide: { upper: value => String(value).toUpperCase() },
}))
```

### 2. Injected helpers

Injected helpers are available from useNuxtApp with a $ prefix.

**Where:** app/pages/index.vue

```vue
<script setup>
const { $upper } = useNuxtApp()
</script>
<template><p>{{ $upper('hello') }}</p></template>
```

### 3. Registration

Register an existing Vue component globally when integrating a library that requires registration.

**Where:** app/plugins/vue-component.js

```js
import WelcomeCard from '~/components/WelcomeCard.vue'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('GlobalWelcomeCard', WelcomeCard)
})
```

### 4. Plugin files

The .client suffix keeps browser-only code from executing during server rendering.

**Where:** app/plugins/browser.client.js

```js
export default defineNuxtPlugin(() => {
  console.log('Browser language:', navigator.language)
})
```
## Simple example

A plugin can provide a formatting helper for multiple components.

## Remember

- App plugins and Nitro server plugins run in different contexts.

## Best practices and edge cases

- Use .client or .server suffixes for plugins that depend on a specific environment. Browser SDKs should not run during SSR.
- Plugins are initialized as part of application creation. Keep startup work small so it does not delay rendering.
- Use explicit dependency ordering when one plugin depends on another; do not rely on an accidental filename order.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Plugins](https://nuxt.com/docs/4.x/directory-structure/app/plugins)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
