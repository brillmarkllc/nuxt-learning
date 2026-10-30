# 67. Pinia user store

Course section: 5: Authentication

## What you will learn

Keep user display state available across components.

In this lesson, **Pinia** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Pinia:** A Vue state-management library for sharing application data across components.
- **Store:** A shared container for application state and the actions that change it.
- **State:** Data the application remembers and uses to decide what to display.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.

## What this topic includes

Install and register @pinia/nuxt (lesson 56). The examples store display data only; the server session remains the authority for authentication.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Pinia store

A Pinia setup store returns reactive data and explicit actions.

**Where:** app/stores/auth.js

```js
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  function setUser(value) { user.value = value }
  return { user, setUser }
})
```

### 2. User data

Only store safe display fields received from the session or API.

**Where:** A component — script setup

```js
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
auth.setUser({ id: 'example-user-id', email: 'learner@example.com' })
// This example changes display state only; it does not sign in a user.
```

### 3. Login action

Populate the store from the verified session instead of trusting arbitrary form data.

**Where:** After a successful sign-in request

```js
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
const { user, fetch: refreshSession } = useUserSession()
async function syncUser() { await refreshSession(); auth.setUser(user.value) }
```

### 4. Shared state

Any component can read the same store while state stays scoped to the Nuxt application instance.

**Where:** app/components/AccountLabel.vue

```vue
<script setup>
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
</script>
<template><span>{{ auth.user?.email || 'Guest' }}</span></template>
```
## Simple example

The header reads the user name from a shared store after sign-in.

## Remember

- Client state is not proof of authorization and can disappear on reload.

## Best practices and edge cases

- Use SSR-aware shared state such as useState or a properly configured Pinia integration. A module-level reactive object can leak state across server requests.
- Initialize browser-only work after mount. Avoid rendering different initial markup based on localStorage, browser time zones, or random values.
- Keep serialized state simple and safe: never place passwords or private server credentials in client-visible state.
- Restore display state from the authenticated session after reload. Clear stale user data and fetched results when the account changes or signs out.

## Official documentation

- [Nuxt 4: State Management](https://nuxt.com/docs/4.x/getting-started/state-management)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Pinia setup stores](https://pinia.vuejs.org/core-concepts/)

[Back to course index](00-course-index.md)
