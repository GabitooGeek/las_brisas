"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Lock, 
  PhoneCall, 
  FileCheck,
  ArrowRight
} from "lucide-react";

interface Esmeralda {
  id: string;
  codigo: string;
  nombre: string;
  tipo: "TALLADA" | "EN_BRUTO" | "LOTE_INVERSION";
  quilates: number;
  origen: "Muzo" | "Chivor" | "Coscuez";
  claridad: "Alta Pureza" | "Verde Fino" | "Pieza Colección";
  precioCop: number;
  precioUsd: number;
}

const ESMERALDAS_DATA: Esmeralda[] = [
  {
    id: "1",
    codigo: "ESM-MUZ-041",
    nombre: "Esmeralda Corte Gota Verde Fino (Certificada)",
    tipo: "TALLADA",
    quilates: 2.85,
    origen: "Muzo",
    claridad: "Verde Fino",
    precioCop: 14500000,
    precioUsd: 3500,
  },
  {
    id: "2",
    codigo: "ESM-CHI-018",
    nombre: "Cristal en Bruto sobre Matriz de Calcita",
    tipo: "EN_BRUTO",
    quilates: 8.20,
    origen: "Chivor",
    claridad: "Pieza Colección",
    precioCop: 22000000,
    precioUsd: 5300,
  },
  {
    id: "3",
    codigo: "ESM-COS-102",
    nombre: "Lote de Inversión 10 Esmeraldas Corte Clásico",
    tipo: "LOTE_INVERSION",
    quilates: 15.40,
    origen: "Coscuez",
    claridad: "Alta Pureza",
    precioCop: 48000000,
    precioUsd: 11600,
  },
];

export default function EsmeraldasPage() {
  const [filtroTipo, setFiltroTipo] = useState<string>("TODOS");

  const esmeraldasFiltradas = ESMERALDAS_DATA.filter((e) => {
    if (filtroTipo !== "TODOS" && e.tipo !== filtroTipo) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Cabecera de Prestigio */}
      <div className="bg-[#0F172A] text-white p-10 rounded-3xl mb-12 border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold px-3 py-1.5 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vigilado Agencia Nacional de Minería • RUCOM Legal</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Esmeraldas Colombianas Certificadas de Origen
          </h1>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Comercialización legal de gemas preciosas de Muzo, Chivor y Coscuez. Piezas en bruto, esmeraldas talladas para alta joyería y lotes de inversión con certificado gemológico y trazabilidad bancaria.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
          <span>✓ Certificado Gemológico CDTEC</span>
          <span>✓ Factura Legal en Dólares (USD) o COP</span>
          <span>✓ Bóveda de Custodia en Bogotá</span>
        </div>
      </div>

      {/* FILTROS POR CATEGORÍA */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 font-mono text-xs">
        {[
          { id: "TODOS", label: "Todas las Gemas" },
          { id: "TALLADA", label: "Esmeraldas Talladas" },
          { id: "EN_BRUTO", label: "Cristales en Bruto" },
          { id: "LOTE_INVERSION", label: "Lotes de Inversión" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltroTipo(f.id)}
            className={`px-4 py-2.5 rounded-xl border transition ${
              filtroTipo === f.id
                ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LISTADO DE ESMERALDAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {esmeraldasFiltradas.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3 text-xs font-mono">
                <span className="text-slate-400">{item.codigo}</span>
                <span className="bg-emerald-50 text-[#1B4332] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                  Mina: {item.origen}
                </span>
              </div>

              <div className="h-40 bg-emerald-950/5 rounded-2xl border border-emerald-100 flex items-center justify-center text-4xl mb-4">
                💎
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-2">
                {item.nombre}
              </h3>

              <div className="space-y-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-xl mb-4">
                <div className="flex justify-between">
                  <span>Peso:</span>
                  <strong>{item.quilates} ct (Quilates)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Calidad:</span>
                  <strong className="text-emerald-800">{item.claridad}</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-baseline mb-3 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">PRECIO COP:</span>
                  <span className="text-lg font-black text-slate-900">
                    ${item.precioCop.toLocaleString("es-CO")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">USD:</span>
                  <span className="text-xs font-bold text-slate-600 font-mono">
                    ${item.precioUsd.toLocaleString("en-US")} USD
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/573203100664?text=Hola%20Alexander,%20solicito%20inspección%20y%20certificado%20de%20la%20esmeralda%20${item.codigo}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition font-mono"
              >
                Solicitar Cita con Alexander Torres (RUCOM)
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}