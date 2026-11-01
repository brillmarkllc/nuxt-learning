# 55. Nuxt Image

Course section: 4: Building

Large images can make a page slow. **Nuxt Image** is an optional module that can resize images and generate versions suited to different screens.

**Additional example:** In `render-lab`, install it from the project root:

```sh
npx nuxt module add image
```

Check that `nuxt.config.ts` includes `'@nuxt/image'` once in its existing `modules` list. Supply a photograph you may use at `public/images/bookshop.jpg`. This image file is not included with the notes; the example assumes it is 1200 by 800 pixels. Adjust dimensions to match your own image.

Create `app/pages/gallery.vue`:

```vue
<template>
  <main>
    <h1>Inside the bookshop</h1>
    <NuxtImg
      src="/images/bookshop.jpg"
      alt="Books arranged on the shop's wooden shelves"
      width="1200"
      height="800"
      sizes="100vw sm:80vw md:800px"
      format="webp"
      quality="80"
      class="shop-photo"
    />
  </main>
</template>

<style scoped>
.shop-photo { width: 100%; max-width: 800px; height: auto; }
</style>
```

Open `/gallery`. The photograph should fit the available width without stretching. The `sizes` setting describes its expected display size so the browser can choose a suitable generated version. Width and height reserve space, reducing page movement while the image loads.

`alt` describes the useful content for people who cannot see the image. Change it to match your photograph. Use empty alt text for a purely decorative image.

For an image far down a page, `loading="lazy"` can defer its download. Avoid delaying the main image a visitor needs immediately.

Nuxt Image is a separate package. Remote image hosts need the module's domain configuration, and its default image processor has deployment requirements. Check the built site on the target operating system; a successful development preview does not guarantee that image-processing binaries are available after deployment.

## Official documentation

- [Nuxt 4: Performance — images](https://nuxt.com/docs/4.x/guide/best-practices/performance#images)
- [Nuxt Image: Installation](https://image.nuxt.com/get-started/installation)
- [Nuxt Image: NuxtImg](https://image.nuxt.com/usage/nuxt-img)

[Back to course index](00-course-index.md)
