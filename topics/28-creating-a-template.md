# 28. Creating a template

Course section: 3: The server

## What you will learn

Prepare a small project for server-side exercises.

In this lesson, **Template** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Template:** The markup describing what a Vue component displays; the course also uses this word for starter project files.
- **Scaffolding:** Generating the starting files and folders for a project.
- **CRUD:** Create, read, update, and delete: the four basic operations for stored records.
- **Mock API:** A practice API that imitates a real service without its full production infrastructure.

## What this topic includes

These examples build a minimal employee practice skeleton. They do not install a database yet.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Starter project

Start a separate project for server exercises and move into it.

**Where:** Terminal

```sh
npm create nuxt@latest employee-lab
cd employee-lab
```

### 2. Employee pages

Create an employee list page before connecting its API.

**Where:** app/pages/employees/index.vue

```vue
<template><main><h1>Employees</h1><NuxtLink to="/employees/new">Add employee</NuxtLink></main></template>
```

### 3. Shared template

The shared template holds navigation around each page. app.vue must use NuxtLayout around NuxtPage.

**Where:** app/layouts/default.vue

```vue
<template><div><header><NuxtLink to="/employees">Employee lab</NuxtLink></header><slot /></div></template>
```

### 4. Practice structure

Keep page UI, reusable UI, and server handlers in their respective directories.

**Where:** Project structure

```text
app/
  app.vue
  layouts/default.vue
  pages/employees/index.vue
  pages/employees/new.vue
server/
  api/employees/index.get.js
  api/employees/index.post.js
```
## Simple example

Create employee list, add, and edit pages before wiring their API calls.

## Remember

- The initial template is a learning scaffold, not a complete application.

## Best practices and edge cases

- Use the Node.js version required by the Nuxt installation guide and keep a lockfile so teammates install the same dependencies.
- Run development commands from the project root. Inspect package.json scripts before assuming a build or preview command exists.
- Use the lesson repository branch matching the exercise; do not overwrite an existing project when scaffolding.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Installation](https://nuxt.com/docs/4.x/getting-started/installation)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
