# 22. Named and Local Middleware

Course section: 2: The Pages

## What you will learn

Apply route checks only where needed.

In this lesson, **Middleware** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Middleware:** Code that runs before a route or request handler to perform checks or add context.
- **definePageMeta:** A Nuxt compiler macro that declares route-level configuration for a page.
- **Route guard:** A navigation check that can allow, redirect, or stop a page visit.
- **Authorization:** Checking whether that user may perform an action on a particular resource.

## What this topic includes

The named example requires nuxt-auth-utils from lesson 56. The inline example is standalone.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Named middleware

A named guard only runs on pages that select it. The server API must separately check the session.

**Where:** app/middleware/auth.js

```js
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) return navigateTo('/login')
})
```

### 2. Inline middleware

Inline middleware defines a check directly on a page without a separate middleware file.

**Where:** app/pages/old-events.vue — script setup

```js
definePageMeta({ middleware: [() => navigateTo('/events')] })
```

### 3. DefinePageMeta

Metadata connects a page to the named auth middleware created above.

**Where:** app/pages/events/create.vue — script setup

```js
definePageMeta({ middleware: ['auth'] })
```
## Simple example

`definePageMeta({ middleware: ['auth'] })` attaches a named guard.

## Remember

- Route guards improve navigation but do not replace server authorization.

## Best practices and edge cases

- Return navigateTo or abortNavigation from middleware when navigation should stop or redirect.
- Use the to and from arguments inside route middleware instead of useRoute. Guard against redirects back to the same destination.
- Initial route middleware can execute during SSR and again during hydration. Keep repeated work and browser-only APIs under control.
- A navigation guard does not secure an API: check authentication and authorization in each protected server operation.

## Official documentation

- [Nuxt 4: Routing](https://nuxt.com/docs/4.x/getting-started/routing)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
