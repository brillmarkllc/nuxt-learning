# 72. Server API post event and endpoint

Course section: 6: Practice app: EventO

Creating an event requires a verified user and valid event details. The browser supplies the content; the server supplies the owner.

**Additional working example:** Complete the session setup, database helper, and Event model first. Create these three files in `evento`.

### Check the session user

`server/utils/requirePlannerUser.js`:

```js
export async function requirePlannerUser(event) {
  const { user } = await requireUserSession(event)
  if (typeof user.id !== 'string' || !/^[a-f\d]{24}$/i.test(user.id)) {
    throw createError({ status: 401, statusText: 'Sign in again' })
  }
  return user
}
```

`requireUserSession` rejects signed-out requests. The extra check ensures this app has the MongoDB user ID expected by its queries. The pattern accepts 24 hexadecimal characters.

### Check the submitted event

`server/utils/validateEventBody.js`:

```js
import * as yup from 'yup'

function isCalendarDate(value) {
  if (value == null) return true
  if (!/^(?!0000)\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

const schema = yup.object({
  title: yup.string().strict().trim().min(3).max(120).required(),
  content: yup.string().strict().trim().min(3).max(5000).required(),
  date: yup.string().strict().nullable().test('calendar-date', 'Invalid date', isCalendarDate)
}).required()

export async function validateEventBody(body) {
  try {
    return await schema.validate(body, { abortEarly: false, stripUnknown: true })
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) throw error
    const fields = {}
    for (const issue of error.inner) {
      if (issue.path === 'title') fields.title = 'Use a title of 3–120 characters without outer spaces.'
      if (issue.path === 'content') fields.content = 'Use a description of 3–5000 characters without outer spaces.'
      if (issue.path === 'date') fields.date = 'Choose a real date in YYYY-MM-DD format, or leave it empty.'
    }
    throw createError({ status: 400, statusText: 'Validation failed', data: { fields } })
  }
}
```

The form already trims text and sends an empty optional date as `null`. Strict string rules reject unexpected types rather than converting them. In strict mode, `trim()` checks that text is already trimmed. The date check compares the parsed day with the original, rejecting impossible dates that JavaScript might otherwise roll into another month.

### Save allowed fields

`server/api/events/index.post.js`:

```js
import Event from '../../models/Event.js'

export default defineEventHandler(async (event) => {
  const user = await requirePlannerUser(event)
  const input = await validateEventBody(await readBody(event))
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const created = await Event.create({
    title: input.title, content: input.content, date: input.date ?? null,
    owner: user.id
  })
  setResponseStatus(event, 201)
  return {
    id: String(created._id), title: created.title, content: created.content,
    date: created.date, status: created.status
  }
})
```

Only allowed fields are saved. A submitted `owner` or `status` is ignored; ownership comes from the session and the model supplies `pending`. The response contains the fields the page needs, not the entire document.

Topic 73 connects the form. A successful request should return status 201. A signed-out request should return 401 before database work, and invalid content should return 400. Topic 74 explains focused validation checks using this already complete endpoint.

## Official documentation

- [Nuxt 4: Server — request handling](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Protect API routes](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#protect-api-routes)
- [Auth Utils: Server utilities](https://github.com/atinux/nuxt-auth-utils#server-utils)
- [Yup: Strict validation and tests](https://github.com/jquense/yup)
- [Mongoose: Schemas](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
