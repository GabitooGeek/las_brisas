"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import { Menu, X, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-xs">
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

        {/* BARRA DE BÚSQUEDA (TABLET / PC) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <SearchBar />
        </div>

        {/* MENÚ PC */}
        <nav className="hidden xl:flex items-center space-x-5 text-xs font-bold uppercase tracking-wider text-slate-700 shrink-0">
          <Link href="/catalogo" className="hover:text-[#1B4332] transition">
            Estibas & Madera
          </Link>
          <Link href="/acabados" className="text-amber-800 hover:text-amber-900 transition">
            Acabados & Muebles
          </Link>
          <Link href="/metales-remates" className="text-slate-800 hover:text-amber-800 transition">
            Metales & Remates
          </Link>
          <Link href="/esmeraldas" className="text-emerald-800 hover:text-emerald-900 transition">
            💎 Esmeraldas
          </Link>
          <Link href="/cubicador" className="hover:text-[#1B4332] transition">
            Cubicador
          </Link>
        </nav>

        {/* ACCIONES Y BOTÓN HAMBURGUESA EN MÓVIL */}
        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/checkout"
            className="hidden sm:inline-block bg-[#1B4332] hover:bg-[#143326] text-white px-3.5 py-2 rounded-xl font-bold text-xs transition"
          >
            Checkout
          </Link>

          {/* BOTÓN HAMBURGUESA (SOLO EN CELULARES) */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Abrir Menú"
          >
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* BARRA DE BÚSQUEDA EN CELULARES */}
      <div className="md:hidden px-4 pb-2.5">
        <SearchBar />
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL (DRAWER EN ANDROID) */}
      {menuAbierto && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 py-6 space-y-4 shadow-2xl animate-fade-in text-sm font-semibold text-slate-800">
          <div className="space-y-2">
            <Link
              href="/catalogo"
              onClick={() => setMenuAbierto(false)}
              className="block p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-900"
            >
              🪵 Estibas & Maderas Dimensionadas
            </Link>
            <Link
              href="/acabados"
              onClick={() => setMenuAbierto(false)}
              className="block p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 text-amber-900"
            >
              🔥 Acabados en Madera & Mobiliario Rústico
            </Link>
            <Link
              href="/metales-remates"
              onClick={() => setMenuAbierto(false)}
              className="block p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 text-slate-900"
            >
              ⚙️ Compra de Metales, Cobre & Remates
            </Link>
            <Link
              href="/esmeraldas"
              onClick={() => setMenuAbierto(false)}
              className="block p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-emerald-900"
            >
              💎 Esmeraldas Colombianas Certificadas (RUCOM)
            </Link>
            <Link
              href="/cubicador"
              onClick={() => setMenuAbierto(false)}
              className="block p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              📐 Calculadora de Cubicaje ($m^3$)
            </Link>
            <Link
              href="/retoma-taller"
              onClick={() => setMenuAbierto(false)}
              className="block p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              ♻️ Taller de Retoma de Pallets Rotos
            </Link>
            <Link
              href="/pqrs"
              onClick={() => setMenuAbierto(false)}
              className="block p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              ⚖️ Radicar PQRS & Retracto (SIC)
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 font-mono text-xs">
            <Link
              href="/checkout"
              onClick={() => setMenuAbierto(false)}
              className="w-full bg-[#1B4332] text-white py-3 rounded-xl block text-center font-bold"
            >
              Ir a Pagar / Liquidar Flete
            </Link>
            <a
              href="tel:3042394091"
              className="w-full bg-slate-100 text-slate-800 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" /> Llamar a Alexander (304 239 4091)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}