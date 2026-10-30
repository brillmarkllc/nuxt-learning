# 71. The event model

Course section: 6: Practice app: EventO

## What you will learn

Define how events are stored.

In this lesson, **Model** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Model:** The interface used to create and query records following a database schema.
- **Schema:** A definition of expected fields, value types, and rules.
- **Record:** One stored item, such as an employee or event.
- **Ownership check:** A server-side check that a record belongs to, or is accessible by, the current user.
- **Status transition:** A change between allowed record states, such as pending to completed.

## What this topic includes

Requires Mongoose. These snippets explain the fields; use the complete model in the final block for lessons 72–78. Dates are stored as validated YYYY-MM-DD strings because this practice app uses calendar dates, not event instants.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Event schema

A schema groups the event’s fields and enables automatic createdAt/updatedAt timestamps.

**Where:** server/models/Event.js — schema skeleton

```js
import mongoose from 'mongoose'
const eventSchema = new mongoose.Schema({ title: String, content: String }, { timestamps: true })
```

### 2. Title

Trim the title and limit its size; validation on the API should match these rules.

**Where:** Inside the event schema

```js
const titleField = { type: String, required: true, trim: true, minlength: 3, maxlength: 120 }
```

### 3. Content

Require descriptive content without allowing unbounded text.

**Where:** Inside the event schema

```js
const contentField = { type: String, required: true, trim: true, minlength: 3, maxlength: 5000 }
```

### 4. Date

Represent an optional calendar date as a string or null. API validation must check calendar validity.

**Where:** Inside the event schema

```js
const dateField = { type: String, default: null }
// Example values: '2026-11-05' or null.
```

### 5. User association

Associate each event with a User ObjectId. Set it from the server session, not the request body.

**Where:** Inside the event schema

```js
import mongoose from 'mongoose'
const ownerField = { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }
```

### 6. Endpoint scaffolding

This model is used by the event endpoints that follow. The POST endpoint belongs in server/api/events/index.post.js.

**Where:** server/models/Event.js — complete model and endpoint location

```js
import mongoose from 'mongoose'
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
  content: { type: String, required: true, trim: true, minlength: 3, maxlength: 5000 },
  date: { type: String, default: null },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { timestamps: true })
export default mongoose.models.Event || mongoose.model('Event', eventSchema)
```
## Simple example

An event belongs to a user and starts with a pending status.

## Remember

- User ownership should come from the verified server session.

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
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
