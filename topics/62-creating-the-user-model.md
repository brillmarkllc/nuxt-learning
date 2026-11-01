# 62. Creating the user model

Course section: 5: Authentication

A **schema** describes the fields a stored record should have. A Mongoose **model** provides functions for creating and finding records that follow that schema. MongoDB is the database; Mongoose is the library used to work with it.

**Additional example:** Create `server/models/User.js`:

```js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String, required: true, unique: true,
    lowercase: true, trim: true, maxlength: 254
  },
  passwordHash: { type: String, required: true, select: false }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', userSchema)
```

`email` is text. The model trims surrounding spaces and uses lower case, matching the account form. `passwordHash` holds a one-way derived value used to check a password later. It must never contain the original password.

`select: false` leaves the hash out of ordinary query results. The sign-in handler will deliberately request it for verification. Even with this setting, return an explicit public user object rather than an entire database document.

`timestamps` adds creation and update times. MongoDB gives each new record an `_id`; later examples convert it to text before returning it to a page.

The last line reuses an already registered model during development reloads. Otherwise Mongoose can complain that the same model name was defined again.

## Unique email addresses

`unique: true` asks MongoDB for a unique index. It is not an ordinary validation rule. Duplicate writes can still race, so the account endpoint must handle MongoDB's duplicate-key error.

The model does not create an account just by existing. The next topic connects to the database, builds the index for this practice app, hashes a password, and saves a record. Nuxt discovers server handlers and utilities; model files are imported explicitly.

## Official documentation

- [Nuxt 4: Server directory](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Sessions and authentication](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Mongoose: Schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose: Validation and unique indexes](https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator)

[Back to course index](00-course-index.md)
