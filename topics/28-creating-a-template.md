# 28. Creating a template

Course section: 3: The server

A starter template is a small working project you can build on. Here, “template” means starting project files, not the `<template>` section of a Vue component.

## Start the employee practice app

**Additional working example:** Create a separate project so the earlier page experiments do not interfere:

```sh
npm create nuxt@latest employee-lab
cd employee-lab
```

Choose npm, confirm the generated project uses Nuxt 4, and run `npm install` if setup has not installed packages.

Replace `app/app.vue` with:

```vue
<template>
  <div>
    <header><NuxtLink to="/employees">Employee list</NuxtLink></header>
    <NuxtPage />
  </div>
</template>
```

Create `app/pages/index.vue`:

```vue
<template>
  <main>
    <h1>Employee practice app</h1>
    <NuxtLink to="/employees">Open employees</NuxtLink>
  </main>
</template>
```

Create `app/pages/employees/index.vue`:

```vue
<template>
  <main><h1>Employees</h1><p>No data connected yet.</p></main>
</template>
```

Run `npm run dev` and visit `/employees`. You should see the shared header and the placeholder message. Keep using this project for topics 29–54 unless an example says otherwise.

The upcoming examples will add, read, edit, and delete employee records. These four actions are often shortened to **CRUD**. Nothing is stored yet; the data service is added in topic 30.

A single shared frame fits directly in `app/app.vue`. For larger reusable project setups, Nuxt also has layers, which can share configuration and components across projects. They are not required for this small starter.

## Official documentation

- [Nuxt 4: Installation](https://nuxt.com/docs/4.x/getting-started/installation)
- [Nuxt 4: app.vue](https://nuxt.com/docs/4.x/directory-structure/app/app)
- [Nuxt 4: Layers](https://nuxt.com/docs/4.x/getting-started/layers)

[Back to course index](00-course-index.md)
