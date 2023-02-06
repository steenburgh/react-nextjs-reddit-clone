# NextJS/React/TypeScript Reddit Clone
This app is deployed to https://reddit-clone.duncansteenburgh.com/

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

## NextJS README
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
