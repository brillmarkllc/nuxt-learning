# 49. Running the build

Course section: 4: Building

A **build** prepares the app to run outside the development server. A Node server build includes both browser files and the server handlers needed for forms and database requests.

**Additional walkthrough:** Return to `employee-lab`. Keep its JSON Server running on port 3001. Stop Nuxt's development server with Ctrl+C so port 3000 is free, then run from the project root:

```sh
npm run build
```

For a standard Node server build, the result includes:

```text
.output/
  public/
  server/index.mjs
```

Start the built server on macOS or Linux:

```sh
NODE_ENV=production node .output/server/index.mjs
```

In Windows PowerShell, use:

```powershell
$env:NODE_ENV = 'production'
node .output/server/index.mjs
```

Open the address printed in the terminal. Check `/employees`, reload a detail page directly, and create a disposable employee. The API should still run because this output includes the Nuxt server.

If your environment selects a different deployment target automatically, explicitly use the `node-server` preset for this local Node exercise. Other hosts may require different output and startup instructions.

## Supply settings when the server runs

Nuxt reads `.env` during development and building, but the built server does not automatically read that file. Supply settings through your terminal or hosting environment. The employee service address can be overridden with `NUXT_EMPLOYEE_API_BASE`.

A local address such as `127.0.0.1:3001` refers to the machine running the built server. Publishing Nuxt elsewhere does not publish your laptop's JSON Server. This remains a local practice setup.

Use `npx nuxt generate` for a purely static site; use a server build when the app needs server operations. Check the built output, because a working development session does not prove the deployment setup works.

## Official documentation

- [Nuxt 4: Deployment — Node.js server](https://nuxt.com/docs/4.x/getting-started/deployment#nodejs-server)
- [Nuxt 4: Runtime configuration](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

[Back to course index](00-course-index.md)
