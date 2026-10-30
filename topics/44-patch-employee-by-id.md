# 44. Patch employee by ID

Course section: 3: The server

## What you will learn

Update selected fields of an employee.

In this lesson, **PATCH** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **PATCH:** An HTTP method for changing selected fields of a resource.
- **Parameter:** A value extracted from a matched route, such as 42 from /users/42.
- **Request body:** Data sent inside an HTTP request, often used for form submissions.
- **Validation:** Checking that input meets your rules before accepting or storing it.

## What this topic includes

Run the mock API from lesson 30 and configure employeeApiBase from lesson 34. The code uses an ID query parameter to match the course lesson; later examples may use a path ID.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. PATCH handler

This complete PATCH handler validates its input and changes only the allowed position field.

**Where:** server/api/employees/by-id.patch.js

```js
export default defineEventHandler(async event => {
  const { id } = getQuery(event)
  if (typeof id !== 'string' || !/^\d+$/.test(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  const body = await readBody(event)
  if (typeof body?.position !== 'string' || !body.position.trim()) throw createError({ statusCode: 400, statusMessage: 'Position required' })
  const config = useRuntimeConfig(event)
  return await $fetch(`${config.employeeApiBase}/employees/${id}`, { method: 'PATCH', body: { position: body.position.trim() } })
})
```

### 2. ID query

The ID is supplied in the query string, separate from the changed fields in the body.

**Where:** Terminal

```sh
curl 'http://localhost:3000/api/employees/by-id?id=1' -X PATCH -H 'Content-Type: application/json' -d '{"position":"Team lead"}'
```

### 3. Request body

Send only fields that the server permits; the server still validates the body independently.

**Where:** A page — script setup

```js
async function updatePosition() {
  return await $fetch('/api/employees/by-id', { method: 'PATCH', query: { id: '1' }, body: { position: 'Team lead' } })
}
```

### 4. Database update

Read the mock database after updating it; the returned position should now be Team lead.

**Where:** Terminal

```sh
curl http://localhost:3001/employees/1
```
## Simple example

Send an employee ID and a changed position to the PATCH endpoint.

## Remember

- Validate both the target ID and the fields that may be changed.

## Best practices and edge cases

- Use useFetch for an HTTP resource or useAsyncData with a custom fetcher during setup. Their payload integration avoids repeating the initial request during hydration.
- Use $fetch for user-triggered mutations such as submitting a form, then refresh the affected list after success.
- Pass a getter or computed URL when a request depends on a route parameter. Handle pending, error, empty, and successful results separately.
- Calls sharing a data key share state. Keep their important options consistent and avoid keys that mix results from different users.
- During SSR, relative useFetch requests can forward request context; a plain server-side $fetch does not automatically forward the browser’s cookies.

## Official documentation

- [Nuxt 4: Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
