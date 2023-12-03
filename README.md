# Welcome to Remix template by Gnauqoa!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
docker run --rm --publish 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=web-project postgres
```

This starts your postgresql.

```sh
npx prisma migrate dev
```

This init your postgres database with prisma.

```sh
npx prisma db seed
```

This create example data for your app

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
