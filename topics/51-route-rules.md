# 51. Route rules

Course section: 4: Building

**Route rules** choose server behaviour for matching addresses. A public about page can be prepared during the build while another page is rendered when someone requests it. Combining these behaviours is called **hybrid rendering**.

**Additional example:** In `render-lab`, merge this into the root `nuxt.config.ts` configuration:

```ts
routeRules: {
  '/about': { prerender: true },
  '/old-about': { redirect: '/about' },
  '/books/**': { prerender: false }
}
```

Remove the explicit `/books/101` and `/books/102` prerender list from topic 50 for this alternative. Keep the page files.

Use a server build:

```sh
npm run build
```

Start the built server using the command for your operating system in topic 49. Visit `/about`, `/old-about`, and `/books/101`. The about page is prepared ahead of time, the old address redirects, and book pages remain available through the running server.

`/**` matches the paths beneath a section. Rules select behaviour; they do not create missing pages, verify users, or check database ownership.

## Caching is a separate choice

**Caching** keeps a response so later requests can reuse it. For public information, a rule such as `'/books/**': { swr: 60 }` can reuse a response and refresh it in the background after its lifetime expires. This is an optional alternative to the books rule above, not a required setting.

Do not apply shared public caching to personal account responses. Some cache modes, such as provider-specific `isr`, depend on hosting support. Hybrid server behaviour is unavailable in a purely static `nuxt generate` deployment.

## Official documentation

- [Nuxt 4: Rendering — hybrid rendering and route rules](https://nuxt.com/docs/4.x/guide/concepts/rendering#hybrid-rendering)
- [Nuxt 4: Prerendering](https://nuxt.com/docs/4.x/getting-started/prerendering)

[Back to course index](00-course-index.md)
