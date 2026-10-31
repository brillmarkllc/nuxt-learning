# 42. More about H3.JS

Course section: 3: The server

**H3** supplies many of the request and response helpers used by Nuxt's server. You already used several: `readBody`, `getQuery`, and `getRouterParam`.

A request asks the server to do something; a response carries the result. The `event` passed to a handler represents that request and gives helpers the information they need.

| Helper | Purpose |
| --- | --- |
| `getQuery(event)` | Read values after `?` in the address |
| `await readBody(event)` | Read submitted content |
| `getRouterParam(event, 'id')` | Read a changing path value |
| `parseCookies(event)` | Read incoming cookies |
| `setResponseStatus(event, 201)` | Choose the response status |

## A preference cookie

**Additional example:** Create `server/api/theme.post.js`:

```js
export default defineEventHandler((event) => {
  setCookie(event, 'theme', 'dark', { path: '/', sameSite: 'lax', maxAge: 86400 })
  return { theme: 'dark' }
})
```

Create `server/api/theme.get.js`:

```js
export default defineEventHandler((event) => {
  return { theme: getCookie(event, 'theme') === 'dark' ? 'dark' : 'light' }
})
```

In the browser console on your Nuxt site, run:

```js
await fetch('/api/theme', { method: 'POST' }).then(response => response.json())
```

Then open `/api/theme`: it should return `dark`. The POST response asks the browser to store a cookie; the next GET sends it back. `maxAge` sets its lifetime in seconds. The example does not change the page colours.

Cookie input is not proof that someone is signed in. Use verified sessions for identity.

For a controlled failure, a handler can throw `createError({ status: 503, statusText: 'Temporarily unavailable' })`. Status **503** indicates an unavailable service. Keep public error messages short and avoid exposing private configuration.

H3 has its own versions. Follow the helpers documented for your Nuxt version instead of copying a standalone H3 server setup into a Nuxt app.

## Official documentation

- [Nuxt 4: Server helpers](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: createError](https://nuxt.com/docs/4.x/api/utils/create-error)
- [H3: Cookie helpers (supplementary reference)](https://h3.dev/utils/cookie)

[Back to course index](00-course-index.md)
