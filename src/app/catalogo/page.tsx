"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, SlidersHorizontal, CheckCircle } from "lucide-react";

interface Producto {
  id: string;
  slug: string;
  nombre: string;
  material: "MADERA" | "PLASTICO";
  grado: "NUEVA" | "RECUPERADA_A" | "RECUPERADA_B";
  cargaDinamicaKg: number;
  cargaEstaticaKg: number;
  precioBase: number;
  nimf15: boolean;
  dimensiones: string;
}

const PRODUCTOS_DATA: Producto[] = [
  {
    id: "1",
    slug: "estiba-estandar-madera-recuperada-a",
    nombre: "Estiba Estándar Cuatro Entradas Grado A",
    material: "MADERA",
    grado: "RECUPERADA_A",
    cargaDinamicaKg: 1200,
    cargaEstaticaKg: 2500,
    precioBase: 32000,
    nimf15: true,
    dimensiones: "1000 × 1200 × 145 mm",
  },
  {
    id: "2",
    slug: "estiba-madera-nueva-pino",
    nombre: "Estiba Nueva Pino Pátula Industrial",
    material: "MADERA",
    grado: "NUEVA",
    cargaDinamicaKg: 1500,
    cargaEstaticaKg: 3000,
    precioBase: 48000,
    nimf15: true,
    dimensiones: "1000 × 1200 × 145 mm",
  },
  {
    id: "3",
    slug: "estiba-plastica-rackeable-hdpe",
    nombre: "Estiba Plástica HDPE Grado Alimentario",
    material: "PLASTICO",
    grado: "NUEVA",
    cargaDinamicaKg: 1500,
    cargaEstaticaKg: 4000,
    precioBase: 135000,
    nimf15: false,
    dimensiones: "1000 × 1200 × 160 mm",
  },
  {
    id: "4",
    slug: "estiba-madera-economica-grado-b",
    nombre: "Estiba Recuperada Grado B (Embalaje)",
    material: "MADERA",
    grado: "RECUPERADA_B",
    cargaDinamicaKg: 800,
    cargaEstaticaKg: 1800,
    precioBase: 24000,
    nimf15: false,
    dimensiones: "1000 × 1200 × 130 mm",
  },
];

export default function CatalogoPage() {
  const [materialFiltro, setMaterialFiltro] = useState<string>("TODOS");
  const [soloNIMF15, setSoloNIMF15] = useState<boolean>(false);
  const [cargaMinima, setCargaMinima] = useState<number>(500);

  const filtrados = useMemo(() => {
    return PRODUCTOS_DATA.filter((p) => {
      if (materialFiltro !== "TODOS" && p.material !== materialFiltro) return false;
      if (soloNIMF15 && !p.nimf15) return false;
      if (p.cargaDinamicaKg < cargaMinima) return false;
      return true;
    });
  }, [materialFiltro, soloNIMF15, cargaMinima]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Encabezado del Catálogo */}
      <div className="mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
          Inventario en Patio Fontibón (Av. Calle 24 #128-15)
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">
          Catálogo Técnico de Estibas y Embalaje Industrial
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Disponibilidad mayorista garantizada para entrega en Bogotá y Sabana de Occidente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* PANEL DE FILTROS TÉCNICOS */}
        <aside className="bg-white p-6 rounded-2xl border border-slate-200 h-fit space-y-6 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <h2 className="font-bold text-slate-900 text-sm">Filtros de Ingeniería</h2>
          </div>

          {/* Material */}
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500 block mb-2 font-mono">
              Material:
            </label>
            <div className="space-y-1.5">
              {["TODOS", "MADERA", "PLASTICO"].map((mat) => (
                <button
                  key={mat}
                  onClick={() => setMaterialFiltro(mat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    materialFiltro === mat
                      ? "bg-[#1B4332] text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Carga Dinámica Mínima */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="font-semibold text-slate-600">Carga Mínima:</span>
              <span className="font-bold text-[#1B4332]">{cargaMinima} kg</span>
            </div>
            <input
              type="range"
              min="500"
              max="1500"
              step="100"
              value={cargaMinima}
              onChange={(e) => setCargaMinima(Number(e.target.value))}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
          </div>

          {/* Sello Fitosanitario ICA */}
          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={soloNIMF15}
                onChange={(e) => setSoloNIMF15(e.target.checked)}
                className="rounded accent-[#1B4332] w-4 h-4"
              />
              <span className="font-medium">Solo Certificado NIMF 15 (ICA)</span>
            </label>
          </div>
        </aside>

        {/* LISTADO DE PRODUCTOS */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtrados.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-sm transition"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                    {item.dimensiones}
                  </span>
                  {item.nimf15 && (
                    <span className="flex items-center text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Sello ICA
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.nombre}</h3>

                <div className="grid grid-cols-2 gap-2 my-4 bg-slate-50 p-3 rounded-xl text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">C. DINÁMICA:</span>
                    <strong className="text-slate-800">{item.cargaDinamicaKg} kg</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">C. ESTÁTICA:</span>
                    <strong className="text-slate-800">{item.cargaEstaticaKg} kg</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">DESDE (MAYORISTA)</span>
                  <span className="text-xl font-extrabold font-mono text-[#1B4332]">
                    ${item.precioBase.toLocaleString("es-CO")}
                  </span>
                  <span className="text-[10px] text-slate-500"> + IVA</span>
                </div>

                <Link
                  href={`/producto/${item.slug}`}
                  className="bg-[#1B4332] hover:bg-[#143326] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
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