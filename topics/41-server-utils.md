# 41. Server utils

Course section: 3: The server

A server utility keeps repeated backend work in one place. Nuxt makes exported helpers in `server/utils/` available to server handlers.

**Additional example:** Create `server/utils/publicEmployee.js`:

```js
export function publicEmployee(employee) {
  return { id: employee.id, name: employee.name, position: employee.position }
}
```

Create `server/api/demo-employee.get.js`:

```js
export default defineEventHandler(() => {
  const employee = {
    id: 1, name: 'Asha', position: 'Bookseller', privateNote: 'Internal note'
  }
  return publicEmployee(employee)
})
```

Visit `/api/demo-employee`. You should see the ID, name, and position, but no `privateNote`. The utility constructs a new object containing only the selected fields. This example does not read or change `db.json`.

Selecting response fields deliberately makes it easier to avoid exposing internal information. It does not replace checking who may access the endpoint.

Use ordinary function inputs for information the helper needs. For example, a helper that reads configuration for a request can accept `event` and call `useRuntimeConfig(event)` inside it.

Do not put this file in `app/utils/` and expect server auto-imports to find it. App and server helpers belong to separate environments. Keep database operations and private values on the server side.

## Official documentation

- [Nuxt 4: Server utilities](https://nuxt.com/docs/4.x/directory-structure/server#server-utilities)

[Back to course index](00-course-index.md)
