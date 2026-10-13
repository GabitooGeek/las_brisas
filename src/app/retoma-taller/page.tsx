"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  RefreshCw, 
  Truck, 
  TreePine, 
  CheckCircle2, 
  PhoneCall, 
  Building2, 
  Wrench, 
  DollarSign 
} from "lucide-react";

export default function RetomaTallerPage() {
  const [servicio, setServicio] = useState<"VENTA" | "REPARACION">("VENTA");
  const [tipoPallet, setTipoPallet] = useState<string>("MADERA");
  const [cantidad, setCantidad] = useState<number>(250);
  const [ciudad, setCiudad] = useState<string>("Bogotá D.C. (Zona Industrial / Fontibón)");
  const [enviado, setEnviado] = useState<boolean>(false);

  // Estimación de impacto de economía circular
  const impacto = {
    co2Evitado: Math.round(cantidad * 18.5), // ~18.5 kg CO2 ahorrados por estiba recuperada
    arbolesSalvados: (cantidad * 0.08).toFixed(1), // ~0.08 árbol salvado por pallet de pino
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      
      {/* Cabecera */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
          Economía Circular • Taller Fontibón
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
          Retoma, Compra y Reparación de Pallets Industriales
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          ¿Tiene estibas rotas o acumuladas en su centro de distribución? Nosotros las compramos en patio o las reacondicionamos para que vuelvan a su operación a menor costo.
        </p>
      </div>

      {/* METRICAS DE IMPACTO AMBIENTAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 font-mono">
        <div className="bg-[#1B4332] text-white p-5 rounded-2xl border border-emerald-900">
          <span className="text-[10px] text-emerald-300 uppercase block">HUELLA DE CARBONO EVITADA</span>
          <strong className="text-2xl text-emerald-200 block mt-1">~{impacto.co2Evitado} kg CO₂ eq</strong>
          <span className="text-[11px] text-emerald-300/80">Por recuperar {cantidad} estibas</span>
        </div>

        <div className="bg-[#0F172A] text-white p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-amber-400 uppercase block">CONSERVACIÓN FORESTAL</span>
          <strong className="text-2xl text-amber-300 block mt-1">~{impacto.arbolesSalvados} Árboles</strong>
          <span className="text-[11px] text-slate-400">Madera virgen no talada</span>
        </div>

        <div className="bg-amber-50 text-amber-950 p-5 rounded-2xl border border-amber-200">
          <span className="text-[10px] text-amber-800 uppercase block">AHORRO OPERACIONAL ESTIMADO</span>
          <strong className="text-2xl text-amber-900 block mt-1">Hasta 45% Menos</strong>
          <span className="text-[11px] text-amber-800/80">Frente a comprar pallets nuevos</span>
        </div>
      </div>

      {enviado ? (
        /* CONFIRMACIÓN */
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 text-center space-y-4 shadow-xs">
          <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-extrabold text-slate-900">
            ¡Solicitud de Retoma Recibida en Patio!
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            El equipo de operaciones de Las Brisas coordinará la inspección o programación del camión para la recogida de las <strong>{cantidad} estibas</strong> en su bodega.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/573203100664?text=Hola%20Alexander,%20acabo%20de%20solicitar%20en%20la%20web%20la%20recogida/reparación%20de%20${cantidad}%20estibas`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" /> Hablar con Alexander Torres (Patio)
            </a>
            <Link
              href="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-3 px-6 rounded-xl transition"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      ) : (
        /* FORMULARIO DE RETOMA */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Modalidad del Servicio */}
          <div>
            <label className="text-xs font-mono uppercase font-bold text-slate-700 block mb-2">
              Seleccione la Operación Requerida:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServicio("VENTA")}
                className={`p-4 rounded-2xl border text-left transition ${
                  servicio === "VENTA"
                    ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs">Deseo Vender mi Lote Dañado</span>
                </div>
                <span className="text-[11px] font-normal text-slate-500 block">
                  Las Brisas compra su lote y lo retira en su empresa.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setServicio("REPARACION")}
                className={`p-4 rounded-2xl border text-left transition ${
                  servicio === "REPARACION"
                    ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-4 h-4 text-amber-700" />
                  <span className="text-xs">Servicio de Taller / Reparación</span>
                </div>
                <span className="text-[11px] font-normal text-slate-500 block">
                  Reacondicionamos sus pallets y se los devolvemos como nuevos.
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Tipo de Material:
              </label>
              <select
                value={tipoPallet}
                onChange={(e) => setTipoPallet(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-[#1B4332]"
              >
                <option value="MADERA">Estibas de Madera (Pino/Eucalipto)</option>
                <option value="PLASTICO">Estibas Plásticas (HDPE)</option>
                <option value="MIXTO">Lote Mixto</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Cantidad Aproximada:
              </label>
              <input
                type="number"
                min="20"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono font-bold focus:outline-[#1B4332]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Ciudad o Zona de la Bodega:
              </label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-[#1B4332]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nombre de la Empresa o Contacto:
              </label>
              <input
                required
                type="text"
                placeholder="Ej: Bodegas San Carlos"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-[#1B4332]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Teléfono / WhatsApp de Coordinación:
              </label>
              <input
                required
                type="text"
                placeholder="Ej: 310 123 4567"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#1B4332] shrink-0" />
            <span>
              Contamos con camiones <strong>Turbo y Sencillos</strong> con base en Fontibón para recoger lotes superiores a 50 unidades en toda la Sabana.
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm font-mono"
          >
            Solicitar Inspección o Recogida en Bodega
          </button>
        </form>
      )}

    </div>
  );
}