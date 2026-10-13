"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Wrench, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  Ruler, 
  Flame 
} from "lucide-react";

interface ProyectoMadera {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  acabado: string;
  precioDesdeCop: number;
  imagen: string;
}

const PROYECTOS: ProyectoMadera[] = [
  {
    id: "1",
    titulo: "Centro de Entretenimiento Modular en Madera Flameada",
    categoria: "Mobiliario para Hogar & Oficina",
    descripcion: "Estructura robusta en madera maciza seleccionada, cajonería con tiradores metálicos, repisas flotantes y acabado térmico rústico que resalta la veta natural.",
    acabado: "Flameado rústico + Sellador mate",
    precioDesdeCop: 1450000,
    imagen: "/images/galeria/mueble_modular.jpg",
  },
  {
    id: "2",
    titulo: "Mesas Tipo Picnic Reforzadas para Restaurantes & Fincas",
    categoria: "Mobiliario Exterior & Terrazas",
    descripcion: "Bancas integradas para 6 a 8 personas. Madera inmunizada para intemperie, quemado decorativo superficial y protección plástica para transporte.",
    acabado: "Tratamiento exterior + Quemado térmico",
    precioDesdeCop: 680000,
    imagen: "/images/galeria/mesas_picnic.jpg",
  },
  {
    id: "3",
    titulo: "Sillas / Bancas de Bar Rústicas con Tapizado Acolchado",
    categoria: "Comercial & Negocios",
    descripcion: "Estructura en madera de estiba rectificada y flameada, asiento acolchado con tapicería vinílica de alta resistencia en colores rojo y negro.",
    acabado: "Estructura flameada + Cojinería lavable",
    precioDesdeCop: 140000,
    imagen: "/images/galeria/sillas_rusticas.jpg",
  },
  {
    id: "4",
    titulo: "Casetas Campestres y Módulos Rústicos Habitables",
    categoria: "Obras, Fincas & Glamping",
    descripcion: "Cabaña construida con madera cepillada, cerramiento en listonería machihembrada, puerta de acceso y cubierta en teja de zinc. Fácil instalación.",
    acabado: "Madera inmunizada contra humedad",
    precioDesdeCop: 4200000,
    imagen: "/images/galeria/caseta_madera.jpg",
  },
];

export default function AcabadosMaderaPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Cabecera Principal */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 text-xs font-mono font-bold px-3 py-1.5 rounded-full mb-3">
          <Flame className="w-4 h-4 text-amber-700" />
          <span>Taller de Carpintería & Acabados Rústicos Fontibón</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Ebanistería, Acabados Especiales y Mobiliario a Medida
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Transformamos maderas seleccionadas y recuperadas en piezas únicas: muebles de entretenimiento, mesas tipo picnic para fincas o restaurantes, sillas tapizadas y casetas campestres.
        </p>
      </div>

      {/* BENEFICIOS DEL TALLER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center mb-3">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Técnica de Quemado Rústico</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Aplicamos flameado controlado que realza la veta profunda de la madera y crea una barrera natural contra insectos y hongos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 bg-emerald-100 text-[#1B4332] rounded-xl flex items-center justify-center mb-3">
            <Ruler className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Fabricación Sobre Plano</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            ¿Tiene una foto o un plano de lo que necesita? Fabricamos según sus medidas exactas para casas campestres, terrazas o locales.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center mb-3">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Madera Maciza & Durabilidad</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Nada de aglomerados débiles. Todo es armado con madera maciza de pino o eucalipto de gran espesor que dura décadas.
          </p>
        </div>
      </div>

      {/* GALERÍA DE PROYECTOS Y PRODUCTOS */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Línea de Mobiliario y Acabados Fabricados en Taller
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROYECTOS.map((proy) => (
            <div 
              key={proy.id} 
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="h-72 w-full bg-slate-100 relative overflow-hidden">
                  <img 
                    src={proy.imagen} 
                    alt={proy.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-[#0F172A]/85 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-3 py-1 rounded-lg">
                    {proy.categoria}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-900 leading-snug">
                    {proy.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {proy.descripcion}
                  </p>

                  <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-mono text-amber-900 flex items-center justify-between">
                    <span>Acabado aplicado:</span>
                    <strong>{proy.acabado}</strong>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">FABRICACIÓN DESDE:</span>
                  <span className="text-2xl font-black font-mono text-[#1B4332]">
                    ${proy.precioDesdeCop.toLocaleString("es-CO")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono"> COP</span>
                </div>

                <a
                  href={`https://wa.me/573203100664?text=Hola%20Alexander,%20deseo%20cotizar%20el%20proyecto:%20${encodeURIComponent(proy.titulo)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-1.5 transition font-mono shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" /> Cotizar con Alexander
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER INFERIOR PARA PROYECTOS A MEDIDA */}
      <div className="mt-16 bg-[#1B4332] text-white rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="max-w-xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            ¿Tiene una idea o diseño personalizado?
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold mt-1">
            Fabricamos sobre medidas y según su presupuesto
          </h3>
          <p className="text-xs text-slate-200 mt-2">
            Envíenos un boceto o una foto por WhatsApp. Le cotizamos la madera, los cortes y el acabado en menos de 2 horas.
          </p>
        </div>

        <a
          href="https://wa.me/573223989414?text=Hola%20Lubia,%20tengo%20un%20diseño%20en%20madera%20para%20cotizar"
          target="_blank"
          rel="noreferrer"
          className="bg-white hover:bg-slate-100 text-[#1B4332] font-black px-6 py-4 rounded-xl text-xs uppercase tracking-wider font-mono transition text-center shrink-0 shadow-md"
        >
          Enviar Boceto / Hablar con Lubia
        </a>
      </div>

    </div>
  );
}