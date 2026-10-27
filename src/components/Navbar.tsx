"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import { useCart } from "@/context/CartContext";
import { Menu, X, ShoppingCart, Phone, Calculator, Flame, Scale, Layers } from "lucide-react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { totalItems, setDrawerAbierto } = useCart();

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center gap-3">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2.5 shrink-0">
          <Logo className="w-9 h-9 sm:w-11 sm:h-11" />
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A] block leading-none">
              LAS BRISAS
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 block mt-0.5">
              Maderas • Metales • Gemas
            </span>
          </div>
        </Link>

        {/* BÚSQUEDA EN PC */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <SearchBar />
        </div>

        {/* MENÚ PC (CADA UNO EN SU CASILLA SEPARADA) */}
        <nav className="hidden xl:flex items-center space-x-5 text-xs font-bold uppercase tracking-wider text-slate-700 shrink-0">
          <Link href="/catalogo" className="hover:text-[#1B4332] transition whitespace-nowrap">
            Estibas & Madera
          </Link>

          <Link href="/acabados" className="text-amber-800 hover:text-amber-900 transition whitespace-nowrap">
            Acabados & Muebles
          </Link>

          <Link href="/metales-remates" className="text-slate-800 hover:text-amber-800 transition whitespace-nowrap">
            Metales & Remates
          </Link>

          {/* CASILLA 1: ESMERALDAS */}
          <Link href="/esmeraldas" className="text-emerald-800 hover:text-emerald-950 transition flex items-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M6 3h12l4 7-10 11L2 10l4-7z" fill="#10B981" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M2 10h20M12 21L8 10l4-7 4 7-4 11z" stroke="#065F46" strokeWidth="1.2" opacity="0.6"/>
              <path d="M6 3l2 7M18 3l-2 7" stroke="#6EE7B7" strokeWidth="1.2" opacity="0.9"/>
            </svg>
            <span>Esmeraldas</span>
          </Link>

          {/* CASILLA 2: CUBICADOR (COMPLETAMENTE SEPARADA) */}
          <Link href="/cubicador" className="hover:text-[#1B4332] transition whitespace-nowrap">
            Cubicador
          </Link>
        </nav>

        {/* ACCIONES DE LA DERECHA (CARRITO + BOTÓN MÓVIL) */}
        <div className="flex items-center space-x-2 shrink-0">
          
          <button
            type="button"
            onClick={() => setDrawerAbierto(true)}
            className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#1B4332] hover:bg-[#143326] text-white transition flex items-center gap-2 shadow-xs group"
            aria-label="Ver Carrito de Compras"
          >
            <ShoppingCart className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
            <span className="hidden sm:inline font-bold text-xs">
              Carrito
            </span>
            {totalItems > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[11px] font-mono font-black min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          {/* BOTÓN HAMBURGUESA EN CELULARES */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Abrir Menú"
          >
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* BÚSQUEDA EN CELULARES */}
      <div className="md:hidden px-4 pb-2.5">
        <SearchBar />
      </div>

      {/* MENÚ MÓVIL EN ANDROID (CADA SECCIÓN TIENE SU PROPIA CASILLA SEPARADA) */}
      {menuAbierto && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-2.5 shadow-2xl animate-fade-in text-xs font-bold text-slate-800">
          
          <Link
            href="/catalogo"
            onClick={() => setMenuAbierto(false)}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-emerald-50 text-slate-900"
          >
            <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Estibas & Maderas Dimensionadas</span>
          </Link>

          <Link
            href="/acabados"
            onClick={() => setMenuAbierto(false)}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-amber-50 text-amber-900"
          >
            <Flame className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Acabados en Madera & Mobiliario Rústico</span>
          </Link>

          <Link
            href="/metales-remates"
            onClick={() => setMenuAbierto(false)}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-amber-50 text-slate-900"
          >
            <Scale className="w-4 h-4 text-slate-700 shrink-0" />
            <span>Compra de Metales, Cobre & Remates</span>
          </Link>

          {/* CASILLA EXCLUSIVA ESMERALDAS */}
          <Link
            href="/esmeraldas"
            onClick={() => setMenuAbierto(false)}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-900"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M6 3h12l4 7-10 11L2 10l4-7z" fill="#10B981" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M2 10h20M12 21L8 10l4-7 4 7-4 11z" stroke="#065F46" strokeWidth="1.2" opacity="0.6"/>
            </svg>
            <span>Esmeraldas Colombianas Certificadas (RUCOM)</span>
          </Link>

          {/* CASILLA EXCLUSIVA CALCULADORA (SEPARADA) */}
          <Link
            href="/cubicador"
            onClick={() => setMenuAbierto(false)}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700"
          >
            <Calculator className="w-4 h-4 text-[#1B4332] shrink-0" />
            <span>Calculadora de Cubicaje de Maderas (m³)</span>
          </Link>

          <div className="pt-3 border-t border-slate-100 space-y-2 font-mono text-xs">
            <button
              onClick={() => {
                setMenuAbierto(false);
                setDrawerAbierto(true);
              }}
              className="w-full bg-[#1B4332] text-white py-3 rounded-xl block text-center font-bold"
            >
              Ver Carrito ({totalItems} items)
            </button>
            <a
              href="tel:3203100664"
              className="w-full bg-slate-100 text-slate-800 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" /> Alexander Torres: 320 310 0664
            </a>
          </div>

        </div>
      )}
    </header>
  );
}