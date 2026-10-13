"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Truck, 
  PackageCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Search,
  Building2
} from "lucide-react";

interface PedidoPatio {
  id: string;
  consecutivo: string;
  cliente: string;
  nit: string;
  cantidad: number;
  producto: string;
  destino: string;
  vehiculo: "TURBO" | "SENCILLO" | "TRACTOMULA";
  estado: "PENDIENTE_ALISTAMIENTO" | "EN_CARGUE" | "DESPACHADO";
  cufeDian: string;
  total: number;
}

const PEDIDOS_INICIALES: PedidoPatio[] = [
  {
    id: "1",
    consecutivo: "LB-2026-001048",
    cliente: "LOGÍSTICA Y ALMACENAMIENTO ANDINO SAS",
    nit: "901.458.789-4",
    cantidad: 150,
    producto: "Estiba Estándar Reacondicionada Grado A (Con Sello ICA)",
    destino: "Funza, Cundinamarca (Parque Ind. San Carlos)",
    vehiculo: "SENCILLO",
    estado: "PENDIENTE_ALISTAMIENTO",
    cufeDian: "a8f9c17e4b9012356d817452093847562819401726...",
    total: 5549240,
  },
  {
    id: "2",
    consecutivo: "LB-2026-001047",
    cliente: "ALMACENES Y DISTRIBUCIONES DE LA SABANA",
    nit: "830.112.455-1",
    cantidad: 80,
    producto: "Listones Pino Dimensionado (3m × 5cm × 2\")",
    destino: "Mosquera, Cundinamarca",
    vehiculo: "TURBO",
    estado: "EN_CARGUE",
    cufeDian: "c4b1a890ef123456789012345678901234567890...",
    total: 1890000,
  },
  {
    id: "3",
    consecutivo: "LB-2026-001046",
    cliente: "CARROCERÍAS Y EMPAQUES INDUSTRIALES SAS",
    nit: "900.874.120-8",
    cantidad: 300,
    producto: "Estiba Nueva Pino Pátula Industrial",
    destino: "Cota, Cundinamarca (Siberia)",
    vehiculo: "SENCILLO",
    estado: "DESPACHADO",
    cufeDian: "e901234567890123456789012345678901234567...",
    total: 11450000,
  },
];

export default function AdminPatioPage() {
  const [pedidos, setPedidos] = useState<PedidoPatio[]>(PEDIDOS_INICIALES);
  const [filtro, setFiltro] = useState<string>("TODOS");

  const cambiarEstado = (id: string, nuevoEstado: PedidoPatio["estado"]) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Cabecera del Panel Operativo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
            Control de Patio Fontibón • Uso Exclusivo
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Mesa de Alistamiento & Despachos de Carga
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Gerencia General & Despachos: Alexander Torres (Propietario)
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-100 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span>Turno Operativo: Activo</span>
        </div>
      </div>

      {/* MÉTRICAS RÁPIDAS DE PATIO */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-mono">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block">ESTIBAS POR ALISTAR HOY:</span>
          <strong className="text-3xl text-amber-600 block mt-1">230 uds</strong>
          <span className="text-[11px] text-slate-400">2 viajes programados</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block">CAMIONES EN PATIO FONTIBÓN:</span>
          <strong className="text-3xl text-emerald-700 block mt-1">1 Turbo • 1 Sencillo</strong>
          <span className="text-[11px] text-slate-400">Av. Calle 24 #128-15</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block">FACTURAS DIAN VALIDADAS:</span>
          <strong className="text-3xl text-slate-900 block mt-1">100% Timbrado</strong>
          <span className="text-[11px] text-emerald-700 font-bold">Sin inconsistencias CUFE</span>
        </div>
      </div>

      {/* LISTA DE PEDIDOS PARA DESPACHO */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Órdenes Transaccionales Pendientes de Despacho
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {pedidos.map((ped) => (
            <div
              key={ped.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
              {/* Información de la Orden */}
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center space-x-2">
                  <span className="bg-[#1B4332] text-white text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg">
                    {ped.consecutivo}
                  </span>
                  <span className="text-xs font-mono text-slate-400">NIT: {ped.nit}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                    ped.estado === "PENDIENTE_ALISTAMIENTO"
                      ? "bg-amber-100 text-amber-900"
                      : ped.estado === "EN_CARGUE"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-emerald-100 text-emerald-900"
                  }`}>
                    {ped.estado.replace("_", " ")}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-600" />
                  {ped.cliente}
                </h3>

                <p className="text-xs text-slate-600">
                  Carga: <strong>{ped.cantidad} uds</strong> — {ped.producto}
                </p>

                <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" /> {ped.destino}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-[#1B4332]">
                    <Truck className="w-3.5 h-3.5" /> Vehículo: {ped.vehiculo}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-slate-400 truncate max-w-md">
                  CUFE DIAN: {ped.cufeDian}
                </div>
              </div>

              {/* Botones de Operación de Patio */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                <div className="text-right lg:text-right font-mono mb-1">
                  <span className="text-[10px] text-slate-400 block">TOTAL FACTURADO:</span>
                  <span className="text-lg font-black text-slate-900">
                    ${ped.total.toLocaleString("es-CO")} COP
                  </span>
                </div>

                {ped.estado === "PENDIENTE_ALISTAMIENTO" && (
                  <button
                    onClick={() => cambiarEstado(ped.id, "EN_CARGUE")}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition font-mono"
                  >
                    Iniciar Cargue en Camión
                  </button>
                )}

                {ped.estado === "EN_CARGUE" && (
                  <button
                    onClick={() => cambiarEstado(ped.id, "DESPACHADO")}
                    className="bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition font-mono"
                  >
                    Dar Salida a Despacho
                  </button>
                )}

                {ped.estado === "DESPACHADO" && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Guía Entregada a Chofer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}