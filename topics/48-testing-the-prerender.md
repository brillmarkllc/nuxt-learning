# 48. Testing the Prerender

Course section: 4: Building

## What you will learn

Test the limitations of a static export.

In this lesson, **Static hosting** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Static hosting:** Hosting that serves generated files without running your Nuxt server handlers.
- **Endpoint:** A URL and HTTP method that a server handles, such as POST /api/events.
- **Deployment:** Making a built application available in its target hosting environment.
- **Prerendering:** Creating a route’s HTML ahead of requests, usually during the build.

## What this topic includes

Generate your app first with npx nuxt generate. Install no global server; the command below runs a local static preview through npx.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Static hosting

Serve only the public output to test what a static host can actually run.

**Where:** Terminal

```sh
npx serve .output/public
```

### 2. Missing server handlers

Replace PORT with the port printed by serve. This tests a route that is not backed by a running Nuxt server.

**Where:** Another terminal

```sh
curl -i http://localhost:PORT/api/employees
# A static file server cannot execute server/api/employees/index.get.js.
```

### 3. Form behavior

This test checks whether an API mutation really returns JSON; an HTML fallback is not a successful API response.

**Where:** Browser console on the static preview

```js
fetch('/api/employees', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Ada' }) })
  .then(async response => console.log(response.status, response.headers.get('content-type'), await response.text()))
```
## Simple example

A generated employee list may display while its add form fails without a running API.

## Remember

- Pure static hosting cannot execute the Nuxt server handlers bundled in a server deployment.

## Best practices and edge cases

- Universal rendering produces HTML on the server, then hydrates it in the browser. Initial markup must agree in both environments.
- A static deployment serves generated files and cannot execute your Nuxt API handlers. Keep a server deployment or a separately hosted backend for dynamic writes.
- Pre-rendered data is captured during the build. Keep private or frequently changing user data out of shared generated output.
- Use routeRules to choose rendering behavior for specific paths. Verify dynamic routes and direct page reloads in the production build.

## Official documentation

- [Nuxt 4: Rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
