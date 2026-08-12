import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import { CategoryCard, PromoCard } from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import ValuePropsStrip from "@/components/ValuePropsStrip";
import ImperdiblesSemanales from "@/components/ImperdiblesSemanales";
import RetiraGratisBanner from "@/components/RetiraGratisBanner";
import MiClubStrip from "@/components/MiClubStrip";
import BeneficiosAdicionales from "@/components/BeneficiosAdicionales";
import { DonTotoLogo } from "@/components/Logo";
import { categorias, getPrecioDesde, getProducto } from "@/lib/catalogo";

// Curados a mano para la maqueta — combinación de rubros con buena foto,
// no un cálculo automático, para controlar la variedad visual de la sección.
const LIQUIDACION_IDS = ["car-1", "fre-3", "beb-7", "car-8"];
const productosLiquidacion = LIQUIDACION_IDS.map(getProducto).filter(
  (p): p is NonNullable<typeof p> => p !== undefined
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-cream">
      <SiteHeader />

      {/* HERO — banner de oferta destacada, precio grande + tachado + ahorro */}
      <Hero />

      {/* CATEGORÍAS — foto arriba, banner "Desde $X" abajo, estilo Líder */}
      <section className="px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Rubros
              </span>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">
                Elegí tu categoría
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
            {categorias.map((c) => (
              <CategoryCard
                key={c.slug}
                href={`/categoria/${c.slug}`}
                nombre={c.nombre}
                imagen={c.imagen}
                desde={getPrecioDesde(c.slug)}
              />
            ))}
            <PromoCard
              href="#liquidacion-del-dia"
              titulo="Ofertas de la semana"
              subtitulo="Los precios más bajos, todos los días"
            />
          </div>
        </div>
      </section>

      {/* LIQUIDACIÓN DEL DÍA — productos con descuento destacado */}
      <section
        id="liquidacion-del-dia"
        className="scroll-mt-24 bg-white px-4 py-12 sm:px-8 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Solo por hoy
              </span>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">
                Liquidación del día
              </h2>
            </div>
            <span className="rounded-full border border-brand-navy/15 px-3.5 py-1.5 text-xs font-bold text-brand-navy/70">
              ⏰ Termina hoy a las 23:59
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
            {productosLiquidacion.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>

      {/* IMPERDIBLES SEMANALES — 3 tarjetas de ocasión, estilo Líder */}
      <ImperdiblesSemanales />

      {/* RETIRA GRATIS — banner corto, franja naranja */}
      <RetiraGratisBanner />

      {/* MI CLUB — devolución en puntos pagando con tarjeta propia */}
      <MiClubStrip />

      {/* BENEFICIOS ADICIONALES — 4 tarjetas de color del programa de fidelidad */}
      <BeneficiosAdicionales />

      {/* VALUE PROPS — franja del manual de marca (3 navy + cierre naranja) */}
      <ValuePropsStrip />

      {/* CTA FINAL — dos opciones exclusivas */}
      <section className="mt-auto bg-brand-navy bg-dot-grid bg-dots px-5 py-12 sm:px-8">
        <h2 className="text-center font-display text-2xl font-extrabold text-white sm:text-3xl">
          ¿Cómo querés hacer tu pedido?
        </h2>
        <div className="mx-auto mt-6 flex max-w-md flex-col gap-4 sm:max-w-2xl sm:flex-row">
          <Link
            href="/tienda"
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-brand-blue px-6 py-6 text-center text-white shadow-tag transition hover:-translate-y-1 active:translate-y-0"
          >
            <span className="font-display text-lg font-bold">
              Comprar en Versión Web
            </span>
            <span className="text-sm text-white/80">
              Sin instalar nada, comprá ahora
            </span>
          </Link>

          <a
            href="#"
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-brand-orange px-6 py-6 text-center text-white shadow-tag transition hover:-translate-y-1 active:translate-y-0"
          >
            <span className="font-display text-lg font-bold">
              Descargar App
            </span>
            <span className="text-sm text-white/80">
              Pedí más rápido la próxima vez
            </span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark px-5 py-10 text-white/80 sm:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 text-sm sm:grid-cols-4">
          <div>
            <DonTotoLogo markClassName="h-7 w-7" textClassName="text-base" reversed />
            <p className="mt-2 text-xs text-white/60">
              Tu supermercado de confianza. Tradición y calidad en cada
              corte.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-display font-bold text-white">Ayuda</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="#" className="hover:text-white">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cómo comprar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Envíos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-display font-bold text-white">
              Contacto
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="#" className="hover:text-white">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-display font-bold text-white">
              Seguinos
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Don Toto DA+. Todos los derechos
          reservados.
        </p>
      </footer>
    </main>
  );
}
