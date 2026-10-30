# Nuxt course study notes

78 beginner-friendly lesson notes, in the original CSV order. Each includes a learning goal, key vocabulary with plain-English definitions, a simple example, important reminders, and practical developer guidance.

Source: `the-complete-nuxt-js-course-welcome-to-the-server-side_transcripts.csv`. Examples are teaching illustrations rather than verbatim code from the videos. These notes follow the course conventions (including its `app/` directory structure); the added developer guidance links to the official Nuxt 4 documentation. Some transcript spelling and API-name errors have been normalized.

- [01. Introduction](01-introduction.md)
- [02. Installing NODE](02-installing-node.md)
- [03. IDE](03-ide.md)
- [04. Repositories](04-repositories.md)
- [05. What is NUXT ?](05-what-is-nuxt.md)
- [06. Creating an App](06-creating-an-app.md)
- [07. How routes work](07-how-routes-work.md)
- [08. Static routes](08-static-routes.md)
- [09. Nested routes](09-nested-routes.md)
- [10. Dynamic routes](10-dynamic-routes.md)
- [11. Getting params](11-getting-params.md)
- [12. Catch all routes](12-catch-all-routes.md)
- [13. SEO and Meta](13-seo-and-meta.md)
- [14. Page metadata](14-page-metadata.md)
- [15. Layouts](15-layouts.md)
- [16. Links and Navigation](16-links-and-navigation.md)
- [17. Components](17-components.md)
- [18. Custom components and Profile](18-custom-components-and-profile.md)
- [19. Working with styles](19-working-with-styles.md)
- [20. Fonts and Pre-Processors](20-fonts-and-pre-processors.md)
- [21. Global middleware](21-global-middleware.md)
- [22. Named and Local Middleware](22-named-and-local-middleware.md)
- [23. Composables](23-composables.md)
- [24. Re-Exporting composables](24-re-exporting-composables.md)
- [25. Utils](25-utils.md)
- [26. Plugins](26-plugins.md)
- [27. 404 Page](27-404-page.md)
- [28. Creating a template](28-creating-a-template.md)
- [29. The NUXT lifecycle](29-the-nuxt-lifecycle.md)
- [30. Setting up a DB](30-setting-up-a-db.md)
- [31. Fetching data](31-fetching-data.md)
- [32. The server folder](32-the-server-folder.md)
- [33. API Routes](33-api-routes.md)
- [34. API Routes part 2](34-api-routes-part-2.md)
- [35. Add employee form](35-add-employee-form.md)
- [36. Body and QueryP](36-body-and-queryp.md)
- [37. Posting employees](37-posting-employees.md)
- [38. Server routes](38-server-routes.md)
- [39. Server middleware](39-server-middleware.md)
- [40. Server Nitro plugins](40-server-nitro-plugins.md)
- [41. Server utils](41-server-utils.md)
- [42. More about H3.JS](42-more-about-h3-js.md)
- [43. Edit employee form](43-edit-employee-form.md)
- [44. Patch employee by ID](44-patch-employee-by-id.md)
- [45. Employee by ID page](45-employee-by-id-page.md)
- [46. Deleting employees](46-deleting-employees.md)
- [47. Prerender](47-prerender.md)
- [48. Testing the Prerender](48-testing-the-prerender.md)
- [49. Running the build](49-running-the-build.md)
- [50. Prerender configs](50-prerender-configs.md)
- [51. Route rules](51-route-rules.md)
- [52. Nuxt modules](52-nuxt-modules.md)
- [53. Prefetching](53-prefetching.md)
- [54. Lazy loading components](54-lazy-loading-components.md)
- [55. Nuxt Image](55-nuxt-image.md)
- [56. Install and Config](56-install-and-config.md)
- [57. App Header](57-app-header.md)
- [58. Sign up form](58-sign-up-form.md)
- [59. Sign up client validation](59-sign-up-client-validation.md)
- [60. Creating a Mongo DB project](60-creating-a-mongo-db-project.md)
- [61. Connecting to Mongo DB](61-connecting-to-mongo-db.md)
- [62. Creating the user model](62-creating-the-user-model.md)
- [63. Server sign-up endpoint](63-server-sign-up-endpoint.md)
- [64. Sign up users](64-sign-up-users.md)
- [65. Server side validation](65-server-side-validation.md)
- [66. Sign in users](66-sign-in-users.md)
- [67. Pinia user store](67-pinia-user-store.md)
- [68. Logout and Nav Links](68-logout-and-nav-links.md)
- [69. Guard middleware](69-guard-middleware.md)
- [70. The create Event form](70-the-create-event-form.md)
- [71. The event model](71-the-event-model.md)
- [72. Server API post event and endpoint](72-server-api-post-event-and-endpoint.md)
- [73. Posting events](73-posting-events.md)
- [74. Posting event validation](74-posting-event-validation.md)
- [75. Home session validator](75-home-session-validator.md)
- [76. Showing the events at home](76-showing-the-events-at-home.md)
- [77. Handling status](77-handling-status.md)
- [78. Deleting events](78-deleting-events.md)

## How to study these notes

1. Read the learning goal and key vocabulary. You do not need to memorize every term.
2. Work through the simple example and relate the new terms to the code or behavior.
3. Review the reminders and edge cases, then try the practice check.
4. Follow the official documentation link when you need a fuller explanation.

## Key vocabulary

- **Lesson:** One topic to learn and practice before moving on.
- **Example:** A small illustration of an idea; it may need surrounding project files to run.
- **Edge case:** An unusual situation, such as missing data or a failed request, that your app should handle.
- **Best practice:** A recommended approach that helps make an app reliable and maintainable.
- **Official documentation:** Guidance published by the maintainers of the framework or package.

## Official documentation enrichment

All 78 lessons include Nuxt 4 developer guidance, edge cases, practical checks, and an official reference. Related lessons share foundational advice; implementation patterns are included where useful. Nuxt documentation does not fully specify third-party authentication, database, validation, or UI packages.

## Practical examples in every lesson

Each item under “What this topic includes” now has a numbered subsection with code or commands, a file location, and an explanation of the expected behavior. Start with a working Nuxt 4 project; the setup paragraph in each lesson names additional packages or earlier lesson files it needs. Alternatives and fragments are labeled rather than presented as standalone applications.

For the employee lab, use JSON Server on port 3001 and private runtimeConfig.employeeApiBase. For the EventO examples, follow the setup chain: modules (56), database connection (61), user model (62), account endpoints (63 and 66), event model (71), event validation (74), event POST (72), event GET (76), completion PATCH (77), and deletion DELETE (78). The validation file is deliberately needed before the POST handler.

The practical EventO examples store optional calendar dates as YYYY-MM-DD strings, and use separate PATCH and DELETE endpoints for completion and deletion. These choices are explained in the relevant lessons.
