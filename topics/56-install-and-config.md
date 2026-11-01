# 56. Install and Config

Course section: 5: Authentication

**Authentication** checks who someone is. A **session** lets later requests recognise the signed-in person without asking for their password every time.

## Create the event planner

**Additional working example:** Start a separate project for topics 56–78:

```sh
npm create nuxt@latest evento
cd evento
npm install @nuxt/ui@4 tailwindcss mongoose yup
npx nuxt module add auth-utils
npx nuxt module add pinia
```

Use Nuxt 4.6 or newer within Nuxt 4 and a compatible Node LTS release. These examples use Nuxt Auth Utils 0.6 and Nuxt UI 4. Check the installed versions in `package.json` and keep the lockfile.

Nuxt UI supplies styled components. Pinia supplies shared app state. Mongoose connects server code to MongoDB. Yup checks input. The later lessons explain each when it is used.

Use this configuration in the root `nuxt.config.ts`, preserving any necessary generated settings:

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-auth-utils', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: { mongodbUri: '' }
})
```

Create `app/assets/css/main.css`:

```css
@import "tailwindcss";
@import "@nuxt/ui";
```

Replace `app/app.vue` with:

```vue
<template>
  <UApp><NuxtPage /></UApp>
</template>
```

Create `app/pages/index.vue`:

```vue
<template>
  <main><h1>EventO</h1><p>Keep your meetups in one place.</p></main>
</template>
```

Run `npm run dev` and open the printed address. You should see EventO. No database is needed for this first screen.

## Give sessions a private secret

Generate a random value in your terminal:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Save the generated value in the root `.env` as `NUXT_APP_SECRET=...`, replacing the dots. Keep `.env` ignored by Git and never put the value in page code. Supply the same environment setting to a deployed server; the built server does not automatically read `.env`.

Version note: Nuxt's authentication recipe still describes `NUXT_SESSION_PASSWORD`. Auth Utils 0.6's package documentation replaces it with `NUXT_APP_SECRET` and requires Nuxt 4.6+. These examples follow the package's current setup. Do not mix the two versions' settings.

Auth Utils needs a running Nuxt server. Use a server build for the finished app; static generation cannot run its session endpoints. The MongoDB connection is added in topics 60–61.

## Official documentation

- [Nuxt 4: Sessions and authentication](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Nuxt 4: Modules](https://nuxt.com/docs/4.x/guide/concepts/modules)
- [Auth Utils: requirements and migration](https://github.com/atinux/nuxt-auth-utils#requirements)
- [Nuxt UI: Nuxt installation](https://ui.nuxt.com/docs/getting-started/installation/nuxt)
- [Pinia: Nuxt installation](https://pinia.vuejs.org/ssr/nuxt.html)

[Back to course index](00-course-index.md)
