// Catálogo mock de Don Toto DA+.
// Reemplazar por datos reales (API/CMS) cuando el sistema de pedidos esté listo.

export type ColorMarca = "orange" | "blue" | "navy";

export type Categoria = {
  slug: string;
  nombre: string;
  emoji: string;
  color: ColorMarca;
  imagen: string; // foto de stock genérica para las tarjetas de categoría de la home
};

export type Producto = {
  id: string;
  categoria: string; // slug de Categoria
  nombre: string;
  marca: string;
  precio: number;
  precioAntes?: number;
  unidad: string;
  emoji: string;
  imagen?: string; // foto de stock — sólo cargada para los destacados de la home
};

// Clases Tailwind por color de marca — un solo lugar para no repetir strings
// condicionales en cada componente que necesita pintar algo según la categoría.
export const CATEGORIA_COLOR_CLASSES: Record<
  ColorMarca,
  { bg: string; soft: string; text: string }
> = {
  orange: {
    bg: "bg-brand-orange",
    soft: "bg-brand-orange/10",
    text: "text-brand-orange",
  },
  blue: {
    bg: "bg-brand-blue",
    soft: "bg-brand-blue/10",
    text: "text-brand-blue",
  },
  navy: {
    bg: "bg-brand-navy",
    soft: "bg-brand-navy/10",
    text: "text-brand-navy",
  },
};

export const categorias: Categoria[] = [
  {
    slug: "almacen",
    nombre: "Almacén",
    emoji: "🛒",
    color: "orange",
    imagen:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=900&q=80",
  },
  {
    slug: "carnes-y-pescados",
    nombre: "Carnes y Pescados",
    emoji: "🥩",
    color: "blue",
    imagen:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=80",
  },
  {
    slug: "limpieza-y-aseo",
    nombre: "Limpieza y Aseo",
    emoji: "🧼",
    color: "navy",
    imagen:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
  },
  {
    slug: "bebidas-y-snacks",
    nombre: "Bebidas y Snacks",
    emoji: "🥤",
    color: "orange",
    imagen:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=900&q=80",
  },
  {
    slug: "frescos-y-lacteos",
    nombre: "Frescos y Lácteos",
    emoji: "🥛",
    color: "blue",
    imagen:
      "https://images.unsplash.com/photo-1543168256-418811576931?w=900&q=80",
  },
];

