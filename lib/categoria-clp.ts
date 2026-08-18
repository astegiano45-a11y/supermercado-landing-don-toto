// Datos de la Category Landing Page (CLP): hero temático + subcategorías
// por categoría. Es una capa puramente de presentación/curaduría sobre
// lib/catalogo.ts — las subcategorías no existen como campo en `Producto`,
// son agrupaciones a mano de los ids reales del catálogo mock. Reemplazar
// junto con catalogo.ts cuando exista un API/CMS real.

export type CategoriaHeroData = {
  bajada: string;
  imagen: string; // foto de stock ancha (hero), distinta de la imagen chica de CategoryCard en la home
};

export type Subcategoria = {
  slug: string;
  nombre: string;
  imagen: string;
  productoIds: string[]; // ids de lib/catalogo.ts productos
};

export const HERO_POR_CATEGORIA: Record<string, CategoriaHeroData> = {
  almacen: {
    bajada: "Los básicos de la despensa, siempre a mano.",
    imagen:
      "https://images.unsplash.com/photo-1786413568427-d65dec4e215b?w=1600&q=80",
  },
  "carnes-y-pescados": {
    bajada: "Cortes seleccionados, frescura de carnicería.",
    imagen:
      "https://images.unsplash.com/photo-1782143791676-f512dc36b6ea?w=1600&q=80",
  },
  "limpieza-y-aseo": {
    bajada: "Tu casa impecable, todos los días.",
    imagen:
      "https://images.unsplash.com/photo-1642505172378-a6f5e5b15580?w=1600&q=80",
  },
  "bebidas-y-snacks": {
    bajada: "Para acompañar cualquier momento.",
    imagen:
      "https://images.unsplash.com/photo-1753826469259-afeb2e96969a?w=1600&q=80",
  },
  "frescos-y-lacteos": {
    bajada: "Directo del campo a tu mesa.",
    imagen:
      "https://images.unsplash.com/photo-1557844352-761f2565b576?w=1600&q=80",
  },
};

export const SUBCATEGORIAS_POR_CATEGORIA: Record<string, Subcategoria[]> = {
  almacen: [
    {
      slug: "arroz-pastas-harinas",
      nombre: "Arroz, Pastas y Harinas",
      imagen:
        "https://images.unsplash.com/photo-1613634326309-7fe54ed25ffa?w=400&q=80",
      productoIds: ["alm-1", "alm-2", "alm-6"],
    },
    {
      slug: "aceites-conservas",
      nombre: "Aceites y Conservas",
      imagen:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
      productoIds: ["alm-3", "alm-7"],
    },
    {
      slug: "yerba-infusiones",
      nombre: "Yerba e Infusiones",
      imagen:
        "https://images.unsplash.com/photo-1675001077188-809370ce3279?w=400&q=80",
      productoIds: ["alm-4"],
    },
    {
      slug: "galletitas-dulces",
      nombre: "Galletitas y Dulces",
      imagen:
        "https://images.unsplash.com/photo-1634188023615-7e08901193b6?w=400&q=80",
      productoIds: ["alm-5", "alm-8"],
    },
  ],
  "carnes-y-pescados": [
    {
      slug: "vacuno-parrilla",
      nombre: "Vacuno y Parrilla",
      imagen:
        "https://images.unsplash.com/photo-1690983330536-3b0089d07cf9?w=400&q=80",
      productoIds: ["car-1", "car-2", "car-5", "car-6"],
    },
    {
      slug: "pollo",
      nombre: "Pollo",
      imagen:
        "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80",
      productoIds: ["car-3", "car-7"],
    },
    {
      slug: "pescados-mariscos",
      nombre: "Pescados y Mariscos",
      imagen:
        "https://images.unsplash.com/photo-1611214774777-3d997a9d0e35?w=400&q=80",
      productoIds: ["car-4", "car-8"],
    },
  ],
  "limpieza-y-aseo": [
    {
      slug: "limpieza-cocina",
      nombre: "Limpieza de Cocina",
      imagen:
        "https://images.unsplash.com/photo-1646209624081-a1e99efeaea1?w=400&q=80",
      productoIds: ["lim-1", "lim-5", "lim-6"],
    },
    {
      slug: "lavanderia",
      nombre: "Lavandería",
      imagen:
        "https://images.unsplash.com/photo-1624372635310-01d078c05dd9?w=400&q=80",
      productoIds: ["lim-2", "lim-4"],
    },
    {
      slug: "higiene-personal",
      nombre: "Higiene Personal",
      imagen:
        "https://images.unsplash.com/photo-1701992678972-d5a053ad0fb0?w=400&q=80",
      productoIds: ["lim-7"],
    },
    {
      slug: "papel-aromatizantes",
      nombre: "Papel y Aromatizantes",
      imagen:
        "https://images.unsplash.com/photo-1583496597549-0fd8b25e34e2?w=400&q=80",
      productoIds: ["lim-3", "lim-8"],
    },
  ],
  "bebidas-y-snacks": [
    {
      slug: "aguas-jugos",
      nombre: "Aguas y Jugos",
      imagen:
        "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=400&q=80",
      productoIds: ["beb-1", "beb-4", "beb-8"],
    },
    {
      slug: "gaseosas",
      nombre: "Gaseosas",
      imagen:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80",
      productoIds: ["beb-2"],
    },
    {
      slug: "cervezas-vinos",
      nombre: "Cervezas y Vinos",
      imagen:
        "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=400&q=80",
      productoIds: ["beb-3", "beb-7"],
    },
    {
      slug: "snacks-salados",
      nombre: "Snacks Salados",
      imagen:
        "https://images.unsplash.com/photo-1634224570230-f05799975687?w=400&q=80",
      productoIds: ["beb-5", "beb-6"],
    },
  ],
  "frescos-y-lacteos": [
    {
      slug: "lacteos",
      nombre: "Lácteos",
      imagen:
        "https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?w=400&q=80",
      productoIds: ["fre-1", "fre-2", "fre-3", "fre-4"],
    },
    {
      slug: "frutas",
      nombre: "Frutas",
      imagen:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80",
      productoIds: ["fre-5", "fre-6"],
    },
    {
      slug: "verduras",
      nombre: "Verduras",
      imagen:
        "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&q=80",
      productoIds: ["fre-7"],
    },
    {
      slug: "huevos",
      nombre: "Huevos",
      imagen:
        "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80",
      productoIds: ["fre-8"],
    },
  ],
};

export function getHeroCategoria(slug: string): CategoriaHeroData | undefined {
  return HERO_POR_CATEGORIA[slug];
}

export function getSubcategorias(slug: string): Subcategoria[] {
  return SUBCATEGORIAS_POR_CATEGORIA[slug] ?? [];
}
