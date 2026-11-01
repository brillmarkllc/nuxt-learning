# 59. Sign up client validation

Course section: 5: Authentication

**Validation** checks whether values meet your rules. Browser checks provide quick feedback. They do not protect the server, because a caller can send requests without using your form.

Yup describes rules in a **schema**: a definition of the fields and values you accept. It was installed in topic 56.

**Additional example:** In `app/pages/login.vue`, add these lines inside `<script setup>`:

```js
import * as yup from 'yup'

const signupSchema = yup.object({
  email: yup.string().trim().lowercase().email('Enter a valid email').max(254).required('Email is required'),
  password: yup.string().min(12, 'Use at least 12 characters').max(128, 'Use at most 128 characters').required('Password is required')
})
const fieldErrors = ref({})

async function validateSignup() {
  fieldErrors.value = {}
  try {
    return await signupSchema.validate(form, { abortEarly: false, stripUnknown: true })
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) throw error
    for (const issue of error.inner) {
      if (issue.path && !fieldErrors.value[issue.path]) {
        fieldErrors.value[issue.path] = issue.message
      }
    }
    return null
  }
}
```

Replace the existing `submit` function with:

```js
async function submit() {
  message.value = ''
  if (mode.value !== 'sign-up') {
    message.value = 'Sign-in is connected in topic 66.'
    return
  }
  const input = await validateSignup()
  if (input) message.value = 'Details passed the checks. No account has been saved yet.'
}
```

Inside the existing template, add these messages immediately after their corresponding input labels:

```vue
<p id="email-error" role="alert">{{ fieldErrors.email }}</p>
```

```vue
<p id="password-error" role="alert">{{ fieldErrors.password }}</p>
```

Add `aria-describedby="email-error"` to the email input and `aria-describedby="password-error"` to the password input. In `switchMode`, add `fieldErrors.value = {}` so old errors disappear.

Try a valid email and a 12-character made-up password. The success message should appear. To inspect Yup's own errors for short passwords or malformed emails, temporarily add `novalidate` to the form; otherwise the browser may catch them first. Remove it after the check if you want both layers.

`abortEarly: false` collects multiple errors. `stripUnknown` removes fields absent from the schema. The returned `input` contains the checked, normalised values. These examples lower-case account emails consistently; they never trim passwords. Email-format validation does not prove that someone owns the mailbox.

## Official documentation

- [Nuxt 4: Sessions and authentication — input checks](https://nuxt.com/docs/4.x/guide/recipes/sessions-and-authentication)
- [Nuxt 4: Data fetching — form actions](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [Yup: official validation API](https://github.com/jquense/yup#schemavalidatevalue-any-options-object-promiseinfertypeschema-validationerror)

[Back to course index](00-course-index.md)
