"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, GridIcon } from "./icons";

// Listado completo de rubros de Don Toto para el mega-menú del header.
// Los que ya existen como categoría real en el catálogo (lib/catalogo.ts)
// enlazan a /categoria/[slug]; el resto son rubros inventados que todavía
// no tienen catálogo propio, así que quedan como ítem visual (maqueta).
const RUBROS = [
  { nombre: "Carnes y Pescados", emoji: "🥩", href: "/categoria/carnes-y-pescados" },
  { nombre: "Almacén", emoji: "🛒", href: "/categoria/almacen" },
  { nombre: "Frutas y Verduras", emoji: "🥬", href: "#" },
  { nombre: "Bebidas y Snacks", emoji: "🥤", href: "/categoria/bebidas-y-snacks" },
  { nombre: "Lácteos y Fiambrería", emoji: "🧀", href: "#" },
  { nombre: "Panadería", emoji: "🍞", href: "#" },
  { nombre: "Congelados", emoji: "❄️", href: "#" },
  { nombre: "Limpieza y Aseo", emoji: "🧼", href: "/categoria/limpieza-y-aseo" },
];

export default function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 rounded-full border border-brand-navy/15 px-3 py-2 text-xs font-bold text-brand-navy transition hover:bg-brand-cream sm:px-3.5 sm:text-sm"
      >
        <GridIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Categorías</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-72 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-navy/10 sm:w-80">
          <div className="bg-brand-navy px-4 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-white">
              Todas las categorías
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-1 p-2">
            {RUBROS.map((r) => (
              <li key={r.nombre}>
                <Link
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-brand-dark/80 transition hover:bg-brand-cream hover:text-brand-navy"
                >
                  <span className="text-base leading-none">{r.emoji}</span>
                  <span className="leading-tight">{r.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
