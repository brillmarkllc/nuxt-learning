# 45. Employee by ID page

Course section: 3: The server

A details page displays one employee. The address chooses the ID; the server determines whether a matching record exists.

**Additional working example:** Reuse `server/api/employees/[id].get.js` from topic 43. Create `app/pages/employees/[id]/index.vue` beside `edit.vue`:

```vue
<script setup>
const route = useRoute()
const { data: employee, status, error } = await useFetch(
  () => `/api/employees/${encodeURIComponent(String(route.params.id))}`
)
</script>

<template>
  <main>
    <p v-if="status === 'pending'">Loading employee…</p>
    <p v-else-if="error">Employee unavailable. Check the ID and data service.</p>
    <article v-else-if="employee">
      <h1>{{ employee.name }}</h1>
      <p>Position: {{ employee.position }}</p>
      <p>Age: {{ employee.age }}</p>
      <NuxtLink :to="`/employees/${employee.id}/edit`">Edit employee</NuxtLink>
    </article>
    <NuxtLink to="/employees">Back to employees</NuxtLink>
  </main>
</template>
```

Visit `/employees/1`. You should see Asha's details, including any changes saved in topic 44. Follow the edit link and return to check the updated values.

Using `[id]/index.vue` gives `/employees/1` its own page while `[id]/edit.vue` gives `/employees/1/edit` a separate page. Do not also create `[id].vue` unless you intend to introduce a shared parent with a nested page outlet.

To link from the list, replace its employee list item's contents with:

```vue
<NuxtLink :to="`/employees/${employee.id}`">{{ employee.name }}</NuxtLink>
```

Keep that link inside the existing `v-for` list item. Try a numeric ID absent from `db.json`; the API returns 404 and the page shows its unavailable message instead of trying to read missing fields.

## Official documentation

- [Nuxt 4: Pages — dynamic and nested routes](https://nuxt.com/docs/4.x/directory-structure/app/pages)
- [Nuxt 4: Data fetching — computed URL](https://nuxt.com/docs/4.x/getting-started/data-fetching#computed-url)
- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

[Back to course index](00-course-index.md)
