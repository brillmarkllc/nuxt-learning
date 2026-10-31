# 43. Edit employee form

Course section: 3: The server

An edit form starts with an existing record. First load it by ID, then copy its fields into editable state. Keep loading errors separate from save errors.

**Additional working example:** Keep the local service from topic 30 running. Create `server/api/employees/[id].get.js`:

```js
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id || !/^\d+$/.test(id)) {
    throw createError({ status: 400, statusText: 'Invalid employee ID' })
  }
  const config = useRuntimeConfig(event)
  try {
    return await $fetch(`${config.employeeApiBase}/employees/${id}`)
  } catch (error) {
    if (error.response?.status === 404) {
      throw createError({ status: 404, statusText: 'Employee not found' })
    }
    throw createError({ status: 502, statusText: 'Employee service unavailable' })
  }
})
```

The pattern `/^\d+$/` accepts only digits. The handler distinguishes a missing record from an unavailable data service.

Create `app/pages/employees/[id]/edit.vue`:

```vue
<script setup>
const route = useRoute()
const { data: employee, status, error } = await useFetch(
  () => `/api/employees/${encodeURIComponent(String(route.params.id))}`
)
const form = reactive({ name: '', position: '', age: 18 })
watch(employee, (value) => {
  if (value) {
    form.name = value.name
    form.position = value.position
    form.age = value.age
  }
}, { immediate: true })
</script>

<template>
  <main>
    <h1>Edit employee</h1>
    <p v-if="status === 'pending'">Loading…</p>
    <p v-else-if="error">Employee unavailable. Check the ID and data service.</p>
    <form v-else-if="employee" @submit.prevent>
      <p><label>Name <input v-model.trim="form.name" required maxlength="100" /></label></p>
      <p><label>Position <input v-model.trim="form.position" required maxlength="100" /></label></p>
      <p><label>Age <input v-model.number="form.age" type="number" min="18" max="100" step="1" required /></label></p>
      <p>Changes are not saved yet.</p>
    </form>
  </main>
</template>
```

Visit `/employees/1/edit`. Asha's saved values should fill the fields. Typing changes the local form only; saving is added next.

The URL function reads the current route ID, allowing Nuxt to load another record if that ID changes. `encodeURIComponent` safely places it in one URL segment. `watch` copies values when the fetched record changes; `immediate: true` also copies the first loaded result. It does not watch each keystroke, so ordinary typing is not overwritten.

Do not add `app/pages/employees/[id].vue` as a parent later without a child outlet. The detail page in topic 45 uses `[id]/index.vue` alongside this edit page.

## Official documentation

- [Nuxt 4: Server — parameters and errors](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Data fetching — computed URL](https://nuxt.com/docs/4.x/getting-started/data-fetching#computed-url)
- [Nuxt 4: Pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)

[Back to course index](00-course-index.md)
