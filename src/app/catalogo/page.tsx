"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  SlidersHorizontal, 
  CheckCircle2, 
  Truck,
  PhoneCall
} from "lucide-react";

interface Producto {
  id: string;
  slug: string;
  nombre: string;
  categoria: "ESTIBAS_MADERA" | "ESTIBAS_PLASTICAS" | "POSTES_MADERAS";
  cargaDinamicaKg?: number;
  cargaEstaticaKg?: number;
  precioBase: number;
  precioMayorista: number;
  nimf15: boolean;
  dimensiones: string;
  imagen: string;
  descripcionCorta: string;
}

const PRODUCTOS_DATA: Producto[] = [
  {
    id: "1",
    slug: "estiba-estandar-madera-recuperada-a",
    nombre: "Estiba Madera Estándar Taco Reforzado Grado A",
    categoria: "ESTIBAS_MADERA",
    cargaDinamicaKg: 1500,
    cargaEstaticaKg: 3000,
    precioBase: 32000,
    precioMayorista: 27200,
    nimf15: true,
    dimensiones: "1000 × 1200 × 145 mm",
    imagen: "/images/galeria/estibas_madera_tacos_azules.jpg",
    descripcionCorta: "Madera cepillada seleccionada con clavo helicoidal. Apta para montacargas y racks.",
  },
  {
    id: "2",
    slug: "estiba-plastica-hdpe-cuarto-frio",
    nombre: "Estiba Plástica HDPE Ventilada para Rack / Cuarto Frío",
    categoria: "ESTIBAS_PLASTICAS",
    cargaDinamicaKg: 1500,
    cargaEstaticaKg: 4500,
    precioBase: 125000,
    precioMayorista: 110000,
    nimf15: false,
    dimensiones: "1000 × 1200 × 160 mm",
    imagen: "/images/galeria/bodega_estibas_plasticas.jpg",
    descripcionCorta: "Polietileno de alta densidad no poroso. Ideal para alimentos, farmacéuticas y congelación.",
  },
  {
    id: "3",
    slug: "postes-estacones-madera-inmunizada",
    nombre: "Postes y Estacones Inmunizados con Punta para Cercas",
    categoria: "POSTES_MADERAS",
    precioBase: 28000,
    precioMayorista: 24000,
    nimf15: false,
    dimensiones: "Largo 2.20m a 2.50m • Calibre 10-12cm",
    imagen: "/images/galeria/postes_estacones_inmunizados.jpg",
    descripcionCorta: "Madera tratada para intemperie con punta afilada para hincado en fincas y cerramientos.",
  },
  {
    id: "4",
    slug: "estiba-epal-certificada-exportacion",
    nombre: "Estiba Europea EPAL Certificada con Sello NIMF 15",
    categoria: "ESTIBAS_MADERA",
    cargaDinamicaKg: 1500,
    cargaEstaticaKg: 4000,
    precioBase: 42000,
    precioMayorista: 38000,
    nimf15: true,
    dimensiones: "800 × 1200 × 144 mm",
    imagen: "/images/galeria/estibas_epal_certificadas.jpg",
    descripcionCorta: "Norma internacional fitosanitaria ICA para exportación marítima y aérea sin rechazos.",
  },
  {
    id: "5",
    slug: "tambores-canecas-plasticas-55-galones",
    nombre: "Canecas Plásticas Industriales 55 Galones + Estiba",
    categoria: "ESTIBAS_PLASTICAS",
    precioBase: 85000,
    precioMayorista: 75000,
    nimf15: false,
    dimensiones: "Capacidad 208 Litros (55 Gal)",
    imagen: "/images/galeria/canecas_estiba_plastica.jpg",
    descripcionCorta: "Tambores azules reforzados para almacenamiento de líquidos y químicos con pallet base.",
  },
  {
    id: "6",
    slug: "tablas-maderas-dimensionadas-pino",
    nombre: "Tablas y Listonería Dimensionada en Pino / Eucalipto",
    categoria: "POSTES_MADERAS",
    precioBase: 14000,
    precioMayorista: 11500,
    nimf15: false,
    dimensiones: "Cortes desde 2.0m a 3.20m a la medida",
    imagen: "/images/galeria/tablas_madera_acopio.jpg",
    descripcionCorta: "Madera aserrada de primera calidad para embalajes, construcción o carpintería.",
  },
];

export default function CatalogoPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("TODAS");
  const [soloNIMF15, setSoloNIMF15] = useState<boolean>(false);

  const filtrados = useMemo(() => {
    return PRODUCTOS_DATA.filter((p) => {
      if (categoriaFiltro !== "TODAS" && p.categoria !== categoriaFiltro) return false;
      if (soloNIMF15 && !p.nimf15) return false;
      return true;
    });
  }, [categoriaFiltro, soloNIMF15]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Cabecera */}
      <div className="mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
          Inventario Disponible en Patio Fontibón
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">
          Catálogo Industrial de Estibas, Maderas y Plásticos
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Precios especiales por lote mayorista para despachos en Bogotá y Cundinamarca con flota propia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* PANEL DE FILTROS */}
        <aside className="bg-white p-6 rounded-3xl border border-slate-200 h-fit space-y-6 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <h2 className="font-bold text-slate-900 text-sm">Categorías de Inventario</h2>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            {[
              { id: "TODAS", label: "Todo el Inventario" },
              { id: "ESTIBAS_MADERA", label: "Estibas de Madera" },
              { id: "ESTIBAS_PLASTICAS", label: "Estibas Plásticas & Canecas" },
              { id: "POSTES_MADERAS", label: "Postes & Madera Aserrada" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaFiltro(cat.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition ${
                  categoriaFiltro === cat.id
                    ? "bg-[#1B4332] text-white font-bold"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={soloNIMF15}
                onChange={(e) => setSoloNIMF15(e.target.checked)}
                className="rounded accent-[#1B4332] w-4 h-4"
              />
              <span className="font-medium">Solo Certificadas ICA (NIMF 15)</span>
            </label>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950">
            <span className="font-bold block mb-1">¿Cotización Especial por Volumen?</span>
            <p className="text-[11px] text-slate-600 mb-2">Para viajes de camión completo o tractomula comuníquese con el dueño:</p>
            <a href="tel:3042394091" className="font-mono font-bold text-emerald-800 block">📞 Alexander Torres: 304 239 4091</a>
          </div>
        </aside>

        {/* LISTADO DE PRODUCTOS REALES CON FOTOS */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtrados.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                {/* Foto Real del Producto */}
                <div className="h-52 w-full bg-slate-100 relative overflow-hidden">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">
                    {item.dimensiones}
                  </span>
                  {item.nimf15 && (
                    <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3" /> Sello ICA
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 leading-snug mb-1">
                    {item.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {item.descripcionCorta}
                  </p>

                  {item.cargaDinamicaKg && (
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs font-mono mb-4 border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px]">C. DINÁMICA:</span>
                        <strong className="text-slate-900">{item.cargaDinamicaKg} kg</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">C. ESTÁTICA:</span>
                        <strong className="text-slate-900">{item.cargaEstaticaKg} kg</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">POR MAYOR DESDE:</span>
                  <span className="text-xl font-black font-mono text-[#1B4332]">
                    ${item.precioMayorista.toLocaleString("es-CO")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono"> COP + IVA</span>
                </div>

                <Link
                  href={`/producto/${item.slug}`}
                  className="bg-[#1B4332] hover:bg-[#143326] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                >
                  Cotizar & Comprar <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}