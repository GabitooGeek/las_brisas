"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  Flame,
  Scale,
  TreePine,
  Layers
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 font-sans">
      
      {/* 1. HERO PRINCIPAL LIMPIO Y CONTUNDENTE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-[#1B4332] text-xs font-mono font-bold px-3 py-1.5 rounded-full">
            <span>🌱 Economía Circular Industrial</span>
            <span>•</span>
            <span>Patio Fontibón: Av. Calle 24 #128-15</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Recuperadora de Maderas, Estibas, Metales y Esmeraldas.
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Suministro mayorista de estibas nuevas y recuperadas Grado A, postes inmunizados para fincas, maderas dimensionadas, mobiliario rústico, remates industriales y esmeraldas certificadas en Bogotá y Cundinamarca.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link 
              href="/catalogo" 
              className="bg-[#1B4332] hover:bg-[#143326] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
            >
              Explorar Catálogo Completo <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              href="/acabados" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4" /> Muebles & Acabados
            </Link>
          </div>
        </div>

        {/* FOTO REAL DE PATIO FONTIBÓN */}
        <div className="lg:col-span-5 relative">
          <div className="overflow-hidden rounded-3xl border-2 border-slate-200 shadow-md aspect-4/3 bg-slate-100">
            <img 
              src="/images/galeria/tractomula_cargue.jpg" 
              alt="Despacho en Tractomula Patio Fontibón" 
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <div className="absolute -bottom-3 -left-3 bg-[#0F172A] text-white p-3 rounded-2xl text-xs font-mono border border-slate-700 shadow-lg">
            <span>🚚 Flota Propia: Turbos y Tractomulas</span>
          </div>
        </div>
      </div>

      {/* 2. LAS 5 DIVISIONES DEL GRUPO EMPRESARIAL */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
            Capacidad Integral de Suministro
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Nuestras Líneas de Negocio Especializadas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Atención directa desde patio en Fontibón para empresas, fincas, constructoras y comercio exterior.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* DIVISIÓN 1: ESTIBAS DE MADERA */}
          <Link 
            href="/catalogo"
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="overflow-hidden rounded-2xl h-48 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/estibas_madera_tacos_azules.jpg" 
                  alt="Estibas de Madera Grado A" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                ESTIBAS GRADO A & EPAL
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-[#1B4332] transition">
                Estibas de Madera Certificadas
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Tacos reforzados, clavo helicoidal y sello fitosanitario ICA NIMF 15 para exportación o almacenamiento en rack pesado.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#1B4332]">
              <span>Ver modelos y precios</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* DIVISIÓN 2: POSTES Y MADERAS ASINCRÓNICAS */}
          <Link 
            href="/producto/postes-estacones-madera-inmunizada"
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="overflow-hidden rounded-2xl h-48 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/postes_estacones_inmunizados.jpg" 
                  alt="Postes y Estacones con Punta" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                CERCAS & FINCAS
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-[#1B4332] transition">
                Postes y Estacones con Punta
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Madera de pino inmunizada para intemperie. Con punta para fácil instalación en linderos, ganadería y cerramientos de obra.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#1B4332]">
              <span>Cotizar postes por lote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* DIVISIÓN 3: ACABADOS & MOBILIARIO */}
          <Link 
            href="/acabados"
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="overflow-hidden rounded-2xl h-48 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/mueble_modular.jpg" 
                  alt="Mueble modular en madera flameada" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md">
                CARPINTERÍA & ACABADOS
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-[#1B4332] transition">
                Mobiliario Rústico & Acabados
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Técnica de quemado térmico: muebles de entretenimiento, mesas picnic para restaurantes, sillas y casetas campestres sobre plano.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#1B4332]">
              <span>Ver proyectos de taller</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* DIVISIÓN 4: METALES & REMATES */}
          <Link 
            href="/metales-remates"
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="overflow-hidden rounded-2xl h-48 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/racks_industriales.jpg" 
                  alt="Racks industriales para bodega" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                CHATARRA & REMATES
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-[#1B4332] transition">
                Metales, Cobre & Remates Industriales
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Compramos sobrantes de cobre, aluminio, hierro y bodegas completas a puerta cerrada con pesaje en báscula certificada de Fontibón.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#1B4332]">
              <span>Tasador de metales</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* DIVISIÓN 5: ESMERALDAS COLOMBIANAS */}
          <Link 
            href="/esmeraldas"
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              {/* CAMBIAR EL CUADRO DE LA GEMA POR ESTE: */}
              <div className="h-48 rounded-2xl mb-4 bg-emerald-950/10 border border-emerald-200 flex items-center justify-center">
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 3h12l4 7-10 11L2 10l4-7z" fill="#10B981" stroke="#047857" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M2 10h20M12 21L8 10l4-7 4 7-4 11z" stroke="#065F46" strokeWidth="1" opacity="0.5"/>
                  <path d="M6 3l2 7M18 3l-2 7" stroke="#A7F3D0" strokeWidth="1" opacity="0.9"/>
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md">
                RUCOM • MINMINAS
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-[#1B4332] transition">
                Esmeraldas Colombianas Certificadas
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Gemas en bruto y talladas de Muzo y Chivor. Certificación gemológica oficial y facturación en dólares (USD) o pesos (COP).
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#1B4332]">
              <span>Ver catálogo de gemas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* DIVISIÓN 6: TALLER DE RETOMA */}
          <Link 
            href="/retoma-taller"
            className="bg-[#F5F0E6] rounded-3xl p-5 border border-amber-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 rounded-2xl mb-4 bg-amber-200/50 border border-amber-300 flex items-center justify-center text-5xl">
                ♻️
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200 px-2.5 py-1 rounded-md">
                COMPRA DE PALLETS ROTOS
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-2 group-hover:text-[#1B4332] transition">
                Retoma & Reparación de Estibas
              </h3>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                ¿Tiene estibas acumuladas ocupando espacio en su bodega? Nosotros se las compramos o las reparamos en nuestro taller de Fontibón.
              </p>
            </div>
            <div className="pt-4 border-t border-amber-200 mt-4 flex items-center justify-between text-xs font-bold text-[#1B4332]">
              <span>Solicitar recogida con camión</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

        </div>
      </div>

      {/* 3. LOGÍSTICA DE CARGA PESADA */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            Patio Logístico Fontibón • Flota Propia
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Despachos Seguros a Toda Bogotá y Cundinamarca
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Coordinamos viajes consolidados en camiones Turbo, Sencillos y Tractomulas asegurados con eslingas de alta tensión para que su mercancía llegue seca y sin daños a su bodega o finca.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
            <span>✓ Camiones Turbos (Hasta 220 uds)</span>
            <span>✓ Camiones Sencillos (Hasta 420 uds)</span>
            <span>✓ Tractomulas (1.000+ uds)</span>
          </div>
        </div>

        <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-slate-700 aspect-16/9 bg-slate-900">
          <img 
            src="/images/galeria/camion_despacho_reatas.jpg" 
            alt="Camión cargado con reatas de seguridad" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
        </div>
      </div>

    </div>
  );
}