# 18. Custom components and Profile

Course section: 2: The Pages

A reusable card becomes more useful when each page can give it different information. Those inputs are called **props**.

**Additional example:** Create `app/components/profile/Card.vue`:

```vue
<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <article>
    <h2>{{ name }}</h2>
    <p>Book club member</p>
  </article>
</template>
```

Create `app/pages/profile.vue`:

```vue
<template>
  <main>
    <h1>Readers</h1>
    <ProfileCard name="Asha" />
    <ProfileCard name="Sam" />
  </main>
</template>
```

At `/profile`, you should see two cards. `defineProps` declares the input: `String` means text, and `required: true` asks callers to supply it. The page supplies `name`; the card displays it. Props belong to the caller, so the card should not change them directly.

Nuxt combines the folder `profile` with the file `Card.vue` to create the name `ProfileCard`.

## Optional: change component names

Nuxt lets you ignore folder prefixes. Merge this setting into the existing object in the root `nuxt.config.ts`:

```ts
components: [{ path: '~/components', pathPrefix: false }]
```

This is a configuration fragment, not a whole file. `~` points to `app/` in the standard Nuxt 4 structure. If you apply it, change both `<ProfileCard>` uses to `<Card>`. Restart the development server if discovery has not updated.

Keep the default naming unless you need this change. Two files named `Card.vue` in different folders would compete for the same name when prefixes are disabled.

## Official documentation

- [Nuxt 4: Components — names](https://nuxt.com/docs/4.x/directory-structure/app/components#component-names)
- [Vue: Props (supplementary reference)](https://vuejs.org/guide/components/props.html)

[Back to course index](00-course-index.md)
