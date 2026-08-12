import { CartIcon, HeartIcon, TagIcon } from "./icons";
import { DonTotoLogo } from "./Logo";

// Franja de 4 bloques tomada del manual de marca: 3 bloques navy con
// ícono + copy en mayúscula bold, cierre en naranja con el logo.
const PROPS = [
  {
    icon: TagIcon,
    titulo: "Precios justos",
    desc: "Cuidamos tu bolsillo en cada compra.",
  },
  {
    icon: CartIcon,
    titulo: "Variedad para todos",
    desc: "Todo lo que buscás, en un solo lugar.",
  },
  {
    icon: HeartIcon,
    titulo: "Atención que te hace bien",
    desc: "Trato cercano, como el almacén de siempre.",
  },
];

export default function ValuePropsStrip() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4">
      {PROPS.map(({ icon: Icon, titulo, desc }) => (
        <div
          key={titulo}
          className="pattern-carritos relative flex flex-col items-center gap-2 bg-brand-navy px-4 py-8 text-center sm:py-10"
        >
          <Icon className="h-7 w-7 text-brand-orange" />
          <span className="font-display text-sm font-extrabold uppercase tracking-wide text-white sm:text-base">
            {titulo}
          </span>
          <span className="max-w-[16rem] text-xs text-white/60">{desc}</span>
        </div>
      ))}
      <div className="col-span-2 flex flex-col items-center justify-center gap-2 bg-brand-orange px-4 py-8 text-center sm:py-10 lg:col-span-1">
        <DonTotoLogo markClassName="h-9 w-9" textClassName="text-lg" reversed stacked />
        <span className="text-xs text-white/80">
          Más de 20 años de tradición
        </span>
      </div>
    </section>
  );
}
