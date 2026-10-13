"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Scale, 
  ArrowRight,
  Boxes,
  Home as HomeIcon,
  Sparkles
} from "lucide-react";

type ZonaLogistica = "BOGOTA" | "SABANA_OCCIDENTE" | "SABANA_NORTE" | "NACIONAL";

export default function HomePage() {
  const [cantidad, setCantidad] = useState<number>(180);
  const [zona, setZona] = useState<ZonaLogistica>("SABANA_OCCIDENTE");
  const [conNIMF15, setConNIMF15] = useState<boolean>(true);

  // Escala de precios por volumen
  const { precioUnitario, vehiculo, flete, subtotal, iva, total } = useMemo(() => {
    let precio = 32000;
    if (cantidad >= 200) precio = 27200;
    else if (cantidad >= 50) precio = 29440;

    if (conNIMF15) precio += 2500;

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

    return { precioUnitario: precio, vehiculo: veh, flete: fleteBase, subtotal: sub, iva: impuesto, total: tot };
  }, [cantidad, zona, conNIMF15]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* 1. HERO CON FOTO REAL DE PATIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-[#1B4332] text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <span>🌱 Economía Circular Industrial</span>
            <span>•</span>
            <span>Patio Fontibón: Av. Calle 24 #128-15</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Infraestructura en Madera, Estibas y Racks para la Industria.
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Comercialización mayorista de estibas nuevas y recuperadas Grado A, maderas dimensionadas, contenedores plásticos, estantería pesada y carpintería industrial con despachos masivos en Bogotá y Sabana.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalogo" className="bg-[#1B4332] hover:bg-[#143326] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition">
              Ver Catálogo Completo
            </Link>
            <Link href="/retoma-taller" className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition">
              Vender o Reparar Estibas Rotos
            </Link>
          </div>
        </div>

        {/* Imagen Real de la Flota en Patio */}
        <div className="lg:col-span-5 relative">
          <div className="overflow-hidden rounded-3xl border-2 border-slate-200 shadow-md aspect-4/3 bg-slate-100">
            <img 
              src="/images/galeria/tractomula_cargue.jpg" 
              alt="Despacho en Tractomula Patio Fontibón" 
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              onError={(e) => {
                // Fallback si la imagen aún no está guardada
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#0F172A] text-white p-3 rounded-2xl text-xs font-mono border border-slate-700 shadow-lg">
            <span>🚚 Flota Propia: Turbos y Tractomulas</span>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID DE OPERACIONES REALES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        {/* COTIZADOR INTERACTIVO */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-amber-600 tracking-wider">
                  Módulo de Cotización B2B
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Simulador de Pedido & Flete de Carga Pesada
                </h2>
              </div>
              <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-mono font-semibold">
                Salida: Fontibón
              </span>
            </div>

            {/* Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Cantidad de Estibas: <strong className="text-[#1B4332] font-mono text-base">{cantidad} uds</strong>
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
                <span>20 uds</span>
                <span>50 uds (-8%)</span>
                <span>200 uds (-15%)</span>
                <span>500+ (Tractomula)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                  Destino del Camión:
                </label>
                <select 
                  value={zona} 
                  onChange={(e) => setZona(e.target.value as ZonaLogistica)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800"
                >
                  <option value="BOGOTA">Bogotá Urbana (Zona Industrial / Calle 13)</option>
                  <option value="SABANA_OCCIDENTE">Sabana Occidente (Mosquera / Funza / Madrid)</option>
                  <option value="SABANA_NORTE">Sabana Norte (Cota / Chía / Siberia)</option>
                  <option value="NACIONAL">Corredor Nacional Troncal</option>
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

          <div className="bg-[#0F172A] text-white rounded-2xl p-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="text-xs text-slate-400 font-mono">
                  Flota: <strong className="text-amber-400">{vehiculo}</strong> • Flete: ${flete.toLocaleString("es-CO")}
                </div>
                <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                  ${total.toLocaleString("es-CO")} COP
                </div>
                <span className="text-[11px] text-slate-400">
                  IVA (19%) y Facturación DIAN con CUFE incluidos
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wide transition text-center"
              >
                Pagar con PSE / Facturar
              </Link>
            </div>
          </div>
        </div>

        {/* FOTO REAL: ESTIBAS EPAL CERTIFICADAS */}
        <div className="bg-[#F5F0E6] rounded-3xl p-6 border border-amber-200 flex flex-col justify-between">
          <div>
            <div className="overflow-hidden rounded-2xl h-44 border border-amber-300/60 mb-4 bg-amber-100">
              <img 
                src="/images/galeria/estibas_epal_certificadas.jpg" 
                alt="Estibas EPAL con Sello de Calidad" 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase font-mono">
              Certificación Estructural
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2">
              Estibas Estándar & EPAL Grado A
            </h3>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              Tacos macizos, clavado helicoidal y madera tratada con secado al horno o al aire.
            </p>
          </div>

          <div className="pt-4 border-t border-amber-200/80 flex justify-between items-center text-xs font-mono font-bold text-[#1B4332]">
            <span>Capacidad: 1,500 kg</span>
            <span className="text-amber-700">✓ Sello Fitosanitario</span>
          </div>
        </div>

      </div>

      {/* 3. LÍNEAS DE NEGOCIO REALES DE LAS BRISAS (CON TUS FOTOS) */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
              Capacidad de Producción y Suministro
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Líneas Especializadas de Patio Fontibón
            </h2>
          </div>
          <Link href="/catalogo" className="text-xs font-bold text-[#1B4332] hover:underline flex items-center gap-1">
            Ver todo el catálogo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* LÍNEA 1: ESTIBAS PLÁSTICAS Y CANECAS */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="overflow-hidden rounded-2xl h-44 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/canecas_estiba_plastica.jpg" 
                  alt="Estibas plásticas y tambores" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">PLÁSTICOS & CONTENEDORES</span>
              <h4 className="font-bold text-slate-900 text-base mt-2">Estibas Plásticas & Tambores 55 Gal</h4>
              <p className="text-xs text-slate-600 mt-1">
                Pallets rackeables en polietileno de alta densidad (HDPE) y canecas industriales limpias.
              </p>
            </div>
            <Link href="/catalogo" className="mt-4 text-xs font-bold text-[#1B4332] flex items-center gap-1 hover:underline">
              Cotizar línea plástica <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* LÍNEA 2: RACKS INDUSTRIALES METÁLICOS */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="overflow-hidden rounded-2xl h-44 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/racks_industriales.jpg" 
                  alt="Racks industriales para bodega" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">ESTANTERÍA PESADA</span>
              <h4 className="font-bold text-slate-900 text-base mt-2">Racks Industriales para Bodega</h4>
              <p className="text-xs text-slate-600 mt-1">
                Vigas y bastidores metálicos modulares de alta carga para almacenamiento logístico.
              </p>
            </div>
            <a href="https://wa.me/573223989414?text=Hola,%20deseo%20cotizar%20racks%20metálicos%20industriales" target="_blank" className="mt-4 text-xs font-bold text-[#1B4332] flex items-center gap-1 hover:underline">
              Consultar medidas <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* LÍNEA 3: MADERAS DIMENSIONADAS */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="overflow-hidden rounded-2xl h-44 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/tablas_madera_acopio.jpg" 
                  alt="Tablas y maderas dimensionadas" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">ASERRÍO Y CORTE</span>
              <h4 className="font-bold text-slate-900 text-base mt-2">Tablas y Maderas Dimensionadas</h4>
              <p className="text-xs text-slate-600 mt-1">
                Pino pátula y eucalipto cortado en tablas, listones y polines para construcción y embalaje.
              </p>
            </div>
            <Link href="/cubicador" className="mt-4 text-xs font-bold text-[#1B4332] flex items-center gap-1 hover:underline">
              Calcular cubicaje m³ <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* LÍNEA 4: MOBILIARIO RÚSTICO Y CASETAS */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="overflow-hidden rounded-2xl h-44 mb-4 bg-slate-100">
                <img 
                  src="/images/galeria/mesas_picnic.jpg" 
                  alt="Mesas picnic y carpintería rústica" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold">CARPINTERÍA Y OBRAS</span>
              <h4 className="font-bold text-slate-900 text-base mt-2">Mobiliario Rústico & Casetas</h4>
              <p className="text-xs text-slate-600 mt-1">
                Mesas picnic flameadas, sillas tapizadas, muebles y casetas campestres fabricadas a medida.
              </p>
            </div>
            <a href="https://wa.me/573203100664?text=Hola,%20deseo%20cotizar%20mesas%20picnic/casetas%20de%20madera" target="_blank" className="mt-4 text-xs font-bold text-[#1B4332] flex items-center gap-1 hover:underline">
              Pedir diseño especial <ArrowRight className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>

      {/* 4. SECCIÓN DE DESPACHOS Y FLOTA PESADA */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-8 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-3">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            Logística Integral de Patio Fontibón
          </span>
          <h3 className="text-2xl font-bold text-white">
            Despachos Seguros con Amarre de Carga
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nuestros viajes van asegurados con eslingas de alta tensión y carpa para proteger la mercancía de la humedad durante el trayecto a su empresa en Cundinamarca o nivel nacional.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
            <span>✓ Camiones Turbos (Hasta 220 uds)</span>
            <span>✓ Camiones Sencillos (Hasta 420 uds)</span>
            <span>✓ Tractomulas (1.000+ uds)</span>
          </div>
        </div>

        <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-700 aspect-16/9 bg-slate-900">
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