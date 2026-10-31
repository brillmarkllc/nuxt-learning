# 05. What is NUXT ?

Course section: 1: Introduction

Nuxt is a **framework**: a collection of tools and agreed places to put files. Vue handles the visible pieces of a page; Nuxt adds page addresses, server features, and tools for loading information.

**Additional example — a bookshop:** You could create a home page in `app/pages/index.vue`, a reusable book card in `app/components/BookCard.vue`, and a request handler in `server/api/books.get.js`. The handler supplies book information; the card displays it. These filenames illustrate the structure, rather than a complete shop to run yet.

Nuxt finds files in these locations automatically. This saves you from manually connecting every page and component. You can change the defaults when necessary.

## From code to a page

By default, Nuxt prepares the first page on the server and sends HTML to the browser. The browser then connects interactive behavior to that HTML. That connection is called **hydration**. A visitor can see a heading before a button is ready to respond.

Nuxt can also prepare public pages ahead of time, or build pages in the browser. These options matter when you decide where to publish the website.

Nuxt's server tools are powered by **Nitro**. You do not need to configure a separate server framework to start adding request handlers. However, Nuxt does not automatically create a database, user accounts, or a working shop: you still choose and build those features.

The next step is to create a small app and see the files for yourself.

## Official documentation

- [Nuxt 4: Introduction](https://nuxt.com/docs/4.x/getting-started/introduction)

[Back to course index](00-course-index.md)
