# 53. Prefetching

Course section: 4: Building

**Prefetching** loads resources a visitor may need before they click a link. This can make the next page feel quicker, at the cost of doing some network work early.

`NuxtLink` normally considers prefetching internal links when they become visible. Nuxt avoids some unsuitable conditions, such as an offline or very slow connection. Prefetching prepares resources; it does not mean every request a page might make has already finished.

**Additional example:** In `render-lab`, create `app/pages/prefetch-demo.vue`:

```vue
<template>
  <main>
    <h1>Three ways to prepare a link</h1>
    <p><NuxtLink to="/about">About: default behaviour</NuxtLink></p>
    <p>
      <NuxtLink to="/books/101" prefetch-on="interaction">
        Book 101: prepare on hover or focus
      </NuxtLink>
    </p>
    <p>
      <NuxtLink to="/books/102" no-prefetch>
        Book 102: load when opened
      </NuxtLink>
    </p>
  </main>
</template>
```

Keep the destination pages from topics 47 and 50. Build and run the server as in topic 49. Open `/prefetch-demo` and inspect the browser's Network panel. Hover over or keyboard-focus the second link, then follow it. The third link should not ask Nuxt to prefetch merely because it is shown.

Cached resources can make requests hard to spot, so use a fresh browser session when comparing behaviour. Development mode is not a reliable substitute for this production check.

Keep the default unless there is a reason to change it. Interaction-based prefetching can suit a large menu with many rarely used destinations. Disabling it on every link may make navigation slower.

## Official documentation

- [Nuxt 4: NuxtLink — prefetch links](https://nuxt.com/docs/4.x/api/components/nuxt-link#prefetch-links)

[Back to course index](00-course-index.md)
