# 37. Posting employees

Course section: 3: The server

A POST request can create an employee record. The server must check the submitted values before sending them to the data service.

**Additional working example:** Use the form from topic 35 and the local service and private configuration from topic 30. Create `server/api/employees/index.post.js`:

```js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const position = typeof body?.position === 'string' ? body.position.trim() : ''
  const age = body?.age
  if (!name || name.length > 100 || !position || position.length > 100 ||
      !Number.isInteger(age) || age < 18 || age > 100) {
    throw createError({ status: 400, statusText: 'Check name, position and age' })
  }
  const config = useRuntimeConfig(event)
  let created
  try {
    created = await $fetch(`${config.employeeApiBase}/employees`, {
      method: 'POST', body: { name, position, age }
    })
  } catch {
    throw createError({ status: 502, statusText: 'Employee service unavailable' })
  }
  setResponseStatus(event, 201)
  return created
})
```

**400** means the submitted input is invalid. **201** means a record was created. The handler forwards only the three allowed fields; JSON Server supplies the ID.

In `app/pages/employees/new.vue`, keep `form` and replace `preview` and the old `submit` function with:

```js
const message = ref('')
const saving = ref(false)
async function submit() {
  if (saving.value) return
  saving.value = true
  message.value = ''
  try {
    await $fetch('/api/employees', { method: 'POST', body: { ...form } })
    await navigateTo('/employees')
  } catch {
    message.value = 'Could not save. Check the fields and data service, then retry.'
  } finally {
    saving.value = false
  }
}
```

`{ ...form }` copies the form's fields into the request. `finally` runs whether saving succeeds or fails. Replace the form's submit button and preview paragraph with:

```vue
<button type="submit" :disabled="saving">{{ saving ? 'Saving…' : 'Save employee' }}</button>
```

```vue
<p role="status">{{ message }}</p>
```

Keep the button inside the form and the message after it. Submit fictional details, return to the list, and press Reload if needed. The new record should appear and remain after a page reload. Failed saves keep the form values available.

This local exercise has no authentication. Do not publish it as a private employee-management system.

## Official documentation

- [Nuxt 4: Server — body, errors and status codes](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [JSON Server 0.17.4](https://raw.githubusercontent.com/typicode/json-server/v0.17.4/README.md)

[Back to course index](00-course-index.md)
