# 74. Posting event validation

Course section: 6: Practice app: EventO

## What you will learn

Validate event input and display errors.

In this lesson, **Validation** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Validation:** Checking that input meets your rules before accepting or storing it.
- **Schema:** A definition of expected fields, value types, and rules.
- **Yup:** A library used in the course to define input-validation schemas.
- **Date format:** The representation of a date, such as an ISO string or a displayed calendar date.

## What this topic includes

Install Yup. The complete schema in the final block is imported by lesson 72. These rules match the event model’s string-based calendar-date policy.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Server schema

A schema groups the event input rules; the full definition follows in the nullable-dates example.

**Where:** server/utils/schemas/event.js — schema shape

```js
import * as yup from 'yup'
export const eventSchema = yup.object({ title: yup.string().required(), content: yup.string().required() })
```

### 2. Required fields

required rejects an empty value; trim ensures whitespace-only titles also fail.

**Where:** A schema file

```js
import * as yup from 'yup'
const titleRule = yup.string().trim().required('Title is required')
const valid = await titleRule.isValid('   ') // false
```

### 3. Minimum lengths

Minimum and maximum lengths make requirements explicit and bound the input size.

**Where:** A schema file

```js
import * as yup from 'yup'
const contentRule = yup.string().trim().min(3, 'Use at least 3 characters').max(5000).required()
```

### 4. Nullable dates

Normalize an empty date to null. A round-trip calendar check rejects dates such as February 31 instead of silently shifting them.

**Where:** server/utils/schemas/event.js — complete schema

```js
import * as yup from 'yup'
function validCalendarDate(value) {
  if (value == null) return true
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}
export const eventSchema = yup.object({
  title: yup.string().trim().min(3).max(120).required(),
  content: yup.string().trim().min(3).max(5000).required(),
  date: yup.string().transform((value, original) => original === '' ? null : value).nullable().default(null).test('calendar-date', 'Use a valid YYYY-MM-DD date', validCalendarDate),
})
```
## Simple example

An empty title produces a field error; an optional empty date is treated consistently.

## Remember

- Apply the validation before storing data, not after creation.

## Best practices and edge cases

- Keep secrets and database operations in the root server directory. Read private settings through runtime configuration.
- Treat body fields, query parameters, and route parameters as untrusted input. Validate before using them in database operations.
- Return useful HTTP status codes and safe messages. Avoid sending stack traces, connection strings, or password hashes to the client.
- Server middleware runs before handlers: attach request context there and avoid returning a normal response from middleware.
- Authenticate the request and scope record queries to its verified owner; hiding a button or accepting a client-provided user ID does not enforce ownership.

## Official documentation

- [Nuxt 4: Server](https://nuxt.com/docs/4.x/directory-structure/server)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Yup schema and validation API](https://github.com/jquense/yup)

[Back to course index](00-course-index.md)
