# 59. Sign up client validation

Course section: 5: Authentication

## What you will learn

Validate authentication input in the browser.

In this lesson, **Yup** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Yup:** A library used in the course to define input-validation schemas.
- **Schema:** A definition of expected fields, value types, and rules.
- **Validation:** Checking that input meets your rules before accepting or storing it.
- **Request body:** Data sent inside an HTTP request, often used for form submissions.

## What this topic includes

Install Yup with npm install yup. Page script snippets illustrate individual validation concepts; the final block is a complete mini-form.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Yup schema

A schema declares the expected input shape in one reusable object.

**Where:** app/pages/login.vue — script setup

```js
import * as yup from 'yup'
const schema = yup.object({ email: yup.string().email().required(), password: yup.string().min(12).required() })
```

### 2. Required values

required rejects a missing or empty password; min adds a length rule.

**Where:** app/pages/login.vue — script setup

```js
import * as yup from 'yup'
const passwordRule = yup.string().required('Password is required').min(12, 'Use at least 12 characters')
const valid = await passwordRule.isValid('short') // false
```

### 3. Email format

An email rule checks the format but does not prove that the address belongs to the user.

**Where:** app/pages/login.vue — script setup

```js
import * as yup from 'yup'
const emailRule = yup.string().email('Enter a valid email').required()
const valid = await emailRule.isValid('not-an-email') // false
```

### 4. Field errors

Catch a Yup error and show a field-specific message. The server must repeat validation independently.

**Where:** app/pages/login.vue

```vue
<script setup>
import * as yup from 'yup'
const email = ref('')
const emailError = ref('')
async function submit() {
  emailError.value = ''
  try { await yup.string().email('Invalid email').required('Email required').validate(email.value) }
  catch (error) { if (error instanceof yup.ValidationError) emailError.value = error.message; else throw error }
}
</script>
<template><form @submit.prevent="submit"><label>Email <input v-model="email" aria-describedby="email-error" /></label><p id="email-error">{{ emailError }}</p><button>Check</button></form></template>
```
## Simple example

An invalid email displays a field-level message before submission.

## Remember

- Client validation helps usability; the server must validate independently.

## Best practices and edge cases

- Use SSR-aware shared state such as useState or a properly configured Pinia integration. A module-level reactive object can leak state across server requests.
- Initialize browser-only work after mount. Avoid rendering different initial markup based on localStorage, browser time zones, or random values.
- Keep serialized state simple and safe: never place passwords or private server credentials in client-visible state.
- Restore display state from the authenticated session after reload. Clear stale user data and fetched results when the account changes or signs out.

## Practical tip

Test empty input, malformed email, and a server validation error returned after client validation succeeds.

## Official documentation

- [Nuxt 4: State Management](https://nuxt.com/docs/4.x/getting-started/state-management)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Yup schema and validation API](https://github.com/jquense/yup)

[Back to course index](00-course-index.md)
