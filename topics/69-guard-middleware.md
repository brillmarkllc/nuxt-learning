# 69. Guard middleware

Course section: 6: Practice app: EventO

A **route guard** checks whether a visitor should enter a page. For EventO, signed-out visitors should reach the account form before opening the create-event page.

**Additional working example:** Create `app/middleware/auth.js`:

```js
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) return navigateTo('/login')
})
```

Create `app/pages/events/create.vue`:

```vue
<script setup>
definePageMeta({ middleware: ['auth'] })
</script>

<template>
  <main><h1>Create an event</h1><p>Your event form will appear here.</p></main>
</template>
```

Sign out, then open `/events/create` directly. You should reach `/login`. Sign in and open `/events/create` again: the placeholder should appear. The next topic replaces it with a form.

The filename supplies the name `auth`; page metadata selects it. Other pages remain public unless they also select the guard. Keep `/login` outside this guard so it cannot redirect to itself.

Auth Utils loads session state for the app. The watcher in `app/app.vue` from topic 67 copies that state into the optional display store. Do not add another independent “logged-in” flag or trust an email typed into a form.

The authentication helper refreshes the session after sign-in. The guard reads it; it does not need to create a session or repeat a database query on every navigation. Initial route middleware can run on the server and again during browser hydration.

This guard improves navigation. A caller can still request `/api/events` directly, so every protected API operation must require a verified session. The event endpoints will also check ownership, meaning which person's records a request may access.

## Official documentation

- [Nuxt 4: Sessions and authentication — app route protection](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#protect-app-routes)
- [Nuxt 4: Route middleware](https://nuxt.com/docs/4.x/directory-structure/app/middleware)

[Back to course index](00-course-index.md)
