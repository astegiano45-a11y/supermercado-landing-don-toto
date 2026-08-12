import Link from "next/link";
import { CartIcon, SearchIcon, UserIcon } from "./icons";
import { DonTotoLogo } from "./Logo";
import CategoriesMenu from "./CategoriesMenu";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20">
      {/* franja superior — genera urgencia/confianza, estilo Líder */}
      <div className="bg-brand-navy px-5 py-1.5 text-center text-[11px] font-semibold tracking-wide text-white/90 sm:px-8">
        🚚 Envío el mismo día en compras desde $15.000 · Más de 20 años
        sirviendo a tu familia
      </div>

      <div className="flex flex-col gap-3 border-b border-black/5 bg-white px-5 py-3 shadow-sm sm:px-8 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <DonTotoLogo markClassName="h-8 w-8" textClassName="text-xl" />
          </Link>

          <CategoriesMenu />

          {/* buscador — visual, sin lógica de búsqueda real todavía */}
          <div className="hidden flex-1 items-center gap-2 rounded-full border border-black/10 bg-brand-cream px-4 py-2.5 text-sm text-brand-dark/50 sm:flex sm:max-w-md">
            <SearchIcon className="h-4 w-4 shrink-0 text-brand-dark/40" />
            <span className="truncate">Buscá carnes, almacén, bebidas…</span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Mi cuenta"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-cream active:scale-95"
            >
              <UserIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Carrito de compras"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-cream active:scale-95"
            >
              <CartIcon className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                3
              </span>
            </button>
          </div>
        </div>

        {/* buscador mobile — apilado debajo del logo */}
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-brand-cream px-4 py-2.5 text-sm text-brand-dark/50 sm:hidden">
          <SearchIcon className="h-4 w-4 shrink-0 text-brand-dark/40" />
          <span className="truncate">Buscá carnes, almacén, bebidas…</span>
        </div>
      </div>
    </header>
  );
}
