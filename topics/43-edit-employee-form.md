# 43. Edit employee form

Course section: 3: The server

## What you will learn

Load an existing employee into an editable form.

In this lesson, **Dynamic segment** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Dynamic segment:** A variable part of a URL path, represented by a filename such as [id].vue.
- **Reactive value:** A value Vue tracks so dependent UI or calculations can update when it changes.
- **v-model:** Vue’s directive for connecting an input field to application state.
- **Pending state:** The period while a request or action is still in progress.

## What this topic includes

Assume GET /api/employees/:id returns { id, name, position }. A compatible GET proxy can be created using lesson 45. Page fragments are steps in app/pages/employees/[id]/edit.vue.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Dynamic edit page

The filename identifies the record to edit: /employees/1/edit.

**Where:** app/pages/employees/[id]/edit.vue

```vue
<template><h1>Edit employee</h1></template>
```

### 2. Fetching by ID

A getter URL keeps fetching connected to the current route ID.

**Where:** Page — script setup

```js
const route = useRoute()
const { data: employee, status, error } = await useFetch(() => `/api/employees/${encodeURIComponent(String(route.params.id))}`)
```

### 3. Initial form values

Copy loaded values into editable state. Do not overwrite user edits on every keystroke.

**Where:** Page — script setup, after the fetching example

```js
const form = reactive({ name: '', position: '' })
watch(employee, value => {
  if (value) { form.name = value.name; form.position = value.position ?? '' }
}, { immediate: true })
```

### 4. Loading state

Wait for data before showing the editing controls and report load errors separately.

**Where:** Page template, with the previous scripts

```vue
<template><main><p v-if="error">Could not load employee</p><p v-else-if="status === 'pending'">Loading…</p><form v-else-if="employee"><input v-model="form.name" aria-label="Name" /><input v-model="form.position" aria-label="Position" /></form></main></template>
```
## Simple example

Open employee 42, fetch its record, and prefill the name field.

## Remember

- Render loading and missing-record states before accessing the fetched fields.

## Best practices and edge cases

- Use app/pages in the Nuxt 4 application structure. A parent page that displays nested child pages needs a NuxtPage outlet.
- A page should have a single root element for page transitions. HTML comments also count when diagnosing multiple-root issues.
- Use Nuxt’s useRoute rather than importing it directly from vue-router; route updates are coordinated with Nuxt page rendering.
- Read a changing route parameter reactively. A value copied once during setup may become stale when navigation reuses a component.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
