export interface ProductoItem {
  id: string;
  slug: string;
  nombre: string;
  sku: string;
  categoria: string;
  precioBase: number;
  precioMayorista: number;
  dimensiones: string;
  imagen: string;
  descripcion: string;
  cargaDinamica?: string;
  cargaEstatica?: string;
  unidad: string;
}

export const INVENTARIO_COMPLETO: Record<string, ProductoItem> = {
  "postes-estacones-madera-inmunizada": {
    id: "3",
    slug: "postes-estacones-madera-inmunizada",
    nombre: "Postes y Estacones Inmunizados con Punta para Cercas",
    sku: "POS-INM-250",
    categoria: "Maderas & Fincas",
    precioBase: 28000,
    precioMayorista: 24000,
    dimensiones: "Largo 2.20m a 2.50m • Calibre 10-12 cm",
    imagen: "/images/galeria/postes_estacones_inmunizados.jpg",
    descripcion: "Madera de pino inmunizada a presión para intemperie. Con punta afilada para fácil hincado en terrenos de ganadería, linderos y cerramientos de obra.",
    unidad: "postes",
  },
  "estiba-estandar-madera-recuperada-a": {
    id: "1",
    slug: "estiba-estandar-madera-recuperada-a",
    nombre: "Estiba Madera Estándar Taco Reforzado Grado A",
    sku: "EST-MAD-REC-01",
    categoria: "Estibas de Madera",
    precioBase: 32000,
    precioMayorista: 27200,
    dimensiones: "1000 × 1200 × 145 mm (4 Entradas)",
    imagen: "/images/galeria/estibas_madera_tacos_azules.jpg",
    descripcion: "Estiba reacondicionada de alta resistencia con tacos macizos y clavado helicoidal. Apta para montacargas, estibadores y almacenamiento en bodega.",
    cargaDinamica: "1,500 kg",
    cargaEstatica: "3,000 kg",
    unidad: "estibas",
  },
  "estiba-plastica-hdpe-cuarto-frio": {
    id: "2",
    slug: "estiba-plastica-hdpe-cuarto-frio",
    nombre: "Estiba Plástica HDPE Ventilada para Rack / Cuarto Frío",
    sku: "EST-PLA-HDPE-02",
    categoria: "Estibas Plásticas",
    precioBase: 125000,
    precioMayorista: 110000,
    dimensiones: "1000 × 1200 × 160 mm",
    imagen: "/images/galeria/bodega_estibas_plasticas.jpg",
    descripcion: "Fabricada en polietileno de alta densidad no poroso. Cumple con normas sanitarias para alimentos, laboratorios y cámaras de congelación.",
    cargaDinamica: "1,500 kg",
    cargaEstatica: "4,500 kg",
    unidad: "estibas plásticas",
  },
  "estiba-epal-certificada-exportacion": {
    id: "4",
    slug: "estiba-epal-certificada-exportacion",
    nombre: "Estiba Europea EPAL Certificada con Sello NIMF 15",
    sku: "EST-EPAL-NIMF15",
    categoria: "Estibas de Exportación",
    precioBase: 42000,
    precioMayorista: 38000,
    dimensiones: "800 × 1200 × 144 mm",
    imagen: "/images/galeria/estibas_epal_certificadas.jpg",
    descripcion: "Norma internacional fitosanitaria ICA para exportación a la Unión Europea y EE.UU. sin riesgo de cuarentena ni rechazo de carga.",
    cargaDinamica: "1,500 kg",
    cargaEstatica: "4,000 kg",
    unidad: "estibas EPAL",
  },
  "tambores-canecas-plasticas-55-galones": {
    id: "5",
    slug: "tambores-canecas-plasticas-55-galones",
    nombre: "Canecas Plásticas Industriales 55 Galones + Estiba",
    sku: "CAN-PLA-55GAL",
    categoria: "Contenedores",
    precioBase: 85000,
    precioMayorista: 75000,
    dimensiones: "Capacidad 208 Litros (55 Gal)",
    imagen: "/images/galeria/canecas_estiba_plastica.jpg",
    descripcion: "Tambores azules limpios para almacenamiento de agua, químicos o insumos industriales, montados sobre base plástica de alta resistencia.",
    unidad: "canecas",
  },
  "tablas-maderas-dimensionadas-pino": {
    id: "6",
    slug: "tablas-maderas-dimensionadas-pino",
    nombre: "Tablas y Listonería Dimensionada en Pino / Eucalipto",
    sku: "MAD-DIM-PINO",
    categoria: "Maderas Aserradas",
    precioBase: 14000,
    precioMayorista: 11500,
    dimensiones: "Cortes de 2.0m a 3.20m a la medida",
    imagen: "/images/galeria/tablas_madera_acopio.jpg",
    descripcion: "Madera aserrada de primera calidad para embalajes, construcción o carpintería industrial en Bogotá y Sabana.",
    unidad: "piezas",
  },
};