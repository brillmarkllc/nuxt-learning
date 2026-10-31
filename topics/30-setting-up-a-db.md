# 30. Setting up a DB

Course section: 3: The server

A **database** stores information so it survives a page reload. For the employee examples, use JSON Server: a small practice service that reads and updates a local file. It is a mock API, not a production account or database system.

**Additional working example:** From the `employee-lab` project root, install the specific version used by these examples:

```sh
npm install -D json-server@0.17.4
```

Create `db.json` in the project root:

```json
{
  "employees": [
    { "id": 1, "name": "Asha", "position": "Bookseller", "age": 28 }
  ]
}
```

**JSON** is a text format for structured information. Curly braces hold named fields; square brackets hold a list. Field names and text use double quotes. Do not add comments inside this file.

Run the mock service in its own terminal:

```sh
npx json-server --watch db.json --host 127.0.0.1 --port 3001
```

Visit `http://127.0.0.1:3001/employees`: you should see the list containing Asha. Keep this terminal open. Run Nuxt in another terminal with `npm run dev`; it normally uses port 3000. A **port** distinguishes services running on the same computer.

## Tell Nuxt where the service is

Add this property inside `defineNuxtConfig({ ... })` in `nuxt.config.ts`:

```ts
runtimeConfig: {
  employeeApiBase: 'http://127.0.0.1:3001'
}
```

Later server handlers read this setting. It is outside `public`, so Nuxt does not automatically send it to browser code. The matching environment override is `NUXT_EMPLOYEE_API_BASE`.

JSON Server saves successful changes back into `db.json`. Use fictional records and keep the service local: these exercises do not add sign-in or access controls. The version is pinned because newer JSON Server versions have different behaviour. Nuxt's docs explain the configuration; the linked JSON Server documentation supplies the mock-service setup.

## Official documentation

- [Nuxt 4: Runtime config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)
- [JSON Server 0.17.4: official README](https://raw.githubusercontent.com/typicode/json-server/v0.17.4/README.md)

[Back to course index](00-course-index.md)
