import Image from "next/image";
import Link from "next/link";

export default function MiClubStrip() {
  return (
    <section className="pattern-carritos bg-brand-navy px-5 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        {/* pieza de diseño completa (Canva) — se muestra entera, sin
            recrear el texto en HTML. El PNG original traía ~36% de margen
            blanco arriba y abajo "horneado" en el archivo (nada que ver con
            el contenedor); se recortó al contenido real (2002×231, ver
            public/banner-mi-club.png) para que se vea a pantalla completa,
            estilo banner nativo. Envuelta en tarjeta blanca porque el PNG
            no tiene canal alfa — su margen restante (unos px de buffer del
            recorte) es blanco opaco, y así se funde con la tarjeta en vez
            de generar un recuadro contra el fondo navy de la sección. */}
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-card">
          <Image
            src="/banner-mi-club.png"
            alt="Mi Club Don Toto DA+: pagando con tu tarjeta Don Toto DA+ todos los días, te devolvemos 6% del total de tu compra en Pesos Don Toto DA+"
            width={2002}
            height={231}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </div>

        <Link
          href="/tienda"
          className="shrink-0 rounded-full bg-white px-7 py-3 text-sm font-extrabold text-brand-navy shadow-tagSm transition hover:-translate-y-0.5 active:translate-y-0"
        >
          Sumate gratis
        </Link>
      </div>
    </section>
  );
}
