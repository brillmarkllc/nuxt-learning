# 65. Server side validation

Course section: 5: Authentication

Server validation is the final check before information reaches the database. The sign-up endpoint already performs it. Moving that work into a helper makes the rules easier to maintain and lets the server return useful field errors.

**Additional example:** Create `server/utils/validateSignupBody.js`:

```js
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().trim().lowercase().email().max(254).required(),
  password: yup.string().strict().min(12).max(128).required()
}).required()

export async function validateSignupBody(body) {
  try {
    return await schema.validate(body, { abortEarly: false, stripUnknown: true })
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) throw error
    const fields = {}
    for (const issue of error.inner) {
      if (issue.path === 'email') fields.email = 'Enter a valid email of at most 254 characters.'
      if (issue.path === 'password') fields.password = 'Use a password of 12–128 characters.'
    }
    throw createError({ status: 400, statusText: 'Validation failed', data: { fields } })
  }
}
```

The helper returns the normalised input. It strips extra properties and returns only fixed, safe messages. Returning the whole validation exception could expose submitted values, including the password.

In `server/api/auth/sign-up.post.js`, remove the Yup import, the inline schema, and the `let input`/validation `try`/`catch` block from topic 63. Start the handler with this instead:

```js
const input = await validateSignupBody(await readBody(event))
```

Keep the database, hashing, account creation, and session code after it. Nuxt auto-imports this top-level server utility.

## Show server field errors

In the `submit` function's `catch` block in `app/pages/login.vue`, add this before the existing general message:

```js
fieldErrors.value = error.data?.data?.fields || {}
```

`$fetch` puts the JSON error response in `error.data`; the response's custom `data` contains `fields`. Optional chaining safely handles other error shapes.

Test the endpoint without the form. Run this in the browser console on EventO:

```js
const response = await fetch('/api/auth/sign-up', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'not-an-email', password: 'short' })
})
console.log(response.status, await response.json())
```

Expect status 400 and safe field messages. No new user should be stored. Keep browser validation too: it provides quick feedback, while this server check covers direct requests.

## Official documentation

- [Nuxt 4: Server — body handling and errors](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Sessions and authentication — validated input](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Nuxt 4: createError — custom error data](https://nuxt.com/docs/4.x/api/utils/create-error)
- [Yup: Validation API](https://github.com/jquense/yup)

[Back to course index](00-course-index.md)
