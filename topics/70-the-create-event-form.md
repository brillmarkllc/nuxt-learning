# 70. The create Event form

Course section: 6: Practice app: EventO

An event needs a title, a description, and optionally a calendar date. Keep these fields together so they can be checked and submitted as one record.

**Additional working example:** Replace `app/pages/events/create.vue` with:

```vue
<script setup>
definePageMeta({ middleware: ['auth'] })
const form = reactive({ title: '', content: '', date: '' })
const preview = ref(null)
function submit() {
  preview.value = { title: form.title, content: form.content, date: form.date || null }
}
</script>

<template>
  <main>
    <h1>Create an event</h1>
    <form @submit.prevent="submit">
      <p><label>Title
        <input v-model.trim="form.title" required minlength="3" maxlength="120" />
      </label></p>
      <p><label>Description
        <textarea v-model.trim="form.content" required minlength="3" maxlength="5000"></textarea>
      </label></p>
      <p><label>Date, optional <input v-model="form.date" type="date" /></label></p>
      <button type="submit">Preview event</button>
    </form>
    <pre v-if="preview">{{ preview }}</pre>
  </main>
</template>
```

While signed in, open `/events/create`, enter “Book club meetup”, a short description, and a date. Submit to see the planned request data. Nothing is saved yet.

`textarea` collects longer plain text. The example rules allow 3–120 title characters and 3–5000 description characters. Browser checks help with input; the server must enforce the same limits.

## Keep date-only values as dates

A date input gives a string such as `2026-11-05`. With no date selected, it gives an empty string; the example converts that to `null`, meaning no date.

This planner stores a calendar day, not an exact moment in a time zone. Avoid turning it into `new Date(value)` simply to display it: time-zone conversion can shift the displayed day. Showing the checked `YYYY-MM-DD` value directly is sufficient. An app with timed meetings would need an explicit time and time-zone design.

Add `<NuxtLink to="/events/create">Create event</NuxtLink>` inside the header's existing `v-if="loggedIn"` section. The route guard still handles a signed-out direct visit.

## Official documentation

- [Nuxt 4: Data fetching — form submissions](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Nuxt 4: State management](https://nuxt.com/docs/4.x/getting-started/state-management)
- [Vue: Form input bindings](https://vuejs.org/guide/essentials/forms.md)

[Back to course index](00-course-index.md)
