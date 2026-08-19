import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { buscarProductos, productos } from "@/lib/catalogo";
import TiendaClient from "./tienda-client";

export const metadata: Metadata = {
  title: "Tienda | Don Toto DA+",
  description: "Comprá todo el catálogo de Don Toto DA+ online.",
};

export default function Tienda({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const hayQuery = query.length > 0;
  const cantidadResultados = hayQuery ? buscarProductos(query).length : 0;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      {/* breadcrumb + título */}
      <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8">
        <nav className="mx-auto flex max-w-6xl items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-brand-navy">
            Inicio
          </Link>
          <span>/</span>
          <span className="font-semibold text-brand-navy">Tienda</span>
        </nav>

        <div className="mx-auto mt-3 max-w-6xl">
          {hayQuery ? (
            <>
              <h1 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
                Resultados para &quot;{query}&quot;
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                <span>
                  {cantidadResultados} producto
                  {cantidadResultados !== 1 ? "s" : ""} encontrado
                  {cantidadResultados !== 1 ? "s" : ""}
                </span>
                <Link
                  href="/tienda"
                  className="font-semibold text-brand-orange hover:underline"
                >
                  Quitar búsqueda ✕
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
                Toda la tienda
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {productos.length} productos de todas las categorías
              </p>
            </>
          )}
        </div>
      </div>

      <TiendaClient key={query || "todos"} productos={productos} query={query} />
    </main>
  );
}
