"use client";

// Botón de carrito del header — el badge refleja en tiempo real la cantidad
// de items agregados desde QuickListModal (estado compartido vía
// lib/cart-context.tsx). Sin lógica de carrito/checkout real todavía.
import { useCart } from "@/lib/cart-context";
import { CartIcon } from "./icons";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <button
      type="button"
      aria-label="Carrito de compras"
      className="relative flex h-12 w-12 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-cream active:scale-95"
    >
      <CartIcon className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-white">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
