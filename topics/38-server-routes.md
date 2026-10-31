# 38. Server routes

Course section: 3: The server

A file in `server/routes/` creates a server endpoint without adding `/api` to its address. Use it when the address needs to sit outside your API area, such as a simple health check.

**Additional example:** Create `server/routes/health.get.js`:

```js
export default defineEventHandler(() => {
  return { ok: true, service: 'employee-lab' }
})
```

Open `/health` on the running Nuxt site. You should see JSON with `ok: true`. This checks that the handler responds; it does not check the database or prove every part of the app is healthy.

The same file under `server/api/health.get.js` would answer `/api/health` instead. Both locations use the same handler helpers and method endings.

For a text response, create `server/routes/greeting.get.js`:

```js
export default defineEventHandler(() => 'Hello from the employee app')
```

Visit `/greeting` to see the text. Neither response uses a Vue template or your page layout. Use `app/pages/` when you want a normal page with components and navigation.

Choose addresses that do not compete with your page routes. Server handlers and page routes are different systems; server routes do not support every advanced page-routing feature.

## Official documentation

- [Nuxt 4: Server routes](https://nuxt.com/docs/4.x/directory-structure/server#server-routes)

[Back to course index](00-course-index.md)
