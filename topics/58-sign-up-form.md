# 58. Sign up form

Course section: 5: Authentication

An account form collects an email address and password. Keep those values local to the form. A password field hides the typed characters, but server-side handling is still needed to protect and verify it.

**Additional working example:** Create `app/layouts/auth.vue`:

```vue
<template>
  <div class="max-w-md mx-auto p-6">
    <NuxtLink to="/">EventO home</NuxtLink>
    <slot />
  </div>
</template>
```

Create `app/pages/login.vue`:

```vue
<script setup>
definePageMeta({ layout: 'auth' })
const mode = ref('sign-up')
const form = reactive({ email: '', password: '' })
const message = ref('')
function switchMode() {
  mode.value = mode.value === 'sign-up' ? 'sign-in' : 'sign-up'
  form.password = ''
  message.value = ''
}
function submit() {
  message.value = 'Form ready. Account saving is added in topic 64.'
}
</script>

<template>
  <main>
    <h1>{{ mode === 'sign-up' ? 'Create account' : 'Sign in' }}</h1>
    <form @submit.prevent="submit">
      <div>
        <label>Email
          <input v-model.trim="form.email" type="email" autocomplete="email" required maxlength="254" />
        </label>
      </div>
      <div>
        <label>Password
          <input v-model="form.password" type="password" required maxlength="128"
            :minlength="mode === 'sign-up' ? 12 : 1"
            :autocomplete="mode === 'sign-up' ? 'new-password' : 'current-password'" />
        </label>
      </div>
      <button type="submit">{{ mode === 'sign-up' ? 'Create account' : 'Sign in' }}</button>
      <button type="button" @click="switchMode">
        {{ mode === 'sign-up' ? 'Already have an account? Sign in' : 'Need an account? Sign up' }}
      </button>
      <p role="status">{{ message }}</p>
    </form>
  </main>
</template>
```

Open `/login`. Enter an example email and a made-up password of at least 12 characters, then submit. You should see the readiness message; no account is created yet.

`v-model` connects fields to `form`. The submit handler prevents a full-page form navigation. The mode switch uses `type="button"` so it does not accidentally submit. It also clears the password when switching.

The example requires 12–128 characters for new passwords. This is an explicit application rule. Passwords are not trimmed, because spaces can be intentional. Do not print them, put them in a shared store, or save them in browser storage.

Add `<NuxtLink to="/login">Account</NuxtLink>` inside the existing header navigation to reach this page.

## Official documentation

- [Nuxt 4: Sessions and authentication — login page](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#login-page)
- [Nuxt 4: Layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)
- [Vue: Form input bindings](https://vuejs.org/guide/essentials/forms.md)

[Back to course index](00-course-index.md)
