# 44. Patch employee by ID

Course section: 3: The server

**PATCH** changes fields on an existing record. The request must identify the employee and supply allowed changes. This example keeps the ID in a query value: `/api/employees/by-id?id=1`.

**Additional working example:** Create `server/api/employees/by-id.patch.js`:

```js
export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)
  if (typeof id !== 'string' || !/^\d+$/.test(id)) {
    throw createError({ status: 400, statusText: 'Invalid employee ID' })
  }
  const body = await readBody(event)
  const changes = {}
  for (const field of ['name', 'position']) {
    if (body && Object.hasOwn(body, field)) {
      const value = body[field]
      if (typeof value !== 'string' || !value.trim() || value.trim().length > 100) {
        throw createError({ status: 400, statusText: 'Invalid name or position' })
      }
      changes[field] = value.trim()
    }
  }
  if (body && Object.hasOwn(body, 'age')) {
    if (!Number.isInteger(body.age) || body.age < 18 || body.age > 100) {
      throw createError({ status: 400, statusText: 'Invalid age' })
    }
    changes.age = body.age
  }
  if (!Object.keys(changes).length) {
    throw createError({ status: 400, statusText: 'No allowed changes supplied' })
  }
  const config = useRuntimeConfig(event)
  try {
    return await $fetch(`${config.employeeApiBase}/employees/${id}`, {
      method: 'PATCH', body: changes
    })
  } catch (error) {
    const missing = error.response?.status === 404
    throw createError({ status: missing ? 404 : 502,
      statusText: missing ? 'Employee not found' : 'Employee service unavailable' })
  }
})
```

`changes` starts empty. The loop checks supplied text fields; `Object.hasOwn` checks whether a field was actually submitted. Omitted fields stay unchanged. Only permitted fields reach JSON Server, so a submitted ID cannot replace the stored ID.

## Connect the edit form

In `app/pages/employees/[id]/edit.vue` from topic 43, add this inside its existing `<script setup>`:

```js
const saving = ref(false)
const message = ref('')
async function save() {
  if (saving.value) return
  saving.value = true
  message.value = ''
  try {
    await $fetch('/api/employees/by-id', {
      method: 'PATCH', query: { id: String(route.params.id) }, body: { ...form }
    })
    message.value = 'Changes saved.'
  } catch {
    message.value = 'Could not save. Check the fields and data service.'
  } finally {
    saving.value = false
  }
}
```

Change the form's handler to `@submit.prevent="save"`. Replace “Changes are not saved yet” with:

```vue
<button type="submit" :disabled="saving">{{ saving ? 'Saving…' : 'Save changes' }}</button>
<p role="status">{{ message }}</p>
```

Open `/employees/1/edit`, change the position, save, then reload. The new value should remain. The form submits all three editable fields, while the endpoint also supports updating just one. Keep both local services running.

## Official documentation

- [Nuxt 4: Server — methods, query and body handling](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [JSON Server 0.17.4: PATCH behaviour](https://raw.githubusercontent.com/typicode/json-server/v0.17.4/README.md)

[Back to course index](00-course-index.md)
