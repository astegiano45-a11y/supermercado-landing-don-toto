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

Mobile-first Next.js 14 (App Router) + Tailwind landing/catalog site for "Don Toto DA+", a supermarket, built to drive Instagram/Facebook Ads traffic. Content and UI copy are in Spanish. There is no API layer, backend, or persistence — everything reads from a static mock catalog in `lib/catalogo.ts`. Cross-component state is two small in-memory Contexts (plain React — no Zustand/Redux, neither survives a reload): the cart (`lib/cart-context.tsx`) and the pickup-branch selector (`lib/branch-context.tsx`).

### Routes

- `app/page.tsx` — the home page: `SiteHeader`, `Hero`, a category grid (data-driven from `lib/catalogo.ts`, one `CategoryCard` per category plus a `PromoCard`), a "Liquidación del día" product grid (`ProductCard`, hand-picked IDs via `LIQUIDACION_IDS`), `ImperdiblesSemanales`, `RetiraGratisBanner`, `MiClubStrip`, `BeneficiosAdicionales`, `ValuePropsStrip`, a final dual CTA (web store vs. app download), and an inline footer.
- `app/categoria/[nombre]/page.tsx` — dynamic Category Landing Page (statically generated via `generateStaticParams` from `categorias`). Server component renders `SiteHeader`, a breadcrumb-only bar (no chips — see below), `CategoriaHero` (bajada + imagen from `lib/categoria-clp.ts`), then hands product data to `categoria-explorer.tsx`.
- `app/categoria/[nombre]/categoria-explorer.tsx` — client component: owns the active-subcategory state, renders `SubcategoriasRow`, one or two `CategoriaCarrusel`s (curated from the category's own products), then `CategoriaPills` (category-switcher, deliberately placed right above the filters instead of up by the breadcrumb — groups "explorar y filtrar" as one visual block), then `ProductosConFiltros` (shared with `/tienda`, see Components) fed a pre-filtered `productos` and remounted via `key` whenever the subcategory changes so its internal price/brand filters reset instead of carrying over stale values.
- `app/tienda/page.tsx` — the full catalog page (no longer a placeholder). Server component: `SiteHeader`, breadcrumb "Inicio / Tienda" + title, hands the entire `productos` array to `tienda-client.tsx`. Still no checkout/payment flow — see "Known placeholders".
- `app/tienda/tienda-client.tsx` — client component: owns the active-category filter (`CategoriaChips`), same pre-filter + `key`-remount pattern as `categoria-explorer.tsx`, feeding `ProductosConFiltros`.
- `app/layout.tsx` — root layout, global metadata (title/description used for SEO/social), loads fonts, applies base `bg-brand-cream font-sans text-brand-dark`, wraps `children` in `CartProvider` and `BranchProvider`.

### Data layer (`lib/`)

- `lib/catalogo.ts` — mock catalog, meant to be swapped for a real API/CMS later. Exports `categorias` (5 categories with slug/nombre/emoji/color/imagen) and `productos` (id/categoria/nombre/marca/precio/precioAntes?/unidad/emoji/imagen?), plus helpers `getCategoria`, `getProductosPorCategoria`, `getPrecioDesde`, `getProducto`, and `CATEGORIA_COLOR_CLASSES` (maps each category's `ColorMarca` to Tailwind bg/soft/text classes so components don't repeat conditional strings).
- `lib/format.ts` — `formatoPeso` price formatting helper.
- `lib/cart-context.tsx` — `CartProvider` (mounted in `app/layout.tsx`, wraps the whole app) + `useCart()` hook. Holds `cantidades` (product id → quantity) and derived `totalItems`, plus `sumar`/`restar`/`vaciar` mutators. Shared, in-memory only (no localStorage/backend yet) across every writer/reader: `QuickListModal` and every `ProductCard`'s "+" button call `sumar`, `CartButton` just reads `totalItems` for the header badge.
- `lib/categoria-clp.ts` — Category Landing Page data: `HERO_POR_CATEGORIA` (bajada + hero imagen per category) and `SUBCATEGORIAS_POR_CATEGORIA` (hand-curated groupings of real `productos` ids per category, each with its own imagen), plus `getHeroCategoria`/`getSubcategorias` helpers. Purely presentational curation on top of `catalogo.ts` — subcategoría is not a real field on `Producto`.
- `lib/branch-context.tsx` — `BranchProvider` (mounted in `app/layout.tsx`) + `useBranch()` hook. Holds `sucursal` (chosen pickup branch or `null`) and the open/close state of the selector modal, plus `Sucursal`/`SUCURSALES` (the 2 real pickup locations — no delivery option yet). The key piece is `ejecutarConSucursal(accion)`: a generic gate — runs `accion` immediately if a branch is already chosen, otherwise opens the selector and stashes `accion` in a `useRef` to fire automatically once the user picks one. Deliberately doesn't know anything about `cart-context.tsx`; `ProductCard` is what wires the two together (see Components).

### Components (`components/`)

Extracted out of the former single-file `app/page.tsx` — home page sections and shared UI are now componentized:

- `SiteHeader`, `CategoriesMenu` (dropdown mega-menu, client component), `Logo` (hand-built SVG recreation of the brand mockup — `DonTotoLogo` / `CartMark`), `icons.tsx` (shared outline-icon set matching the brand manual's iconography)
- `Hero` (client component, rotating offer banner)
- `CategoryCard` / `PromoCard`, `DiscountBadge` (dashed-circle "seal" badge, not a flat corner ribbon)
- `ProductCard` (client component) — product tile used everywhere a product grid/carousel appears (home, CLP carousels, `ProductosConFiltros`). Its "+" button calls `useBranch().ejecutarConSucursal(() => useCart().sumar(producto.id))` — so add-to-cart works from any of those places without each caller wiring it up itself, and it's automatically gated behind picking a pickup branch first (see `SucursalBar`).
- `ProductosConFiltros` (client component) — sidebar filters (max-price range slider + brand checkboxes, collapsible on mobile) + `ProductCard` grid over whatever `productos` array it's given. Deliberately generic (no category/subcategory awareness): `categoria-explorer.tsx` and `tienda-client.tsx` both pre-filter `productos` by their own dimension (subcategoría / categoría) and remount this component via `key` to reset its internal filters when that dimension changes.
- `CategoriaChips` (client component) — category filter chips for `/tienda`; visually matches `CategoriaPills`, but `onClick` filters in place instead of `<Link>` navigating.
- `CategoriaPills` — category-switcher `<Link>`s for the CLP (Almacén / Carnes y Pescados / etc.), rendered by `categoria-explorer.tsx` right above `ProductosConFiltros` (not up by the breadcrumb). Static, no state, so it's a server component.
- `CategoriaHero` — CLP hero banner (big image + title + bajada from `lib/categoria-clp.ts`). Static, no state, so it's a server component even though it's rendered inside the CLP's client tree.
- `SubcategoriasRow` (client component) — CLP subcategory tiles (image + nombre, horizontally scrollable, "Todas" always first). "Dumb": reflects `activaSlug`/`onSelect` props, no state of its own — `categoria-explorer.tsx` owns the selection.
- `CategoriaCarrusel` (client component) — horizontal product carousel reusing `ProductCard`, with prev/next arrows that self-disable based on scroll position. Used by the CLP (one or two per category) — not by `/tienda`.
- `ImperdiblesSemanales`, `RetiraGratisBanner`, `BeneficiosAdicionales`, `ValuePropsStrip` — home page marketing sections, each mapped from small local data arrays. `ImperdiblesSemanales` also opens with a full pre-designed banner (`public/banner-frutas-verduras.png`) above its 3 cards, shown edge-to-edge via `next/image` width/height (no `fill`/`object-cover`) so it never crops in CSS — the PNG's own text runs to both edges. The file itself *was* cropped (2172×724 → 2110×420) before being committed: the original Canva export had ~22% of pure white canvas above/below the actual banner, which no amount of container CSS can remove.
- `MiClubStrip` — pinned right after `ImperdiblesSemanales` on the home page (grouped with the other promo banners, not off by itself further down). Pre-designed banner (`public/banner-mi-club.png`, same no-crop `next/image` treatment; also file-cropped 2023×777 → 2002×231 for the same reason — ~36% baked-in white margin) wrapped in a white rounded card (the PNG has no alpha channel — its padding is opaque white, so the white card avoids a visible seam against the section's navy background) plus a "Sumate gratis" `Link` kept below it, since the artwork itself has no CTA baked in.
- `QuickListModal` (client component) — "Lista de compras rápida": a shopping-list planner opened from the list icon in `SiteHeader`. Lets the user search the full mock catalog (`lib/catalogo.ts`), tick quantities per product (grouped by category, +/- steppers), see a running estimated total (`formatoPeso`), clear the list, or jump to `/tienda`. Closes on Escape or backdrop click and locks body scroll while open. Reads/writes quantities via `useCart()` (`lib/cart-context.tsx`) instead of local state — it's one of several writers to the shared cart now (see `ProductCard`). It is a planning tool, not a cart — no checkout logic.
- `CartButton` (client component) — the cart icon in `SiteHeader`; reads `totalItems` from `useCart()` and shows it as a badge (hidden at 0, capped display at "9+"). Read-only display of the shared cart state — no click behavior/drawer of its own yet.
- `SucursalBar` (client component) — the pickup-branch bar + its selector modal, in one file (same shape as `QuickListModal`: trigger + overlay together). Rendered as the last child inside `SiteHeader`'s sticky `<header>`, so it shows on every page right under the header and scrolls with it. Reads everything from `useBranch()` — no props. The modal is the same shell as `QuickListModal` (bottom-sheet on mobile, centered on desktop, Escape + scroll-lock) for consistency, and it's what opens automatically when `ProductCard`'s gate fires.

## Styling / branding

- Brand colors are defined in `tailwind.config.js` under the `brand` key: `brand.orange` (#F07E26), `brand.orangeDark` (#D9650F, hover/pressed state), `brand.blue` (#004AAD), `brand.navy` (#0D2B63), `brand.dark` (#022353), `brand.cream` (#FFF7EC, warm background replacing flat white), and `brand.pink` (#E14F82, extended accent for "Mi Club"/loyalty pieces — not in the official brand manual). Use these tokens (`text-brand-navy`, `bg-brand-orange`, etc.) instead of arbitrary hex values.
- Fonts: **Archivo** (UI text, labels, small prices) and **Bricolage Grotesque** (headlines, big prices), both loaded via `next/font/google` in `app/layout.tsx` as CSS vars (`--font-archivo`, `--font-bricolage`) and wired into Tailwind as `font-sans` / `font-display` respectively. (Inter is no longer used.)
- Custom Tailwind extensions worth knowing about: `shadow-tag`/`shadow-tagSm` (solid-offset "sticker" shadow instead of blurry `shadow-md`), `shadow-card`, `bg-dot-grid` + `bg-dots` (dotted background pattern used on navy/orange sections), `animate-float`/`float-delayed`/`fade-up` keyframes.
- Design language mimics Chilean/Argentine supermarket apps (e.g. Lider.cl): sticky header with mega-menu, category grid with "Desde $X" pricing, horizontal chip rows, dual-CTA final section, dedicated category+filters pages.

## Known placeholders to be aware of

- `productos`/`categorias` in `lib/catalogo.ts` are mock data (invented prices/brands) — meant to be replaced by a real API/CMS. All 40 `productos` and all 5 `categorias` now carry a real Unsplash `imagen` (each URL checked for an HTTP 200 before being added). Unsplash remote images are allowlisted in `next.config.js` under `images.remotePatterns`.
- `ProductosConFiltros` has filtering (price + brand, plus category on `/tienda` via `CategoriaChips`) but no sorting yet.
- The cart (`lib/cart-context.tsx`) is in-memory only (no persistence across reloads) and there's still no real cart drawer/page to review it: `QuickListModal` is the only place to remove items or see the full list, and `CartButton`'s badge is read-only (clicking it does nothing).
- The pickup-branch selector (`lib/branch-context.tsx`) only covers retiro en sucursal — no delivery/despacho a domicilio option yet (not defined as a service). Also in-memory only, so it resets on every full page reload/navigation.
- The "Descargar App" link in `app/page.tsx` is a dead `href="#"` pending the real App Store/Google Play URL. Several footer links (`Centro de ayuda`, `Envíos`, `WhatsApp`, social links) are also dead `href="#"` placeholders.
- `/tienda` now has a real catalog (all `productos`, category/brand/price filters, working "+ Agregar") but still no checkout — no cart review step, address, or payment flow. That's the next real gap in the ordering system.
- Long-term plan (per README): once the web ordering system is built at `/tienda`, wrap it with Capacitor to ship a native app without duplicating code.
