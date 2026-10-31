# 35. Add employee form

Course section: 3: The server

A form collects values before sending them to the server. Vue's `v-model` keeps each input connected to JavaScript state.

**Additional working example:** Create `app/pages/employees/new.vue` in `employee-lab`:

```vue
<script setup>
const form = reactive({ name: '', position: '', age: 18 })
const preview = ref('')
function submit() {
  preview.value = `${form.name} — ${form.position}, age ${form.age}`
}
</script>

<template>
  <main>
    <h1>Add employee</h1>
    <form @submit.prevent="submit">
      <p><label>Name <input v-model.trim="form.name" required maxlength="100" /></label></p>
      <p><label>Position <input v-model.trim="form.position" required maxlength="100" /></label></p>
      <p><label>Age <input v-model.number="form.age" type="number" min="18" max="100" step="1" required /></label></p>
      <button type="submit">Preview employee</button>
    </form>
    <p aria-live="polite">{{ preview }}</p>
  </main>
</template>
```

Open `/employees/new`, enter fictional details, and submit. You should see a summary underneath. This step deliberately previews the values; it does not save them yet. Topic 37 connects the same form to a POST endpoint.

`reactive` makes an object whose fields Vue tracks. `v-model.trim` removes surrounding spaces; `.number` converts numeric input when possible. An emptied number input can still be an empty string, so the server must check it later.

`@submit.prevent` runs `submit` and prevents the browser's normal form navigation. `required`, `min`, and `max` provide browser checks. The age range is an example rule for this practice data, not a general employment rule.

Each input has a visible label. The preview's `aria-live` lets assistive technology announce the updated message. Browser checks make forms friendlier, but callers can bypass them; server validation remains necessary.

## Official documentation

- [Nuxt 4: Data fetching — form actions](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Vue: Form input bindings (supplementary reference)](https://vuejs.org/guide/essentials/forms.md)

[Back to course index](00-course-index.md)
