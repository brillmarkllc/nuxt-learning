# 49. Running the build

Course section: 4: Building

## What you will learn

Build the application with its server runtime.

In this lesson, **Build** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Build:** The process that prepares application code and assets for deployment.
- **Deployment:** Making a built application available in its target hosting environment.
- **Nitro:** The server engine used by Nuxt for backend routes and deployment output.
- **Environment variable:** A setting supplied by the environment where a process runs.

## What this topic includes

Use these commands from an existing project root. Configure production environment variables before starting the built server.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Production build

Create production output with the project’s build script.

**Where:** Terminal

```sh
npm run build
```

### 2. Output directory

A standard Node server build includes a server entry and public assets.

**Where:** Build output structure

```text
.output/
  server/index.mjs
  public/
```

### 3. Local preview

Run the built Node server and test direct reloads, form submissions, and missing routes.

**Where:** Terminal

```sh
node .output/server/index.mjs
# Alternatively use the generated project’s preview script if present:
# npm run preview
```
## Simple example

The course runs `npm run build` and previews the resulting server application.

## Remember

- Development success does not replace checking the production build.

## Best practices and edge cases

- Universal rendering produces HTML on the server, then hydrates it in the browser. Initial markup must agree in both environments.
- A static deployment serves generated files and cannot execute your Nuxt API handlers. Keep a server deployment or a separately hosted backend for dynamic writes.
- Pre-rendered data is captured during the build. Keep private or frequently changing user data out of shared generated output.
- Use routeRules to choose rendering behavior for specific paths. Verify dynamic routes and direct page reloads in the production build.

## Official documentation

- [Nuxt 4: Rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
