# 41. Server utils

Course section: 3: The server

## What you will learn

Reuse functions across backend files.

In this lesson, **Utility** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Utility:** A small reusable helper function, often independent of Vue.
- **Export:** Making a value or function available for another file to import.
- **Server:** The environment that receives requests, accesses private data, and sends responses.
- **Request context:** Information attached to the current server request for its handlers to use.

## What this topic includes

Use the utility and handler together. Both files stay in the server directory.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Server/utils

A server utility holds reusable backend logic.

**Where:** server/utils/cleanName.js

```js
export const cleanName = value => String(value ?? '').trim()
```

### 2. Exports

Export a function that limits the fields returned to callers.

**Where:** server/utils/pickPublicEmployee.js

```js
export function pickPublicEmployee(employee) {
  return { id: employee.id, name: employee.name }
}
```

### 3. Helper discovery

Nuxt discovers these server exports so the handler can use them without manual imports.

**Where:** server/api/demo-employee.get.js

```js
export default defineEventHandler(() => {
  const employee = { id: 1, name: cleanName(' Ada '), privateNote: 'Not returned' }
  return pickPublicEmployee(employee)
})
```
## Simple example

A server utility normalizes an employee record before a handler returns it.

## Remember

- Keep private server helpers outside the client application directory.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Authenticate the request and scope record queries to its verified owner; hiding a button or accepting a client-provided user ID does not enforce ownership.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
