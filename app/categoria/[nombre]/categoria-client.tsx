"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIA_COLOR_CLASSES,
  type Categoria,
  type Producto,
} from "@/lib/catalogo";
import { formatoPeso } from "@/lib/format";

export default function CategoriaClient({
  categoria,
  productos,
}: {
  categoria: Categoria;
  productos: Producto[];
}) {
  const colorClasses = CATEGORIA_COLOR_CLASSES[categoria.color];

  const marcasDisponibles = useMemo(
    () => Array.from(new Set(productos.map((p) => p.marca))).sort(),
    [productos]
  );
  const precioMax = useMemo(
    () => Math.max(...productos.map((p) => p.precio)),
    [productos]
  );

  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState<string[]>(
    []
  );
  const [precioTope, setPrecioTope] = useState(precioMax);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const toggleMarca = (marca: string) => {
    setMarcasSeleccionadas((prev) =>
      prev.includes(marca)
        ? prev.filter((m) => m !== marca)
        : [...prev, marca]
    );
  };

  const productosFiltrados = productos.filter((p) => {
    const pasaMarca =
      marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(p.marca);
    const pasaPrecio = p.precio <= precioTope;
    return pasaMarca && pasaPrecio;
  });

  const hayFiltrosActivos =
    marcasSeleccionadas.length > 0 || precioTope < precioMax;
  const cantidadFiltrosActivos =
    marcasSeleccionadas.length + (precioTope < precioMax ? 1 : 0);

  const limpiarFiltros = () => {
    setMarcasSeleccionadas([]);
    setPrecioTope(precioMax);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8">
      {/* toggle de filtros en mobile */}
      <button
        onClick={() => setFiltrosAbiertos((v) => !v)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-brand-navy lg:hidden"
      >
        <span>
          Filtros{cantidadFiltrosActivos > 0 ? ` (${cantidadFiltrosActivos})` : ""}
        </span>
        <span className="text-xs">{filtrosAbiertos ? "▲" : "▼"}</span>
      </button>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className={`${filtrosAbiertos ? "block" : "hidden"} lg:block`}>
          <div className="sticky top-20 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-brand-navy">
                Filtros
              </h2>
              {hayFiltrosActivos && (
                <button
                  onClick={limpiarFiltros}
                  className="text-xs font-semibold text-brand-orange hover:underline"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                Precio máximo
              </h3>
              <input
                type="range"
                min={0}
                max={precioMax}
                step={50}
                value={precioTope}
                onChange={(e) => setPrecioTope(Number(e.target.value))}
                className="w-full accent-brand-orange"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span className="font-bold text-brand-navy">
                  {formatoPeso(precioTope)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                Marca
              </h3>
              <div className="flex flex-col gap-2">
                {marcasDisponibles.map((marca) => (
                  <label
                    key={marca}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={marcasSeleccionadas.includes(marca)}
                      onChange={() => toggleMarca(marca)}
                      className="h-4 w-4 rounded accent-brand-blue"
                    />
                    {marca}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-gray-500">
            {productosFiltrados.length} producto
            {productosFiltrados.length !== 1 ? "s" : ""}
          </p>

          {productosFiltrados.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-gray-50 py-16 text-center">
              <span className="text-4xl">🔎</span>
              <p className="font-bold text-brand-navy">
                No encontramos productos con esos filtros
              </p>
              <button
                onClick={limpiarFiltros}
                className="rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {productosFiltrados.map((producto) => {
                const tieneDescuento =
                  producto.precioAntes && producto.precioAntes > producto.precio;
                return (
                  <div
                    key={producto.id}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div
                      className={`relative flex aspect-square items-center justify-center ${colorClasses.soft}`}
                    >
                      {tieneDescuento && (
                        <span className="absolute left-2 top-2 rounded-full bg-brand-orange px-2 py-0.5 text-[10px] font-extrabold text-white">
                          OFERTA
                        </span>
                      )}
                      <span className="text-5xl transition group-hover:scale-110">
                        {producto.emoji}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        {producto.marca}
                      </span>
                      <span className="text-sm font-bold leading-snug text-brand-navy">
                        {producto.nombre}
                      </span>
                      <div className="mt-auto flex items-baseline gap-2 pt-2">
                        {tieneDescuento && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatoPeso(producto.precioAntes!)}
                          </span>
                        )}
                        <span className={`text-base font-extrabold ${colorClasses.text}`}>
                          {formatoPeso(producto.precio)}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        por {producto.unidad}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
