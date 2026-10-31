# 33. API Routes

Course section: 3: The server

An **API** lets code ask for information or request an action. A page can ask `/api/employees` for records instead of directly opening the data file.

Nuxt uses filenames to connect server handlers to addresses. The file from topic 31, `server/api/employees/index.get.js`, handles **GET `/api/employees`**. `index` represents the folder's base address, and GET means reading information.

## Compare reading and submitting

**Additional example:** Create `server/api/message.get.js`:

```js
export default defineEventHandler(() => ({ message: 'Welcome to the shop' }))
```

Create `server/api/message.post.js`:

```js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return { received: body }
})
```

Open `/api/message` in the browser to see the welcome message. To test POST, open the browser's developer console on your local Nuxt site and run:

```js
await fetch('/api/message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello from a reader' })
}).then(response => response.json())
```

The result should contain `received` with your message. This console example uses the browser's built-in `fetch`; Nuxt's `$fetch` is available in app code, not automatically as a browser-console global.

`event` describes the incoming request. `readBody` reads its submitted content, and `await` waits for that operation. The example only echoes data; it does not save it or validate it.

Both files use the same address but different methods. Typing an address in the browser tests GET, not POST. A filename without a method ending can handle multiple methods, so use endings when you want a clear boundary.

## Official documentation

- [Nuxt 4: Server — methods and body handling](https://nuxt.com/docs/4.x/directory-structure/server)

[Back to course index](00-course-index.md)
