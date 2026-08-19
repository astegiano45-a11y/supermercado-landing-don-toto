"use client";

// Barra de selección de sucursal para retiro, pegada debajo del header en
// todas las páginas (se renderiza desde SiteHeader). El modal es el mismo
// shell visual que QuickListModal (bottom-sheet en mobile, centrado en
// desktop, Escape + scroll-lock) para que se sienta consistente sin
// importar de dónde se dispare — clic directo en la barra, o
// automáticamente desde ProductCard vía useBranch().ejecutarConSucursal
// cuando todavía no hay sucursal elegida.
import { useEffect } from "react";
import { useBranch, SUCURSALES } from "@/lib/branch-context";
import { ChevronDownIcon, CloseIcon } from "./icons";

export default function SucursalBar() {
  const { sucursal, abierto, abrirSelector, cerrarSelector, elegirSucursal } =
    useBranch();

  useEffect(() => {
    if (!abierto) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") cerrarSelector();
    }

    document.addEventListener("keydown", onKeyDown);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowPrevio;
    };
  }, [abierto, cerrarSelector]);

  return (
    <>
      <button
        type="button"
        onClick={abrirSelector}
        aria-expanded={abierto}
        aria-haspopup="dialog"
        className="flex w-full items-center justify-start gap-1.5 border-b border-black/5 bg-brand-cream px-5 py-2 text-xs font-semibold text-brand-navy transition hover:bg-brand-orange/10 sm:px-8"
      >
        <span className="truncate">
          {sucursal ? (
            <>
              📍 Retirás en:{" "}
              <span className="font-bold">{sucursal.direccion}</span>
            </>
          ) : (
            "📍 Elegí tu sucursal para retirar"
          )}
        </span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {abierto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sucursal-selector-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-brand-dark/60 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrarSelector();
          }}
        >
          <div className="w-full overflow-hidden rounded-t-3xl bg-brand-cream shadow-card animate-fade-up sm:max-w-md sm:rounded-3xl">
            {/* encabezado */}
            <div className="flex items-start justify-between gap-3 bg-brand-navy px-5 py-4">
              <div>
                <h2
                  id="sucursal-selector-title"
                  className="font-display text-lg font-extrabold text-white sm:text-xl"
                >
                  Elegí tu sucursal
                </h2>
                <p className="mt-0.5 text-xs text-white/70">
                  Vas a poder retirar tu pedido en el local que elijas
                </p>
              </div>
              <button
                type="button"
                onClick={cerrarSelector}
                aria-label="Cerrar selector de sucursal"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* opciones */}
            <div className="flex flex-col gap-2.5 px-5 py-5">
              {SUCURSALES.map((s) => {
                const activa = s.id === sucursal?.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => elegirSucursal(s)}
                    aria-pressed={activa}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                      activa
                        ? "border-brand-orange bg-brand-orange/5"
                        : "border-black/10 bg-white hover:bg-brand-cream"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        activa ? "border-brand-orange" : "border-black/20"
                      }`}
                    >
                      {activa && (
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-brand-navy">
                        {s.direccion}
                      </p>
                      <p className="text-xs text-brand-dark/50">
                        {s.localidad}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
