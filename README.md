# Echoes of Memories

Promotional website for the book *Echoes of Memories* by Sanjay Kumar Rai.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Content

Book copy, chapters, themes, reviews, and purchase links live in `src/data`. Unknown details are explicit placeholders such as `[TAGLINE]` and `[BOOK DESCRIPTION]`. Replace those strings and the labelled images in `public/images` when real assets arrive.

To hide reviews until real quotes exist, set `reviewsEnabled` to `false` in `src/data/reviews.ts`.

## Scripts

```bash
npm run dev
npm run build
```

## Admin portal

Open `/admin` to sign in with the admin email and password. The dashboard stays at
the same route after sign-in. Reader sign-in is at `/login`.

For production, set `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in the
server environment. All three are required for admin sign-in. For local
development, the fallback credentials are defined in `src/lib/session.ts`.

## MongoDB

Set `MONGODB_URI` to your MongoDB connection string and `MONGODB_DB` to the
database name (defaults to `echoes_of_memories`). For local development, put
these in `.env.local`. Keep credentials out of Git.

Reader accounts, likes, film settings, audience submissions, admin work edits,
upload records, orders, purchases, and access permissions use MongoDB. Book
copy and default catalog entries remain in `src/data`. Uploaded media files
remain in `public/uploads`; the database stores their paths, not file bytes.
Existing local JSON files are not imported automatically.
