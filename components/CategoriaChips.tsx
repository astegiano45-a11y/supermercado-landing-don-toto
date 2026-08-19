"use client";

// Chips de categoría para /tienda — mismo look que el chip-switcher de
// app/categoria/[nombre]/page.tsx, pero con onClick en vez de <Link>:
// acá no navega a otra ruta, filtra el catálogo dentro de la misma página.
import { categorias, CATEGORIA_COLOR_CLASSES } from "@/lib/catalogo";

export default function CategoriaChips({
  activaSlug,
  onSelect,
}: {
  activaSlug: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${
          activaSlug === null
            ? "bg-brand-navy text-white"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        Todas
      </button>

      {categorias.map((c) => {
        const activa = c.slug === activaSlug;
        return (
          <button
            key={c.slug}
            type="button"
            onClick={() => onSelect(activa ? null : c.slug)}
            className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${
              activa
                ? `${CATEGORIA_COLOR_CLASSES[c.color].bg} text-white`
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {c.emoji} {c.nombre}
          </button>
        );
      })}
    </div>
  );
}