export const productos: Producto[] = [
  // Almacén
  { id: "alm-1", categoria: "almacen", nombre: "Arroz Largo Fino 1kg", marca: "Gallo Oro", precio: 1200, unidad: "unidad", emoji: "🍚" },
  { id: "alm-2", categoria: "almacen", nombre: "Fideos Spaghetti 500g", marca: "Matarazzo", precio: 650, unidad: "unidad", emoji: "🍝" },
  { id: "alm-3", categoria: "almacen", nombre: "Aceite de Girasol 900ml", marca: "Natura", precio: 1890, precioAntes: 2200, unidad: "unidad", emoji: "🫒" },
  { id: "alm-4", categoria: "almacen", nombre: "Yerba Mate 1kg", marca: "Playadito", precio: 3200, unidad: "unidad", emoji: "🧉" },
  { id: "alm-5", categoria: "almacen", nombre: "Azúcar Blanca 1kg", marca: "Ledesma", precio: 980, unidad: "unidad", emoji: "🥄" },
  { id: "alm-6", categoria: "almacen", nombre: "Harina 0000 1kg", marca: "Pureza", precio: 750, unidad: "unidad", emoji: "🌾" },
  { id: "alm-7", categoria: "almacen", nombre: "Puré de Tomate 520g", marca: "Arcor", precio: 890, unidad: "unidad", emoji: "🍅" },
  { id: "alm-8", categoria: "almacen", nombre: "Galletitas Dulces 300g", marca: "Bagley", precio: 1100, precioAntes: 1350, unidad: "unidad", emoji: "🍪" },

  // Carnes y Pescados
  { id: "car-1", categoria: "carnes-y-pescados", nombre: "Asado de Tira", marca: "Don Toto Selección", precio: 8900, precioAntes: 12900, unidad: "kg", emoji: "🥩", imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80" },
  { id: "car-2", categoria: "carnes-y-pescados", nombre: "Milanesas de Nalga", marca: "Don Toto Selección", precio: 7200, unidad: "kg", emoji: "🍖" },
  { id: "car-3", categoria: "carnes-y-pescados", nombre: "Pollo Entero", marca: "Granja Sol", precio: 2400, unidad: "kg", emoji: "🍗" },
  { id: "car-4", categoria: "carnes-y-pescados", nombre: "Filet de Merluza", marca: "Mar Azul", precio: 5800, unidad: "kg", emoji: "🐟" },
  { id: "car-5", categoria: "carnes-y-pescados", nombre: "Chorizo Parrillero", marca: "La Estancia", precio: 4300, unidad: "kg", emoji: "🌭" },
  { id: "car-6", categoria: "carnes-y-pescados", nombre: "Bife de Chorizo", marca: "Don Toto Selección", precio: 9200, unidad: "kg", emoji: "🥩" },
  { id: "car-7", categoria: "carnes-y-pescados", nombre: "Pechuga de Pollo", marca: "Granja Sol", precio: 3600, unidad: "kg", emoji: "🍗" },
  { id: "car-8", categoria: "carnes-y-pescados", nombre: "Salmón Rosado", marca: "Mar Azul", precio: 9800, precioAntes: 11500, unidad: "kg", emoji: "🐟", imagen: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=700&q=80" },

  // Limpieza y Aseo
  { id: "lim-1", categoria: "limpieza-y-aseo", nombre: "Detergente Concentrado 750ml", marca: "Magistral", precio: 1450, unidad: "unidad", emoji: "🧴" },
  { id: "lim-2", categoria: "limpieza-y-aseo", nombre: "Lavandina 1L", marca: "Ayudín", precio: 520, unidad: "unidad", emoji: "💧" },
  { id: "lim-3", categoria: "limpieza-y-aseo", nombre: "Papel Higiénico x4", marca: "Higienol", precio: 980, unidad: "pack", emoji: "🧻" },
  { id: "lim-4", categoria: "limpieza-y-aseo", nombre: "Jabón en Polvo 800g", marca: "Skip", precio: 2100, precioAntes: 2500, unidad: "unidad", emoji: "🧼" },
  { id: "lim-5", categoria: "limpieza-y-aseo", nombre: "Esponja Multiuso x3", marca: "Scotch-Brite", precio: 650, unidad: "pack", emoji: "🧽" },
  { id: "lim-6", categoria: "limpieza-y-aseo", nombre: "Limpiador Líquido 900ml", marca: "Cif", precio: 1350, unidad: "unidad", emoji: "🧴" },
  { id: "lim-7", categoria: "limpieza-y-aseo", nombre: "Shampoo 400ml", marca: "Sedal", precio: 1690, precioAntes: 1990, unidad: "unidad", emoji: "🧴" },
  { id: "lim-8", categoria: "limpieza-y-aseo", nombre: "Desodorante de Ambiente", marca: "Poett", precio: 1200, unidad: "unidad", emoji: "🌸" },

  // Bebidas y Snacks
  { id: "beb-1", categoria: "bebidas-y-snacks", nombre: "Agua Mineral 2L", marca: "Villa del Sur", precio: 650, unidad: "unidad", emoji: "💧" },
  { id: "beb-2", categoria: "bebidas-y-snacks", nombre: "Gaseosa Cola 1.5L", marca: "Manaos", precio: 890, unidad: "unidad", emoji: "🥤" },
  { id: "beb-3", categoria: "bebidas-y-snacks", nombre: "Cerveza Rubia 473ml", marca: "Quilmes", precio: 780, precioAntes: 950, unidad: "unidad", emoji: "🍺" },
  { id: "beb-4", categoria: "bebidas-y-snacks", nombre: "Jugo Exprimido 1L", marca: "Cepita", precio: 1050, unidad: "unidad", emoji: "🧃" },
  { id: "beb-5", categoria: "bebidas-y-snacks", nombre: "Papas Fritas 150g", marca: "Lays", precio: 1290, unidad: "unidad", emoji: "🍟" },
  { id: "beb-6", categoria: "bebidas-y-snacks", nombre: "Maní Salado 200g", marca: "Nuci", precio: 980, unidad: "unidad", emoji: "🥜" },
  { id: "beb-7", categoria: "bebidas-y-snacks", nombre: "Vino Tinto 750ml", marca: "Trapiche", precio: 2900, precioAntes: 3500, unidad: "botella", emoji: "🍷", imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=80" },
  { id: "beb-8", categoria: "bebidas-y-snacks", nombre: "Agua Saborizada 500ml", marca: "Levité", precio: 600, unidad: "unidad", emoji: "🥤" },

  // Frescos y Lácteos
  { id: "fre-1", categoria: "frescos-y-lacteos", nombre: "Leche Entera 1L", marca: "La Serenísima", precio: 780, unidad: "unidad", emoji: "🥛" },
  { id: "fre-2", categoria: "frescos-y-lacteos", nombre: "Yogur Bebible 1L", marca: "Danone", precio: 950, precioAntes: 1100, unidad: "unidad", emoji: "🥛" },
  { id: "fre-3", categoria: "frescos-y-lacteos", nombre: "Queso Cremoso", marca: "Tregar", precio: 4200, precioAntes: 4800, unidad: "kg", emoji: "🧀", imagen: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=700&q=80" },
  { id: "fre-4", categoria: "frescos-y-lacteos", nombre: "Manteca 200g", marca: "La Serenísima", precio: 890, unidad: "unidad", emoji: "🧈" },
  { id: "fre-5", categoria: "frescos-y-lacteos", nombre: "Manzanas Rojas", marca: "Producción Propia", precio: 980, unidad: "kg", emoji: "🍎" },
  { id: "fre-6", categoria: "frescos-y-lacteos", nombre: "Bananas", marca: "Producción Propia", precio: 850, unidad: "kg", emoji: "🍌" },
  { id: "fre-7", categoria: "frescos-y-lacteos", nombre: "Lechuga Mantecosa", marca: "Producción Propia", precio: 450, unidad: "unidad", emoji: "🥬" },
  { id: "fre-8", categoria: "frescos-y-lacteos", nombre: "Huevos x 12", marca: "Granja Los Pinos", precio: 2100, unidad: "unidad", emoji: "🥚" },
];

export function getCategoria(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug);
}

export function getProductosPorCategoria(slug: string): Producto[] {
  return productos.filter((p) => p.categoria === slug);
}

// Precio de entrada de una categoría — para los banners "Desde $X" de la home.
export function getPrecioDesde(slug: string): number | undefined {
  const items = getProductosPorCategoria(slug);
  if (items.length === 0) return undefined;
  return Math.min(...items.map((p) => p.precio));
}

export function getProducto(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}
