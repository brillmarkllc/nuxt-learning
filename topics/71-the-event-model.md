# 71. The event model

Course section: 6: Practice app: EventO

Each stored event needs its content, its owner, and its progress status. The database model describes those fields; the API checks which visitor may use them.

**Additional example:** Create `server/models/Event.js` in `evento`:

```js
import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
  content: { type: String, required: true, trim: true, minlength: 3, maxlength: 5000 },
  date: { type: String, default: null },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true })

export default mongoose.models.Event || mongoose.model('Event', eventSchema)
```

| Field | Meaning |
| --- | --- |
| `title` | A short event name |
| `content` | A longer plain-text description |
| `date` | A checked `YYYY-MM-DD` calendar date, or `null` |
| `owner` | The ID of the user who owns the event |
| `status` | `pending` or `completed` |

`enum` limits status to the listed choices. New events start as `pending`. `timestamps` adds creation and update times, and MongoDB supplies `_id`.

An **ObjectId** is MongoDB's usual record identifier. `ref: 'User'` describes the relationship to the user model; it does not automatically check that a request belongs to that user. `index: true` helps database lookups by owner.

The endpoint must set `owner` from the verified session, not from a form field. It must also check that dates are real calendar dates; this model's string field alone cannot reject a value such as February 31.

No event is saved merely by adding this file. The next topic creates the input checker and POST handler together, so the endpoint is usable without waiting for a later validation lesson.

## Official documentation

- [Nuxt 4: Server directory](https://nuxt.com/docs/4.x/directory-structure/server)
- [Nuxt 4: Protect API routes](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#protect-api-routes)
- [Mongoose: Schemas and indexes](https://mongoosejs.com/docs/guide.html)
- [Mongoose: Validation](https://mongoosejs.com/docs/validation.html)

[Back to course index](00-course-index.md)
