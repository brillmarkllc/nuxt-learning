# 75. Home session validator

Course section: 6: Practice app: EventO

The home page can welcome signed-out visitors and show personal content only after a session is available. Auth Utils provides `loggedIn` and `user` for this decision.

**Additional working example:** Replace `app/pages/index.vue` in EventO with:

```vue
<script setup>
const { loggedIn, user } = useUserSession()
</script>

<template>
  <main>
    <h1>EventO</h1>
    <section v-if="loggedIn">
      <p>Welcome, {{ user?.email }}.</p>
      <NuxtLink to="/events/create">Create an event</NuxtLink>
      <p>Your event list is added in the next topic.</p>
    </section>
    <section v-else>
      <p>Keep your meetups in one place. Sign in to see your private events.</p>
      <NuxtLink to="/login">Sign in or create account</NuxtLink>
    </section>
  </main>
</template>
```

Open `/` while signed out: the account link should appear. Sign in: the welcome message and create-event link should appear. Reload to confirm the session still supplies the right view.

`v-if` only creates the selected section. This matters when the signed-in section later contains a component that requests private data: signed-out visitors should not create that component and immediately produce an unnecessary 401 request.

The authentication helper refreshes session state after account actions. Do not keep fetching the session on every render, and do not infer login from local browser storage.

A visible session-based view is not server authorization. The event-list endpoint must independently read the verified session and filter records by its user ID. That endpoint and its display component are added together next.

Keep this personal home view out of shared prerendered output and public response caches.

## Official documentation

- [Nuxt 4: Sessions and authentication — session-aware pages](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Nuxt 4: State management](https://nuxt.com/docs/4.x/getting-started/state-management)
- [Auth Utils: Session composable](https://github.com/atinux/nuxt-auth-utils#vue-composable)

[Back to course index](00-course-index.md)
