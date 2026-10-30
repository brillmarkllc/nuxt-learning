# 18. Custom components and Profile

Course section: 2: The Pages

## What you will learn

Customize component discovery and build profile UI.

In this lesson, **Prefix** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Prefix:** A name added before another name, often derived from a component’s folder.
- **Auto-import:** Nuxt making supported components or helpers available without a manual import statement.
- **Component:** A reusable piece of UI containing markup, behavior, and optional styles.
- **Framework:** A set of tools and conventions that helps you organize and build an application.

## What this topic includes

Assume app/components/profile/Card.vue contains a simple card component. Restart the dev server after changing component configuration if discovery is stale.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Nested component names

With default discovery, the profile folder is included in the generated name.

**Where:** A page using app/components/profile/Card.vue

```vue
<template><ProfileCard /></template>
```

### 2. Path prefixes

Disable folder prefixes only if component names remain unique across the project.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({
  components: [{ path: '~/components', pathPrefix: false }],
})
```

### 3. Nuxt.config configuration

The components configuration belongs in the root config. After this change, profile/Card.vue is used as Card instead of ProfileCard.

**Where:** nuxt.config.ts and page usage

```ts
export default defineNuxtConfig({
  components: [{ path: '~/components', pathPrefix: false }],
})
// Page template: <Card />
```
## Simple example

A component inside a profile folder can receive a folder-prefixed component name.

## Remember

- Changing path-prefix behavior can create naming collisions.

## Best practices and edge cases

- Component names can include folder prefixes; choose names that remain unique when you change pathPrefix configuration.
- The Lazy prefix enables dynamic importing. Combine it with conditional rendering when the component should load only after user interaction.
- Lazy loading code does not automatically defer hydration. Delayed hydration is a separate optimization with its own triggers.

## Official documentation

- [Nuxt 4: Components](https://nuxt.com/docs/4.x/directory-structure/app/components)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
