// Íconos de línea — estilo "outline fino" inspirado en la iconografía del
// manual de marca (trazo 1.5, extremos redondeados, sin relleno).
// Todos aceptan className para heredar tamaño/color desde donde se usan.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  );
}

export function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6.2" />
      <circle cx="10" cy="21" r="1.3" />
      <circle cx="17.5" cy="21" r="1.3" />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} strokeWidth={2.2} className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} strokeWidth={2.2} className={className} aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} strokeWidth={2} className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ListIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.5 6h10M9.5 12h10M9.5 18h10" />
      <path d="m4 6.2 1 1L6.8 5" />
      <path d="m4 12.2 1 1 1.8-2.2" />
      <path d="m4 18.2 1 1 1.8-2.2" />
    </svg>
  );
}

export function TrashIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.5 7h15" />
      <path d="M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7" />
      <path d="M6.5 7 7.3 19a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L17.5 7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function PlayIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  );
}

export function PauseIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="6" y="4.5" width="4.2" height="15" rx="1" />
      <rect x="13.8" y="4.5" width="4.2" height="15" rx="1" />
    </svg>
  );
}

export function PickupIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 9.5 5.6 4h12.8L20 9.5" />
      <path d="M4 9.5h16v8.7a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18.2V9.5Z" />
      <path d="M9 13.2v-2M15 13.2v-2M9.5 16.4h5" />
    </svg>
  );
}

export function GridIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.4" y="3.4" width="7" height="7" rx="1.2" />
      <rect x="13.6" y="3.4" width="7" height="7" rx="1.2" />
      <rect x="3.4" y="13.6" width="7" height="7" rx="1.2" />
      <rect x="13.6" y="13.6" width="7" height="7" rx="1.2" />
    </svg>
  );
}

export function ChevronDownIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg {...base} strokeWidth={2} className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg {...base} strokeWidth={2} className={className} aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

// — Franja de value props —

export function TagIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M11.6 3.6h5.9a1.9 1.9 0 0 1 1.9 1.9v5.9c0 .5-.2 1-.56 1.34l-8.3 8.3a1.9 1.9 0 0 1-2.69 0l-5.4-5.4a1.9 1.9 0 0 1 0-2.69l8.3-8.3c.35-.35.84-.56 1.34-.56Z" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </svg>
  );
}

export function HeartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 20.2s-7.6-4.5-9.9-9A5.3 5.3 0 0 1 12 6.4 5.3 5.3 0 0 1 21.9 11.2c-2.3 4.5-9.9 9-9.9 9Z" />
    </svg>
  );
}

// — Iconografía lineal del manual (pan, leche, manzana, carrito) —

export function BreadIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 11.5c0-3.6 3.3-6.3 8-6.3s8 2.7 8 6.3v5.1a1.9 1.9 0 0 1-1.9 1.9H5.9A1.9 1.9 0 0 1 4 16.6v-5.1Z" />
      <path d="M8.5 11.8v4.6M12 11.8v4.6M15.5 11.8v4.6" />
    </svg>
  );
}

export function MilkIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.5 3.2h5v3l2 3.4v9.3a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V9.6l2-3.4v-3Z" />
      <path d="M7.5 12.8h9M9.5 6.2h5" />
    </svg>
  );
}

export function AppleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 8.4c-1-1.4-2.6-2-4.2-1.6C4.8 7.5 3.4 10.6 4.5 14c1 3 3.3 6 5.8 6 .9 0 1.2-.4 1.7-.4s.8.4 1.7.4c2.3 0 4.4-2.5 5.5-5.2 1.4-3.5-.5-6.8-3.1-7.4-1.6-.4-2.9.2-3.6 1Z" />
      <path d="M12 8.4c-.2-1.6.5-3 1.9-3.8" />
    </svg>
  );
}
