"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, PhoneCall, Layers, CheckCircle, ArrowRight } from "lucide-react";

export default function CubicadorPage() {
  const [largo, setLargo] = useState<number>(3.0);       // Metros
  const [ancho, setAncho] = useState<number>(15.0);     // Centímetros
  const [espesor, setEspesor] = useState<number>(1.0);   // Pulgadas
  const [piezas, setPiezas] = useState<number>(100);     // Cantidad

  // Cálculo en tiempo real
  const resultado = useMemo(() => {
    const l = Number(largo) || 0;
    const a = Number(ancho) || 0;
    const e = Number(espesor) || 0;
    const p = Number(piezas) || 0;

    // 1 pulgada = 2.54 cm -> Conversión a m3
    const espesorMetros = (e * 2.54) / 100;
    const anchoMetros = a / 100;
    const volumenUnitarioM3 = l * anchoMetros * espesorMetros;
    const m3Total = Number((volumenUnitarioM3 * p).toFixed(4));
    
    // 1 m3 = ~423.776 Pies Tablares (PT)
    const ptTotal = Math.round(m3Total * 423.776);

    return {
      m3Total,
      ptTotal,
    };
  }, [largo, ancho, espesor, piezas]);

  // Presets estándar
  const aplicarPreset = (l: number, a: number, e: number, p: number) => {
    setLargo(l);
    setAncho(a);
    setEspesor(e);
    setPiezas(p);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      
      {/* Cabecera */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
          Herramienta Técnica • Patio Fontibón
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
          Calculadora de Cubicaje de Maderas Dimensionadas
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Calcule metros cúbicos ($m^3$) y pies tablares ($PT$) para pedidos de pino pátula y eucalipto aserrado.
        </p>
      </div>

      {/* BOTONES DE CORTES ESTÁNDAR */}
      <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-xs font-mono font-semibold text-slate-500 uppercase block mb-2">
          Cortes Típicos Industriales (Un Clic):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => aplicarPreset(3.0, 15.0, 1.0, 100)}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-left"
          >
            📏 <strong>Tabla Estándar</strong> (3m × 15cm × 1")
          </button>
          <button
            type="button"
            onClick={() => aplicarPreset(3.0, 5.0, 2.0, 80)}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-left"
          >
            🪵 <strong>Listón Estructural</strong> (3m × 5cm × 2")
          </button>
          <button
            type="button"
            onClick={() => aplicarPreset(2.5, 10.0, 4.0, 50)}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-left"
          >
            🧱 <strong>Polín / Taco Pesado</strong> (2.5m × 10cm × 4")
          </button>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL: INPUTS + RESULTADOS */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ENTRADA DE DIMENSIONES */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Calculator className="w-5 h-5 text-[#1B4332]" />
            <h2 className="font-bold text-slate-900 text-base">Medidas de la Pieza</h2>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Largo de la pieza (Metros):
            </label>
            <input
              type="number"
              step="0.1"
              value={largo || ""}
              onChange={(e) => setLargo(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              placeholder="Ej: 3.0"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Ancho de la cara (Centímetros):
            </label>
            <input
              type="number"
              step="0.5"
              value={ancho || ""}
              onChange={(e) => setAncho(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              placeholder="Ej: 15.0"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Grosor o Espesor (Pulgadas):
            </label>
            <input
              type="number"
              step="0.25"
              value={espesor || ""}
              onChange={(e) => setEspesor(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              placeholder="Ej: 1.0"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Cantidad total de piezas:
            </label>
            <input
              type="number"
              min="1"
              value={piezas || ""}
              onChange={(e) => setPiezas(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              placeholder="Ej: 100"
            />
          </div>
        </div>

        {/* RESULTADOS TÉCNICOS Y ATENCIÓN */}
        <div className="bg-[#0F172A] text-white p-7 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
              Volumen Total Consolidado
            </span>

            <div className="my-6 space-y-4">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-mono">METROS CÚBICOS TOTALES:</span>
                <span className="text-4xl font-extrabold font-mono text-emerald-400">
                  {resultado.m3Total} m³
                </span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-mono">PIES TABLARES EQUIVALENTES:</span>
                <span className="text-2xl font-bold font-mono text-slate-200">
                  {resultado.ptTotal.toLocaleString("es-CO")} PT
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              *Maderas disponibles en verde o secadas al aire. Se entrega cortada a la medida en patio Fontibón.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 mt-4">
            <a
              href={`https://wa.me/573223989414?text=Hola%20Lubia,%20cotizo%20un%20volumen%20de%20${resultado.m3Total}%20m3%20(${resultado.ptTotal}%20PT)%20de%20madera`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" /> Cotizar con Lubia (322 398 9414)
            </a>
            <a
              href={`https://wa.me/573203100664?text=Hola%20Alexander,%20tengo%20un%20pedido%20de%20${resultado.m3Total}%20m3%20para%20despacho%20en%20patio`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Consultar Patio con Alexander (320 310 0664)
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}