"use client";

// Orquesta la capa nueva de la CLP (subcategorías + carruseles) por encima
// del grid con filtros compartido (components/ProductosConFiltros.tsx, el
// mismo que usa /tienda). A propósito no toca su lógica interna: solo le
// pasa un `productos` ya filtrado por subcategoría activa, y usa `key` para
// forzar un remount cuando cambia la subcategoría, así sus filtros internos
// de precio/marca (useState) arrancan de cero en el contexto nuevo en vez
// de quedar pisados con valores del filtro anterior.
import { useMemo, useState } from "react";
import type { Categoria, Producto } from "@/lib/catalogo";
import type { Subcategoria } from "@/lib/categoria-clp";
import SubcategoriasRow from "@/components/SubcategoriasRow";
import CategoriaCarrusel from "@/components/CategoriaCarrusel";
import CategoriaPills from "@/components/CategoriaPills";
import ProductosConFiltros from "@/components/ProductosConFiltros";

export default function CategoriaExplorer({
  categoria,
  productos,
  subcategorias,
}: {
  categoria: Categoria;
  productos: Producto[];
  subcategorias: Subcategoria[];
}) {
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(
    null
  );

  const productosVisibles = useMemo(() => {
    if (!subcategoriaActiva) return productos;
    const sub = subcategorias.find((s) => s.slug === subcategoriaActiva);
    if (!sub) return productos;
    return productos.filter((p) => sub.productoIds.includes(p.id));
  }, [productos, subcategorias, subcategoriaActiva]);

  const subcategoriaSeleccionada = subcategorias.find(
    (s) => s.slug === subcategoriaActiva
  );

  // Sin filtro: dos carruseles curados (mitad y mitad) sobre el catálogo
  // completo de la categoría. Con un filtro de subcategoría activo, alcanza
  // y sobra con uno solo (partir 2-3 productos en dos tiras se ve pobre).
  const mostrarDosCarruseles =
    !subcategoriaActiva && productosVisibles.length >= 4;
  const mitad = Math.ceil(productosVisibles.length / 2);

  return (
    <>
      {subcategorias.length > 0 && (
        <SubcategoriasRow
          subcategorias={subcategorias}
          activaSlug={subcategoriaActiva}
          onSelect={setSubcategoriaActiva}
        />
      )}

      {mostrarDosCarruseles ? (
        <>
          <CategoriaCarrusel
            titulo={`Lo más pedido en ${categoria.nombre}`}
            productos={productosVisibles.slice(0, mitad)}
          />
          <CategoriaCarrusel
            titulo="Ofertas y recomendados"
            productos={productosVisibles.slice(mitad)}
          />
        </>
      ) : (
        <CategoriaCarrusel
          titulo={
            subcategoriaSeleccionada
              ? subcategoriaSeleccionada.nombre
              : `Destacados de ${categoria.nombre}`
          }
          productos={productosVisibles}
        />
      )}

      <CategoriaPills categoriaActivaSlug={categoria.slug} />

      <ProductosConFiltros
        key={subcategoriaActiva ?? "todas"}
        productos={productosVisibles}
      />
    </>
  );
}
