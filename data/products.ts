export interface Product {
  id: string;
  name: string;
  /** Nota corta, se muestra en itálica sobre la foto */
  note: string;
  description: string;
  /** Precio en pesos chilenos */
  price: number;
  /**
   * Editable a mano. Poner "Disponible hoy" en cualquier producto cuando hay
   * stock horneado ese mismo día; si no, dejar "Bajo pedido · 24h".
   */
  availability: "Bajo pedido · 24h" | "Disponible hoy";
  image: string;
}

export const products: Product[] = [
  {
    id: "choco-chip",
    name: "Choco Chip Clásica",
    note: "la de siempre",
    description: "Mantequilla, chips semi-amargos",
    price: 2500,
    availability: "Bajo pedido · 24h",
    image: "/images/choco-chip.jpg",
  },
  {
    id: "doble-chocolate",
    name: "Doble Chocolate",
    note: "para los intensos",
    description: "Cacao + chips de chocolate",
    price: 2800,
    availability: "Bajo pedido · 24h",
    image: "/images/doble-chocolate.jpg",
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    note: "con corazón cremoso",
    description: "Con relleno de cream cheese",
    price: 3200,
    availability: "Bajo pedido · 24h",
    image: "/images/red-velvet.jpg",
  },
  {
    id: "manjar-nuez",
    name: "Manjar y Nuez",
    note: "manjar hecho en casa",
    description: "Manjar casero, nuez tostada",
    price: 2900,
    availability: "Bajo pedido · 24h",
    image: "/images/manjar-nuez.jpg",
  },
  {
    id: "avena-pasas",
    name: "Avena y Pasas",
    note: "la receta de siempre",
    description: "Receta tradicional",
    price: 2400,
    availability: "Bajo pedido · 24h",
    image: "/images/avena-pasas.jpg",
  },
  {
    id: "matcha-white-choc",
    name: "Matcha White Choc",
    note: "verde y tostado",
    description: "Té matcha, chips blancos",
    price: 3200,
    availability: "Bajo pedido · 24h",
    image: "/images/matcha.jpg",
  },
  {
    id: "loaf",
    name: "Loaf",
    note: "recién salido del molde",
    description: "Sabor por confirmar",
    price: 8000,
    availability: "Bajo pedido · 24h",
    image: "/images/loaf.jpg",
  },
];

export function formatCLP(value: number): string {
  return `$${value.toLocaleString("es-CL")}`;
}
