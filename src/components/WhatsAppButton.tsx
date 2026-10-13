"use client";

import React, { useState } from "react";
import { MessageCircle, X, PhoneCall } from "lucide-react";

export default function WhatsAppButton() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* MENÚ DESPLEGABLE CON LOS DOS ASESORES */}
      {abierto && (
        <div className="mb-3 bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 w-80 animate-fade-in text-slate-800">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                Atención en Línea
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">¿Con quién desea hablar?</h4>
            </div>
            <button 
              onClick={() => setAbierto(false)} 
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-500 my-3">
            Escríbanos directamente por WhatsApp a nuestras líneas de patio en Fontibón:
          </p>

          <div className="space-y-2">
            {/* LUBIA VINCHIRA */}
            <a
              href="https://wa.me/573223989414?text=Hola%20Lubia,%20vi%20la%20página%20de%20Las%20Brisas%20y%20deseo%20una%20cotización"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center gap-3 transition group"
            >
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                LV
              </div>
              <div className="flex-1">
                <span className="font-bold text-xs text-slate-900 block group-hover:text-emerald-800">
                  Lubia Vinchira
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Ventas, Maderas & Facturación DIAN
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-0.5">
                  322 398 9414
                </span>
              </div>
            </a>

            {/* ALEXANDER TORRES */}
            <a
              href="https://wa.me/573203100664?text=Hola%20Alexander,%20vi%20la%20página%20de%20Las%20Brisas%20y%20deseo%20consultar%20sobre%20patio/despachos"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center gap-3 transition group"
            >
              <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                AT
              </div>
              <div className="flex-1">
                <span className="font-bold text-xs text-slate-900 block group-hover:text-amber-900">
                  Alexander Torres
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Patio Fontibón, Flota & Remates
                </span>
                <span className="text-[10px] font-mono text-amber-800 font-bold block mt-0.5">
                  320 310 0664
                </span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* BOTÓN PRINCIPAL VERDE DE WHATSAPP */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition hover:scale-105 active:scale-95 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
          Chat Las Brisas
        </span>
      </button>

    </div>
  );
}