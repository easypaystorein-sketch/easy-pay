# Product image handoff

The catalogue intentionally uses a branded placeholder glyph until approved product photography is supplied. Replace each product's `imageUrl` with licensed HTTPS assets, verify alt text, and run a visual QA pass before launch. Do not hotlink retailer imagery.

## Replacement workflow

1. Obtain a license or written permission for every image.
2. Upload optimized WebP/AVIF files to the chosen object store/CDN.
3. Update `imageUrl` for the matching seeded product slug.
4. Confirm `next/image` remote host configuration and useful alt text.
5. Run `npm run catalog:check`, `npm run typecheck`, and `npm run build`.
