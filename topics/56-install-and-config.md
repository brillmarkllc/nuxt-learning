# 56. Install and Config

Course section: 5: Authentication

## What you will learn

Prepare the authentication practice application.

In this lesson, **Nuxt UI** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Nuxt UI:** An optional library of UI components used by the course application.
- **Module:** A package or integration that can extend Nuxt’s build setup and configuration.
- **Pinia:** A Vue state-management library for sharing application data across components.
- **Authentication:** Checking who a user is, such as by verifying sign-in credentials.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.

## What this topic includes

These steps set up Nuxt UI v4, nuxt-auth-utils, Pinia, and Mongoose. Configure a real session secret before deployment. Keep all secrets outside Git.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Nuxt UI

Install Nuxt UI and Tailwind. Create the CSS file containing the two imports shown below.

**Where:** Terminal and app/assets/css/main.css

```sh
npm install @nuxt/ui tailwindcss
# app/assets/css/main.css:
# @import "tailwindcss";
# @import "@nuxt/ui";
```

### 2. Authentication utilities

Add the authentication module and generate a random value for NUXT_SESSION_PASSWORD in your environment.

**Where:** Terminal

```sh
npx nuxt module add auth-utils
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
# Put the generated value in .env as NUXT_SESSION_PASSWORD=...
```

### 3. Pinia

Add the Pinia module and the store library.

**Where:** Terminal

```sh
npm install pinia @pinia/nuxt
```

### 4. Database setup

Install Mongoose for server database models. Connection and credentials are configured in lessons 60–61.

**Where:** Terminal

```sh
npm install mongoose
```

### 5. App configuration

Register the installed modules and keep the database URI private. Wrap NuxtLayout/NuxtPage with UApp in app.vue for UI facilities such as toasts.

**Where:** nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-auth-utils', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: { mongodbUri: '' },
})
```
## Simple example

Start an event planner with a header, login page, and protected event form.

## Remember

- The lesson integrates several modules; retain compatible course dependency versions.

## Best practices and edge cases

- A module can change build configuration and register integrations; an application plugin extends a running application. Choose the appropriate layer.
- Follow each module’s own version and configuration requirements and verify the production build after adding it.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Modules](https://nuxt.com/docs/4.x/guide/concepts/modules)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Nuxt UI setup](https://nuxt.com/modules/ui)

[Back to course index](00-course-index.md)
