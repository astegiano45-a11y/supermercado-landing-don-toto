# Supermercado Landing

Landing mobile-first (Next.js 14 + Tailwind) para tráfico de Instagram/Facebook Ads.

## Correr en local

```
npm install
npm run dev
```

Abrí http://localhost:3000

## Estructura

- `app/page.tsx` — landing principal (hero, galería de góndolas, CTAs).
- `app/tienda/page.tsx` — tienda con el catálogo completo (~40 productos, las 5 categorías), filtros de categoría/marca/precio y "+ Agregar" al carrito real. Todavía sin checkout (revisar carrito, dirección, pago).
- `app/categoria/[nombre]/page.tsx` — Category Landing Page por categoría: hero temático, subcategorías navegables, carruseles de destacados y el mismo grid con filtros que usa `/tienda`.
- `app/layout.tsx` — layout global y metadata.
- `components/ProductosConFiltros.tsx` — sidebar de filtros (marca + precio) + grid de `ProductCard`, compartido entre las páginas de categoría y `/tienda`.
- `components/QuickListModal.tsx` — modal "Lista de compras rápida", accesible desde el ícono de lista del header (`SiteHeader`). Permite buscar productos del catálogo mock, tildar cantidades agrupadas por categoría y ver un total estimado antes de pasar a `/tienda`. Es una herramienta de planificación, no un carrito de compra real.
- `lib/cart-context.tsx` — estado de carrito compartido (React Context, sin persistencia). `QuickListModal` y el botón "+" de cada `ProductCard` escriben las cantidades; `components/CartButton.tsx` (el ícono de carrito del header) las lee para mostrar el total en tiempo real.
- `tailwind.config.js` — colores de marca (`brand.green`, `brand.orange`, `brand.dark`).

## Próximos pasos

1. Reemplazar las imágenes de Unsplash por fotos reales del supermercado.
2. Construir el checkout real en `/tienda` (revisar carrito, dirección, pago) — el catálogo con filtros y "+ Agregar" ya está.
3. Cambiar el link "Descargar App" por la URL real de App Store / Google Play.
4. Cuando el sistema de pedidos web esté listo, envolverlo con Capacitor para generar la app nativa sin duplicar código.
