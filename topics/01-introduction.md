# 01. Introduction

Course section: 1: Introduction

Nuxt helps you build websites with pages, buttons, forms, and server code. It brings common website tools together so you spend less time connecting them yourself.

Nuxt uses **Vue**, a tool for building what people see and click. A Vue **component** is a piece of a page, such as a header or a product card. You can reuse that piece in several places.

## A shop example

**Additional example — created to explain the idea:** A small bookshop needs a home page, a page for each book, and a way to load book details. Nuxt provides tools for all three:

- Files in `app/pages/` become page addresses. This is called **routing**.
- Reusable pieces go in `app/components/`. Nuxt can make them available without a separate import statement in each page.
- Files in `server/api/` can respond to requests for information, such as a list of books.

These are separate jobs. A page displays information; a server endpoint answers a request for information.

## What happens when someone opens a page?

By default, Nuxt can prepare the page on the **server**—the computer that responds to a visitor's request—and send its HTML to the browser. HTML describes the page's content and structure. Preparing it this way is called **server-side rendering**, often shortened to SSR.

The browser can display that content before all the interactive behavior is ready. JavaScript then makes things such as buttons and forms respond. Having the initial content ready can also help search engines read it.

Nuxt also supports generating pages ahead of time or rendering them in the browser. The right choice depends on what the website needs; a page with changing private account information has different needs from a public article.

## Reading the examples

File paths tell you where code belongs. `app/pages/about.vue`, for example, means an `about.vue` file inside `pages`, inside `app`. A `.vue` file describes a Vue component.

You do not need to know Vue or TypeScript before starting these notes. TypeScript adds checks to JavaScript code; Nuxt supports it, but the first examples can use ordinary JavaScript. When a new piece of syntax appears, read its explanation alongside the code.

Start with [installing Node](02-installing-node.md), then follow the setup topics through [creating an app](06-creating-an-app.md) before trying examples that need a running project.

## Official documentation

- [Nuxt 4: Introduction](https://nuxt.com/docs/4.x/getting-started/introduction)

[Back to course index](00-course-index.md)
