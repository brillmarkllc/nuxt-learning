# 70. The create Event form

Course section: 6: Practice app: EventO

## What you will learn

Collect the details for a new event.

In this lesson, **v-model** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **v-model:** Vue’s directive for connecting an input field to application state.
- **Date format:** The representation of a date, such as an ISO string or a displayed calendar date.
- **Time zone:** The regional or offset-based rules used to interpret a date and time.
- **Validation:** Checking that input meets your rules before accepting or storing it.

## What this topic includes

These snippets progressively build a form. The date field is a calendar date string (YYYY-MM-DD), not an instant in a time zone. This keeps date-only events from shifting days.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Title

Bind a title input to a reactive value.

**Where:** app/pages/events/create.vue

```vue
<script setup>
const title = ref('')
</script>
<template><label>Title <input v-model="title" maxlength="120" /></label></template>
```

### 2. Content

A textarea collects longer content as plain text.

**Where:** app/pages/events/create.vue

```vue
<script setup>
const content = ref('')
</script>
<template><label>Description <textarea v-model="content" maxlength="5000" /></label></template>
```

### 3. Date input

A native date input yields a date-only string; an empty input yields an empty string.

**Where:** app/pages/events/create.vue

```vue
<script setup>
const date = ref('')
</script>
<template><label>Date <input v-model="date" type="date" /></label></template>
```

### 4. Date formatting

For a stable date-only display, split the string instead of treating midnight UTC as local time.

**Where:** A page — script setup

```js
const date = ref('2026-11-05')
const displayDate = computed(() => {
  if (!date.value) return 'No date selected'
  const [year, month, day] = date.value.split('-')
  return `${day}/${month}/${year}`
})
```

### 5. Form state

Group form fields and normalize an empty optional date to null before sending it.

**Where:** app/pages/events/create.vue

```vue
<script setup>
const form = reactive({ title: '', content: '', date: '' })
const preview = ref(null)
function submit() { preview.value = { ...form, date: form.date || null } }
</script>
<template><form @submit.prevent="submit"><input v-model="form.title" aria-label="Title" /><textarea v-model="form.content" aria-label="Content" /><input v-model="form.date" type="date" aria-label="Date" /><button>Preview payload</button><pre>{{ preview }}</pre></form></template>
```
## Simple example

Enter “Team meetup”, a description, and a date in the event form.

## Remember

- Agree on a date representation before sending values to the API.

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
