import { CardIcon, GiftIcon, ReceiptIcon, StarIcon } from "./icons";

const BENEFICIOS = [
  {
    icon: StarIcon,
    bg: "bg-brand-blue",
    titulo: "Tu cuenta de puntos",
    desc: "Accedé cuando quieras y mirá tus Puntos Don Toto acumulados.",
  },
  {
    icon: ReceiptIcon,
    bg: "bg-brand-orange",
    titulo: "Sumá puntos por compra",
    desc: "Cada compra suma puntos que después podés canjear por productos.",
  },
  {
    icon: CardIcon,
    bg: "bg-brand-pink",
    titulo: "Descuento con tarjeta propia",
    desc: "Pagando con tu tarjeta Don Toto DA+ tenés un extra todos los días.",
  },
  {
    icon: GiftIcon,
    bg: "bg-brand-navy",
    titulo: "Descuento primera compra",
    desc: "Un regalo de bienvenida para estrenar tu primera compra online.",
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
          {BENEFICIOS.map(({ icon: Icon, bg, titulo, desc }) => (
            <div
              key={titulo}
              className={`flex aspect-square flex-col justify-between rounded-3xl ${bg} p-4 text-white shadow-card sm:p-6`}
            >
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
              <div>
                <h3 className="font-display text-sm font-extrabold leading-tight sm:text-base">
                  {titulo}
                </h3>
                <p className="mt-1 text-[11px] leading-snug text-white/75 sm:text-xs">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
