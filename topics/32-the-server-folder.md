# 32. The server folder

Course section: 3: The server

The root `server/` folder holds code that handles requests. Put it beside `app/`, not inside it.

| Location | Job |
| --- | --- |
| `server/api/` | Request handlers with `/api` in the address |
| `server/routes/` | Request handlers without that automatic prefix |
| `server/middleware/` | Checks or added information before handlers run |
| `server/plugins/` | Setup when a Nitro server instance starts |
| `server/utils/` | Helpers reused by server code |

A **handler** is a function that receives a request and produces a response. An **endpoint** is the address and request method it handles.

**Additional example:** Create `server/api/ping.get.js`:

```js
export default defineEventHandler(() => {
  return { pong: true }
})
```

Visit `/api/ping` on your running Nuxt website. You should see `{"pong":true}` rather than a Vue page. Nuxt discovers the file and turns the returned object into a JSON response. No database is needed for this check.

The `.get` ending means this handler answers GET requests, the kind a browser normally makes when you open an address.

Keep database connections and private settings in server code. Page code may also execute on the server during rendering, but that does not make the page's code or returned data private. Only return information the visitor is allowed to receive.

App and server auto-imports are separate. Do not import Vue components or app composables into a server handler, or server-only helpers into a page.

## Official documentation

- [Nuxt 4: Server directory](https://nuxt.com/docs/4.x/directory-structure/server)

[Back to course index](00-course-index.md)
