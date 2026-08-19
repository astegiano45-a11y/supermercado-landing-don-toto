"use client";

import Image from "next/image";
import type { Producto } from "@/lib/catalogo";
import { useCart } from "@/lib/cart-context";
import { useBranch } from "@/lib/branch-context";
import { formatoPeso } from "@/lib/format";
import DiscountBadge from "./DiscountBadge";
import { PlusIcon } from "./icons";

export default function ProductCard({ producto }: { producto: Producto }) {
  const { sumar } = useCart();
  const { ejecutarConSucursal } = useBranch();

  const tieneDescuento =
    producto.precioAntes && producto.precioAntes > producto.precio;
  const porcentaje = tieneDescuento
    ? Math.round((1 - producto.precio / producto.precioAntes!) * 100)
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-navy/5 transition duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-square w-full overflow-hidden bg-brand-cream">
        {tieneDescuento && <DiscountBadge porcentaje={porcentaje} />}
        {producto.imagen ? (
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-6xl">
            {producto.emoji}
          </span>
        )}
        <span className="absolute right-2 top-2 rotate-3 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-brand-navy shadow-sm">
          Hoy
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3.5 sm:p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-dark/40">
          {producto.marca}
        </span>
        <span className="font-display text-sm font-bold leading-snug text-brand-navy sm:text-base">
          {producto.nombre}
        </span>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex flex-col">
            {tieneDescuento && (
              <span className="text-xs text-brand-dark/40 line-through">
                {formatoPeso(producto.precioAntes!)}
              </span>
            )}
            <span className="font-display text-xl font-extrabold tabular-nums text-brand-orange sm:text-2xl">
              {formatoPeso(producto.precio)}
            </span>
            <span className="text-[11px] text-brand-dark/40">
              por {producto.unidad}
            </span>
          </div>

          <button
            type="button"
            onClick={() => ejecutarConSucursal(() => sumar(producto.id))}
            aria-label={`Agregar ${producto.nombre}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white shadow-tagSm transition hover:bg-brand-orange active:scale-90"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
