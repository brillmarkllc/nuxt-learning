# 47. Prerender

Course section: 4: Building

## What you will learn

Generate HTML ahead of incoming requests.

In this lesson, **Prerendering** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Prerendering:** Creating a route’s HTML ahead of requests, usually during the build.
- **Build:** The process that prepares application code and assets for deployment.
- **SSR:** Server-side rendering: creating a page’s initial HTML on the server.
- **Static hosting:** Hosting that serves generated files without running your Nuxt server handlers.

## What this topic includes

Create an about page before generating. These examples describe static output, which does not run your server API handlers.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Build-time rendering

Mark the public about page for generation during the build.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ routeRules: { '/about': { prerender: true } } })
```

### 2. Static output

The public directory contains generated HTML and browser assets; it is the static hosting artifact.

**Where:** Generated output structure

```text
.output/public/
  about/index.html
  _nuxt/
# Exact files depend on your configured routes and build.
```

### 3. Build commands

Generate static output using Nuxt’s CLI. Use a server build instead if your app needs its server endpoints.

**Where:** Terminal

```sh
npx nuxt generate
```
## Simple example

A public about page can be generated as HTML during the build.

## Remember

- Build-time data is a snapshot and does not automatically stay fresh.

## Best practices and edge cases

- Universal rendering produces HTML on the server, then hydrates it in the browser. Initial markup must agree in both environments.
- A static deployment serves generated files and cannot execute your Nuxt API handlers. Keep a server deployment or a separately hosted backend for dynamic writes.
- Pre-rendered data is captured during the build. Keep private or frequently changing user data out of shared generated output.
- Use routeRules to choose rendering behavior for specific paths. Verify dynamic routes and direct page reloads in the production build.

## Official documentation

- [Nuxt 4: Rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
