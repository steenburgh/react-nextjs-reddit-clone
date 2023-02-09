# NextJS/React/TypeScript Reddit Clone
This app is deployed to https://reddit-clone.duncansteenburgh.com/

## Features
Implemented
* Automatic Light + Dark theme. Automatically matches your computer/phone's settings
* Automatic refresh + error retries
* Real-time updates
* Server-side rendering to improve performance
* Click post titles to navigate to linked content
* View posts by subreddit: Click the subreddit name on a post
* View posts by user: Click the user name on a post
* Vote on posts
* Create posts (text)
* Sort posts by Top/New/Hot
* REST API for accessing SQL backend
* [Work in progress] Click the 'comments' button to view comments on posts

Planned
* Create image + link posts
* Post in a specific subreddit
* User sessions + authentication
* Image embeds
* Visual rework + polish
* Image hosting


## Technologies
* [TypeScript](https://www.typescriptlang.org/) - JavaScript with types. A popular extension of JavaScript built with the goal of reducing the amount of bugs in front-end code.
* [React](https://reactjs.org/) - A popular virtual DOM-based library for declaratively building component-based UIs
* [Next.js](https://nextjs.org/) - All-in-one full-stack framework for building high performance, SEO-optimized applications with a focus on server-side rendering and static site generation (SSR/SSG)
* [SWR](https://swr.vercel.app/) - Library for declaratively making API calls, and automatically keeping data up to date in realtime. Stands for 'stale while revalidate', which means automatically display stale data immediately, then revalidate in the background. Includes lots of goodies such as automatic refreshes when the user turns on their pc/comes online/switches to the tab, error retries, and API call deduping to reduce the need for a global state management solution.
* [Prisma](https://www.prisma.io/) - A TypeScript ORM. This project uses it for interfacing with the app's MySQL backend
* [Vercel](https://vercel.com/) - Full stack application hosting platform. Lots of cool stuff built in like automatic CDN caching, and GitHub/Next.js integration
* [PlanetScale](https://planetscale.com/) - Serverless database platform. Lots of cool features like schema branches and deploy requests

## Development scripts
* `npm run dev` -> Run the dev server. **Will not work properly if you don't have a local database set up**
* `npm run lint` -> Static analysis: check your code for style issues and common mistakes
* `npm run build` -> Run the prod build
* `npm start` -> Host the prod build locally. Won't work unless `npm run build` has been run

## Local database setup
### Setup PlanetScale
*Note: Though the database is deployed using PlanetScale, it's technically not required, and you could use any other MySQL database provider you like.*
1. Install the [PlanetScale CLI](https://planetscale.com/docs/concepts/planetscale-environment-setup)
1. Run `pscale auth login`
1. Run `pscale database create reddit_clone`
1. Wait a bit while planetscale creates the DB. Check the status using the web UI
1. Run `pscale connect reddit_clone develop --port 3309`. This will proxy localhost:3309 to the PlanetScale cloud db you just created

### Use the schema to set up your DB
1. Run `npx prisma db push`
1. Run `npx prisma studio` and verify that the tables were created
1. In the PlanetScale Web UI, open + merge a [deploy request](https://planetscale.com/docs/concepts/deploy-requests) for your changes


## Making a DB change
### 1. Create a new branch on PlanetScale
1. Create the branch: `pscale branch create reddit_clone <branch_name>`
1. Start the proxy: `pscale connect reddit_clone <branch_name> --port 3309`

### 2. Make changes
Every time you need to make a change, do the following
1. Modify `prisma/schema.prisma`
1. (Optional): Run `prisma format` to check + format your schema
1. Run `prisma db push` to update your DB with the changes

### 3. Deploy your changes
Do this via the PlanetScale [deploy request](https://planetscale.com/docs/concepts/deploy-requests) workflow

## Database Work: Other helpful commands + tips
* Open a SQL shell for your database: `pscale shell reddit_clone <branch_name>`
* Overwrite your `schema.prisma` file with the latest schema from your DB: `prisma db pull`
* When Prisma generates artifacts, they're placed in `node_modules/.prisma`
