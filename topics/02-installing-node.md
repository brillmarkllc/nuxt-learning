# 02. Installing NODE

Course section: 1: Introduction

Node.js lets your computer run JavaScript outside a browser. Nuxt uses it to run development tools and the local website while you work. **npm**, included with the usual Node.js installation, downloads the packages a project needs.

## Install and check

1. Open the [official Node.js download page](https://nodejs.org/en/download) and follow the instructions for your operating system. Choose the active **LTS** release: a version supported for long-term use. The current Nuxt 4 installation guide requires Node.js 22 or newer and recommends an even-numbered version.
2. Finish the installation, then open a new **terminal**—the app where you type commands. On Windows, PowerShell is suitable; on macOS, use Terminal.
3. Run these checks separately:

```sh
node --version
npm --version
```

Each command should print a version number. The two numbers do not need to match. If a command is not found, close and reopen the terminal first. If it still fails, check that the Node.js installation completed.

**Additional example:** `v24.x.x` illustrates the format of a Node.js version; the `x` characters stand for numbers. Do not type that example as a command.

You now have the tools needed to create a Nuxt app. There is no project to run yet.

## Official documentation

- [Nuxt 4: Installation](https://nuxt.com/docs/4.x/getting-started/installation)

[Back to course index](00-course-index.md)
