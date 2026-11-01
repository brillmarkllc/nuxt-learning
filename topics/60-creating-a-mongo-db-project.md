# 60. Creating a Mongo DB project

Course section: 5: Authentication

**MongoDB** stores records as documents: groups of named fields such as an email and a password hash. **Atlas** is MongoDB's managed service. A project groups its resources; a cluster is the database deployment your app connects to.

Nuxt handles private configuration, but creating an Atlas database is a MongoDB task. The linked MongoDB instructions supply those steps.

## Prepare an Atlas development database

**Additional walkthrough:** In the Atlas dashboard:

1. Create or choose a project for EventO.
2. Create a development cluster. The documented Free option is suitable for a small learning app; check the displayed tier before creating it.
3. Create a database user. This is separate from the account used to sign in to Atlas. Give it the permissions needed for the `evento` database.
4. Add your current IP address to the project's network access list. Update the entry if your connection changes.
5. Open the cluster's **Connect → Drivers** flow and choose Node.js to obtain its connection string.

Replace the connection string's username and password placeholders privately. Add `/evento` as the database name before any `?` options, preserving the supplied hostname and options. Reserved characters in credentials must be URL-encoded, for example `@` becomes `%40`.

## Save the connection setting

In the root `.env` of `evento`, add your completed connection string:

```dotenv
NUXT_MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_ENCODED_PASSWORD@YOUR_ATLAS_HOST/evento?retryWrites=true&w=majority
```

This is a placeholder showing the shape, not a working credential. Keep the existing `NUXT_APP_SECRET` line. Confirm `.gitignore` excludes `.env`.

The private declaration from topic 56 must remain in `nuxt.config.ts`:

```ts
runtimeConfig: { mongodbUri: '' }
```

Do not put the URI inside `runtimeConfig.public`; that area is available to the browser. Restart the development server after changing `.env`. The next topic adds code to test the connection.

If you already run MongoDB locally, `mongodb://127.0.0.1:27017/evento` is an alternative URI. It only works with an actual local MongoDB server running; Nuxt does not install one.

## Official documentation

- [Nuxt 4: Runtime config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)
- [MongoDB Atlas: Create a development cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster.md?tabs=ui)
- [MongoDB Atlas: Connect an application](https://www.mongodb.com/docs/atlas/driver-connection/)

[Back to course index](00-course-index.md)
