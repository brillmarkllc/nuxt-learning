# 75. Home session validator

Course section: 6: Practice app: EventO

## What you will learn

Choose home-page content based on session state.

In this lesson, **Session** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Session:** Information used by the server and client to recognize a signed-in user across requests.
- **Authentication:** Checking who a user is, such as by verifying sign-in credentials.
- **Empty state:** UI shown when a request succeeds but there are no items to display.
- **Authorization:** Checking whether that user may perform an action on a particular resource.

## What this topic includes

Requires nuxt-auth-utils. Render the MyEvents component created in lesson 76.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Signed-in view

Show the protected UI only when session state reports a signed-in user.

**Where:** app/pages/index.vue

```vue
<script setup>
const { loggedIn } = useUserSession()
</script>
<template><main><MyEvents v-if="loggedIn" /><NuxtLink v-else to="/login">Sign in to view events</NuxtLink></main></template>
```

### 2. Signed-out message

Provide a useful signed-out view instead of an empty screen.

**Where:** app/pages/index.vue

```vue
<script setup>
const { loggedIn } = useUserSession()
</script>
<template><main><p v-if="!loggedIn">Your events are private. Sign in to continue.</p><MyEvents v-else /></main></template>
```

### 3. Session refresh

Refresh after an authentication-changing action; do not repeatedly fetch the session on every render.

**Where:** A page — script setup

```js
const { fetch: refreshSession } = useUserSession()
async function recheckSession() { await refreshSession() }
// Optional button: <button @click="recheckSession">Check session again</button>
```
## Simple example

A visitor sees a login prompt; an authenticated user sees the events area.

## Remember

- Do not fetch another user's records using an unverified client-provided identity.

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

[Back to course index](00-course-index.md)
