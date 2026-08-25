# CrowdHarbor Next.js Project

This project is converted from the original React/Vite app into a Next.js App Router project.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

```txt
src/app/                     Next.js App Router pages
src/app/page.tsx              Home route
src/app/*/page.tsx            Public routes
src/app/admin/*/page.tsx      Admin routes
src/app/not-found.tsx         404 page
src/components/               Reusable UI, sections, header, footer, admin layout
src/content/site.ts           Common site config, navigation, footer links, brand values
src/styles/                   Global styles, theme, Tailwind entry, fonts
src/imports/pasted_text/      Original page requirement/source copy notes
```

## Conversion notes

- React Router was removed.
- Next.js App Router route files were created in `src/app`.
- `Link` components now use `next/link` with `href`.
- Programmatic navigation now uses `useRouter` from `next/navigation`.
- Dynamic admin routes use Next route folders like `[id]`.
- Common content/navigation is centralized in `src/content/site.ts`.
- Original styling, layout, animations, and component structure were preserved as closely as possible.
