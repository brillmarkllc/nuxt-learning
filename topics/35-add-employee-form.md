# 35. Add employee form

Course section: 3: The server

## What you will learn

Collect employee information with a Vue form.

In this lesson, **v-model** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **v-model:** Vue’s directive for connecting an input field to application state.
- **State:** Data the application remembers and uses to decide what to display.
- **Request body:** Data sent inside an HTTP request, often used for form submissions.
- **Validation:** Checking that input meets your rules before accepting or storing it.
- **POST:** An HTTP method commonly used to create a resource or submit an action.

## What this topic includes

Use these as independent steps within app/pages/employees/new.vue. The POST endpoint is implemented in lesson 37.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. V-model

v-model updates the name when the user types.

**Where:** app/pages/employees/new.vue

```vue
<script setup>
const name = ref('')
</script>
<template><label>Name <input v-model="name" /></label></template>
```

### 2. Form state

Group related inputs in one reactive object. v-model.number converts the age input when possible.

**Where:** app/pages/employees/new.vue — script setup

```js
const form = reactive({ name: '', position: '', age: 18 })
// Inputs: v-model="form.name", v-model="form.position", v-model.number="form.age"
```

### 3. Submit handling

submit.prevent avoids the browser’s default navigation while your handler processes the form.

**Where:** app/pages/employees/new.vue

```vue
<script setup>
const name = ref('')
function submit() { console.log('Submitted:', name.value) }
</script>
<template><form @submit.prevent="submit"><input v-model="name" aria-label="Name" /><button>Submit</button></form></template>
```

### 4. API integration

Send a POST inside a handler, display failures, and navigate only after success.

**Where:** app/pages/employees/new.vue — script setup

```js
const form = reactive({ name: '', position: '', age: 18 })
const errorMessage = ref('')
async function submit() {
  errorMessage.value = ''
  try {
    await $fetch('/api/employees', { method: 'POST', body: { ...form } })
    await navigateTo('/employees')
  } catch { errorMessage.value = 'Could not save employee. Please try again.' }
}
```
## Simple example

Bind name, position, and age fields, then submit them together.

## Remember

- Prevent normal form navigation when handling submission in JavaScript.

## Best practices and edge cases

- Use useFetch for an HTTP resource or useAsyncData with a custom fetcher during setup. Their payload integration avoids repeating the initial request during hydration.
- Use $fetch for user-triggered mutations such as submitting a form, then refresh the affected list after success.
- Pass a getter or computed URL when a request depends on a route parameter. Handle pending, error, empty, and successful results separately.
- Calls sharing a data key share state. Keep their important options consistent and avoid keys that mix results from different users.
- During SSR, relative useFetch requests can forward request context; a plain server-side $fetch does not automatically forward the browser’s cookies.

## Official documentation

- [Nuxt 4: Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
