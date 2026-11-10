This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses [pnpm](https://pnpm.io). Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. The port is set in the `dev` script in `package.json`. If you change it, update `NEXTAUTH_URL` in `.env.local` to match.

## Mock data

The blog currently runs without a database:

- Posts, categories, authors and comments are defined in `src/data/mockData.js`.
- `src/utils/mockDb.js` serves them from memory to the pages and the API routes in `src/app/api`. Posts and comments created while the server runs are lost on restart. Restart `pnpm dev` after editing the mock data.
- Post covers are the photos in `public/`, and author avatars are in `public/mock/avatars/`.
- **Demo login:** on the Login page, **Sign in with a demo account** signs you in as "Demo Writer" with no password, so you can write posts and comments. Remove the `demo` provider in `src/utils/auth.js` once real accounts exist.
- Images added on the Write page aren't uploaded anywhere. `src/utils/mockUpload.js` shrinks them in the browser and stores them with the post.
- `prisma/schema.prisma` isn't used at runtime. It describes the data model the mock records follow.

To move to a real backend, reimplement the functions exported by `src/utils/mockDb.js`.

## Environment variables

Copy `.env.example` to `.env.local`. Keep `NEXTAUTH_URL` set to the address you open the site at, because sign-in redirects use it. Google and GitHub sign-in also need OAuth credentials. The demo account doesn't.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploying to Netlify

`netlify.toml` configures the build, and Netlify applies its Next.js adapter automatically.

1. Import the repository into Netlify, and make sure the site's production branch is the one with this code.
2. In **Site configuration → Environment variables**, add these with a scope that includes **Functions**:
   - `NEXTAUTH_SECRET`: a long random string, for example from `openssl rand -base64 32`.
   - `AUTH_TRUST_HOST`: `true`. This makes sign-in use the site's own URL, including on deploy previews.
3. Deploy.

The site still runs on mock data. On Netlify, pages are rendered by serverless functions, so posts and comments created on the live site only live in the memory of whichever function instance handled them. They can disappear at any time, and visitors may not see each other's posts. The seed posts always show. The demo login lets anyone sign in, which is fine for a demo but must be removed before using real data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
