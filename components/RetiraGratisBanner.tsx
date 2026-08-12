import { PickupIcon } from "./icons";

export default function RetiraGratisBanner() {
  return (
    <section className="bg-dot-grid bg-dots bg-brand-orange px-5 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
          <PickupIcon className="h-7 w-7" />
        </span>
        <div>
          <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">
            Retirá gratis en tu local
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Comprá online y pasá a buscar tu pedido sin costo de envío, en el
            horario que más te acomode.
          </p>
        </div>
      </div>
    </section>
  );
}
