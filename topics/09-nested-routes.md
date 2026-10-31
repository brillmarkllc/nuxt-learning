# 09. Nested routes

Course section: 2: The Pages

Folders can make longer page addresses. For example, `app/pages/account/settings.vue` creates `/account/settings`.

A **nested page** can also appear inside a parent page. This is useful when account pages should share the same heading and menu.

## An account area

**Additional working example:** Keep the `app/app.vue` from topic 06. Create `app/pages/account.vue`:

```vue
<template>
  <main>
    <h1>Your account</h1>
    <nav>
      <NuxtLink to="/account">Overview</NuxtLink>
      <NuxtLink to="/account/settings">Settings</NuxtLink>
    </nav>
    <NuxtPage />
  </main>
</template>
```

Create `app/pages/account/index.vue`:

```vue
<template>
  <section><h2>Account overview</h2></section>
</template>
```

Create `app/pages/account/settings.vue`:

```vue
<template>
  <section><h2>Reading preferences</h2></section>
</template>
```

At `/account`, you should see “Your account” and “Account overview”. At `/account/settings`, the heading and menu remain while “Reading preferences” replaces the overview.

There are two places for page content: `app/app.vue` displays the account parent; the parent's `<NuxtPage />` displays its child. Without the second `<NuxtPage />`, the child has nowhere to appear.

If you only want longer addresses, you can use folders without a matching parent `.vue` file. The folder alone does not create a shared visible frame.

## Official documentation

- [Nuxt 4: Pages — nested routes](https://nuxt.com/docs/4.x/directory-structure/app/pages#nested-routes)

[Back to course index](00-course-index.md)
