# 02. Installing NODE

Course section: 1: Introduction

## What you will learn

Prepare Node.js so JavaScript development tools can run on your computer.

In this lesson, **Node.js** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Node.js:** A runtime that executes JavaScript outside the browser, including development and server code.
- **npm:** A package manager used to install dependencies and run project scripts.
- **Terminal:** A text-based interface where you run commands.
- **Dependency:** A package your project needs to build or run.

## What this topic includes

Install the supported Node.js LTS release from the official installer first. These are terminal commands.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Installing Node.js

Open the installer instructions, choose the installer for your operating system, and install the LTS release supported by Nuxt.

**Where:** Terminal

```sh
# macOS: open the official download page.
open https://nodejs.org/en/download
# Windows/Linux: open that URL in your browser instead.
```

### 2. Using the terminal

Move into an existing project folder before running project commands.

**Where:** Terminal

```sh
cd /path/to/your/nuxt-project
pwd
```

### 3. Checking installation

Both commands should print versions. A missing command means installation or terminal PATH needs attention.

**Where:** Terminal

```sh
node --version
npm --version
```
## Simple example

Run `node -v` and confirm it prints a version.

## Remember

- Restart your terminal if a newly installed Node command is not found.

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
