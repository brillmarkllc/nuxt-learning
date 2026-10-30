# 65. Server side validation

Course section: 5: Authentication

## What you will learn

Enforce sign-up rules on the backend.

In this lesson, **Validation** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Validation:** Checking that input meets your rules before accepting or storing it.
- **Schema:** A definition of expected fields, value types, and rules.
- **Yup:** A library used in the course to define input-validation schemas.
- **HTTP status:** A response number describing an outcome, such as 200 for success or 404 for missing content.

## What this topic includes

Install Yup. These files form a minimal server-side validation endpoint; replace the demo response with your account-creation logic when integrating it.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Shared schema location

Keep reusable validation definitions in a dedicated file and import nested schemas explicitly.

**Where:** server/utils/schemas/signup.js

```js
import * as yup from 'yup'
export const signupSchema = yup.object({ email: yup.string().trim().lowercase().email().required(), password: yup.string().min(12).max(128).required() })
```

### 2. Yup validation

Validate directly submitted data even if the browser already validated it.

**Where:** server/api/validate-signup.post.js

```js
import { signupSchema } from '../utils/schemas/signup'
export default defineEventHandler(async event => {
  const input = await signupSchema.validate(await readBody(event), { abortEarly: false, stripUnknown: true })
  return { valid: true, email: input.email }
})
```

### 3. Structured error response

Return safe field messages with status 400. This response never returns the rejected password or the full validation exception.

**Where:** server/api/validate-signup.post.js — improved replacement

```js
import * as yup from 'yup'
import { signupSchema } from '../utils/schemas/signup'
export default defineEventHandler(async event => {
  try {
    const input = await signupSchema.validate(await readBody(event), { abortEarly: false, stripUnknown: true })
    return { valid: true, email: input.email }
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) throw error
    const fields = Object.fromEntries(error.inner.map(issue => [issue.path || 'form', issue.message]))
    throw createError({ statusCode: 400, statusMessage: 'Validation failed', data: { fields } })
  }
})
```
## Simple example

Reject a malformed email even if the request bypasses the browser form.

## Remember

- Map validation failures to useful messages without leaking internal details.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Sign-up and sign-in accept signed-out visitors. Protected account and event endpoints require a verified session and authorization checks.

## Practical tip

Test the endpoint directly with invalid input so browser validation cannot conceal missing server validation.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Yup schema and validation API](https://github.com/jquense/yup)

[Back to course index](00-course-index.md)
