import Image from "next/image";
import Link from "next/link";
import { formatoPeso } from "@/lib/format";
import { ChevronRightIcon } from "./icons";

export function CategoryCard({
  href,
  nombre,
  imagen,
  desde,
}: {
  href: string;
  nombre: string;
  imagen: string;
  desde?: number;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-navy/5 transition duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imagen}
          alt={nombre}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-brand-navy/70 to-transparent" />
      </div>
      <div className="flex flex-col gap-1 bg-brand-navy px-4 py-3">
        <span className="font-display text-sm font-bold leading-tight text-white sm:text-base">
          {nombre}
        </span>
        {desde !== undefined && (
          <span className="text-xs text-white/70">
            Desde{" "}
            <span className="font-display text-base font-extrabold tabular-nums text-brand-orange sm:text-lg">
              {formatoPeso(desde)}
            </span>
          </span>
        )}
      </div>
    </Link>
  );
}

export function PromoCard({
  href,
  titulo,
  subtitulo,
}: {
  href: string;
  titulo: string;
  subtitulo: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-brand-orange bg-dot-grid bg-dots px-5 py-6 shadow-card transition duration-300 hover:-translate-y-1.5"
    >
      <div>
        <span className="font-display text-2xl font-extrabold leading-none text-white">
          %
        </span>
        <p className="mt-3 font-display text-lg font-extrabold leading-tight text-white sm:text-xl">
          {titulo}
        </p>
        <p className="mt-1 text-xs text-white/80">{subtitulo}</p>
      </div>
      <span className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-white">
        Ver todas
        <ChevronRightIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
