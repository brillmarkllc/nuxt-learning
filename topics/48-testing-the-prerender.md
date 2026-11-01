# 48. Testing the Prerender

Course section: 4: Building

Test generated files with a static file server. The development server can hide deployment problems because it still runs all your server code.

**Additional walkthrough:** In `render-lab`, generate the pages from topic 47, then serve only the output:

```sh
npx nuxt generate
npx serve .output/public
```

Open the address printed by `serve`. If it offers to install its package, allow that local preview tool to run.

1. Open the home page and follow the About link.
2. Open `/about` directly in a new browser tab and reload it. The same page should appear.
3. Edit the about page's source text while keeping this preview running. The preview should still show the old output. Run generate again and refresh to see the new version.

The third check demonstrates the snapshot: changing source files does not update an already generated site.

## Check the server boundary

A static host cannot execute files from `server/api/`. For example, run this in the browser console on the static preview:

```js
const response = await fetch('/api/static-check', { method: 'POST' })
console.log(response.status, response.headers.get('content-type'))
```

No such API has been added to `render-lab`, so this should not report a successful API operation. Depending on the host, it may return a missing-page response or an HTML fallback. A successful-looking status alone is not proof that a form saved data; inspect the response and the stored result.

The employee app needs a running API for adding, editing, and deleting. Use a server build for that app, as shown next. A generated public list might display a snapshot while its write operations fail on static hosting.

## Official documentation

- [Nuxt 4: Prerendering — preview generated output](https://nuxt.com/docs/4.x/getting-started/prerendering)
- [Nuxt 4: Static rendering limitations](https://nuxt.com/docs/4.x/guide/concepts/rendering#deploying-a-static-client-rendered-app)

[Back to course index](00-course-index.md)
