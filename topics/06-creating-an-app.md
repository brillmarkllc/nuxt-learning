# 06. Creating an App

Course section: 2: The Pages

## What you will learn

Create and launch the starter application.

In this lesson, **Scaffolding** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Scaffolding:** Generating the starting files and folders for a project.
- **npm:** A package manager used to install dependencies and run project scripts.
- **Dependency:** A package your project needs to build or run.
- **Lockfile:** A file recording resolved package versions so installations can be reproduced.
- **Development server:** A local process that serves your app and updates it while you edit files.

## What this topic includes

Run the scaffolding command in a parent directory and choose a new project folder. Do not overwrite another project.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Project scaffolding

Generate the starter files in a new folder named learner-app.

**Where:** Terminal

```sh
npm create nuxt@latest learner-app
```

### 2. Package manager

Use npm consistently with the generated package-lock.json. Run this inside learner-app if dependencies were not already installed.

**Where:** Terminal

```sh
cd learner-app
npm install
```

### 3. App entry file

The page outlet displays the active page instead of the starter welcome component.

**Where:** app/app.vue

```vue
<template><NuxtPage /></template>
```

### 4. Development server

Start the development process and open the local URL it prints.

**Where:** Terminal

```sh
npm run dev
```
## Simple example

After creating the course project, run `npm run dev` and visit the printed local URL.

## Remember

- Check the destination before accepting any overwrite prompt.

## Best practices and edge cases

- Use the Node.js version required by the Nuxt installation guide and keep a lockfile so teammates install the same dependencies.
- Run development commands from the project root. Inspect package.json scripts before assuming a build or preview command exists.
- Use the lesson repository branch matching the exercise; do not overwrite an existing project when scaffolding.

## Try it yourself

Rebuild the example above, then test it with a direct page reload and navigation from another page. Check both the browser console and server terminal for errors.

## Official documentation

- [Nuxt 4: Installation](https://nuxt.com/docs/4.x/getting-started/installation)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
