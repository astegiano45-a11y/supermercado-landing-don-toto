"use client";

// Modal "Lista de compras rápida" — herramienta de planificación 100% cliente
// (no hay cart/checkout real todavía, ver app/tienda). El usuario tilda
// productos del catálogo mock, ve un total estimado, y puede seguir a /tienda.
// Las cantidades viven en CartProvider (lib/cart-context.tsx), compartidas
// con el badge del ícono de carrito en SiteHeader.
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { categorias, productos, CATEGORIA_COLOR_CLASSES } from "@/lib/catalogo";
import { useCart } from "@/lib/cart-context";
import { formatoPeso } from "@/lib/format";
import {
  CloseIcon,
  ListIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "./icons";

export default function QuickListModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cantidades, totalItems, sumar, restar, vaciar } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  // Cerrar con Escape + bloquear scroll de fondo mientras el modal está abierto.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowPrevio;
    };
  }, [open]);

  const productosFiltrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPrecio = useMemo(
    () =>
      productos.reduce(
        (acc, p) => acc + (cantidades[p.id] ?? 0) * p.precio,
        0
      ),
    [cantidades]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir lista de compras rápida"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-cream active:scale-95"
      >
        <ListIcon className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-pink text-[10px] font-bold text-white">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-list-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-brand-dark/60 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-brand-cream shadow-card animate-fade-up sm:max-w-lg sm:rounded-3xl">
            {/* encabezado */}
            <div className="flex shrink-0 items-start justify-between gap-3 bg-brand-navy px-5 py-4">
              <div>
                <h2
                  id="quick-list-title"
                  className="font-display text-lg font-extrabold text-white sm:text-xl"
                >
                  Lista de compras rápida
                </h2>
                <p className="mt-0.5 text-xs text-white/70">
                  Marcá lo que necesitás y te armamos el total al toque
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar lista de compras rápida"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* búsqueda */}
            <div className="shrink-0 border-b border-black/5 bg-white px-5 py-3">
              <div className="flex items-center gap-2 rounded-full border border-black/10 bg-brand-cream px-4 py-2.5 text-sm">
                <SearchIcon className="h-4 w-4 shrink-0 text-brand-dark/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar producto, ej: arroz, leche…"
                  className="w-full bg-transparent text-brand-dark placeholder:text-brand-dark/40 focus:outline-none"
                />
              </div>
            </div>

            {/* listado agrupado por categoría */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {productosFiltrados.length === 0 ? (
                <p className="py-10 text-center text-sm text-brand-dark/40">
                  No encontramos productos con ese nombre.
                </p>
              ) : (
                categorias.map((cat) => {
                  const items = productosFiltrados.filter(
                    (p) => p.categoria === cat.slug
                  );
                  if (items.length === 0) return null;
                  const colores = CATEGORIA_COLOR_CLASSES[cat.color];

                  return (
                    <div key={cat.slug} className="mb-5 last:mb-0">
                      <div className="mb-2 flex items-center gap-1.5">
                        <span className="text-base leading-none">
                          {cat.emoji}
                        </span>
                        <span
                          className={`text-xs font-bold uppercase tracking-wide ${colores.text}`}
                        >
                          {cat.nombre}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {items.map((p) => {
                          const cantidad = cantidades[p.id] ?? 0;
                          return (
                            <li
                              key={p.id}
                              className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition ${
                                cantidad > 0
                                  ? "border-brand-orange/30 bg-brand-orange/5"
                                  : "border-black/5 bg-white"
                              }`}
                            >
                              <span className="text-xl leading-none">
                                {p.emoji}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-brand-dark">
                                  {p.nombre}
                                </p>
                                <p className="text-xs text-brand-dark/40">
                                  {p.marca} · {formatoPeso(p.precio)} /{" "}
                                  {p.unidad}
                                </p>
                              </div>

                              {cantidad > 0 ? (
                                <div className="flex shrink-0 items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => restar(p.id)}
                                    aria-label={`Quitar una unidad de ${p.nombre}`}
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-white transition active:scale-90"
                                  >
                                    <MinusIcon className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="w-4 text-center text-sm font-bold tabular-nums text-brand-navy">
                                    {cantidad}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => sumar(p.id)}
                                    aria-label={`Agregar una unidad de ${p.nombre}`}
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-white transition active:scale-90"
                                  >
                                    <PlusIcon className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => sumar(p.id)}
                                  aria-label={`Agregar ${p.nombre}`}
                                  className="flex h-8 shrink-0 items-center gap-1 rounded-full border border-brand-navy/15 px-3 text-xs font-bold text-brand-navy transition hover:bg-brand-navy hover:text-white"
                                >
                                  <PlusIcon className="h-3.5 w-3.5" />
                                  Agregar
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
              )}
            </div>

            {/* total + acciones */}
            <div className="shrink-0 border-t border-black/5 bg-white px-5 py-4">
              <div className="mb-3 flex items-end justify-between gap-3">
                <span className="text-xs font-semibold text-brand-dark/50">
                  {totalItems === 0
                    ? "Tu lista está vacía"
                    : `${totalItems} ${
                        totalItems === 1 ? "producto" : "productos"
                      } en tu lista`}
                </span>
                <span className="font-display text-2xl font-extrabold tabular-nums text-brand-orange">
                  {formatoPeso(totalPrecio)}
                </span>
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={vaciar}
                  disabled={totalItems === 0}
                  className="flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full border border-brand-navy/15 px-4 text-sm font-bold text-brand-navy/70 transition hover:bg-brand-cream disabled:opacity-40"
                >
                  <TrashIcon className="h-4 w-4" />
                  Vaciar
                </button>
                <Link
                  href="/tienda"
                  onClick={() => setOpen(false)}
                  className="flex h-12 flex-1 items-center justify-center rounded-full bg-brand-orange text-sm font-extrabold text-white shadow-tagSm transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  Continuar en la tienda
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
