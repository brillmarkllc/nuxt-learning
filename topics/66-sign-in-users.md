# 66. Sign in users

Course section: 5: Authentication

Signing in verifies a submitted password against the stored hash. A matching email alone is not enough.

**Additional example:** Create `server/api/auth/sign-in.post.js`:

```js
import * as yup from 'yup'
import User from '../../models/User.js'

const schema = yup.object({
  email: yup.string().trim().lowercase().email().max(254).required(),
  password: yup.string().strict().max(128).required()
}).required()

export default defineEventHandler(async (event) => {
  let input
  try {
    input = await schema.validate(await readBody(event), { stripUnknown: true })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw createError({ status: 400, statusText: 'Invalid sign-in input' })
    }
    throw error
  }
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const account = await User.findOne({ email: input.email }).select('+passwordHash')
  if (!account || !(await verifyPassword(account.passwordHash, input.password))) {
    throw createError({ status: 401, statusText: 'Invalid email or password' })
  }
  const user = { id: String(account._id), email: account.email }
  await replaceUserSession(event, { user })
  return { user }
})
```

`select('+passwordHash')` requests the field hidden from ordinary queries. `verifyPassword` takes the stored hash first and the submitted password second. A failed match returns the same message as an unknown email. Never return the database document containing the hash.

## Connect both form modes

Replace `app/composables/useAuth.js` with:

```js
export function useAuth() {
  const { fetch: refreshSession } = useUserSession()
  async function authenticate(mode, input) {
    const url = mode === 'sign-up' ? '/api/auth/sign-up' : '/api/auth/sign-in'
    const result = await $fetch(url, { method: 'POST', body: input })
    await refreshSession()
    return result.user
  }
  return { authenticate }
}
```

In `app/pages/login.vue`, replace the `useAuth` setup line with `const { authenticate } = useAuth()`. Replace `submit` with:

```js
async function submit() {
  if (submitting.value) return
  message.value = ''
  fieldErrors.value = {}
  const input = mode.value === 'sign-up'
    ? await validateSignup()
    : { email: form.email.trim().toLowerCase(), password: form.password }
  if (!input) return
  submitting.value = true
  try {
    await authenticate(mode.value, input)
    form.password = ''
    await navigateTo('/')
  } catch (error) {
    fieldErrors.value = error.data?.data?.fields || {}
    message.value = 'Could not complete the request. Check your details or try the other account mode.'
  } finally {
    submitting.value = false
  }
}
```

Use an account created earlier. In sign-in mode, a wrong password should keep you on the form; the correct one should return home with a session. Sign-in validates presence and maximum length without imposing a new-account minimum on existing passwords.

A public service also needs limits on repeated sign-in attempts and account-recovery features. This example demonstrates the basic verified-session flow.

## Official documentation

- [Nuxt 4: Sessions and authentication](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Auth Utils: Password hashing and sessions](https://github.com/atinux/nuxt-auth-utils#password-hashing)
- [Nuxt 4: Data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Mongoose: Schemas](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
