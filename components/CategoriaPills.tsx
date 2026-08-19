import Link from "next/link";
import { CATEGORIA_COLOR_CLASSES, categorias } from "@/lib/catalogo";

// Navegación entre categorías — pills que llevan a /categoria/[slug].
// Vive justo antes de ProductosConFiltros (ver categoria-explorer.tsx),
// marcando el arranque de la sección "explorar y filtrar" de la CLP.
// Estático (solo <Link>s), no necesita "use client".
export default function CategoriaPills({
  categoriaActivaSlug,
}: {
  categoriaActivaSlug: string;
}) {
  return (
    <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1">
        {categorias.map((c) => {
          const activa = c.slug === categoriaActivaSlug;
          return (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activa
                  ? `${CATEGORIA_COLOR_CLASSES[c.color].bg} text-white`
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {c.emoji} {c.nombre}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
