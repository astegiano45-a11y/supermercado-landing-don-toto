"use client";

// Fila de tiles de subcategoría — imagen circular + nombre, scrollable en
// mobile. Es "tonto": no guarda estado propio, solo refleja `activaSlug` y
// avisa selección vía `onSelect`. El estado real (y el filtrado que dispara)
// vive en CategoriaExplorer, el wrapper que la usa.
import Image from "next/image";
import type { Subcategoria } from "@/lib/categoria-clp";

export default function SubcategoriasRow({
  subcategorias,
  activaSlug,
  onSelect,
}: {
  subcategorias: Subcategoria[];
  activaSlug: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <section className="border-b border-black/5 bg-white px-4 py-5 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex gap-4 overflow-x-auto pb-1">
          {/* "Todas" siempre disponible para volver a ver la categoría completa */}
          <button
            type="button"
            onClick={() => onSelect(null)}
            aria-pressed={activaSlug === null}
            className="flex shrink-0 flex-col items-center gap-1.5"
          >
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl transition sm:h-20 sm:w-20 ${
                activaSlug === null
                  ? "bg-brand-orange text-white shadow-tagSm"
                  : "bg-brand-cream text-brand-navy ring-1 ring-brand-navy/10"
              }`}
            >
              🛒
            </span>
            <span
              className={`text-xs font-bold ${
                activaSlug === null ? "text-brand-orange" : "text-brand-navy/70"
              }`}
            >
              Todas
            </span>
          </button>

          {subcategorias.map((s) => {
            const activa = s.slug === activaSlug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => onSelect(activa ? null : s.slug)}
                aria-pressed={activa}
                className="flex shrink-0 flex-col items-center gap-1.5"
              >
                <span
                  className={`relative block h-16 w-16 shrink-0 overflow-hidden rounded-full transition sm:h-20 sm:w-20 ${
                    activa
                      ? "ring-[3px] ring-brand-orange ring-offset-2"
                      : "ring-1 ring-brand-navy/10"
                  }`}
                >
                  <Image
                    src={s.imagen}
                    alt={s.nombre}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>
                <span
                  className={`w-20 text-center text-xs font-bold leading-tight ${
                    activa ? "text-brand-orange" : "text-brand-navy/70"
                  }`}
                >
                  {s.nombre}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
