"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";

interface ItemBusqueda {
  nombre: string;
  categoria: string;
  url: string;
  precio?: string;
  badge: string;
}

const INDICE_BUSQUEDA: ItemBusqueda[] = [
  // Maderas y Estibas
  { nombre: "Estiba Madera Estándar Taco Reforzado Grado A", categoria: "Estibas", url: "/producto/estiba-estandar-madera-recuperada-a", precio: "$27.200 COP", badge: "Madera" },
  { nombre: "Estiba Europea EPAL Certificada NIMF 15", categoria: "Estibas", url: "/catalogo", precio: "$38.000 COP", badge: "Exportación" },
  { nombre: "Estiba Plástica HDPE para Cuarto Frío / Rack", categoria: "Plásticos", url: "/catalogo", precio: "$110.000 COP", badge: "Plástico" },
  { nombre: "Canecas Plásticas Industriales 55 Galones", categoria: "Contenedores", url: "/catalogo", precio: "$75.000 COP", badge: "Tambores" },
  { nombre: "Postes y Estacones Inmunizados con Punta para Cercas", categoria: "Maderas", url: "/catalogo", precio: "$24.000 COP", badge: "Fincas" },
  { nombre: "Tablas y Listonería en Pino / Eucalipto Dimensionado", categoria: "Maderas", url: "/cubicador", precio: "A la medida", badge: "Cubicaje" },
  
  // Acabados y Muebles
  { nombre: "Centro de Entretenimiento Modular en Madera Flameada", categoria: "Mobiliario", url: "/acabados", precio: "$1.450.000 COP", badge: "Acabados" },
  { nombre: "Mesas Tipo Picnic Reforzadas para Fincas & Restaurantes", categoria: "Mobiliario", url: "/acabados", precio: "$680.000 COP", badge: "Rústico" },
  { nombre: "Sillas / Bancas de Bar Rústicas con Tapizado", categoria: "Mobiliario", url: "/acabados", precio: "$140.000 COP", badge: "Comercial" },
  { nombre: "Casetas Campestres y Módulos Rústicos de Madera", categoria: "Obras", url: "/acabados", precio: "$4.200.000 COP", badge: "Cabañas" },

  // Metales y Remates
  { nombre: "Compra de Cobre de Primera al Peso", categoria: "Metales", url: "/metales-remates", precio: "$34.000/kg", badge: "Metales" },
  { nombre: "Compra de Aluminio, Chatarra y Hierro Pesado", categoria: "Metales", url: "/metales-remates", precio: "Báscula Patio", badge: "Chatarra" },
  { nombre: "Remates Industriales, Maquinaria y Liquidación de Bodegas", categoria: "Remates", url: "/metales-remates", precio: "Lote Cerrado", badge: "Remates" },

  // Esmeraldas
  { nombre: "Esmeraldas Colombianas Certificadas (Muzo / Chivor)", categoria: "Gemas", url: "/esmeraldas", precio: "Desde $14.5M COP", badge: "RUCOM" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [abierto, setAbierto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtro en tiempo real
  const resultados = query.trim().length >= 2
    ? INDICE_BUSQUEDA.filter((item) =>
        item.nombre.toLowerCase().includes(query.toLowerCase()) ||
        item.categoria.toLowerCase().includes(query.toLowerCase()) ||
        item.badge.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xs md:max-w-sm lg:max-w-md font-sans">
      
      {/* CAMPO DE ENTRADA */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setAbierto(true);
          }}
          onFocus={() => setAbierto(true)}
          placeholder="Buscar..."
          className="w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-slate-200 focus:border-[#1B4332] rounded-full py-2 pl-9 pr-8 text-xs font-medium text-slate-800 focus:outline-none transition"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setAbierto(false);
            }}
            className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* MENÚ DESPLEGABLE PREDICTIVO */}
      {abierto && query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in max-h-80 overflow-y-auto">
          {resultados.length > 0 ? (
            <div className="p-2 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                Resultados encontrados ({resultados.length}):
              </span>
              {resultados.map((res, index) => (
                <Link
                  key={index}
                  href={res.url}
                  onClick={() => {
                    setAbierto(false);
                    setQuery("");
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between transition group"
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {res.badge}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {res.categoria}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-800 group-hover:text-[#1B4332] leading-tight">
                      {res.nombre}
                    </h5>
                  </div>
                  {res.precio && (
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-[#1B4332] block">
                        {res.precio}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-5 text-center text-xs text-slate-500">
              No se encontraron productos para <strong className="text-slate-800">"{query}"</strong>.
              <p className="text-[11px] text-slate-400 mt-1">
                Intente con: <em>estiba</em>, <em>cobre</em>, <em>postes</em>, <em>mesas</em> o <em>esmeraldas</em>.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}