# 42. More about H3.JS

Course section: 3: The server

## What you will learn

Recognize H3 as the HTTP layer behind server helpers.

In this lesson, **H3** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **H3:** The HTTP library underlying many Nuxt server request and response helpers.
- **Request:** A message asking a server to return data or perform an action.
- **Response:** The result a server sends back after handling a request.
- **Cookie:** A small value a browser stores and sends with matching requests.
- **HTTP status:** A response number describing an outcome, such as 200 for success or 404 for missing content.

## What this topic includes

These independent handlers illustrate H3 helpers already available in Nuxt server files.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Request events

The event represents one incoming HTTP request.

**Where:** server/api/request.get.js

```js
export default defineEventHandler(event => ({ method: event.method, path: getRequestURL(event).pathname }))
```

### 2. Cookies

Set a harmless preference cookie with a bounded lifetime.

**Where:** server/api/theme.post.js

```js
export default defineEventHandler(event => {
  setCookie(event, 'theme', 'dark', { sameSite: 'lax', path: '/', maxAge: 86400 })
  return { theme: getCookie(event, 'theme') ?? 'dark' }
})
```

### 3. Errors

A controlled server error sets an HTTP status without exposing internal stack details intentionally.

**Where:** server/api/unavailable.get.js

```js
export default defineEventHandler(() => { throw createError({ statusCode: 503, statusMessage: 'Temporarily unavailable' }) })
```

### 4. Context

Context data belongs to this request rather than a module-global user object.

**Where:** server/api/context.get.js

```js
export default defineEventHandler(event => {
  event.context.example = 'Current request only'
  return { example: event.context.example }
})
```

### 5. Helper APIs

Read query input with a helper rather than splitting the URL manually.

**Where:** server/api/search.get.js

```js
export default defineEventHandler(event => {
  const query = getQuery(event)
  return { search: typeof query.q === 'string' ? query.q : '' }
})
```
## Simple example

`getCookie(event, 'theme')` reads a cookie from the incoming request.

## Remember

- Reading a cookie does not by itself verify the identity of a user.

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
