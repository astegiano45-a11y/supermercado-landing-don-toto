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
- `app/tienda/page.tsx` — placeholder de la tienda web (conectar acá el catálogo/checkout real).
- `app/layout.tsx` — layout global y metadata.
- `tailwind.config.js` — colores de marca (`brand.green`, `brand.orange`, `brand.dark`).

## Próximos pasos

1. Reemplazar las imágenes de Unsplash en `app/page.tsx` por fotos reales del supermercado.
2. Construir el catálogo/checkout en `/tienda`.
3. Cambiar el link "Descargar App" por la URL real de App Store / Google Play.
4. Cuando el sistema de pedidos web esté listo, envolverlo con Capacitor para generar la app nativa sin duplicar código.
