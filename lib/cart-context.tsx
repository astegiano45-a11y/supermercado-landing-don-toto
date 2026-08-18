"use client";

// Estado de carrito compartido entre el header (badge del ícono) y
// QuickListModal (donde se suman/restan productos). Sin persistencia
// todavía — vive solo en memoria mientras dura la sesión de la pestaña.
// Si más adelante /tienda necesita el mismo estado (checkout real), se
// consume desde acá en vez de duplicar lógica.
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartContextValue = {
  // id de producto (lib/catalogo.ts) -> cantidad
  cantidades: Record<string, number>;
  totalItems: number;
  sumar: (id: string) => void;
  restar: (id: string) => void;
  vaciar: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cantidades, setCantidades] = useState<Record<string, number>>({});

  const sumar = (id: string) => {
    setCantidades((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const restar = (id: string) => {
    setCantidades((prev) => {
      const actual = prev[id] ?? 0;
      if (actual <= 1) {
        const { [id]: _omitido, ...resto } = prev;
        return resto;
      }
      return { ...prev, [id]: actual - 1 };
    });
  };

  const vaciar = () => setCantidades({});

  const totalItems = useMemo(
    () => Object.values(cantidades).reduce((acc, n) => acc + n, 0),
    [cantidades]
  );

  return (
    <CartContext.Provider
      value={{ cantidades, totalItems, sumar, restar, vaciar }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
}
