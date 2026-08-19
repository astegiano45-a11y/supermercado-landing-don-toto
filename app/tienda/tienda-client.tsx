"use client";

// Orquesta /tienda: filtro de categoría + búsqueda por texto (?q=, dos
// dimensiones propias de esta página) por encima del mismo
// ProductosConFiltros que ya usa la CLP. Mismo patrón que
// categoria-explorer.tsx — pre-filtra `productos` antes de pasarlo, y se
// remonta entero desde page.tsx (key={query}) cada vez que cambia la
// búsqueda, así categoría y marca/precio arrancan de cero en el contexto
// nuevo en vez de quedar pisados con valores de la búsqueda anterior.
import { useMemo, useState } from "react";
import { buscarProductos, type Producto } from "@/lib/catalogo";
import CategoriaChips from "@/components/CategoriaChips";
import ProductosConFiltros from "@/components/ProductosConFiltros";

export default function TiendaClient({
  productos,
  query,
}: {
  productos: Producto[];
  query?: string;
}) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    string | null
  >(null);

  const productosDeLaBusqueda = useMemo(
    () => (query ? buscarProductos(query) : productos),
    [productos, query]
  );

  const productosVisibles = useMemo(
    () =>
      categoriaSeleccionada
        ? productosDeLaBusqueda.filter(
            (p) => p.categoria === categoriaSeleccionada
          )
        : productosDeLaBusqueda,
    [productosDeLaBusqueda, categoriaSeleccionada]
  );

  return (
    <>
      <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <CategoriaChips
            activaSlug={categoriaSeleccionada}
            onSelect={setCategoriaSeleccionada}
          />
        </div>
      </div>

      <ProductosConFiltros
        key={categoriaSeleccionada ?? "todas"}
        productos={productosVisibles}
      />
    </>
  );
}
