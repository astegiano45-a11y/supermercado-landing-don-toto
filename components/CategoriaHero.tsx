import Image from "next/image";
import type { Categoria } from "@/lib/catalogo";

// Hero temático de la Category Landing Page — imagen grande + título + bajada.
// Puramente estático (sin estado), así que no necesita "use client" aunque
// viva dentro del árbol de CategoriaExplorer.
export default function CategoriaHero({
  categoria,
  imagen,
  bajada,
}: {
  categoria: Categoria;
  imagen: string;
  bajada: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9] lg:aspect-[3/1]">
        <Image
          src={imagen}
          alt={categoria.nombre}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/10 sm:bg-gradient-to-r sm:from-brand-dark sm:via-brand-dark/75 sm:to-transparent" />
        <div className="absolute inset-0 bg-dot-grid bg-dots opacity-30 mix-blend-overlay" />

        <div className="relative flex h-full flex-col justify-end px-5 pb-6 sm:justify-center sm:px-10 sm:pb-0 lg:px-16">
          <span className="text-2xl leading-none sm:text-3xl">
            {categoria.emoji}
          </span>
          <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {categoria.nombre}
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">
            {bajada}
          </p>
        </div>
      </div>
    </section>
  );
}
