# 57. App Header

Course section: 5: Authentication

A shared header gives every page a consistent way home. Put the header in a component and render it through a layout.

**Additional working example:** In `evento`, create `app/components/AppHeader.vue`:

```vue
<template>
  <header class="p-4 border-b">
    <nav aria-label="Main" class="flex gap-4 items-center">
      <UButton to="/" variant="ghost">EventO</UButton>
      <NuxtLink to="/">Home</NuxtLink>
    </nav>
  </header>
</template>
```

`UButton` comes from the installed Nuxt UI module. Its `to` value makes it a link. The `class` values are Tailwind styling shortcuts for spacing, a border, and arranging items in a row. They are optional to the navigation behaviour.

Create `app/layouts/default.vue`:

```vue
<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>
```

Update `app/app.vue`:

```vue
<template>
  <UApp>
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </UApp>
</template>
```

Open the home page. You should see the EventO header above the page content. Nuxt discovers `AppHeader` automatically. The layout's slot receives the active page.

The header initially links only to existing pages. Add the sign-up and sign-in links when those pages are created. Topic 68 makes the navigation respond to the verified session.

## Official documentation

- [Nuxt 4: Components](https://nuxt.com/docs/4.x/directory-structure/app/components)
- [Nuxt 4: Layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)
- [Nuxt 4: NuxtLink](https://nuxt.com/docs/4.x/api/components/nuxt-link)
- [Nuxt UI: Button](https://ui.nuxt.com/docs/components/button)

[Back to course index](00-course-index.md)
