# 47. Prerender

Course section: 4: Building

**Prerendering** prepares a page's HTML while the app is built. A host can then send that prepared file instead of creating the page for each visit. It suits public information that can wait until the next rebuild to change.

## Generate a small public site

**Additional working example:** Use a separate project named `render-lab` for topics 47–51. This keeps the employee app's changing data out of generated public files.

```sh
npm create nuxt@latest render-lab
cd render-lab
```

Choose npm and confirm the project uses Nuxt 4. Install packages if setup has not done so. Replace `app/app.vue` with:

```vue
<template><NuxtPage /></template>
```

Create `app/pages/index.vue`:

```vue
<template>
  <main>
    <h1>The bookshop</h1>
    <NuxtLink to="/about">About the shop</NuxtLink>
  </main>
</template>
```

Create `app/pages/about.vue`:

```vue
<template>
  <main><h1>About the shop</h1><p>Books selected by readers.</p></main>
</template>
```

Run:

```sh
npx nuxt generate
```

Nuxt builds the app, visits pages, and follows discoverable links. Look in `.output/public/`: it contains the generated home page, the about page, and browser assets. Topic 48 shows how to open that output.

Generating HTML does not remove interactivity: browser JavaScript can still make buttons work. However, a purely static host serves files and cannot run your Nuxt server handlers. An employee form that writes to `/api/employees` needs a running server or a separately hosted API.

Build-time data is a snapshot. Do not prerender private employee details or signed-in account pages into public output. Dynamic addresses that the crawler cannot discover need explicit configuration, covered in topic 50.

## Official documentation

- [Nuxt 4: Prerendering](https://nuxt.com/docs/4.x/getting-started/prerendering)
- [Nuxt 4: Rendering modes](https://nuxt.com/docs/4.x/guide/concepts/rendering)

[Back to course index](00-course-index.md)
