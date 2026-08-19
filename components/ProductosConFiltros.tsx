"use client";

// Sidebar de filtros (marca + precio máximo) + grid de ProductCard.
// Genérico a propósito: no sabe nada de categoría ni subcategoría — quien
// lo usa (CategoriaExplorer, TiendaClient) le pasa el `productos` ya
// recortado por esa dimensión y, si hace falta resetear marca/precio al
// cambiar de contexto, lo remonta con un `key` distinto en vez de que este
// componente tenga que enterarse de esa lógica externa.
import { useMemo, useState } from "react";
import { type Producto } from "@/lib/catalogo";
import { formatoPeso } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

export default function ProductosConFiltros({
  productos,
}: {
  productos: Producto[];
}) {
  const marcasDisponibles = useMemo(
    () => Array.from(new Set(productos.map((p) => p.marca))).sort(),
    [productos]
  );
  // Math.max(...[]) da -Infinity — puede pasar de verdad ahora que una
  // búsqueda por texto sin resultados puede llegar acá con `productos` vacío.
  const precioMax = useMemo(
    () =>
      productos.length > 0 ? Math.max(...productos.map((p) => p.precio)) : 0,
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
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
