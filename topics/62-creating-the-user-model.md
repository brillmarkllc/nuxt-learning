# 62. Creating the user model

Course section: 5: Authentication

## What you will learn

Define the stored user structure.

In this lesson, **Model** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Model:** The interface used to create and query records following a database schema.
- **Schema:** A definition of expected fields, value types, and rules.
- **ODM:** Object-document mapper: a library that connects application objects to database documents.
- **Mongoose:** A library that models and queries MongoDB documents from Node.js.
- **Record:** One stored item, such as an employee or event.

## What this topic includes

Requires Mongoose and the connection utility from lesson 61. The model snippets are progressive alternatives; use the complete model block for later lessons.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Mongoose schema

A schema describes the fields stored in each user document.

**Where:** server/models/User.js

```js
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({ email: String, passwordHash: String })
export default mongoose.models.User || mongoose.model('User', userSchema)
```

### 2. Model

The model compiles a schema into a query interface. Reuse an existing compiled model during development reloads.

**Where:** server/models/User.js

```js
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({ email: { type: String, required: true, unique: true, lowercase: true, trim: true }, passwordHash: { type: String, required: true, select: false } }, { timestamps: true })
export default mongoose.models.User || mongoose.model('User', userSchema)
```

### 3. Field types

Field types control the document shape and casting. This standalone schema demonstrates several types, not the final User model.

**Where:** Inside a Mongoose schema definition

```js
import mongoose from 'mongoose'
const exampleSchema = new mongoose.Schema({ email: String, active: Boolean, age: Number, joinedAt: Date })
```

### 4. Required data

Required fields prevent saving a document without that value. unique defines an index, not a normal validation rule.

**Where:** Inside a Mongoose schema definition

```js
import mongoose from 'mongoose'
const schema = new mongoose.Schema({ email: { type: String, required: true, unique: true } })
// Handle duplicate-key errors from MongoDB even after validating input.
```
## Simple example

A user model defines the email and password-hash fields the app needs.

## Remember

- Mongoose is an ODM; it is not the database itself.

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
