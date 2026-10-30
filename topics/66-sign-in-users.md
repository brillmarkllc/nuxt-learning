# 66. Sign in users

Course section: 5: Authentication

## What you will learn

Authenticate an existing account.

In this lesson, **Authentication** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Authentication:** Checking who a user is, such as by verifying sign-in credentials.
- **Password hash:** A one-way derived value used to verify a password without storing the password itself.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.
- **Authorization:** Checking whether that user may perform an action on a particular resource.

## What this topic includes

Requires nuxt-auth-utils, the complete User model (62), and connectDB (61). Use the complete handler for the endpoint. Add rate limiting and account protections before public deployment.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. User lookup

Look up the normalized email and explicitly select the hash hidden by the model’s select:false setting.

**Where:** Inside an async sign-in handler

```js
import User from '../../models/User'
async function findAccountForSignIn(email) {
  return await User.findOne({ email }).select('+passwordHash')
}
// Connect to the database before calling this helper.
// Never return this document to the browser; it includes passwordHash.
```

### 2. Password comparison

verifyPassword receives the stored hash first and the submitted password second.

**Where:** Inside an async sign-in handler

```js
const demoHash = await hashPassword('an-example-password')
const matches = await verifyPassword(demoHash, 'an-example-password') // true
```

### 3. Session creation

Use a generic failure message for invalid credentials; create a session only after password verification.

**Where:** server/api/auth/sign-in.post.js

```js
import * as yup from 'yup'
import User from '../../models/User'
const schema = yup.object({ email: yup.string().trim().lowercase().email().required(), password: yup.string().max(128).required() })
export default defineEventHandler(async event => {
  let input
  try { input = await schema.validate(await readBody(event), { stripUnknown: true }) }
  catch (error) {
    if (error instanceof yup.ValidationError) throw createError({ statusCode: 400, statusMessage: 'Invalid input' })
    throw error
  }
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const account = await User.findOne({ email: input.email }).select('+passwordHash')
  if (!account || !(await verifyPassword(account.passwordHash, input.password))) throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  const user = { id: String(account._id), email: account.email }
  await setUserSession(event, { user })
  return { user }
})
```

### 4. Response handling

Refresh the session before navigating so components see the new signed-in state.

**Where:** app/pages/login.vue — script setup

```js
const form = reactive({ email: '', password: '' })
const { fetch: refreshSession } = useUserSession()
const message = ref('')
async function submit() {
  try {
    await $fetch('/api/auth/sign-in', { method: 'POST', body: { ...form } })
    await refreshSession()
    await navigateTo('/')
  } catch { message.value = 'Sign-in failed. Check your details.' }
}
```
## Simple example

Find the submitted email, compare the password to its hash, then create a session.

## Remember

- Do not authenticate by comparing a submitted password to a stored plaintext value.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Sign-up and sign-in accept signed-out visitors. Protected account and event endpoints require a verified session and authorization checks.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Yup schema and validation API](https://github.com/jquense/yup)
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
