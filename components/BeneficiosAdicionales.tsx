import Image from "next/image";

// Las 4 tarjetas ahora son imágenes completas (fondo, logo, ícono y texto
// principal ya vienen integrados en el PNG) — acá solo agregamos el
// texto chico de apoyo que va debajo de cada una, que no está en la imagen.
type Beneficio = {
  id: string;
  imagen: string; // tarjeta completa en public/imagenes/beneficios/
  imagenAlt: string;
  caption: string;
};

const BENEFICIOS: Beneficio[] = [
  {
    id: "club",
    imagen: "/imagenes/beneficios/beneficio-1.png",
    imagenAlt: "Sumate al Club Don Toto: accedé a tu cuenta, conocé el estado de tus compras y descubrí todos los beneficios DA+",
    caption: "Sumate al Club Don Toto y accedé a promos exclusivas para vos.",
  },
  {
    id: "puntos",
    imagen: "/imagenes/beneficios/beneficio-2.png",
    imagenAlt: "Todas tus compras acumulan Puntos DA+",
    caption: "Acumulá Puntos DA+ en todas tus compras y canjealos cuando quieras.",
  },
  {
    id: "billetera",
    imagen: "/imagenes/beneficios/beneficio-3.png",
    imagenAlt: "Pagando con Billetera Don Toto todos los días te devolvemos 6% de total de tu boleta en Puntos DA+",
    caption: "Pagá con tu Billetera Don Toto y sumá reintegro todos los días.",
  },
  {
    id: "primera-compra",
    imagen: "/imagenes/beneficios/beneficio-4.png",
    imagenAlt: "Pagando con Don Toto DA+, 10% de descuento para tu primera compra, tope $20.000",
    caption: "Válido en tu primera compra realizada desde la web o la app.",
  },
];

export default function BeneficiosAdicionales() {
  return (
    <section className="bg-white px-4 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
          Programa de fidelidad
        </span>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">
          Beneficios adicionales
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {BENEFICIOS.map((b) => (
            <div key={b.id} className="flex flex-col">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={b.imagen}
                  alt={b.imagenAlt}
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 300px, 45vw"
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-[11px] leading-snug text-gray-500 sm:mt-3 sm:text-sm">
                {b.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
