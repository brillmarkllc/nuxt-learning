# 31. Fetching data

Course section: 3: The server

**Fetching data** means asking a server for information. Nuxt provides three related tools:

| Tool | Useful for |
| --- | --- |
| `useFetch` | Loading an address for a page, with loading and error state |
| `useAsyncData` | Loading through your own function, with the same page-data support |
| `$fetch` | A single request, such as saving a form or calling another service from the server |

## Load the employee list

**Additional working example:** Keep both services from topic 30 running. Create `server/api/employees/index.get.js` at the project root:

```js
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  return $fetch(`${config.employeeApiBase}/employees`)
})
```

This small server handler answers `/api/employees` by reading the local mock service. The next topics explain the server file conventions.

Replace `app/pages/employees/index.vue` with:

```vue
<script setup>
const { data: employees, status, error, refresh } = await useFetch('/api/employees')
</script>

<template>
  <main>
    <h1>Employees</h1>
    <button :disabled="status === 'pending'" @click="() => refresh()">Reload</button>
    <p v-if="status === 'pending'">Loading employees…</p>
    <p v-else-if="error">Could not load employees. Check the local data service.</p>
    <p v-else-if="!employees?.length">No employees yet.</p>
    <ul v-else>
      <li v-for="employee in employees" :key="employee.id">{{ employee.name }}</li>
    </ul>
  </main>
</template>
```

Visit `/employees`: Asha should appear. Stop JSON Server and press Reload to check the failure message, then restart it and reload again.

`data: employees` gives the returned data a clearer local name. `v-if` and `v-else-if` choose what to show. `v-for` repeats a list item for each record; `:key` gives Vue a stable identifier. `refresh()` repeats the request.

Nuxt transfers successful server-loaded data to the browser so hydration can reuse it. A bare top-level `$fetch` does not provide that transfer and can cause duplicate loading. Use `$fetch` inside submit handlers for later actions.

For a custom calculation, an alternative setup expression is:

```js
const { data: names } = await useAsyncData('employee-names', async () => {
  const rows = await $fetch('/api/employees')
  return rows.map(row => row.name)
})
```

This returns a list of names; `map` transforms each item. It is an alternative data example, not a replacement for the page above without changing its template. Calls sharing a key share state, so keep their data shape and options consistent.

## Official documentation

- [Nuxt 4: Data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Nuxt 4: Server directory](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Runtime config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

[Back to course index](00-course-index.md)
