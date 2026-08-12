# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm install       # install deps
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run start       # serve production build
npm run lint       # next lint
```

There is no test suite configured in this repo.

## Project overview

Mobile-first Next.js 14 (App Router) + Tailwind landing page for "Don Toto DA+", a supermarket, built to drive Instagram/Facebook Ads traffic. Content and UI copy are in Spanish. There are only two routes:

- `app/page.tsx` — the main landing page: header, hero banner, category grid, horizontal "favoritos" chip scroller, promo banner, image gallery, benefits grid, final dual CTA (web store vs. app download), and footer. All sections are inlined in this single file with their data as local arrays at the top (`gondolas`, `categorias`, `favoritos`, `beneficios`) — there are no shared components yet.
- `app/tienda/page.tsx` — placeholder for the real store/checkout flow. Intentionally not implemented; the real catalog/purchase system is meant to be built here later (see README "Próximos pasos").
- `app/layout.tsx` — root layout, global metadata (title/description used for SEO/social), loads the Inter font, applies base `bg-white text-brand-dark`.

There is no state management, API layer, backend, or data fetching — everything is static JSX.

## Styling / branding

- Brand colors are defined in `tailwind.config.js` under the `brand` key: `brand.orange` (#F07E26), `brand.blue` (#004AAD), `brand.navy` (#0D2B63), `brand.dark` (#022353). Use these tokens (`text-brand-navy`, `bg-brand-orange`, etc.) instead of arbitrary hex values to stay consistent with the brand manual.
- Font is Inter, loaded via `next/font/google` in `app/layout.tsx` and also set as the Tailwind `sans` default.
- Design language mimics Chilean supermarket apps (e.g. Lider.cl): sticky header, category icon grid, horizontal scroll chip row, image gallery bento grid, dual-CTA final section.

## Known placeholders to be aware of

- Gallery images in `app/page.tsx` (`gondolas` array) currently point to Unsplash URLs — real photos are meant to replace them (Unsplash remote images are allowlisted in `next.config.js` under `images.remotePatterns`).
- The "Descargar App" link in `app/page.tsx` is a dead `href="#"` pending the real App Store/Google Play URL.
- `app/tienda/page.tsx` has no real catalog/checkout logic yet.
- Long-term plan (per README): once the web ordering system is built at `/tienda`, wrap it with Capacitor to ship a native app without duplicating code.
