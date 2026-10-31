# 34. API Routes part 2

Course section: 3: The server

Your Nuxt API can act as a middle step between a page and another service:

`Employee page → /api/employees → local JSON Server`

This keeps the data-service address in server configuration and gives you a place to check input or choose which fields to return. It does not automatically add access control.

The list handler from topic 31 already uses this pattern. Keep JSON Server running and keep `runtimeConfig.employeeApiBase` from topic 30.

**Additional example:** Create `server/api/employees/count.get.js`:

```js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try {
    const employees = await $fetch(`${config.employeeApiBase}/employees`)
    return { total: employees.length }
  } catch {
    throw createError({ status: 502, statusText: 'Employee service unavailable' })
  }
})
```

Open `/api/employees/count`. With the initial data, the result is `{"total":1}`. The handler loads the list but only returns its count. `length` is the number of items in the list.

`try` runs the request; `catch` handles a failure. Status **502** tells the caller that this server could not obtain a usable result from the service it relies on. Stop JSON Server briefly to see that response, then restart it.

Use `$fetch` inside a server handler. `useFetch` is for Vue/Nuxt page setup and its associated page-data state.

Keep collection operations together under `server/api/employees/`. Later files such as `index.post.js` and `[id].get.js` will add new operations without changing the list endpoint's address.

## Official documentation

- [Nuxt 4: Server — runtime config and error handling](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

[Back to course index](00-course-index.md)
