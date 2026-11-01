# 74. Posting event validation

Course section: 6: Practice app: EventO

An event can pass the browser's checks and still arrive as invalid input. Test the server directly so browser validation cannot hide a missing backend check.

The endpoint from topic 72 already calls `validateEventBody` before saving. Keep that helper; do not replace it with a weaker second schema.

| Input | Expected outcome |
| --- | --- |
| Title shorter than 3 characters | 400 with a title error |
| Description longer than 5000 characters | 400 with a content error |
| Date `2026-02-31` | 400 with a date error |
| Date `null` | Accepted if other fields are valid |
| Numeric title instead of text | 400 |
| Submitted `owner` or `status` | Ignored; server chooses them |

## Try an invalid request

**Additional example:** While signed in to EventO, open the browser console and run:

```js
const response = await fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Hi', content: 'A reading meetup', date: '2026-02-31' })
})
console.log(response.status, await response.json())
```

Expect 400 with title and date messages. No event should be added to the database. The form from topic 73 displays the same `fields` object returned by the server.

## Why check the calendar?

A value can look like `YYYY-MM-DD` and still be impossible. JavaScript can shift an invalid day into the following month. The helper parses the value and compares the resulting date with the submitted text; a mismatch fails validation.

The form turns an empty date into `null` before sending it. A direct request containing `date: ''` is rejected: the API's accepted empty value is explicitly `null` or an omitted field.

Yup's strict text rules also reject surrounding spaces. The form trims those before submitting, while direct API callers must follow the same contract. The model provides another layer of field limits; it does not replace request validation or owner checks.

## Official documentation

- [Nuxt 4: Server — validated input](https://nuxt.com/docs/4.x/directory-structure/server#body-handling)
- [Nuxt 4: createError — structured error data](https://nuxt.com/docs/4.x/api/utils/create-error)
- [Yup: Validation and custom tests](https://github.com/jquense/yup)

[Back to course index](00-course-index.md)
