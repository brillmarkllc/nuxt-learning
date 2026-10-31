# 39. Server middleware

Course section: 3: The server

**Server middleware** runs before a server request reaches its handler. It can inspect the request or attach information for the handler to use. It is separate from `app/middleware/`, which checks page navigation.

**Additional example:** Create `server/middleware/timing.js`:

```js
export default defineEventHandler((event) => {
  event.context.requestStartedAt = Date.now()
})
```

Create `server/api/timing.get.js`:

```js
export default defineEventHandler((event) => {
  return { startedAt: event.context.requestStartedAt }
})
```

Visit `/api/timing`. The response should contain a number: the request's starting time in milliseconds since the standard JavaScript starting date. Reload and it changes.

`event.context` is a place to keep information for this request. The middleware adds the value, and the handler reads it. Avoid storing request-specific values in a module-wide variable shared by visitors.

The middleware does not return a response. Returning ordinary data there can end the request before its intended handler runs. Add information, perform checks, or throw a deliberate error instead.

## Reading a cookie

A cookie is a value the browser sends with matching requests. Nuxt's server helpers include `parseCookies(event)`. As an optional demonstration, a handler can read a preference:

```js
const cookies = parseCookies(event)
const theme = cookies.theme === 'dark' ? 'dark' : 'light'
```

These lines belong inside a server handler. They choose between two allowed values. A user-supplied preference cookie is not proof of identity; authentication needs a verified session.

Middleware can run for many requests, not just visible page visits, so keep its work small.

## Official documentation

- [Nuxt 4: Server — middleware and cookies](https://nuxt.com/docs/4.x/directory-structure/server)

[Back to course index](00-course-index.md)
