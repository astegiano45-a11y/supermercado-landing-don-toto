import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import {
  CATEGORIA_COLOR_CLASSES,
  categorias,
  getCategoria,
  getProductosPorCategoria,
} from "@/lib/catalogo";
import CategoriaClient from "./categoria-client";

export function generateStaticParams() {
  return categorias.map((c) => ({ nombre: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { nombre: string };
}): Metadata {
  const categoria = getCategoria(params.nombre);
  if (!categoria) return {};
  return {
    title: `${categoria.nombre} | Don Toto DA+`,
    description: `Comprá ${categoria.nombre.toLowerCase()} online en Don Toto DA+.`,
  };
}

export default function CategoriaPage({
  params,
}: {
  params: { nombre: string };
}) {
  const categoria = getCategoria(params.nombre);
  if (!categoria) notFound();

  const productosCategoria = getProductosPorCategoria(categoria.slug);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      {/* breadcrumb + navegación entre categorías */}
      <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8">
        <nav className="mx-auto flex max-w-6xl items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-brand-navy">
            Inicio
          </Link>
          <span>/</span>
          <span className="font-semibold text-brand-navy">
            {categoria.nombre}
          </span>
        </nav>

        <div className="mx-auto mt-3 flex max-w-6xl items-center gap-3">
          <span className="text-3xl">{categoria.emoji}</span>
          <h1 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
            {categoria.nombre}
          </h1>
        </div>

        <div className="mx-auto mt-4 flex max-w-6xl gap-2 overflow-x-auto pb-1">
          {categorias.map((c) => {
            const activa = c.slug === categoria.slug;
            return (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  activa
                    ? `${CATEGORIA_COLOR_CLASSES[c.color].bg} text-white`
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {c.emoji} {c.nombre}
              </Link>
            );
          })}
        </div>
      </div>

      <CategoriaClient categoria={categoria} productos={productosCategoria} />
    </main>
  );
}
