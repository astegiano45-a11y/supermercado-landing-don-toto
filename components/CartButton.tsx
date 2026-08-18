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
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-cream active:scale-95"
    >
      <CartIcon className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
