# 68. Logout and Nav Links

Course section: 5: Authentication

Logging out must clear the verified session, then remove private display data. Clearing a Pinia value alone leaves the server session active.

**Additional example:** Replace `app/components/AppHeader.vue` with:

```vue
<script setup>
const { loggedIn, clear } = useUserSession()
const auth = useAuthStore()
const loggingOut = ref(false)
const message = ref('')
async function logout() {
  if (loggingOut.value) return
  loggingOut.value = true
  message.value = ''
  try {
    await clear()
    auth.setUser(null)
    clearNuxtData(key => key.startsWith('my-events:'))
    await navigateTo('/login')
  } catch {
    message.value = 'Could not finish signing out. Please retry.'
  } finally {
    loggingOut.value = false
  }
}
</script>

<template>
  <header class="p-4 border-b">
    <nav aria-label="Main" class="flex gap-4 items-center">
      <UButton to="/" variant="ghost">EventO</UButton>
      <AccountLabel />
      <template v-if="loggedIn">
        <button :disabled="loggingOut" @click="logout">Log out</button>
      </template>
      <NuxtLink v-else to="/login">Sign in or create account</NuxtLink>
    </nav>
    <p role="status">{{ message }}</p>
  </header>
</template>
```

This uses the optional store and `AccountLabel` created in topic 67. `clear()` calls the module's session-clearing endpoint. The store watcher also follows the resulting session change; explicitly setting the copy to null makes the cleanup clear.

`clearNuxtData` removes fetched page data with matching keys. The event list later uses keys starting with `my-events:` so one account's results are not left visible after logout.

Sign in and check that Log out replaces the account link. Click it: you should reach `/login` and see Guest. Reload to confirm that the session is still cleared. Try the browser Back button and later sign in as a different user; private results must be loaded for that user rather than reused from the previous account.

The header controls what is visible. Server endpoints still need their own session and ownership checks.

## Official documentation

- [Nuxt 4: Sessions and authentication — logout](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#home-page)
- [Nuxt 4: clearNuxtData](https://nuxt.com/docs/4.x/api/utils/clear-nuxt-data)
- [Auth Utils: Session composable](https://github.com/atinux/nuxt-auth-utils#vue-composable)

[Back to course index](00-course-index.md)
