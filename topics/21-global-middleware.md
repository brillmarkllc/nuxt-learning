# 21. Global middleware

Course section: 2: The Pages

## What you will learn

Run route logic for every navigation.

In this lesson, **Middleware** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Middleware:** Code that runs before a route or request handler to perform checks or add context.
- **Route guard:** A navigation check that can allow, redirect, or stop a page visit.
- **Redirect:** Sending a visitor or request to another location.
- **SSR:** Server-side rendering: creating a page’s initial HTML on the server.

## What this topic includes

These middleware files illustrate independent checks. The logging middleware is optional; do not log sensitive URLs or cookies.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Global route middleware

A global middleware runs for every page navigation; to and from describe the navigation.

**Where:** app/middleware/visit.global.js

```js
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Navigation:', from.path, '→', to.path)
})
```

### 2. Naming convention

The .global suffix enables automatic execution without adding page metadata.

**Where:** app/middleware/legacy.global.js

```js
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/old-events') return navigateTo('/events', { redirectCode: 301 })
})
```

### 3. Navigation checks

Return a redirect only for the matching path so you do not create a redirect loop.

**Where:** app/middleware/check.global.js

```js
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/closed-registration') return navigateTo('/about')
})
```
## Simple example

A file named `audit.global.js` can log the destination route.

## Remember

- Route middleware may run during server rendering and in the browser; avoid unguarded browser-only APIs.

## Best practices and edge cases

- Return navigateTo or abortNavigation from middleware when navigation should stop or redirect.
- Use the to and from arguments inside route middleware instead of useRoute. Guard against redirects back to the same destination.
- Initial route middleware can execute during SSR and again during hydration. Keep repeated work and browser-only APIs under control.
- A navigation guard does not secure an API: check authentication and authorization in each protected server operation.

## Official documentation

- [Nuxt 4: Routing](https://nuxt.com/docs/4.x/getting-started/routing)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
