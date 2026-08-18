# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm install       # install deps
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run start       # serve production build
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```

There is no test suite configured in this repo.

## Project overview

Mobile-first Next.js 14 (App Router) + Tailwind landing/catalog site for "Don Toto DA+", a supermarket, built to drive Instagram/Facebook Ads traffic. Content and UI copy are in Spanish. There is no API layer, backend, or persistence — everything reads from a static mock catalog in `lib/catalogo.ts`. The only cross-component state is a small in-memory cart (`lib/cart-context.tsx`, plain React Context — no Zustand/Redux); it does not survive a reload.

### Routes

- `app/page.tsx` — the home page: `SiteHeader`, `Hero`, a category grid (data-driven from `lib/catalogo.ts`, one `CategoryCard` per category plus a `PromoCard`), a "Liquidación del día" product grid (`ProductCard`, hand-picked IDs via `LIQUIDACION_IDS`), `ImperdiblesSemanales`, `RetiraGratisBanner`, `MiClubStrip`, `BeneficiosAdicionales`, `ValuePropsStrip`, a final dual CTA (web store vs. app download), and an inline footer.
- `app/categoria/[nombre]/page.tsx` — dynamic category page (statically generated via `generateStaticParams` from `categorias`). Server component renders `SiteHeader`, breadcrumb, and a category-switcher chip row, then hands product data to `categoria-client.tsx`.
- `app/categoria/[nombre]/categoria-client.tsx` — client component: sidebar filters (max-price range slider + brand checkboxes, collapsible on mobile) over the category's products, no cart/checkout yet.
- `app/tienda/page.tsx` — placeholder for the real store/checkout flow. Intentionally not implemented; the real catalog/purchase system is meant to be built here later (see README "Próximos pasos").
- `app/layout.tsx` — root layout, global metadata (title/description used for SEO/social), loads fonts, applies base `bg-brand-cream font-sans text-brand-dark`.

### Data layer (`lib/`)

- `lib/catalogo.ts` — mock catalog, meant to be swapped for a real API/CMS later. Exports `categorias` (5 categories with slug/nombre/emoji/color/imagen) and `productos` (id/categoria/nombre/marca/precio/precioAntes?/unidad/emoji/imagen?), plus helpers `getCategoria`, `getProductosPorCategoria`, `getPrecioDesde`, `getProducto`, and `CATEGORIA_COLOR_CLASSES` (maps each category's `ColorMarca` to Tailwind bg/soft/text classes so components don't repeat conditional strings).
- `lib/format.ts` — `formatoPeso` price formatting helper.
- `lib/cart-context.tsx` — `CartProvider` (mounted in `app/layout.tsx`, wraps the whole app) + `useCart()` hook. Holds `cantidades` (product id → quantity) and derived `totalItems`, plus `sumar`/`restar`/`vaciar` mutators. Shared, in-memory only (no localStorage/backend yet) between `QuickListModal` (writer) and `CartButton` (reader) so the header badge updates live as the modal's quantities change.

### Components (`components/`)

Extracted out of the former single-file `app/page.tsx` — home page sections and shared UI are now componentized:

- `SiteHeader`, `CategoriesMenu` (dropdown mega-menu, client component), `Logo` (hand-built SVG recreation of the brand mockup — `DonTotoLogo` / `CartMark`), `icons.tsx` (shared outline-icon set matching the brand manual's iconography)
- `Hero` (client component, rotating offer banner)
- `CategoryCard` / `PromoCard`, `ProductCard`, `DiscountBadge` (dashed-circle "seal" badge, not a flat corner ribbon)
- `ImperdiblesSemanales`, `RetiraGratisBanner`, `MiClubStrip`, `BeneficiosAdicionales`, `ValuePropsStrip` — home page marketing sections, each mapped from small local data arrays
- `QuickListModal` (client component) — "Lista de compras rápida": a shopping-list planner opened from the list icon in `SiteHeader`. Lets the user search the full mock catalog (`lib/catalogo.ts`), tick quantities per product (grouped by category, +/- steppers), see a running estimated total (`formatoPeso`), clear the list, or jump to `/tienda`. Closes on Escape or backdrop click and locks body scroll while open. Reads/writes quantities via `useCart()` (`lib/cart-context.tsx`) instead of local state, so it's the source of truth for the header's cart badge. It is a planning tool, not a cart — no checkout logic.
- `CartButton` (client component) — the cart icon in `SiteHeader`; reads `totalItems` from `useCart()` and shows it as a badge (hidden at 0, capped display at "9+"). Purely a display of `QuickListModal`'s quantities — no click behavior/drawer of its own yet.

## Styling / branding

- Brand colors are defined in `tailwind.config.js` under the `brand` key: `brand.orange` (#F07E26), `brand.orangeDark` (#D9650F, hover/pressed state), `brand.blue` (#004AAD), `brand.navy` (#0D2B63), `brand.dark` (#022353), `brand.cream` (#FFF7EC, warm background replacing flat white), and `brand.pink` (#E14F82, extended accent for "Mi Club"/loyalty pieces — not in the official brand manual). Use these tokens (`text-brand-navy`, `bg-brand-orange`, etc.) instead of arbitrary hex values.
- Fonts: **Archivo** (UI text, labels, small prices) and **Bricolage Grotesque** (headlines, big prices), both loaded via `next/font/google` in `app/layout.tsx` as CSS vars (`--font-archivo`, `--font-bricolage`) and wired into Tailwind as `font-sans` / `font-display` respectively. (Inter is no longer used.)
- Custom Tailwind extensions worth knowing about: `shadow-tag`/`shadow-tagSm` (solid-offset "sticker" shadow instead of blurry `shadow-md`), `shadow-card`, `bg-dot-grid` + `bg-dots` (dotted background pattern used on navy/orange sections), `animate-float`/`float-delayed`/`fade-up` keyframes.
- Design language mimics Chilean/Argentine supermarket apps (e.g. Lider.cl): sticky header with mega-menu, category grid with "Desde $X" pricing, horizontal chip rows, dual-CTA final section, dedicated category+filters pages.

## Known placeholders to be aware of

- `productos`/`categorias` in `lib/catalogo.ts` are mock data (Unsplash stock photos for the few products/categories that have `imagen`, invented prices/brands) — meant to be replaced by a real API/CMS. Unsplash remote images are allowlisted in `next.config.js` under `images.remotePatterns`.
- `app/categoria/[nombre]/categoria-client.tsx` has filtering (price + brand) but no cart, sorting, or checkout logic yet.
- The cart (`lib/cart-context.tsx`) is only wired up on the `QuickListModal` ↔ `CartButton` badge. The "+" button on `ProductCard` and the inline product cards in `categoria-client.tsx` are not connected to `useCart()` yet — clicking them does nothing.
- The "Descargar App" link in `app/page.tsx` is a dead `href="#"` pending the real App Store/Google Play URL. Several footer links (`Centro de ayuda`, `Envíos`, `WhatsApp`, social links) are also dead `href="#"` placeholders.
- `app/tienda/page.tsx` has no real catalog/checkout logic yet — this is where the real ordering system is meant to be built.
- Long-term plan (per README): once the web ordering system is built at `/tienda`, wrap it with Capacitor to ship a native app without duplicating code.
