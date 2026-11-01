# 54. Lazy loading components

Course section: 4: Building

**Lazy loading** lets Nuxt load a component's code when it is needed. It is useful for an optional panel that many visitors never open.

**Additional working example:** In `render-lab`, create `app/components/DetailsPanel.vue`:

```vue
<template>
  <section><h2>Delivery details</h2><p>Orders usually leave the shop next working day.</p></section>
</template>
```

Create `app/pages/lazy-demo.vue`:

```vue
<script setup>
const showDetails = ref(false)
</script>

<template>
  <main>
    <h1>Book delivery</h1>
    <button @click="showDetails = !showDetails" :aria-expanded="showDetails">
      {{ showDetails ? 'Hide details' : 'Show details' }}
    </button>
    <LazyDetailsPanel v-if="showDetails" />
  </main>
</template>
```

Open `/lazy-demo`. The panel starts hidden; clicking the button shows it. `!showDetails` switches between false and true. `v-if` creates the panel only when needed, and the `Lazy` prefix asks Nuxt to import its code separately. The actual filename remains `DetailsPanel.vue`.

A `<LazyDetailsPanel />` that is immediately visible still needs to load immediately. The prefix alone does not postpone visible content until a future interaction.

## Loading code and becoming interactive

**Hydration** connects browser behaviour to HTML already rendered by the server. Delaying hydration is a separate option, such as `<LazyDetailsPanel hydrate-on-visible />` for noncritical server-rendered content. That optional version replaces the conditional example; it is not needed for this hidden panel.

Delayed hydration has limitations: changing a prop can trigger hydration immediately, and only one hydration strategy applies per lazy component. Keep essential buttons and information ready when visitors need them.

An explicit `defineAsyncComponent(() => import('~/components/DetailsPanel.vue'))` is another way to load a component asynchronously. Nuxt's `Lazy` prefix is the simpler choice for components it already discovers.

## Official documentation

- [Nuxt 4: Components — dynamic imports and delayed hydration](https://nuxt.com/docs/4.x/directory-structure/app/components)

[Back to course index](00-course-index.md)
