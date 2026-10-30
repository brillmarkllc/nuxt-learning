# 04. Repositories

Course section: 1: Introduction

## What you will learn

Use the course repositories to follow or compare lesson code.

In this lesson, **Repository** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Repository:** A collection of project files and their recorded change history.
- **Branch:** A separate line of changes inside a version-controlled repository.
- **Git:** A tool that tracks changes to project files.
- **GitHub:** A service that hosts Git repositories and collaboration tools.

## What this topic includes

The course repository URL and branch names must come from the actual lesson resources. Replace the placeholders before running commands.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. Lesson resources

Save the actual repository URL from the lesson resources in a shell variable for this terminal session.

**Where:** Terminal

```sh
COURSE_REPO_URL='https://github.com/OWNER/REPOSITORY.git'
# Replace OWNER/REPOSITORY with the course repository.
```

### 2. GitHub branches

Inspect available branches before choosing the branch named in your lesson.

**Where:** Terminal

```sh
git branch --all
# After committing or saving local work:
git switch LESSON_BRANCH
```

### 3. Downloading and comparing source

Clone the course into a separate folder, then inspect differences on a changed file.

**Where:** Terminal

```sh
git clone "$COURSE_REPO_URL" course-reference
# Inside your own Git project, inspect your uncommitted changes:
git diff -- app/pages/index.vue
```
## Simple example

Select the branch matching the nested-routes lesson before comparing files.

## Remember

- Repository links are in the course resources; the CSV does not supply a verified repository URL.

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
