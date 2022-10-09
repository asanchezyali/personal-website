This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, `yarn install`

Then, run the development server: `yarn dev`

Open [http://localhost:3000](http://localhost:3000)

## CSS

It uses [https://tailwindcss.com/](tailwindcss)

## ESLint

Nextjs integrated ESLint: `yarn lint`

## Testing

You will need `npx playwright install` and a local server running for testing

Run tests with: `yarn test`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

More info: [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Docker

Build and run with:
`docker build -t client . && docker run --name CLIENT_CONTAINER -p 0.0.0.0:3000:3000 client`
