# 55. Nuxt Image

Course section: 4: Building

## What you will learn

Use the image module to improve image delivery.

In this lesson, **Nuxt Image** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Nuxt Image:** An optional Nuxt module for optimized image delivery.
- **Asset:** A file such as an image, font, or stylesheet used by the application.
- **Alt text:** A written image description used when an image cannot be seen or loaded.
- **Lazy loading:** Downloading code or another resource only when it is needed.

## What this topic includes

Put an image at public/images/horse.jpg. Install the optional image module before using NuxtImg.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Nuxt Image

Nuxt Image must be installed and registered before the component is available.

**Where:** Terminal

```sh
npx nuxt module add image
```

### 2. NuxtImg

NuxtImg references a public image using a root-relative URL.

**Where:** app/pages/gallery.vue

```vue
<template><NuxtImg src="/images/horse.jpg" alt="A horse in a field" /></template>
```

### 3. Dimensions

Width and height reserve layout space and help the module choose an output size.

**Where:** app/pages/gallery.vue

```vue
<template><NuxtImg src="/images/horse.jpg" alt="A horse in a field" width="800" height="600" /></template>
```

### 4. Optimization

Responsive sizes and a quality setting reduce unnecessary transfer for smaller displays.

**Where:** app/pages/gallery.vue

```vue
<template><NuxtImg src="/images/horse.jpg" alt="A horse in a field" width="800" height="600" sizes="100vw sm:50vw" quality="80" /></template>
```
## Simple example

Display a public horse image through NuxtImg with a descriptive alt text.

## Remember

- The module must be configured; image paths should match their public location.

## Best practices and edge cases

- Give images dimensions to reserve layout space and use meaningful alt text. Avoid downloading desktop-sized images for a small mobile display.
- Nuxt Image is a separate module with provider and deployment requirements; verify its output on the actual hosting environment.
- Measure the production application before adding optimizations. Initial download size and work during hydration both affect responsiveness.

## Practical tip

Do not lazy-load the image that is the main content visible immediately on page load; prioritize the image users need first.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Performance](https://nuxt.com/docs/4.x/guide/best-practices/performance)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
