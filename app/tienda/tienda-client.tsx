"use client";

// Orquesta /tienda: filtro de categoría (dimensión propia de esta página)
// por encima del mismo ProductosConFiltros que ya usa la CLP. Mismo patrón
// que categoria-explorer.tsx — pre-filtra `productos` por categoría activa
// y remonta con `key` para resetear marca/precio al cambiar de categoría.
import { useMemo, useState } from "react";
import type { Producto } from "@/lib/catalogo";
import CategoriaChips from "@/components/CategoriaChips";
import ProductosConFiltros from "@/components/ProductosConFiltros";

export default function TiendaClient({ productos }: { productos: Producto[] }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    string | null
  >(null);

  const productosVisibles = useMemo(
    () =>
      categoriaSeleccionada
        ? productos.filter((p) => p.categoria === categoriaSeleccionada)
        : productos,
    [productos, categoriaSeleccionada]
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
