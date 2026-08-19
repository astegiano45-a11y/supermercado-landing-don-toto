import Image from "next/image";
import Link from "next/link";
import { formatoPeso } from "@/lib/format";

// Tarjetas de "ocasión de compra" inventadas, estilo Líder — no son SKUs
// reales, son ganchos temáticos con foto de stock genérica.
const IMPERDIBLES = [
  {
    id: "despensa",
    titulo: "Llena tu despensa",
    descripcion: "Todo lo que necesitás para no quedarte sin nada en casa.",
    label: "Desde",
    precio: 990,
    imagen:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=900&q=80",
    href: "/categoria/almacen",
  },
  {
    id: "compartir",
    titulo: "Comparte algo rico",
    descripcion: "Ideal para juntadas, findes en familia o noches de peli.",
    label: "2x",
    precio: 6990,
    imagen:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=900&q=80",
    href: "/categoria/bebidas-y-snacks",
  },
  {
    id: "desayuno",
    titulo: "Para el desayuno",
    descripcion: "Arrancá el día con todo lo rico de siempre.",
    label: "Desde",
    precio: 690,
    imagen:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=900&q=80",
    href: "/categoria/frescos-y-lacteos",
  },
];

export default function ImperdiblesSemanales() {
  return (
    <section className="bg-brand-cream px-4 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
          Esta semana
        </span>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">
          Imperdibles semanales
        </h2>

        {/* banner destacado — pieza de diseño completa (Canva), se muestra
            entera sin recortar: tiene texto pegado a los dos bordes. El PNG
            original traía ~22% de margen blanco arriba y abajo "horneado"
            en el archivo (nada que ver con el contenedor); se recortó al
            contenido real (2110×420, ver public/banner-frutas-verduras.png)
            para que se vea a pantalla completa, estilo banner nativo. */}
        <Link
          href="/categoria/frescos-y-lacteos"
          className="group mt-6 block overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-navy/5 transition duration-300 hover:-translate-y-1.5"
        >
          <Image
            src="/banner-frutas-verduras.png"
            alt="Frutas y verduras a precio rebajado, desde $1.000"
            width={2110}
            height={420}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </Link>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {IMPERDIBLES.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-navy/5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-3 left-3 -rotate-2 rounded-lg bg-brand-orange px-3 py-1.5 text-white shadow-tagSm">
                  <span className="block text-[10px] font-bold uppercase leading-none tracking-wide">
                    {item.label}
                  </span>
                  <span className="font-display text-lg font-extrabold leading-none tabular-nums">
                    {formatoPeso(item.precio)}
                  </span>
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <h3 className="font-display text-lg font-extrabold text-brand-navy">
                  {item.titulo}
                </h3>
                <p className="text-sm text-brand-dark/60">
                  {item.descripcion}
                </p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-brand-navy px-4 py-2 text-xs font-extrabold text-brand-navy transition hover:bg-brand-navy hover:text-white"
                >
                  ¡Descubre más!
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
