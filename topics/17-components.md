# 17. Components

Course section: 2: The Pages

## What you will learn

Split a page into reusable visual pieces.

In this lesson, **Component** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Component:** A reusable piece of UI containing markup, behavior, and optional styles.
- **Template:** The markup describing what a Vue component displays; the course also uses this word for starter project files.
- **Auto-import:** Nuxt making supported components or helpers available without a manual import statement.
- **Vue:** A JavaScript framework for building interfaces from reusable components.

## What this topic includes

Use the component and page examples together. No manual import is needed in the page.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Components directory

A component accepts a title prop and renders a reusable card.

**Where:** app/components/WelcomeCard.vue

```vue
<script setup>
defineProps({ title: { type: String, default: 'Welcome' } })
</script>
<template><article><h2>{{ title }}</h2></article></template>
```

### 2. Auto-imports

Nuxt finds the component in app/components and makes it available in this template.

**Where:** app/pages/index.vue

```vue
<template><WelcomeCard title="Your first event" /></template>
```

### 3. Component naming

Nested folders affect the generated component name. This file is used as ProfileUserBadge.

**Where:** app/components/profile/UserBadge.vue and its usage

```vue
<!-- app/components/profile/UserBadge.vue -->
<template><span>Member</span></template>
<!-- In a page template: <ProfileUserBadge /> -->
```
## Simple example

Put a reusable header in `app/components/AppHeader.vue` and render `<AppHeader />`.

## Remember

- Keep reusable UI separate from route-specific page logic.

## Best practices and edge cases

- Component names can include folder prefixes; choose names that remain unique when you change pathPrefix configuration.
- The Lazy prefix enables dynamic importing. Combine it with conditional rendering when the component should load only after user interaction.
- Lazy loading code does not automatically defer hydration. Delayed hydration is a separate optimization with its own triggers.

## Official documentation

- [Nuxt 4: Components](https://nuxt.com/docs/4.x/directory-structure/app/components)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
