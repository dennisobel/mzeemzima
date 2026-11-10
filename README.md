This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses [pnpm](https://pnpm.io). Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. To use another port, run `pnpm dev -p 3001`.

## Mock data

The blog currently runs without a database:

- Posts, categories, authors and comments are defined in `src/data/mockData.js`.
- `src/utils/mockDb.js` serves them from memory to the pages and the API routes in `src/app/api`. Posts and comments created while the server runs are lost on restart. Restart `pnpm dev` after editing the mock data.
- Post covers are the photos in `public/`, and author avatars are in `public/mock/avatars/`.
- `prisma/schema.prisma` isn't used at runtime. It describes the data model the mock records follow.

To move to a real backend, reimplement the functions exported by `src/utils/mockDb.js`.

## Environment variables

Copy `.env.example` to `.env.local`. Nothing is required to browse the blog locally. Signing in needs Google or GitHub OAuth credentials, and image uploads on the Write page need a Firebase project.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
