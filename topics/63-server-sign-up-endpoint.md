# 63. Server sign-up endpoint

Course section: 5: Authentication

The sign-up endpoint has four jobs: check input, hash the password, save the account, and establish a session. It accepts signed-out visitors; event endpoints later require a verified session.

**Additional working example:** Complete topics 56 and 60–62 first. Create `server/api/auth/sign-up.post.js`:

```js
import * as yup from 'yup'
import User from '../../models/User.js'

const schema = yup.object({
  email: yup.string().trim().lowercase().email().max(254).required(),
  password: yup.string().strict().min(12).max(128).required()
}).required()

export default defineEventHandler(async (event) => {
  let input
  try {
    input = await schema.validate(await readBody(event), { stripUnknown: true })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw createError({ status: 400, statusText: 'Invalid sign-up input' })
    }
    throw error
  }
  await connectDB(useRuntimeConfig(event).mongodbUri)
  await User.init()
  const passwordHash = await hashPassword(input.password)
  let account
  try {
    account = await User.create({ email: input.email, passwordHash })
  } catch (error) {
    if (error?.code === 11000) {
      throw createError({ status: 409, statusText: 'Account cannot be created' })
    }
    throw createError({ status: 503, statusText: 'Account service unavailable' })
  }
  const user = { id: String(account._id), email: account.email }
  await replaceUserSession(event, { user })
  setResponseStatus(event, 201)
  return { user }
})
```

`hashPassword` is supplied by Auth Utils. A hash lets the server verify a later password without storing the original. Never return the hash or put it in session data.

`User.init()` waits for this model's index setup in the small development app. The unique email index and duplicate-key check prevent duplicate records, including simultaneous sign-up attempts. Larger deployments should manage index creation deliberately.

`replaceUserSession` replaces previous session data instead of merging an earlier account into the new session. The cookie holds only the public user ID and email. Status **201** reports creation; **400** reports invalid input; **409** reports an account conflict.

The next topic connects the form. After submitting there, check the database: the user should have a password hash and no plain password. This example establishes a basic session; email ownership verification, password recovery, and request-abuse limits are separate features needed for a public account service.

## Official documentation

- [Nuxt 4: Sessions and authentication](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Nuxt 4: Server request handling](https://nuxt.com/docs/4.x/directory-structure/server)
- [Auth Utils: Server session and password helpers](https://github.com/atinux/nuxt-auth-utils#server-utils)
- [Yup: Validation](https://github.com/jquense/yup)
- [Mongoose: Unique indexes](https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator)

[Back to course index](00-course-index.md)
