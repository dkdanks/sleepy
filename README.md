# Sleepys Wine Club

Monthly wine subscription MVP for Sleepys Cafe & Wine Bar (Carlton North).

- `/` landing page: the pitch, how it works, this month's picks, pricing and delivery
- `/wine/[slug]` sommelier profile for each bottle
- `/join` sign-up flow (style, optional taste quiz, delivery or pickup, details, review). Payment is not wired yet.

Monthly picks, price and pickup address live in `src/lib/wines.ts`.

```bash
pnpm install
pnpm dev
```
