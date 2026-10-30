# 68. Logout and Nav Links

Course section: 5: Authentication

## What you will learn

Clear authentication and update navigation.

In this lesson, **Session** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Session:** Information used by the server and client to recognize a signed-in user across requests.
- **Cookie:** A small value a browser stores and sends with matching requests.
- **Store:** A shared container for application state and the actions that change it.
- **Authentication:** Checking who a user is, such as by verifying sign-in credentials.

## What this topic includes

Requires nuxt-auth-utils. If you use the optional Pinia auth store from lesson 67, clear that display state too.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Logout action

Await logout before redirecting to avoid leaving navigation ahead of session clearing.

**Where:** A component — script setup

```js
const { clear } = useUserSession()
async function logout() { await clear(); await navigateTo('/login') }
```

### 2. Session clearing

The module clears its server session through its own API. Clear Pinia separately if your UI duplicates user state there.

**Where:** A component — script setup

```js
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
const { clear } = useUserSession()
async function logout() {
  await clear()
  auth.setUser(null)
  clearNuxtData('my-events')
  await navigateTo('/login')
}
```

### 3. Conditional header links

Navigation responds to the current session. API authorization is still required independently.

**Where:** app/components/AccountLinks.vue

```vue
<script setup>
const { loggedIn, clear } = useUserSession()
</script>
<template><nav><template v-if="loggedIn"><NuxtLink to="/events/create">Create event</NuxtLink><button @click="clear">Log out</button></template><NuxtLink v-else to="/login">Sign in</NuxtLink></nav></template>
```
## Simple example

After logout, clear user display state and show the sign-in link.

## Remember

- Clearing only Pinia does not invalidate a server-backed session.

## Best practices and edge cases

- Use SSR-aware shared state such as useState or a properly configured Pinia integration. A module-level reactive object can leak state across server requests.
- Initialize browser-only work after mount. Avoid rendering different initial markup based on localStorage, browser time zones, or random values.
- Keep serialized state simple and safe: never place passwords or private server credentials in client-visible state.
- Restore display state from the authenticated session after reload. Clear stale user data and fetched results when the account changes or signs out.

## Practical tip

Test logout followed by browser Back, a hard reload, and signing in as a different user; stale private data should not reappear.

## Official documentation

- [Nuxt 4: State Management](https://nuxt.com/docs/4.x/getting-started/state-management)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)

[Back to course index](00-course-index.md)
