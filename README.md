# ElectroQist UAE

Next.js 14 App Router e-commerce starter for an October 2026 UAE catalogue.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, and Stripe test keys.
2. `npm install`
3. `npm run db:push`
4. `npm run db:seed`
5. `npm run dev`

Seed credentials: `admin@electroqist.ae` / `changeme123`. Change this immediately; the dashboard displays a forced-password-change notice. For Vercel, add the same environment variables, use a managed PostgreSQL provider, run `prisma db push`/seed once, and deploy with `npm run build`.

## Going live checklist

- Replace placeholder images with licensed assets and validate product copy.
- Configure Stripe live keys and webhook reconciliation.
- Implement and certify the Tabby adapter using production credentials; the current flow is an explicit dev mock/stub.
- Keep `TABBY_MOCK_APPROVED=true` only for local development. Set it to `false` in staging/production until the production adapter and callback signature verification are complete.
- Add transactional email/SMS, monitoring, backups, rate limiting, and UAE tax/legal review.
- Change the seeded admin password and rotate all secrets.

## API map

- Public: `GET /api/products`, `GET /api/categories`, `GET /api/track-order?id=...`, `POST /api/orders`
- Payments: `POST /api/payments/stripe`, `POST /api/payments/tabby`
- Admin (authenticated): CRUD products/categories and `GET/PATCH /api/admin/orders` routes.
- `npm run catalog:check` verifies the required five categories and ten seeded products.

## Payments limitation

Stripe creates a test PaymentIntent when `STRIPE_SECRET_KEY` is present. The checkout UI currently records the order and returns its tracking page; production should add Stripe Elements confirmation and webhook-driven order status updates before accepting live funds. Tabby is intentionally an adapter/stub with a development mock approval and TODO for the production API/callback contract.
