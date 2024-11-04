# TanStack starter with Tailwind, Better-Auth, i18n and dark mode

This is a small starter for those wanting to jump-start their project with the new TanStack Start.

## Features

- Tailwind CSS
- Better-Auth
- i18n (i18next)
- Dark mode
- Sonner
- Shadcn
- Vinxi
- Prisma
- Zod


## Getting started

1. Clone the repository
2. Create a postgres database (preferably)
3. Create a new file `.env` and add the following:

```
DATABASE_URL='postgresql://postgres:postgres@localhost:5432/postgres'
BETTER_AUTH_SECRET='my_super_secret_here'
BETTER_AUTH_URL='http://localhost:3000'
```

4. Install dependencies with `pnpm install`
5. Generate the Prisma client with `pnpm db:generate`
6. Run the database migrations with `pnpm db:push`
7. Start the development server with `pnpm dev`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
