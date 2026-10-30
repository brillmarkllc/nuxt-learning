# 50. Prerender configs

Course section: 4: Building

## What you will learn

Select routes to render ahead of time.

In this lesson, **Prerendering** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Prerendering:** Creating a route’s HTML ahead of requests, usually during the build.
- **Route rules:** Configuration that chooses behavior, such as prerendering, for matching URL paths.
- **SSR:** Server-side rendering: creating a page’s initial HTML on the server.
- **Caching:** Reusing a saved result instead of doing the same work again.

## What this topic includes

Create the listed public pages. Do not pre-render personal account data.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Nitro prerender configuration

Nitro can receive an explicit set of routes to generate ahead of requests.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ nitro: { prerender: { routes: ['/about', '/help'] } } })
```

### 2. Explicit route lists

Dynamic URLs that a crawler cannot discover can be listed explicitly when their content is public.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ nitro: { prerender: { routes: ['/products/1', '/products/2'] } } })
```

### 3. Mixed rendering

Generate the public about page while keeping account pages dynamic in a server deployment.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ routeRules: { '/about': { prerender: true }, '/account/**': { prerender: false } } })
```
## Simple example

Pre-render a public landing page while keeping employee mutations on the server.

## Remember

- Avoid generating private user-specific pages as shared static HTML.

## Best practices and edge cases

- Universal rendering produces HTML on the server, then hydrates it in the browser. Initial markup must agree in both environments.
- A static deployment serves generated files and cannot execute your Nuxt API handlers. Keep a server deployment or a separately hosted backend for dynamic writes.
- Pre-rendered data is captured during the build. Keep private or frequently changing user data out of shared generated output.
- Use routeRules to choose rendering behavior for specific paths. Verify dynamic routes and direct page reloads in the production build.

## Official documentation

- [Nuxt 4: Rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
