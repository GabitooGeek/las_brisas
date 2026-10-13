"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  Tag
} from "lucide-react";

export default function ProductoDetallePage() {
  const params = useParams();

  // Estados
  const [cantidad, setCantidad] = useState<number>(200);
  const [trataNIMF15, setTrataNIMF15] = useState<boolean>(true);
  const [vistaEstado, setVistaEstado] = useState<"DESPUES" | "ANTES">("DESPUES");

  // Motor de cálculo de precios
  const calculo = useMemo(() => {
    const qty = Number(cantidad) || 0;
    let baseUnitario = 32000;
    let porcentajeDesc = "0%";
    let tierNombre = "PVP Base (1 a 49 uds)";

    if (qty >= 200) {
      baseUnitario = 27200; // -15%
      porcentajeDesc = "15% OFF";
      tierNombre = "Descuento Industrial (-15%)";
    } else if (qty >= 50) {
      baseUnitario = 29440; // -8%
      porcentajeDesc = "8% OFF";
      tierNombre = "Descuento Mayorista (-8%)";
    }

    const valorTratamiento = trataNIMF15 ? 2500 : 0;
    const precioFinalUnitario = baseUnitario + valorTratamiento;
    const subtotal = qty * precioFinalUnitario;

    return {
      qty,
      baseUnitario,
      valorTratamiento,
      precioFinalUnitario,
      porcentajeDesc,
      tierNombre,
      subtotal,
    };
  }, [cantidad, trataNIMF15]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Migas de pan */}
      <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 mb-6">
        <Link href="/catalogo" className="hover:text-[#1B4332] flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al Catálogo
        </Link>
        <span>/</span>
        <span className="text-slate-400">SKU: EST-MAD-REC-01</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: COMPARADOR VISUAL */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
                Inspección de Restauración en Fontibón
              </span>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setVistaEstado("ANTES")}
                  className={`text-xs px-3 py-1 rounded-lg font-bold transition ${
                    vistaEstado === "ANTES"
                      ? "bg-red-600 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Llegada (Dañada)
                </button>
                <button
                  type="button"
                  onClick={() => setVistaEstado("DESPUES")}
                  className={`text-xs px-3 py-1 rounded-lg font-bold transition ${
                    vistaEstado === "DESPUES"
                      ? "bg-[#1B4332] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Recuperada Grado A
                </button>
              </div>
            </div>
            
            <div className="relative bg-slate-100 rounded-2xl h-80 overflow-hidden border border-slate-200">
              {vistaEstado === "ANTES" ? (
                <div className="h-full flex flex-col justify-between p-6 bg-amber-950/10 text-slate-800">
                  <span className="bg-red-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit uppercase">
                    Llegada a Patio Fontibón: Desajuste estructural
                  </span>
                  <div className="text-center my-auto">
                    <h4 className="font-bold text-lg text-slate-900">Recepción de Pallets Dañados</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                      Lotes recibidos con tablas partidas y tacos flojos para desarme y rectificación en taller.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">Materia prima seleccionada</span>
                </div>
              ) : (
                <div className="h-full relative">
                  <img 
                    src="/images/galeria/estibas_epal_certificadas.jpg" 
                    alt="Estiba Recuperada Grado A Las Brisas" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="bg-[#1B4332] text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded w-fit uppercase mb-1">
                      Resultado Final: Grado A Certificado
                    </span>
                    <h4 className="font-bold text-base">Cepilladas, con tacos macizos y clavo estriado</h4>
                    <p className="text-xs text-slate-300">
                      Garantía estructural probada para montacargas y almacenamiento en rack pesado.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PARÁMETROS DE INGENIERÍA */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-4">
              Especificaciones de Ingeniería Mecánica
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">CARGA ESTÁTICA</span>
                <strong className="text-lg text-slate-900">2,500 kg</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">CARGA DINÁMICA</span>
                <strong className="text-lg text-[#1B4332]">1,200 kg</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">CARGA EN RACK</span>
                <strong className="text-lg text-slate-900">900 kg</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">HUMEDAD MÁX.</span>
                <strong className="text-lg text-slate-900">&lt; 18%</strong>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-slate-600">
                Dimensiones: <strong>1000 × 1200 × 145 mm</strong> (Cuatro Entradas)
              </span>
              <button 
                type="button"
                onClick={() => window.print()}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 transition"
              >
                <FileText className="w-3.5 h-3.5" /> Descargar Ficha Técnica (PDF)
              </button>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: CONFIGURADOR REACTIVO */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs sticky top-24">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">DISPONIBILIDAD INMEDIATA (PATIO)</span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                Estiba Estándar Cuatro Entradas
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Madera Pino Pátula / Eucalipto • Grado A Reacondicionado
              </p>
            </div>

            {/* BOTONES DE PRUEBA RÁPIDA DE VOLUMEN */}
            <div className="my-4">
              <span className="text-xs font-semibold text-slate-600 block mb-2 font-mono">
                Probar Escalas de Volumen:
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setCantidad(30)}
                  className={`p-2 rounded-xl border transition ${
                    calculo.qty < 50
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  30 uds (Base)
                </button>
                <button
                  type="button"
                  onClick={() => setCantidad(100)}
                  className={`p-2 rounded-xl border transition ${
                    calculo.qty >= 50 && calculo.qty < 200
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  100 uds (-8%)
                </button>
                <button
                  type="button"
                  onClick={() => setCantidad(200)}
                  className={`p-2 rounded-xl border transition ${
                    calculo.qty >= 200
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  200 uds (-15%)
                </button>
              </div>
            </div>

            {/* TABLA INFORMATIVA DE TIERS */}
            <div className="space-y-1.5 font-mono text-xs mb-5">
              <div className={`flex justify-between p-2.5 rounded-xl border ${calculo.qty < 50 ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
                <span>Tier 1 (1 - 49 uds):</span>
                <span>$32.000 COP / ud</span>
              </div>
              <div className={`flex justify-between p-2.5 rounded-xl border ${calculo.qty >= 50 && calculo.qty < 200 ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
                <span>Tier 2 (50 - 199 uds):</span>
                <span className="flex items-center gap-1.5">
                  <span className="bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-bold">-8%</span>
                  $29.440 COP / ud
                </span>
              </div>
              <div className={`flex justify-between p-2.5 rounded-xl border ${calculo.qty >= 200 ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
                <span>Tier 3 (200+ uds):</span>
                <span className="flex items-center gap-1.5">
                  <span className="bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-bold">-15%</span>
                  $27.200 COP / ud
                </span>
              </div>
            </div>

            {/* CHECKBOX TRATAMIENTO ICA */}
            <div className="mb-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="flex items-center space-x-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trataNIMF15}
                  onChange={(e) => setTrataNIMF15(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1B4332]"
                />
                <span>Certificación Térmica NIMF 15 / ICA (+ $2.500 COP/ud)</span>
              </label>
            </div>

            {/* INPUT MANUAL DE CANTIDAD */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Escribir cantidad personalizada:
              </label>
              <input
                type="number"
                min="1"
                value={cantidad || ""}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-xl font-mono font-bold text-center text-lg focus:outline-[#1B4332]"
                placeholder="Ej: 200"
              />
            </div>

            {/* RESUMEN DINÁMICO */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl mb-6">
              <div className="flex justify-between text-xs text-emerald-900 mb-1">
                <span>Precio Unitario Liquidado:</span>
                <strong className="font-mono text-sm">${calculo.precioFinalUnitario.toLocaleString("es-CO")} COP</strong>
              </div>
              {calculo.porcentajeDesc !== "0%" && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 mb-2 font-mono">
                  <Tag className="w-3.5 h-3.5" /> {calculo.tierNombre}
                </div>
              )}
              <div className="pt-2 border-t border-emerald-200 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-800 uppercase font-mono">Subtotal ({calculo.qty} uds):</span>
                <span className="text-2xl font-black font-mono text-[#1B4332]">
                  ${calculo.subtotal.toLocaleString("es-CO")} COP
                </span>
              </div>
            </div>

            {/* BOTONES */}
            <div className="space-y-2.5">
              <Link
                href="/checkout"
                className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase text-center block transition shadow-sm"
              >
                Ir a Checkout & Liquidar Flete
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Garantía Estructural 3 meses
              </span>
              <span>Ley 1480 SIC</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}