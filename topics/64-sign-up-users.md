# 64. Sign up users

Course section: 5: Authentication

## What you will learn

Connect the sign-up form to the backend.

In this lesson, **Composable** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Composable:** A function that packages reusable Vue or Nuxt logic, often using reactive state.
- **POST:** An HTTP method commonly used to create a resource or submit an action.
- **Toast:** A brief on-screen message confirming an action or reporting a problem.
- **Session:** Information used by the server and client to recognize a signed-in user across requests.

## What this topic includes

Requires the sign-up endpoint from lesson 63 and nuxt-auth-utils. Script fragments belong in a Vue component except the composable file.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Auth composable

A composable keeps the request and session refresh together so multiple forms can reuse it.

**Where:** app/composables/useAuth.js

```js
export function useAuth() {
  const { fetch: refreshSession } = useUserSession()
  async function signUp(form) {
    const result = await $fetch('/api/auth/sign-up', { method: 'POST', body: form })
    await refreshSession()
    return result.user
  }
  return { signUp }
}
```

### 2. POST request

Send credentials in the POST body; never add a password to the URL.

**Where:** A sign-up page — script setup

```js
const form = reactive({ email: '', password: '' })
const { signUp } = useAuth()
async function submit() { await signUp({ ...form }) }
```

### 3. Success feedback

Provide success feedback only after the API accepts the account and the session refreshes.

**Where:** A sign-up page — script setup

```js
const message = ref('')
const { signUp } = useAuth()
async function createAccount(form) {
  await signUp(form)
  message.value = 'Account created'
  await navigateTo('/')
}
```

### 4. Failure handling

Do not log credentials. Keep the user on the form when submission fails.

**Where:** A sign-up page — script setup

```js
const errorMessage = ref('')
const { signUp } = useAuth()
async function submitSafely(form) {
  errorMessage.value = ''
  try { await signUp(form); await navigateTo('/') }
  catch { errorMessage.value = 'Could not create account. Check your details and try again.' }
}
```
## Simple example

Submit the form through a reusable sign-up helper and show the result.

## Remember

- Update the UI only after the server confirms success.

## Best practices and edge cases

- Use useFetch for an HTTP resource or useAsyncData with a custom fetcher during setup. Their payload integration avoids repeating the initial request during hydration.
- Use $fetch for user-triggered mutations such as submitting a form, then refresh the affected list after success.
- Pass a getter or computed URL when a request depends on a route parameter. Handle pending, error, empty, and successful results separately.
- Calls sharing a data key share state. Keep their important options consistent and avoid keys that mix results from different users.
- During SSR, relative useFetch requests can forward request context; a plain server-side $fetch does not automatically forward the browser’s cookies.

## Official documentation

- [Nuxt 4: Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)

[Back to course index](00-course-index.md)
