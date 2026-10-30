# 60. Creating a Mongo DB project

Course section: 5: Authentication

## What you will learn

Provision the database used by the practice app.

In this lesson, **MongoDB** is the main idea to recognize. Start with the example below, then use the vocabulary list whenever a term is unfamiliar.

## Key vocabulary

- **MongoDB:** A database that stores document-shaped records.
- **Cluster:** A group of database servers or a managed database deployment.
- **Environment variable:** A setting supplied by the environment where a process runs.
- **Runtime config:** Nuxt configuration available while the application runs, with private and public areas.

## What this topic includes

Create the MongoDB project and cluster in MongoDB’s console. Commands here configure the Nuxt side; they do not provision cloud infrastructure or embed real credentials.

**How to use the examples:** Each numbered subsection covers one listed subtopic. Blocks labeled “script setup”, “inside”, or “fragment” belong in the indicated surrounding component or handler. Alternative versions replace one another; do not paste every block into a single file.

### 1. MongoDB project

Create a project in MongoDB Atlas, then keep its database URI in the Nuxt server environment.

**Where:** Local setup checklist

```text
1. Create/select an Atlas project.
2. Create a database deployment in that project.
3. Open Connect → Drivers to obtain its connection URI.
```

### 2. Cluster

The cluster hostname comes from Atlas. A local MongoDB alternative needs a running local server.

**Where:** Connection URI structure

```text
mongodb+srv://USER:ENCODED_PASSWORD@YOUR_CLUSTER_HOST/evento
# Local development alternative:
mongodb://127.0.0.1:27017/evento
```

### 3. Database credentials

URL-encode special characters before inserting a password into a URI. Use a private prompt or secret manager for actual credentials.

**Where:** Terminal

```sh
node -e "console.log(encodeURIComponent('example@password'))"
# Output: example%40password
# Create a database user with access only to the application database.
```

### 4. Environment variables

The runtime config key and environment variable must match. Do not commit .env.

**Where:** .env and nuxt.config.ts

```text
# .env
NUXT_MONGODB_URI=mongodb://127.0.0.1:27017/evento
# nuxt.config.ts: runtimeConfig: { mongodbUri: '' }
# .gitignore: .env
```
## Simple example

Store database connection settings in a local environment file.

## Remember

- Keep credentials out of source control and public runtime configuration.

## Best practices and edge cases

- Declare private runtime settings outside runtimeConfig.public. Everything inside public is available to the browser.
- Use matching NUXT_ environment variables for runtime overrides and configure production variables in the deployment environment.
- Do not assume a production server loads your local .env file. Test required configuration using the built application.

## Official documentation

- [Nuxt 4: Runtime Config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

Reviewed against the official documentation on October 30, 2026. Practical checks and security recommendations are developer guidance applied to the lesson. Authentication, MongoDB, Yup, and UI integrations also require their own package documentation.

## Package references for these examples

- [Nuxt Auth Utils setup and session helpers](https://nuxt.com/modules/auth-utils)
- [Mongoose models and queries](https://mongoosejs.com/docs/guide.html)

[Back to course index](00-course-index.md)
