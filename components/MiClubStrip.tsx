import Link from "next/link";

export default function MiClubStrip() {
  return (
    <section className="pattern-carritos bg-brand-navy px-5 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-5">
          <span className="flex -rotate-3 flex-col items-center justify-center rounded-2xl bg-brand-pink px-5 py-3 text-white shadow-tag">
            <span className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
              5%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              de vuelta
            </span>
          </span>
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              Mi Club Don Toto
            </span>
            <p className="mt-1 max-w-md font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
              Pagando con tu tarjeta Don Toto todos los días, te devolvemos
              5% en Puntos Don Toto.
            </p>
          </div>
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
