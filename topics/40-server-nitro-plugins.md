# 40. Server Nitro plugins

Course section: 3: The server

**Nitro** is Nuxt's server engine. A Nitro plugin runs when a server instance starts and can register functions to run at later events. Those event connections are called **hooks**.

**Additional example:** Create `server/plugins/observe.js`:

```js
export default defineNitroPlugin((nitroApp) => {
  console.log('Employee server started')
  nitroApp.hooks.hook('error', () => {
    console.error('A server request failed')
  })
})
```

Restart `npm run dev`. Look in the server terminal for the startup message. The second function is registered now but runs only when Nitro reports an error.

To try it locally, add a temporary `server/api/plugin-test.get.js`:

```js
export default defineEventHandler(() => {
  throw new Error('Deliberate local test')
})
```

Request `/api/plugin-test`, then check the terminal for the error-hook message. Remove this deliberately failing test endpoint afterward.

Nuxt automatically discovers files in `server/plugins/`; you do not list them in the app's `plugins` setting. This is different from `app/plugins/`, which sets up the Vue application.

“Once at startup” means once for that server instance. Restarts, development reloads, and hosting that starts new instances can run it again. Do not use this as a guarantee that a database operation happens only once forever.

Source gap: the Nitro plugin guide linked by Nuxt at `https://nitro.build/guide/plugins` returned 404 during this rewrite. The example above is based on Nuxt's own server and lifecycle-hook references, which were accessible.

## Official documentation

- [Nuxt 4: Server plugins](https://nuxt.com/docs/4.x/directory-structure/server#server-plugins)
- [Nuxt 4: Nitro runtime hooks](https://nuxt.com/docs/4.x/api/advanced/hooks#nitro-app-hooks-runtime-server-side)
- [Nuxt 4: Lifecycle](https://nuxt.com/docs/4.x/guide/concepts/nuxt-lifecycle)

[Back to course index](00-course-index.md)
