"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Scale, 
  FileText 
} from "lucide-react";

type ZonaLogistica = "BOGOTA" | "SABANA_OCCIDENTE" | "SABANA_NORTE" | "NACIONAL";

export default function HomePage() {
  const [cantidad, setCantidad] = useState<number>(180);
  const [zona, setZona] = useState<ZonaLogistica>("SABANA_OCCIDENTE");
  const [conNIMF15, setConNIMF15] = useState<boolean>(true);

  // Escala de precios por volumen
  const { precioUnitario, vehiculo, flete, subtotal, iva, total } = useMemo(() => {
    let precio = 32000;
    if (cantidad >= 200) {
      precio = 27200; // -15%
    } else if (cantidad >= 50) {
      precio = 29440; // -8%
    }

    if (conNIMF15) {
      precio += 2500; // Recargo tratamiento térmico ICA
    }

    // Selección de vehículo según carga
    let veh = "CAMIÓN TURBO (Hasta 220 uds)";
    let fleteBase = 180000;

    if (cantidad <= 220) {
      veh = "CAMIÓN TURBO (Hasta 220 uds)";
      fleteBase = zona === "BOGOTA" ? 180000 : zona === "SABANA_OCCIDENTE" ? 240000 : zona === "SABANA_NORTE" ? 280000 : 850000;
    } else if (cantidad <= 420) {
      veh = "CAMIÓN SENCILLO (Hasta 420 uds)";
      fleteBase = zona === "BOGOTA" ? 260000 : zona === "SABANA_OCCIDENTE" ? 340000 : zona === "SABANA_NORTE" ? 390000 : 1400000;
    } else {
      veh = "TRACTOMULA (Lote Industrial)";
      fleteBase = zona === "BOGOTA" ? 650000 : zona === "SABANA_OCCIDENTE" ? 800000 : zona === "SABANA_NORTE" ? 950000 : 3200000;
    }

    const sub = (cantidad * precio) + fleteBase;
    const impuesto = Math.round(sub * 0.19);
    const tot = sub + impuesto;

    return {
      precioUnitario: precio,
      vehiculo: veh,
      flete: fleteBase,
      subtotal: sub,
      iva: impuesto,
      total: tot,
    };
  }, [cantidad, zona, conNIMF15]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-[#1B4332] text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          <span>🌱 Economía Circular Industrial</span>
          <span>•</span>
          <span>Corredor Logístico Fontibón</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
          Infraestructura en Madera y Estibas para la Cadena de Suministro Nacional.
        </h1>
        <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
          Comercialización mayorista de estibas nuevas y reacondicionadas Grado A, maderas dimensionadas y contenedores plásticos. Despachos inmediatos desde Fontibón hacia Bogotá, Sabana y corredores industriales.
        </p>
      </div>

      {/* 2. BENTO GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* BENTO 1: COTIZADOR EXPRESS INTERACTIVO (2 Columnas) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-amber-600 tracking-wider">
                  Módulo Interactivo en Vivo
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Simulador de Pedido & Flete de Carga Pesada
                </h2>
              </div>
              <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-3 py-1 rounded-full font-mono font-semibold">
                Salida: Patio Fontibón
              </span>
            </div>

            {/* Slider de Cantidad */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Cantidad de Estibas: <strong className="text-[#1B4332] font-mono text-base">{cantidad} unidades</strong>
                </label>
                <span className="text-xs font-mono text-slate-500">
                  ${precioUnitario.toLocaleString("es-CO")} COP / ud
                </span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="600" 
                step="10" 
                value={cantidad} 
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1B4332]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                <span>20 (Menudeo)</span>
                <span>50 (-8% Mayorista)</span>
                <span>200 (-15% Industrial)</span>
                <span>500+ (Tractomula)</span>
              </div>
            </div>

            {/* Selector de Destino y Norma */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                  Destino de Entrega:
                </label>
                <select 
                  value={zona} 
                  onChange={(e) => setZona(e.target.value as ZonaLogistica)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800 focus:outline-[#1B4332]"
                >
                  <option value="BOGOTA">Bogotá Urbana (Zona Industrial / Américas)</option>
                  <option value="SABANA_OCCIDENTE">Sabana Occidente (Mosquera / Funza / Madrid)</option>
                  <option value="SABANA_NORTE">Sabana Norte (Cota / Chía / Siberia)</option>
                  <option value="NACIONAL">Corredor Nacional (Troncal)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                  Tratamiento Fitosanitario:
                </label>
                <label className="flex items-center h-[46px] px-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={conNIMF15} 
                    onChange={(e) => setConNIMF15(e.target.checked)}
                    className="w-4 h-4 accent-[#1B4332] rounded"
                  />
                  <span className="ml-2.5 text-xs font-semibold text-slate-700">
                    Sello ICA NIMF 15 (Exportación)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Resultado Financiero */}
          <div className="bg-[#0F172A] text-white rounded-2xl p-6 mt-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                  <span>Flota: <strong className="text-amber-400">{vehiculo}</strong></span>
                  <span>•</span>
                  <span>Flete: ${flete.toLocaleString("es-CO")}</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                  ${total.toLocaleString("es-CO")} COP
                </div>
                <span className="text-[11px] text-slate-400">
                  Incluye IVA (19%) y Factura Electrónica DIAN
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs tracking-wide transition text-center shadow-sm"
              >
                Bloquear Precio y Pagar con PSE
              </Link>
            </div>
          </div>
        </div>

        {/* BENTO 2: CALIDAD GRADO A */}
        <div className="bg-[#F5F0E6] rounded-3xl p-8 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="bg-amber-200 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
              Control de Patio
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-4">
              Estiba Estándar Reacondicionada
            </h3>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              Pallets recuperados Grado A seleccionados por resistencia. Hasta 40% de ahorro frente a madera virgen.
            </p>

            <div className="space-y-2.5 mt-6 font-mono text-xs">
              <div className="bg-white/90 p-3 rounded-xl border border-amber-200/50 flex justify-between items-center">
                <span className="text-slate-600">Carga Dinámica:</span>
                <strong className="text-slate-900">1,200 kg</strong>
              </div>
              <div className="bg-white/90 p-3 rounded-xl border border-amber-200/50 flex justify-between items-center">
                <span className="text-slate-600">Carga Estática:</span>
                <strong className="text-slate-900">2,500 kg</strong>
              </div>
              <div className="bg-white/90 p-3 rounded-xl border border-amber-200/50 flex justify-between items-center">
                <span className="text-slate-600">Fijación:</span>
                <strong className="text-slate-900">Clavo Helicoidal</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-amber-200">
            <div className="flex items-center space-x-2 text-[#1B4332] text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Taller propio de armado en Fontibón</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BENTO GRID INFERIOR: SERVICIOS Y CUMPLIMIENTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center space-x-2 text-[#1B4332] font-bold mb-2">
            <RefreshCw className="w-5 h-5 text-amber-600" />
            <h4 className="text-base text-slate-900">Taller de Retoma de Estibas</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Recogemos pallets rotos en centros de distribución de clientes. Diagnóstico y reparación con entrega certificada.
          </p>
          <Link href="/retoma-taller" className="text-xs font-bold text-[#1B4332] mt-3 inline-flex items-center gap-1 hover:underline">
            Solicitar recogida de patio <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center space-x-2 text-[#1B4332] font-bold mb-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <h4 className="text-base text-slate-900">Maderas Dimensionadas</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tablas, listones y polines en pino pátula y eucalipto aserrados con medidas exactas para embalaje y construcción.
          </p>
          <Link href="/cubicador" className="text-xs font-bold text-[#1B4332] mt-3 inline-flex items-center gap-1 hover:underline">
            Usar calculadora de cubicaje <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#1B4332] font-bold mb-2">
              <Scale className="w-5 h-5 text-blue-700" />
              <h4 className="text-base text-slate-900">Garantía SIC & Facturación</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cumplimiento de la Ley 1480 de 2011, derecho de retracto en 5 días y factura electrónica con CUFE y QR.
            </p>
          </div>
          <div className="text-[11px] font-mono text-emerald-800 font-bold mt-4 pt-3 border-t border-slate-100">
            ✓ Facturación DIAN UBL 2.1
          </div>
        </div>

      </div>

    </div>
  );
}