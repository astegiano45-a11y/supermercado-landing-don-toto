// Recreación en SVG del logo del manual de marca (carrito + wordmark).
// El manual entrega un mockup rasterizado, no un asset vectorial exportado,
// así que se reconstruye acá con los mismos colores exactos (#0D2B63 / #F07E26).

export function CartMark({
  className = "h-8 w-8",
  reversed = false,
}: {
  className?: string;
  reversed?: boolean;
}) {
  const body = reversed ? "#FFFFFF" : "#0D2B63";
  const wheel = reversed ? "#FFFFFF" : "#F07E26";
  return (
    <svg viewBox="0 0 40 36" className={className} aria-hidden="true">
      <path
        d="M2 3h4.2l3.6 20.6a3.4 3.4 0 0 0 3.4 2.8h15.4a3.4 3.4 0 0 0 3.35-2.8L34.6 9.4H11"
        fill="none"
        stroke={body}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="32" r="2.6" fill={body} />
      <circle cx="26.5" cy="32" r="2.6" fill={wheel} fillOpacity={reversed ? 0.6 : 1} />
    </svg>
  );
}

export function DonTotoLogo({
  markClassName = "h-8 w-8",
  textClassName = "text-xl",
  stacked = false,
  reversed = false,
}: {
  markClassName?: string;
  textClassName?: string;
  stacked?: boolean;
  reversed?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${
        stacked ? "flex-col text-center" : "flex-row"
      }`}
    >
      <CartMark className={markClassName} reversed={reversed} />
      <span
        className={`font-display font-extrabold leading-none ${textClassName} ${
          reversed ? "text-white" : "text-brand-navy"
        }`}
      >
        Don Toto{" "}
        <span className={reversed ? "text-white/80" : "text-brand-orange"}>
          DA+
        </span>
      </span>
    </span>
  );
}
