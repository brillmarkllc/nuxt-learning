# 06. Creating an App

Course section: 2: The Pages

A Nuxt starter supplies the files and packages needed to run a website. You need Node.js and npm from topic 02.

## Create your first app

**Additional example — a small bookshop:** Open a terminal in the folder where you keep projects. Use a new folder name:

```sh
npm create nuxt@latest learner-app
cd learner-app
```

Choose npm when asked which package manager to use. If the setup did not install packages, run `npm install`. These notes target Nuxt 4: check that `package.json` lists Nuxt version 4 before continuing. The `@latest` starter can change in the future.

Open `learner-app` in your editor. This is the **project root**, the folder containing `package.json` and `nuxt.config.ts`. You can leave the generated configuration unchanged.

Replace `app/app.vue` with:

```vue
<template>
  <NuxtPage />
</template>
```

Create the `app/pages` folder and add `app/pages/index.vue`:

```vue
<template>
  <main>
    <h1>The little bookshop</h1>
    <p>Find your next favourite book.</p>
  </main>
</template>
```

`<template>` holds the visible page. `<h1>` is its main heading and `<p>` is a paragraph. `<NuxtPage />` tells Nuxt where to show the page matching the current address. Nuxt supplies that component automatically.

Start the app from the project root:

```sh
npm run dev
```

Open the address printed in the terminal, usually `http://localhost:3000`. You should see the bookshop heading. Change its text and save: the development server updates the browser while it is running. Press Ctrl+C in the terminal when you want to stop it.

Keep `package-lock.json`: it records the package versions npm installed. Do not edit generated folders such as `.nuxt`; change your source files instead.

## Official documentation

- [Nuxt 4: Installation](https://nuxt.com/docs/4.x/getting-started/installation)
- [Nuxt 4: app.vue](https://nuxt.com/docs/4.x/directory-structure/app/app)

[Back to course index](00-course-index.md)
