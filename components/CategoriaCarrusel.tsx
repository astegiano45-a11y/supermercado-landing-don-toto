"use client";

// Carrusel horizontal de productos destacados para la CLP — reusa ProductCard
// tal cual (mismo look que "Liquidación del día" en la home), con flechas
// prev/next que se deshabilitan solas según cuánto queda por scrollear.
import { useEffect, useRef, useState } from "react";
import type { Producto } from "@/lib/catalogo";
import ProductCard from "./ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export default function CategoriaCarrusel({
  titulo,
  productos,
}: {
  titulo: string;
  productos: Producto[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [puedeIzq, setPuedeIzq] = useState(false);
  const [puedeDer, setPuedeDer] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const actualizarFlechas = () => {
      setPuedeIzq(el.scrollLeft > 4);
      setPuedeDer(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    actualizarFlechas();
    el.addEventListener("scroll", actualizarFlechas, { passive: true });
    window.addEventListener("resize", actualizarFlechas);
    return () => {
      el.removeEventListener("scroll", actualizarFlechas);
      window.removeEventListener("resize", actualizarFlechas);
    };
  }, [productos]);

  const desplazar = (direccion: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direccion * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (productos.length === 0) return null;

  return (
    <section className="px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold text-brand-navy sm:text-2xl">
            {titulo}
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => desplazar(-1)}
              disabled={!puedeIzq}
              aria-label="Ver productos anteriores"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy transition hover:bg-brand-cream disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => desplazar(1)}
              disabled={!puedeDer}
              aria-label="Ver más productos"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy transition hover:bg-brand-cream disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 sm:gap-5"
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="w-[45vw] shrink-0 snap-start sm:w-56"
            >
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
