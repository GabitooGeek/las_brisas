"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";

export default function CartDrawer() {
  const { items, eliminarDelCarrito, actualizarCantidad, subtotal, drawerAbierto, setDrawerAbierto, totalItems } = useCart();

  if (!drawerAbierto) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div 
        onClick={() => setDrawerAbierto(false)} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* CABECERA DEL CARRITO */}
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1B4332]" />
              <h3 className="font-extrabold text-slate-900 text-base">Carrito de Compras</h3>
              <span className="bg-[#1B4332] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                {totalItems} uds
              </span>
            </div>
            <button 
              onClick={() => setDrawerAbierto(false)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* LISTA DE PRODUCTOS */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🛒
                </div>
                <h4 className="font-bold text-slate-800 text-base">El carrito está vacío</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Agregue estibas, postes, tablas o muebles desde el catálogo.
                </p>
                <Link
                  href="/catalogo"
                  onClick={() => setDrawerAbierto(false)}
                  className="inline-block mt-2 bg-[#1B4332] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition"
                >
                  Ver Catálogo
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 relative"
                >
                  <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    className="w-14 h-14 object-cover rounded-xl bg-slate-200 shrink-0 border border-slate-200"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />

                  <div className="flex-1 pr-6">
                    <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                      {item.nombre}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                      {item.dimensiones}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1B4332] block mt-1">
                      ${item.precio.toLocaleString("es-CO")} COP / {item.unidad}
                    </span>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 10)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-slate-800 px-1">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 10)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-600 p-1"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* PIE DEL CARRITO */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3 font-mono">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-600 uppercase font-bold">Subtotal:</span>
                <span className="text-xl font-black text-[#1B4332]">
                  ${subtotal.toLocaleString("es-CO")} COP
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setDrawerAbierto(false)}
                  className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase flex items-center justify-center gap-2 transition shadow-md"
                >
                  Finalizar Pedido ({totalItems} uds) <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setDrawerAbierto(false)}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold py-1 block font-sans"
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}