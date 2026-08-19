"use client";

// Selector de sucursal para retiro — mismo patrón que lib/cart-context.tsx
// (Context + useState, sin persistencia todavía). Además del estado de
// sucursal elegida, expone un "gate" genérico (ejecutarConSucursal) que
// cualquier acción que la requiera puede usar para pedir que el usuario
// elija sucursal antes de continuar: si ya hay una elegida, la acción corre
// directo; si no, se abre el selector y la acción queda guardada para
// dispararse sola apenas el usuario elige. No importa nada de cart-context
// — es ProductCard quien conecta ambos, así los dos contexts quedan
// independientes entre sí.
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Sucursal = {
  id: string;
  direccion: string;
  localidad: string;
};

// Solo retiro en sucursal por ahora — despacho a domicilio todavía no está
// definido como servicio, no se agrega esa opción.
export const SUCURSALES: Sucursal[] = [
  {
    id: "avellaneda-9-de-julio",
    direccion: "Avellaneda y 9 de Julio",
    localidad: "Añatuya, Santiago del Estero",
  },
  {
    id: "espana-lavalle",
    direccion: "España y Lavalle",
    localidad: "Añatuya, Santiago del Estero",
  },
];

type BranchContextValue = {
  sucursal: Sucursal | null;
  abierto: boolean;
  abrirSelector: () => void;
  cerrarSelector: () => void;
  elegirSucursal: (sucursal: Sucursal) => void;
  // Ejecuta `accion` si ya hay sucursal elegida; si no, abre el selector y
  // la deja pendiente para disparase sola en cuanto el usuario elija una.
  ejecutarConSucursal: (accion: () => void) => void;
};

const BranchContext = createContext<BranchContextValue | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [sucursal, setSucursal] = useState<Sucursal | null>(null);
  const [abierto, setAbierto] = useState(false);
  const accionPendiente = useRef<(() => void) | null>(null);

  const abrirSelector = useCallback(() => setAbierto(true), []);

  const cerrarSelector = useCallback(() => {
    setAbierto(false);
    // Si cierra sin elegir, la acción que quedó esperando se descarta —
    // no tiene sentido dispararla más tarde sin que el usuario lo sepa.
    accionPendiente.current = null;
  }, []);

  const elegirSucursal = useCallback((s: Sucursal) => {
    setSucursal(s);
    setAbierto(false);
    const accion = accionPendiente.current;
    accionPendiente.current = null;
    accion?.();
  }, []);

  const ejecutarConSucursal = useCallback(
    (accion: () => void) => {
      if (sucursal) {
        accion();
        return;
      }
      accionPendiente.current = accion;
      setAbierto(true);
    },
    [sucursal]
  );

  return (
    <BranchContext.Provider
      value={{
        sucursal,
        abierto,
        abrirSelector,
        cerrarSelector,
        elegirSucursal,
        ejecutarConSucursal,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch(): BranchContextValue {
  const ctx = useContext(BranchContext);
  if (!ctx) {
    throw new Error("useBranch debe usarse dentro de <BranchProvider>");
  }
  return ctx;
}
