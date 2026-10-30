# 15. Layouts

Course section: 2: The Pages

## What you will learn

Reuse the same page frame across routes.

In this lesson, **Layout** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Layout:** A reusable page frame, such as a sidebar and header around changing page content.
- **Slot:** A placeholder where a component receives content from its parent.
- **NuxtPage:** Nuxt’s component for displaying the page that matches the current route.
- **Component:** A reusable piece of UI containing markup, behavior, and optional styles.

## What this topic includes

Create these files together. To activate the named layout, add definePageMeta({ layout: "dashboard" }) to a page’s script setup.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Layouts directory

A layout is a component under the layouts folder. Its root wraps the inserted page.

**Where:** app/layouts/default.vue

```vue
<template><div><header>Learning Nuxt</header><slot /></div></template>
```

### 2. Default and named layouts

The filename becomes the named layout dashboard. Unspecified pages use default.vue.

**Where:** app/layouts/dashboard.vue

```vue
<template><div><aside>Dashboard menu</aside><main><slot /></main></div></template>
```

### 3. Slots

The slot is where the active page’s content appears inside this layout.

**Where:** app/layouts/minimal.vue

```vue
<template><main class="minimal"><slot /></main></template>
```

### 4. NuxtLayout

NuxtLayout chooses the layout and NuxtPage supplies the active page content to its slot.

**Where:** app/app.vue

```vue
<template><NuxtLayout><NuxtPage /></NuxtLayout></template>
```
## Simple example

A dashboard layout contains a sidebar and `<slot />` for page content.

## Remember

- The app must render the layout and page outlets for the layout to appear.

## Best practices and edge cases

- Render NuxtLayout around NuxtPage in app.vue and put a slot inside a reusable layout.
- Layout names are normalized to kebab-case. Select a named layout with definePageMeta.
- Layouts require a single root element; the root cannot simply be the slot itself.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
