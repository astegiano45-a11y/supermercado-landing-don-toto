"use client";

// Buscador real del header — reemplaza el <div> puramente visual que había
// antes. Se renderiza dos veces desde SiteHeader (versión desktop y versión
// mobile, cada una visible según breakpoint vía CSS), mismo patrón que ya
// usa CategoriesMenu ahí: cada instancia tiene su propio estado, no hace
// falta compartirlo porque solo una está visible a la vez.
//
// El dropdown reusa el shell visual de CategoriesMenu (panel blanco
// rounded-2xl shadow-card que cae debajo de un control del header) y cada
// fila de resultado el lenguaje de QuickListModal (imagen/emoji + nombre +
// precio). Click en un resultado o Enter en el input llevan los dos al
// mismo lugar: /tienda?q=<texto>, que ProductosConFiltros ya sabe manejar
// como una dimensión más de filtro (ver tienda-client.tsx).
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buscarProductos } from "@/lib/catalogo";
import { formatoPeso } from "@/lib/format";
import { SearchIcon } from "./icons";

const MIN_CARACTERES = 2;
const MAX_RESULTADOS = 8;

export default function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [abierto, setAbierto] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const queryNormalizada = query.trim();
  const hayQueryValida = queryNormalizada.length >= MIN_CARACTERES;
  const resultados = hayQueryValida
    ? buscarProductos(queryNormalizada).slice(0, MAX_RESULTADOS)
    : [];

  // Cerrar con click afuera o Escape.
  useEffect(() => {
    if (!abierto) return;

    function onPointerDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [abierto]);

  function irATienda(texto: string) {
    setAbierto(false);
    router.push(`/tienda?q=${encodeURIComponent(texto)}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hayQueryValida) irATienda(queryNormalizada);
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-brand-cream px-4 py-2.5 text-sm text-brand-dark/50 focus-within:border-brand-navy/30"
      >
        <SearchIcon className="h-4 w-4 shrink-0 text-brand-dark/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setAbierto(true);
          }}
          onFocus={() => setAbierto(true)}
          placeholder="Buscá carnes, almacén, bebidas…"
          aria-label="Buscar productos"
          className="w-full bg-transparent text-brand-dark placeholder:text-brand-dark/50 focus:outline-none"
        />
      </form>

      {abierto && hayQueryValida && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 max-h-[70vh] overflow-y-auto rounded-2xl bg-white shadow-card ring-1 ring-brand-navy/10">
          {resultados.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-brand-dark/40">
              No encontramos productos con ese nombre.
            </p>
          ) : (
            <>
              <ul className="flex flex-col gap-1 p-2">
                {resultados.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/tienda?q=${encodeURIComponent(p.nombre)}`}
                      onClick={() => setAbierto(false)}
                      className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition hover:bg-brand-cream"
                    >
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-brand-cream">
                        {p.imagen ? (
                          <Image
                            src={p.imagen}
                            alt={p.nombre}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-xl">
                            {p.emoji}
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-brand-dark">
                          {p.nombre}
                        </span>
                        <span className="block text-xs text-brand-dark/40">
                          {p.marca}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-extrabold text-brand-orange">
                        {formatoPeso(p.precio)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => irATienda(queryNormalizada)}
                className="block w-full border-t border-black/5 px-4 py-3 text-center text-xs font-bold text-brand-navy transition hover:bg-brand-cream"
              >
                Ver todos los resultados para &quot;{queryNormalizada}&quot;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
