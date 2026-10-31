# 46. Deleting employees

Course section: 3: The server

A **DELETE** request asks the server to remove a record. Wait for the server to confirm success before leaving the page or hiding the item.

**Additional working example:** Create `server/api/employees/[id].delete.js`:

```js
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id || !/^\d+$/.test(id)) {
    throw createError({ status: 400, statusText: 'Invalid employee ID' })
  }
  const config = useRuntimeConfig(event)
  try {
    await $fetch(`${config.employeeApiBase}/employees/${id}`, { method: 'DELETE' })
  } catch (error) {
    const missing = error.response?.status === 404
    throw createError({ status: missing ? 404 : 502,
      statusText: missing ? 'Employee not found' : 'Employee service unavailable' })
  }
  return { deleted: true }
})
```

In the detail page `app/pages/employees/[id]/index.vue`, add the following to its existing script:

```js
const deleting = ref(false)
const deleteMessage = ref('')
async function removeEmployee() {
  if (deleting.value || !employee.value) return
  if (!window.confirm(`Delete ${employee.value.name}?`)) return
  deleting.value = true
  deleteMessage.value = ''
  try {
    await $fetch(`/api/employees/${encodeURIComponent(String(employee.value.id))}`, {
      method: 'DELETE'
    })
    await navigateTo('/employees')
  } catch {
    deleteMessage.value = 'Could not delete this employee. Please retry.'
  } finally {
    deleting.value = false
  }
}
```

Add this inside the loaded employee's `<article>`:

```vue
<button :disabled="deleting" @click="removeEmployee">Delete employee</button>
<p role="status">{{ deleteMessage }}</p>
```

Create a disposable fictional employee using topic 37, open its detail page, and delete it. Confirm that it disappears from the list after Reload and from `db.json`. Try cancelling first: no request should be sent.

`window.confirm` is used only inside a browser click handler, so it is not executed during server rendering. Disabling the button prevents repeated clicks while the request is running.

There is no undo here. This remains a local practice app without authentication; a real private service must check who may delete each record.

## Official documentation

- [Nuxt 4: Server — method matching and errors](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [JSON Server 0.17.4](https://raw.githubusercontent.com/typicode/json-server/v0.17.4/README.md)

[Back to course index](00-course-index.md)
