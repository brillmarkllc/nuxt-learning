# 67. Pinia user store

Course section: 5: Authentication

A **store** holds information shared by several components. Pinia manages that state within the Nuxt app, including server-rendered pages.

Auth Utils already shares the verified session. A separate user store is optional; this example shows how to keep a safe display copy in step with it.

**Additional example:** With `@pinia/nuxt` installed in topic 56, create `app/stores/auth.js`:

```js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  function setUser(value) {
    user.value = value ? { id: value.id, email: value.email } : null
  }
  return { user, setUser }
})
```

`'auth'` is the store's unique name. `user` is state; `setUser` is an action that changes it. The store exposes only the public fields needed for display.

In `app/app.vue`, add a script above its existing template:

```vue
<script setup>
const auth = useAuthStore()
const { user } = useUserSession()
watch(user, value => auth.setUser(value), { immediate: true })
</script>
```

This copies the initial session user and follows later changes after login or logout. Do not put a separate global `ref` outside the store function: server requests could then share a visitor's data.

Create `app/components/AccountLabel.vue`:

```vue
<script setup>
const auth = useAuthStore()
</script>

<template>
  <span>{{ auth.user?.email || 'Guest' }}</span>
</template>
```

Add `<AccountLabel />` to the shared header's navigation. Sign in, reload, and check that the email still appears. The session restores identity; the store alone does not persist or prove login.

Read `auth.user` directly to keep it reactive. If you need a separate `user` variable from a store, use `storeToRefs(auth)` rather than ordinary destructuring. Never put passwords, hashes, or private credentials in this browser-visible state.

## Official documentation

- [Nuxt 4: State management](https://nuxt.com/docs/4.x/getting-started/state-management)
- [Nuxt 4: Sessions and authentication](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Pinia: Nuxt integration](https://pinia.vuejs.org/ssr/nuxt.html)
- [Pinia: Defining a store](https://pinia.vuejs.org/core-concepts/)

[Back to course index](00-course-index.md)
