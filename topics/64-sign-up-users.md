# 64. Sign up users

Course section: 5: Authentication

The form can now send its checked values to the sign-up endpoint. After the server sets a session cookie, refresh the browser's session state so navigation shows the right account.

**Additional walkthrough:** Create `app/composables/useAuth.js`:

```js
export function useAuth() {
  const { fetch: refreshSession } = useUserSession()
  async function signUp(input) {
    const result = await $fetch('/api/auth/sign-up', { method: 'POST', body: input })
    await refreshSession()
    return result.user
  }
  return { signUp }
}
```

Call `useAuth()` during page setup, where Nuxt's app context is available. Its returned `signUp` function can then run when the visitor submits.

In `app/pages/login.vue`, keep the fields and `validateSignup` from topics 58–59. Add these setup lines and replace the old `submit` function:

```js
const { signUp } = useAuth()
const submitting = ref(false)

async function submit() {
  if (submitting.value) return
  message.value = ''
  if (mode.value !== 'sign-up') {
    message.value = 'Sign-in is connected in topic 66.'
    return
  }
  const input = await validateSignup()
  if (!input) return
  submitting.value = true
  try {
    await signUp(input)
    form.password = ''
    await navigateTo('/')
  } catch (error) {
    message.value = error.response?.status === 409
      ? 'Account could not be created. Try signing in if you already registered.'
      : 'Could not create an account. Check your details and retry.'
  } finally {
    submitting.value = false
  }
}
```

Add `:disabled="submitting"` to both the submit and mode-switch buttons. Change the submit button's text to:

```vue
{{ submitting ? 'Please wait…' : mode === 'sign-up' ? 'Create account' : 'Sign in' }}
```

With the database configured and endpoint from topic 63 present, open `/login` in sign-up mode. Use a fictional address you control for testing and a made-up password. Successful submission returns home. A duplicate email should keep you on the form with a useful message.

Check the database for one user record. Reload the page and inspect session state later through the header in topic 68. Do not repeat account creation just because a session refresh fails: the account may already have been saved.

`$fetch` sends a POST body, keeping the password out of the address. Success is reported only after the request and session refresh finish. A Nuxt UI toast is an optional brief notification; the inline message already gives failures a visible place to remain.

## Official documentation

- [Nuxt 4: Sessions and authentication — session refresh](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication#login-page)
- [Nuxt 4: Data fetching — actions](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Auth Utils: useUserSession](https://github.com/atinux/nuxt-auth-utils#vue-composable)

[Back to course index](00-course-index.md)
