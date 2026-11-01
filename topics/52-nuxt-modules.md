# 52. Nuxt modules

Course section: 4: Building

A **Nuxt module** adds an integration, such as image handling or a sitemap. Modules can register components, add configuration, and set up other tools when Nuxt starts or builds.

An app plugin runs as part of the Vue app's startup. A module works on Nuxt's setup and may register plugins for you.

## Add a sitemap

A sitemap is a machine-readable list of public page addresses. Search engines can use it to discover pages.

**Additional walkthrough:** Use the public `render-lab` project. The current Sitemap module requires Nuxt 4.6 or newer within Nuxt 4, and Node 22.22.3+, 24.15.0+, or 26+. Check compatibility before installing.

From the project root, run:

```sh
npx nuxt module add sitemap
```

The command installs the package and updates `nuxt.config.ts`. Check that the existing `modules` list contains `'@nuxtjs/sitemap'` once. Preserve other settings.

Add the public site address inside the same configuration object:

```ts
site: { url: 'https://example.com' }
```

`example.com` is an illustrative address. Replace it with your real public domain before publishing; do not invent one for local testing.

Start `npm run dev` and open `/sitemap.xml`. You should see XML describing discovered page addresses. Check that only intended public pages are listed. A sitemap does not create missing pages and is not access control.

Nuxt's module catalogue links to each module's own documentation. Read that documentation for package-specific requirements; the Nuxt core guide cannot specify every integration. After adding a module, run your project's build command to check that its setup works beyond development.

## Official documentation

- [Nuxt 4: Modules](https://nuxt.com/docs/4.x/guide/concepts/modules)
- [Nuxt 4: Module command](https://nuxt.com/docs/4.x/api/commands/module)
- [Nuxt Sitemap: Installation (package reference)](https://nuxtseo.com/docs/sitemap/getting-started/installation)

[Back to course index](00-course-index.md)
