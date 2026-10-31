# 21. Global middleware

Course section: 2: The Pages

**Route middleware** is code that runs before a page visit finishes. It can allow the visit, redirect it to another page, or stop it. **Global** middleware runs for every page navigation.

**Additional example:** Redirect an old shop address to the existing `/about` page. Create `app/middleware/legacy.global.js`:

```js
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/old-about') {
    return navigateTo('/about')
  }
})
```

Visit `/old-about`. The address should change to `/about`, where the shop information appears. Other addresses work normally.

`to` describes the destination. `if` checks whether it is the old address. `return navigateTo(...)` hands the redirect back to Nuxt. When there is no matching condition, returning nothing allows navigation to continue.

The `.global` part of the filename makes Nuxt run this automatically. You do not add it to every page's settings.

Check the destination before redirecting. Redirecting every visit to `/about`, including visits already going there, can create a loop.

On an initial server-rendered visit, middleware can run on the server and again in the browser. Do not assume it runs only once or that browser objects such as `window` are available. Use the supplied `to` and `from` arguments here, not `useRoute`.

Route middleware only controls page navigation. It does not protect server endpoints; private server operations need their own checks.

## Official documentation

- [Nuxt 4: Middleware](https://nuxt.com/docs/4.x/directory-structure/app/middleware)

[Back to course index](00-course-index.md)
