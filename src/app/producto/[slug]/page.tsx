"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { INVENTARIO_COMPLETO } from "@/data/productos";
import { 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  PhoneCall 
} from "lucide-react";

export default function ProductoDetallePage() {
  const params = useParams();
  const slug = (params?.slug as string) || "estiba-estandar-madera-recuperada-a";
  const { agregarAlCarrito } = useCart();

  // Busca el producto en la base de datos o usa el primero por defecto
  const producto = INVENTARIO_COMPLETO[slug] || INVENTARIO_COMPLETO["estiba-estandar-madera-recuperada-a"];

  // Estados del cotizador
  const [cantidad, setCantidad] = useState<number>(100);

  // Cálculo dinámico de precio según volumen del producto específico
  const calculo = useMemo(() => {
    const qty = Number(cantidad) || 0;
    let unitario = producto.precioBase;
    let porcentajeDesc = "0%";
    let tier = "PVP Base (1 a 49 uds)";

    if (qty >= 200) {
      unitario = producto.precioMayorista;
      porcentajeDesc = "15% OFF";
      tier = "Descuento Industrial (-15%)";
    } else if (qty >= 50) {
      unitario = Math.round(producto.precioBase * 0.92); // -8%
      porcentajeDesc = "8% OFF";
      tier = "Descuento Mayorista (-8%)";
    }

    const subtotal = qty * unitario;

    return {
      qty,
      unitario,
      porcentajeDesc,
      tier,
      subtotal,
    };
  }, [cantidad, producto]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Migas de pan */}
      <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 mb-6">
        <Link href="/catalogo" className="hover:text-[#1B4332] flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al Catálogo
        </Link>
        <span>/</span>
        <span className="text-slate-400">{producto.categoria}</span>
        <span>/</span>
        <span className="text-slate-600 font-bold">SKU: {producto.sku}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: FOTO REAL Y ESPECIFICACIONES TÉCNICAS */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
                Inventario Real en Patio Fontibón
              </span>
              <span className="bg-emerald-50 text-[#1B4332] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                Entrega Inmediata
              </span>
            </div>

            {/* Foto Real del Producto Seleccionado */}
            <div className="relative bg-slate-100 rounded-2xl h-80 overflow-hidden border border-slate-200 shadow-inner">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute bottom-3 left-3 bg-[#0F172A]/85 backdrop-blur-xs text-white text-xs font-mono font-bold px-3 py-1.5 rounded-xl">
                {producto.dimensiones}
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              {producto.descripcion}
            </p>
          </div>

          {/* PARÁMETROS DE CARGA (Si aplican) */}
          {producto.cargaDinamica && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-4">
                Capacidad Mecánica Certificada
              </h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">CARGA DINÁMICA:</span>
                  <strong className="text-lg text-[#1B4332]">{producto.cargaDinamica}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">CARGA ESTÁTICA:</span>
                  <strong className="text-lg text-slate-900">{producto.cargaEstatica}</strong>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* COLUMNA DERECHA: CONFIGURADOR DE COMPRA Y CANTIDADES */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs sticky top-24">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                {producto.categoria}
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                {producto.nombre}
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                {producto.dimensiones}
              </p>
            </div>

            {/* BOTONES DE PRUEBA RÁPIDA DE CANTIDAD */}
            <div className="my-4">
              <span className="text-xs font-semibold text-slate-600 block mb-2 font-mono">
                Seleccionar Escala de Compra:
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setCantidad(30)}
                  className={`p-2.5 rounded-xl border transition ${
                    calculo.qty < 50
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  30 {producto.unidad}
                </button>
                <button
                  type="button"
                  onClick={() => setCantidad(100)}
                  className={`p-2.5 rounded-xl border transition ${
                    calculo.qty >= 50 && calculo.qty < 200
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  100 {producto.unidad} (-8%)
                </button>
                <button
                  type="button"
                  onClick={() => setCantidad(200)}
                  className={`p-2.5 rounded-xl border transition ${
                    calculo.qty >= 200
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  200 {producto.unidad} (-15%)
                </button>
              </div>
            </div>

            {/* INPUT MANUAL */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cantidad a cotizar o comprar ({producto.unidad}):
              </label>
              <input
                type="number"
                min="1"
                value={cantidad || ""}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-xl font-mono font-bold text-center text-lg focus:outline-[#1B4332]"
              />
            </div>

            {/* CAJA DE PRECIO Y SUBTOTAL */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl mb-6">
              <div className="flex justify-between text-xs text-emerald-900 mb-1">
                <span>Precio Unitario:</span>
                <strong className="font-mono text-sm">
                  ${calculo.unitario.toLocaleString("es-CO")} COP / {producto.unidad}
                </strong>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-emerald-200">
                <span className="text-xs font-bold text-slate-800 uppercase font-mono">
                  Subtotal ({calculo.qty} {producto.unidad}):
                </span>
                <span className="text-2xl font-black font-mono text-[#1B4332]">
                  ${calculo.subtotal.toLocaleString("es-CO")} COP
                </span>
              </div>
            </div>

            {/* BOTÓN AL CHECKOUT */}
            <div className="space-y-2.5">
              <Link
                href={`/checkout?sku=${producto.slug}&qty=${calculo.qty}`}
                className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase text-center block transition shadow-sm font-mono"
              >
                Comprar {producto.nombre.split(" ")[0]} & Facturar
              </Link>

              <a
                href={`https://wa.me/573203100664?text=Hola%20Alexander,%20deseo%20comprar%20${calculo.qty}%20unidades%20de%20${encodeURIComponent(producto.nombre)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition font-mono border border-slate-200"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" /> Consultar con Alexander (320 310 0664)
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                agregarAlCarrito({
                  id: producto.id,
                  slug: producto.slug,
                  nombre: producto.nombre,
                  precio: calculo.unitario,
                  cantidad: calculo.qty,
                  imagen: producto.imagen,
                  dimensiones: producto.dimensiones,
                  unidad: producto.unidad,
                });
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 transition shadow-sm font-mono"
            >
              <ShoppingBag className="w-4 h-4" /> Agregar al Carrito ({calculo.qty} {producto.unidad})
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}