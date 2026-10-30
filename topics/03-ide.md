# 03. IDE

Course section: 1: Introduction

## What you will learn

Set up an editor for writing and running the course projects.

In this lesson, **IDE** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **IDE:** An integrated development environment: an editor with tools for writing and running code.
- **Extension:** An editor add-on that provides features such as Vue syntax support.
- **Terminal:** A text-based interface where you run commands.
- **Vue:** A JavaScript framework for building interfaces from reusable components.

## What this topic includes

These examples configure an existing project in VS Code. Enable the code command from VS Code if it is not on your PATH.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. VS Code

Open the current project folder in VS Code.

**Where:** Terminal

```sh
code .
```

### 2. Vue Official extension

Install Vue language support for .vue files.

**Where:** Terminal

```sh
code --install-extension Vue.volar
```

### 3. Integrated terminal

Open Terminal → New Terminal, then start the app from its project directory.

**Where:** VS Code integrated terminal

```sh
npm run dev
```

### 4. Tailwind tooling

Install Tailwind editor support. With the course Nuxt UI setup, classes such as text-xl and font-bold receive editor assistance.

**Where:** Terminal and app/pages/index.vue

```sh
code --install-extension bradlc.vscode-tailwindcss
```
## Simple example

Open a project folder and use Terminal → New Terminal.

## Remember

- The editor is optional; the course uses VS Code for demonstrations.

## Best practices and edge cases

- Use the Node.js version required by the Nuxt installation guide and keep a lockfile so teammates install the same dependencies.
- Run development commands from the project root. Inspect package.json scripts before assuming a build or preview command exists.
- Use the lesson repository branch matching the exercise; do not overwrite an existing project when scaffolding.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Installation](https://nuxt.com/docs/4.x/getting-started/installation)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt UI setup](https://nuxt.com/modules/ui)

[Back to course index](00-course-index.md)
