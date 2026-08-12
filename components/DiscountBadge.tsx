// Sello de descuento tipo "sello de calidad" — anillo punteado + rotación,
// más premium que un rectángulo plano de "-30% OFF".
export default function DiscountBadge({ porcentaje }: { porcentaje: number }) {
  return (
    <div className="absolute -left-2 -top-2 z-10 flex h-16 w-16 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-dashed border-white/70 bg-brand-orange text-white shadow-tagSm sm:h-[4.5rem] sm:w-[4.5rem]">
      <span className="font-display text-lg font-extrabold leading-none sm:text-xl">
        -{porcentaje}%
      </span>
      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest">
        Off
      </span>
    </div>
  );
}
