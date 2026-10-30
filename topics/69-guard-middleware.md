# 69. Guard middleware

Course section: 6: Practice app: EventO

## What you will learn

Restore session-derived state and guard page access.

In this lesson, **Route guard** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Route guard:** A navigation check that can allow, redirect, or stop a page visit.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.
- **Authorization:** Checking whether that user may perform an action on a particular resource.
- **Ownership check:** A server-side check that a record belongs to, or is accessible by, the current user.

## What this topic includes

Requires nuxt-auth-utils and optionally the Pinia store from lesson 67. Keep server-side session checks in protected endpoints too.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Session refresh

Fetch the session after a server action changes it so the browser has up-to-date session state.

**Where:** After a successful authentication action — script setup

```js
const { fetch: refreshSession } = useUserSession()
async function syncSession() { await refreshSession() }
```

### 2. Store initialization

If a Pinia store duplicates session display state, synchronize it reactively, including when the session becomes null.

**Where:** app/components/SessionStoreSync.vue

```vue
<script setup>
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
const { user } = useUserSession()
watch(user, value => auth.setUser(value), { immediate: true })
</script>
<template><span hidden /></template>
```

### 3. Route middleware

A named guard redirects signed-out visitors from protected pages.

**Where:** app/middleware/auth.js

```js
export default defineNuxtRouteMiddleware(() => {
  if (!useUserSession().loggedIn.value) return navigateTo('/login')
})
```

### 4. Redirects

Attach the guard to this page. The guard does not run on unrelated public pages.

**Where:** app/pages/events/create.vue

```vue
<script setup>
definePageMeta({ middleware: ['auth'] })
</script>
<template><h1>Create an event</h1></template>
```
## Simple example

Redirect a signed-out visitor from the event form to the login page.

## Remember

- Server endpoints still need their own session and ownership checks.

## Best practices and edge cases

- Return navigateTo or abortNavigation from middleware when navigation should stop or redirect.
- Use the to and from arguments inside route middleware instead of useRoute. Guard against redirects back to the same destination.
- Initial route middleware can execute during SSR and again during hydration. Keep repeated work and browser-only APIs under control.
- A navigation guard does not secure an API: check authentication and authorization in each protected server operation.

## Official documentation

- [Nuxt 4: Routing](https://nuxt.com/docs/4.x/getting-started/routing)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)

[Back to course index](00-course-index.md)
