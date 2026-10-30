# 58. Sign up form

Course section: 5: Authentication

## What you will learn

Build an authentication form with two modes.

In this lesson, **v-model** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **v-model:** Vue’s directive for connecting an input field to application state.
- **Authentication:** Checking who a user is, such as by verifying sign-in credentials.
- **Validation:** Checking that input meets your rules before accepting or storing it.
- **State:** Data the application remembers and uses to decide what to display.

## What this topic includes

The form examples use plain Vue inputs so the binding and submission behavior is easy to see. API calls are added in lesson 64.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Email and password fields

Use explicit labels and password autocomplete hints to make the fields usable by browsers and assistive technology.

**Where:** app/pages/login.vue

```vue
<script setup>
const email = ref('')
const password = ref('')
</script>
<template><form><label>Email <input v-model="email" type="email" autocomplete="email" /></label><label>Password <input v-model="password" type="password" autocomplete="current-password" /></label></form></template>
```

### 2. Sign-up/sign-in toggle

A mode-switch button needs type=button so it does not accidentally submit the form.

**Where:** app/pages/login.vue

```vue
<script setup>
const mode = ref('sign-in')
</script>
<template><form><h1>{{ mode === 'sign-in' ? 'Sign in' : 'Create account' }}</h1><button type="button" @click="mode = mode === 'sign-in' ? 'sign-up' : 'sign-in'">Switch mode</button></form></template>
```

### 3. Page layout

A named layout gives authentication pages a simpler frame. Add the indicated metadata in the login page script.

**Where:** app/layouts/auth.vue and page metadata

```vue
<!-- app/layouts/auth.vue -->
<template><main class="auth"><slot /></main></template>
<!-- app/pages/login.vue script setup: definePageMeta({ layout: 'auth' }) -->
```
## Simple example

Switch the submit button from “Create account” to “Sign in” when mode changes.

## Remember

- Do not accidentally submit when a button is intended only to switch modes.

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
