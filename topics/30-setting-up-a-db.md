# 30. Setting up a DB

Course section: 3: The server

## What you will learn

Create a local mock API for CRUD practice.

In this lesson, **Mock API** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **Mock API:** A practice API that imitates a real service without its full production infrastructure.
- **JSON:** A text format for exchanging structured data using objects, arrays, and basic values.
- **Database:** A system for storing and querying application data.
- **Record:** One stored item, such as an employee or event.
- **CRUD:** Create, read, update, and delete: the four basic operations for stored records.

## What this topic includes

Use JSON Server 0.17.4 for this course-style exercise. The mock API is for local practice; never expose it as an authenticated production database.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. JSON Server

Pin the mock API package because newer major versions use different behavior.

**Where:** Terminal

```sh
npm install -D json-server@0.17.4
```

### 2. JSON records

The top-level employees collection becomes the /employees resource.

**Where:** db.json

```json
{ "employees": [{ "id": 1, "name": "Ada", "position": "Developer", "age": 28 }] }
```

### 3. Local ports

Nuxt commonly uses 3000; run the mock API on 3001 to avoid a port conflict.

**Where:** Terminal

```sh
npx json-server --watch db.json --port 3001
```

### 4. Running the API

Keep JSON Server running, then query its collection from another terminal.

**Where:** Another terminal

```sh
curl http://localhost:3001/employees
```
## Simple example

Store an employees collection in a JSON file and fetch it from the mock server.

## Remember

- The course relies on a specific JSON Server version; keep the mock API running separately.

## Best practices and edge cases

- Use useFetch for an HTTP resource or useAsyncData with a custom fetcher during setup. Their payload integration avoids repeating the initial request during hydration.
- Use $fetch for user-triggered mutations such as submitting a form, then refresh the affected list after success.
- Pass a getter or computed URL when a request depends on a route parameter. Handle pending, error, empty, and successful results separately.
- Calls sharing a data key share state. Keep their important options consistent and avoid keys that mix results from different users.
- During SSR, relative useFetch requests can forward request context; a plain server-side $fetch does not automatically forward the browser’s cookies.

## Official documentation

- [Nuxt 4: Data Fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

[Back to course index](00-course-index.md)
