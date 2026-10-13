"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  Truck, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  DollarSign, 
  Layers, 
  Wrench 
} from "lucide-react";

export default function MetalesRematesPage() {
  const [material, setMaterial] = useState<string>("COBRE");
  const [kilos, setKilos] = useState<number>(500);

  // Precios referenciales de compra en patio por kg
  const tarifasPorKilo: Record<string, { precio: number; desc: string }> = {
    COBRE: { precio: 34000, desc: "Cobre de primera (brillante/tubería sin estaño)" },
    ALUMINIO: { precio: 7800, desc: "Perfilería, carter y chapa limpia" },
    BRONCE: { precio: 21000, desc: "Valvulería y piezas mecánicas pesadas" },
    HIERRO: { precio: 1250, desc: "Chatarra pesada estructural y viga" },
  };

  const totalEstimado = (kilos || 0) * tarifasPorKilo[material].precio;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Cabecera */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          División Metalmecánica & Liquidaciones
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-3">
          Compra de Metales, Chatarra Industrial y Remates de Empresas
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Compramos sobrantes de producción, maquinaria dada de baja, perfiles de cobre, aluminio y estructuras metálicas. Pesaje certificado en báscula camionera y pago de contado en Fontibón.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* COTIZADOR DE METALES AL PESO (7 Columnas) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-700" /> Tasador de Metales en Patio
              </h2>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                Báscula Certificada Fontibón
              </span>
            </div>

            {/* Selector de Metal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {Object.keys(tarifasPorKilo).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMaterial(m)}
                  className={`p-3 rounded-2xl border text-center transition font-mono text-xs ${
                    material === m
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-500 mb-4 font-mono">
              Calidad: <strong>{tarifasPorKilo[material].desc}</strong>
            </p>

            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Kilos estimados para entregar o recoger:
              </label>
              <input
                type="number"
                min="50"
                step="50"
                value={kilos || ""}
                onChange={(e) => setKilos(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-xl font-mono text-lg font-bold focus:outline-[#1B4332]"
                placeholder="Ej: 500"
              />
            </div>
          </div>

          <div className="bg-[#0F172A] text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs text-slate-400 font-mono block">VALOR ESTIMADO A LIQUIDAR:</span>
              <strong className="text-3xl font-mono text-emerald-400 block mt-0.5">
                ${totalEstimado.toLocaleString("es-CO")} COP
              </strong>
              <span className="text-[11px] text-slate-400">
                Tarifa: ${tarifasPorKilo[material].precio.toLocaleString("es-CO")}/kg
              </span>
            </div>

            <a
              href={`https://wa.me/573223989414?text=Hola%20Lubia,%20tengo%20${kilos}%20kg%20de%20${material}%20para%20vender%20en%20patio`}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs uppercase font-mono transition text-center"
            >
              Coordinar Pesaje con Lubia
            </a>
          </div>
        </div>

        {/* COMPRA DE REMATES Y LIQUIDACIONES (5 Columnas) */}
        <div className="lg:col-span-5 bg-[#F5F0E6] rounded-3xl p-8 border border-amber-200 flex flex-col justify-between">
          <div>
            <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase font-mono">
              Compramos Lotes Completos
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-3">
              ¿Su empresa va a cerrar, renovar o rematar inventario?
            </h3>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              Compramos remates industriales a puerta cerrada: racks pesados, transformadores, tubería, maquinaria industrial y estanterías en Bogotá y Cundinamarca.
            </p>

            <div className="space-y-2.5 mt-6 text-xs">
              <div className="bg-white/80 p-3 rounded-xl border border-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Desmonte y cargue por nuestra cuenta en su bodega.</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Pago inmediato contra entrega o pesaje.</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Certificado de disposición final para auditoría.</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-200">
            <a
              href="https://wa.me/573203100664?text=Hola%20Alexander,%20tenemos%20un%20remate/liquidación%20industrial%20para%20ofrecer"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase font-mono flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" /> Hablar con Alexander Torres (Remates)
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}