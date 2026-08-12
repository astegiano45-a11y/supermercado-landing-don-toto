"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatoPeso } from "@/lib/format";
import { DonTotoLogo } from "./Logo";
import { PauseIcon, PlayIcon } from "./icons";

const DURATION_MS = 6000;

// El slide "bienvenida" es de marca pura (sin precio) y va siempre primero.
// Los slides "promo" comparten el layout de precio grande + tachado + ahorro.
// Reemplazar por datos reales cuando exista el backend.
type SlideBienvenida = {
  id: string;
  variant: "bienvenida";
  descripcion: string;
  imagen: string;
  ctaLabel: string;
  ctaHref: string;
};

type SlidePromo = {
  id: string;
  variant: "promo";
  eyebrow: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAntes: number;
  unidad: string;
  imagen: string;
};

type Slide = SlideBienvenida | SlidePromo;

const SLIDES: Slide[] = [
  {
    id: "bienvenida",
    variant: "bienvenida",
    descripcion:
      "Tradición y calidad en cada corte — más de 20 años acompañando a tu familia.",
    imagen: "/hero-don-toto.png",
    ctaLabel: "Ver catálogo",
    ctaHref: "/tienda",
  },
  {
    id: "liquidacion",
    variant: "promo",
    eyebrow: "🔥 Liquidación del día",
    categoria: "Carnicería Don Toto",
    nombre: "Asado de Tira Premium",
    descripcion:
      "Cortado y madurado en nuestra carnicería. El clásico del finde, a precio de liquidación.",
    precio: 8900,
    precioAntes: 12900,
    unidad: "kg",
    imagen: "/hero-don-toto.png",
  },
  {
    id: "congelados",
    variant: "promo",
    eyebrow: "❄️ Congelados para la semana",
    categoria: "Heladería Don Toto",
    nombre: "Helado Artesanal 1L",
    descripcion:
      "Cremas y frutales directo del freezer a tu mesa — ideal para cerrar la semana.",
    precio: 3200,
    precioAntes: 4200,
    unidad: "unidad",
    imagen:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=1400&q=80",
  },
  {
    id: "frescos",
    variant: "promo",
    eyebrow: "🥬 Frescos de la semana",
    categoria: "Verdulería Don Toto",
    nombre: "Selección de Frutas y Verduras",
    descripcion:
      "Directo del mercado a tu casa. Frescura seleccionada todos los días.",
    precio: 990,
    precioAntes: 1390,
    unidad: "kg",
    imagen:
      "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=1400&q=80",
  },
  {
    id: "ofertas-semana",
    variant: "promo",
    eyebrow: "🛒 Ofertas de la semana",
    categoria: "Almacén Don Toto",
    nombre: "Combo Almacén Esencial",
    descripcion:
      "Los básicos de la despensa, todas las semanas a mejor precio.",
    precio: 4990,
    precioAntes: 6490,
    unidad: "combo",
    imagen:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1400&q=80",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  // se incrementa cada vez que el timer debe arrancar de cero (nuevo slide
  // o reanudar desde pausa) — mantiene sincronizados el setTimeout y la
  // animación CSS de la barra de progreso.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
      setCycle((c) => c + 1);
    }, DURATION_MS);
    return () => clearTimeout(id);
  }, [playing, cycle]);

  const togglePlaying = () => {
    setPlaying((p) => {
      if (!p) setCycle((c) => c + 1); // al reanudar, el slide actual arranca de nuevo
      return !p;
    });
  };

  const slide = SLIDES[index];

  return (
    <section
      className="relative overflow-hidden bg-brand-dark"
      role="region"
      aria-label="Carrusel de ofertas destacadas"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        {SLIDES.map((s, i) => (
          <Image
            key={s.id}
            src={s.imagen}
            alt={s.variant === "promo" ? s.nombre : "Don Toto DA+"}
            fill
            priority={i === 0}
            className={`object-cover object-center transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* overlay navy — nunca violeta, mantiene la paleta de marca */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-brand-dark/10 sm:bg-gradient-to-r sm:from-brand-dark sm:via-brand-dark/85 sm:to-transparent" />
        <div className="absolute inset-0 bg-dot-grid bg-dots opacity-40 mix-blend-overlay" />

        <div className="relative flex h-full flex-col justify-end px-5 pb-24 sm:justify-center sm:px-10 sm:pb-0 lg:px-16">
          <div key={slide.id} className="max-w-md animate-fade-up">
            {slide.variant === "bienvenida" ? (
              <>
                <h1 className="mt-1">
                  <DonTotoLogo
                    reversed
                    markClassName="h-11 w-11 sm:h-14 sm:w-14"
                    textClassName="text-4xl sm:text-5xl lg:text-6xl"
                  />
                </h1>
                <p className="mt-4 max-w-sm text-sm text-white/70 sm:text-base">
                  {slide.descripcion}
                </p>
                <div className="mt-6">
                  <Link
                    href={slide.ctaHref}
                    className="inline-block rounded-full bg-white px-7 py-3 text-sm font-extrabold text-brand-navy shadow-tagSm transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span className="inline-block -rotate-2 rounded-md bg-brand-orange px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-tagSm">
                  {slide.eyebrow}
                </span>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                  {slide.categoria}
                </p>
                <h1 className="mt-1 font-display text-3xl font-extrabold leading-[1.05] text-white sm:text-4xl lg:text-5xl">
                  {slide.nombre}
                </h1>
                <p className="mt-3 max-w-sm text-sm text-white/70 sm:text-base">
                  {slide.descripcion}
                </p>

                <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base text-white/45 line-through">
                      {formatoPeso(slide.precioAntes)}
                    </span>
                    <span className="font-display text-5xl font-extrabold tabular-nums text-brand-orange sm:text-6xl">
                      {formatoPeso(slide.precio)}
                    </span>
                    <span className="text-sm font-semibold text-white/60">
                      /{slide.unidad}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-brand-blue px-4 py-1.5 text-xs font-bold text-white">
                    Ahorrás {formatoPeso(slide.precioAntes - slide.precio)}
                  </span>
                  <Link
                    href="#liquidacion-del-dia"
                    className="rounded-full bg-white px-7 py-3 text-sm font-extrabold text-brand-navy shadow-tagSm transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Ver ofertas del día
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* badges de promoción del negocio — persistentes, no rotan con el slide */}
        <div className="absolute bottom-14 left-5 flex flex-wrap gap-2 sm:bottom-12 sm:left-10 lg:left-16">
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm ring-1 ring-white/15">
            🎟️ Con tu tarjeta Don Toto DA+ acumulás puntos
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm ring-1 ring-white/15">
            🏪 Retirá hoy en el local
          </span>
        </div>

        {/* controles del carrusel — barra de progreso segmentada + play/pausa */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-5 py-3.5 sm:px-10 lg:px-16">
          <div className="flex flex-1 gap-1.5">
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
              >
                {i < index && <div className="h-full w-full bg-white" />}
                {i === index && (
                  <div
                    key={cycle}
                    className="h-full rounded-full bg-white"
                    style={{
                      animation: `hero-progress ${DURATION_MS}ms linear forwards`,
                      animationPlayState: playing ? "running" : "paused",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={togglePlaying}
            aria-label={playing ? "Pausar carrusel" : "Reanudar carrusel"}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/25 active:scale-90"
          >
            {playing ? <PauseIcon /> : <PlayIcon className="ml-0.5 h-3 w-3" />}
          </button>
        </div>
      </div>
    </section>
  );
}
