# 51. Route rules

Course section: 4: Building

## What you will learn

Configure rendering behavior by URL pattern.

In this lesson, **Route rules** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Route rules:** Configuration that chooses behavior, such as prerendering, for matching URL paths.
- **Prerendering:** Creating a route’s HTML ahead of requests, usually during the build.
- **Caching:** Reusing a saved result instead of doing the same work again.
- **Route:** A rule connecting a URL path to a page or server handler.

## What this topic includes

These configurations are alternatives. Build and serve with a runtime supporting the selected rules.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. RouteRules

routeRules maps route patterns to behavior.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ routeRules: { '/about': { prerender: true } } })
```

### 2. Route targeting

A wildcard targets a section. Never apply public shared caching to authenticated personal responses.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ routeRules: { '/account/**': { prerender: false } } })
```

### 3. Prerender options

Use a server build with these rules so dynamic routes still have their server runtime.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ routeRules: { '/': { prerender: true }, '/events/**': { prerender: false } } })
```
## Simple example

A route rule can mark `/about` for pre-rendering.

## Remember

- Rules apply to matching paths; review broad patterns carefully.

## Best practices and edge cases

- Universal rendering produces HTML on the server, then hydrates it in the browser. Initial markup must agree in both environments.
- A static deployment serves generated files and cannot execute your Nuxt API handlers. Keep a server deployment or a separately hosted backend for dynamic writes.
- Pre-rendered data is captured during the build. Keep private or frequently changing user data out of shared generated output.
- Use routeRules to choose rendering behavior for specific paths. Verify dynamic routes and direct page reloads in the production build.

## Official documentation

- [Nuxt 4: Rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
