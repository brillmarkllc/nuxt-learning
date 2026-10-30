# 63. Server sign-up endpoint

Course section: 5: Authentication

## What you will learn

Implement the server side of account creation.

In this lesson, **Authentication** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Authentication:** Checking who a user is, such as by verifying sign-in credentials.
- **Password hash:** A one-way derived value used to verify a password without storing the password itself.
- **Validation:** Checking that input meets your rules before accepting or storing it.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.
- **Endpoint:** A URL and HTTP method that a server handles, such as POST /api/events.

## What this topic includes

Requires nuxt-auth-utils and its session secret (lesson 56), connectDB (61), and the complete User model with passwordHash (62). Install Yup. Use the final complete handler below; the first blocks explain its parts. These teaching examples need email verification, abuse controls, and duplicate-key handling before public launch.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Request body

Whitelist and validate the submitted fields before using them. In a handler, event is its callback argument.

**Where:** server/api/auth/sign-up.post.js — input stage

```js
import * as yup from 'yup'
const signupSchema = yup.object({ email: yup.string().trim().lowercase().email().required(), password: yup.string().min(12).max(128).required() })
// Inside the handler:
// const input = await signupSchema.validate(await readBody(event), { stripUnknown: true })
```

### 2. Database access

Use the model only after connecting. These lines belong inside the async handler after input validation.

**Where:** server/api/auth/sign-up.post.js — database stage

```js
import User from '../../models/User'
async function checkAccountAvailability(event, email) {
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const exists = await User.exists({ email })
  if (exists) throw createError({ statusCode: 409, statusMessage: 'Account cannot be created' })
}
// Use after validation: await checkAccountAvailability(event, input.email)
// Still handle duplicate-key races on creation, as the complete handler does.
```

### 3. Password hashing

The authentication module supplies a password hashing helper. Never store the original password or return the hash.

**Where:** Inside the sign-up handler

```js
const passwordHash = await hashPassword('example-only-password')
// In the real handler, hash input.password, not a hardcoded example.
```

### 4. Session setup

Create the account and establish a session containing only a public identifier and email. Expected result: 201 and a user object, never a hash.

**Where:** server/api/auth/sign-up.post.js — complete teaching handler

```js
import * as yup from 'yup'
import User from '../../models/User'
const schema = yup.object({ email: yup.string().trim().lowercase().email().required(), password: yup.string().min(12).max(128).required() })
export default defineEventHandler(async event => {
  let input
  try { input = await schema.validate(await readBody(event), { stripUnknown: true }) }
  catch (error) {
    if (error instanceof yup.ValidationError) throw createError({ statusCode: 400, statusMessage: 'Invalid sign-up input' })
    throw error
  }
  await connectDB(useRuntimeConfig(event).mongodbUri)
  const passwordHash = await hashPassword(input.password)
  let account
  try { account = await User.create({ email: input.email, passwordHash }) }
  catch (error) {
    if (error?.code === 11000) throw createError({ statusCode: 409, statusMessage: 'Account cannot be created' })
    throw error
  }
  const user = { id: String(account._id), email: account.email }
  await setUserSession(event, { user })
  setResponseStatus(event, 201)
  return { user }
})
```
## Simple example

Validate input, hash the password, save the account, and establish its session.

## Remember

- Never return a password hash to the browser or store plaintext passwords.

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
