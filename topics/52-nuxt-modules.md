# 52. Nuxt modules

Course section: 4: Building

## What you will learn

Extend Nuxt with packaged integrations.

In this lesson, **Module** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Module:** A package or integration that can extend Nuxt’s build setup and configuration.
- **Dependency:** A package your project needs to build or run.
- **Plugin:** Code that extends or initializes a running Nuxt application.
- **Build:** The process that prepares application code and assets for deployment.

## What this topic includes

This uses the optional @nuxtjs/sitemap module. Only list public routes in its output.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Modules catalog

Open the official module catalog and choose the sitemap integration.

**Where:** Terminal

```sh
# macOS; on another OS open the URL in your browser.
open https://nuxt.com/modules/sitemap
```

### 2. Installation

Install and register the sitemap module through Nuxt’s module command.

**Where:** Terminal

```sh
npx nuxt module add sitemap
```

### 3. Configuration

Set the public canonical site URL and register the installed module. Replace the sample domain.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({ modules: ['@nuxtjs/sitemap'], site: { url: 'https://example.com' } })
```

### 4. Sitemap example

Start the project, then inspect the generated sitemap in another terminal.

**Where:** Terminal

```sh
curl http://localhost:3000/sitemap.xml
# Check that public pages appear and private account routes do not.
```
## Simple example

Add a sitemap integration and configure the public routes it should expose.

## Remember

- Each module has its own setup and compatibility requirements.

## Best practices and edge cases

- A module can change build configuration and register integrations; an application plugin extends a running application. Choose the appropriate layer.
- Follow each module’s own version and configuration requirements and verify the production build after adding it.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Modules](https://nuxt.com/docs/4.x/guide/concepts/modules)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
