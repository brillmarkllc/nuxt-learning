# 54. Lazy loading components

Course section: 4: Building

## What you will learn

Load a component only when needed.

In this lesson, **Lazy loading** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Lazy loading:** Downloading code or another resource only when it is needed.
- **Dynamic import:** Loading a JavaScript module asynchronously rather than including it eagerly.
- **Component:** A reusable piece of UI containing markup, behavior, and optional styles.
- **Hydration:** Vue connecting JavaScript behavior to HTML that the server already rendered.

## What this topic includes

Create app/components/DetailsPanel.vue with <template><p>Extra details</p></template>. The examples below are alternatives.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Lazy component prefix

The Lazy prefix tells Nuxt to dynamically import the auto-imported component.

**Where:** app/pages/index.vue

```vue
<template><LazyDetailsPanel /></template>
```

### 2. Conditional rendering

The conditional prevents the panel from being needed until the button is clicked.

**Where:** app/pages/index.vue

```vue
<script setup>
const showDetails = ref(false)
</script>
<template><main><button @click="showDetails = true">Open details</button><LazyDetailsPanel v-if="showDetails" /></main></template>
```

### 3. Dynamic imports

Vue’s async-component helper provides an explicit dynamic import alternative.

**Where:** app/pages/index.vue

```vue
<script setup>
const Details = defineAsyncComponent(() => import('~/components/DetailsPanel.vue'))
</script>
<template><Details /></template>
```
## Simple example

Render `<LazyDetailsPanel v-if="showDetails" />` when the user opens details.

## Remember

- Lazy loading and delaying hydration are related but distinct concepts.

## Best practices and edge cases

- Component names can include folder prefixes; choose names that remain unique when you change pathPrefix configuration.
- The Lazy prefix enables dynamic importing. Combine it with conditional rendering when the component should load only after user interaction.
- Lazy loading code does not automatically defer hydration. Delayed hydration is a separate optimization with its own triggers.

## Practical tip

For a noncritical component, consider LazyDetailsPanel with hydrate-on-visible after checking that its interactions still work.

## Official documentation

- [Nuxt 4: Components](https://nuxt.com/docs/4.x/directory-structure/app/components)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
