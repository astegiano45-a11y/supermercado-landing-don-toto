import Link from "next/link";
import { SearchIcon, UserIcon } from "./icons";
import { DonTotoLogo } from "./Logo";
import CartButton from "./CartButton";
import CategoriesMenu from "./CategoriesMenu";
import QuickListModal from "./QuickListModal";
import SucursalBar from "./SucursalBar";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20">
      {/* franja superior — genera urgencia/confianza, estilo Líder */}
      <div className="bg-brand-navy px-5 py-1.5 text-center text-[11px] font-semibold tracking-wide text-white/90 sm:px-8">
        🚚 Envío el mismo día en compras desde $15.000 · Más de 20 años
        sirviendo a tu familia
      </div>

      <div className="flex flex-col gap-3 border-b border-black/5 bg-white px-5 py-3 shadow-sm sm:px-8 sm:py-4">
        {/* en mobile queda el flex de siempre; desde sm: pasa a grid de 3
            columnas (lados 1fr + centro fijo) para centrar el buscador en
            el ancho total del header, no solo en el hueco logo↔íconos */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 sm:grid sm:grid-cols-[1fr_minmax(0,28rem)_1fr]">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="shrink-0">
              <DonTotoLogo icon="official" markClassName="h-8 w-auto" textClassName="text-xl" />
            </Link>

            {/* en mobile no entra acá junto a los íconos ya agrandados —
                se muda a la fila del buscador, debajo (ver más abajo) */}
            <div className="hidden sm:block">
              <CategoriesMenu />
            </div>
          </div>

          {/* buscador — visual, sin lógica de búsqueda real todavía */}
          <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-brand-cream px-4 py-2.5 text-sm text-brand-dark/50 sm:flex">
            <SearchIcon className="h-4 w-4 shrink-0 text-brand-dark/40" />
            <span className="truncate">Buscá carnes, almacén, bebidas…</span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:justify-self-end sm:gap-2">
            <QuickListModal />
            <button
              type="button"
              aria-label="Mi cuenta"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand-cream active:scale-95 sm:h-12 sm:w-12"
            >
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <CartButton />
          </div>
        </div>

        {/* fila mobile — categorías + buscador, apilados debajo del logo.
            En sm: en adelante cada uno vuelve a su lugar de arriba. */}
        <div className="flex items-center gap-2 sm:hidden">
          <CategoriesMenu />
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-black/10 bg-brand-cream px-4 py-2.5 text-sm text-brand-dark/50">
            <SearchIcon className="h-4 w-4 shrink-0 text-brand-dark/40" />
            <span className="truncate">Buscá carnes, almacén, bebidas…</span>
          </div>
        </div>
      </div>

      {/* barra de sucursal para retiro — visible en todas las páginas */}
      <SucursalBar />
    </header>
  );
}
