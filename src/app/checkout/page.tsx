"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { 
  Building2, 
  User, 
  Truck, 
  MessageCircle, 
  ArrowLeft,
  ShoppingBag,
  Trash2
} from "lucide-react";

export const dynamic = "force-dynamic";

function CheckoutContenido() {
  const { items, subtotal, totalItems, eliminarDelCarrito, limpiarCarrito } = useCart();

  // Datos del cliente
  const [tipoCliente, setTipoCliente] = useState<"EMPRESA" | "PERSONA">("EMPRESA");
  const [nombreCliente, setNombreCliente] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [emailFactura, setEmailFactura] = useState<string>("");
  const [deseaFactura, setDeseaFactura] = useState<boolean>(true);

  // Logística
  const [modalidadEntrega, setModalidadEntrega] = useState<"FLOTA" | "PATIO">("FLOTA");
  const [municipio, setMunicipio] = useState<string>("Bogotá / Sabana");
  const [direccion, setDireccion] = useState<string>("");

  // Cálculo de flete consolidado según el volumen total de piezas en el carrito
  const flete = useMemo(() => {
    if (modalidadEntrega === "PATIO" || totalItems === 0) return 0;
    if (totalItems <= 220) return 180000; // Camión Turbo
    if (totalItems <= 420) return 260000; // Camión Sencillo
    return 650000;                        // Tractomula
  }, [totalItems, modalidadEntrega]);

  const totalFinal = subtotal + flete;

  // Genera el mensaje de WhatsApp consolidando TODOS los ítems del carrito
  const enviarPedidoWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("El carrito está vacío. Agregue productos antes de continuar.");
      return;
    }

    // Arma la lista de productos línea por línea
    const listaProductosTexto = items
      .map((it, idx) => `  ${idx + 1}. *${it.nombre}*\n     • Cantidad: ${it.cantidad} ${it.unidad}\n     • Subtotal: $${(it.precio * it.cantidad).toLocaleString("es-CO")} COP`)
      .join("\n\n");

    const mensaje = `🚚 *NUEVO PEDIDO CONSOLIDADO (CARRITO) - LAS BRISAS*
----------------------------------------
👤 *Cliente / Empresa:* ${nombreCliente || "Cliente Web"}
🆔 *Documento / NIT:* ${documento || "No especificado"}
📞 *Teléfono:* ${telefono || "No especificado"}
${deseaFactura ? `📄 *Requiere Factura:* Sí (${emailFactura || "Sin correo"})` : "📄 *Factura:* No requerida"}

📦 *LISTA DE PRODUCTOS CONSOLIDADOS (${totalItems} unidades en total):*
${listaProductosTexto}

📍 *LOGÍSTICA DE ENTREGA:*
• Modalidad: ${modalidadEntrega === "FLOTA" ? "Despacho con Flota Las Brisas" : "Retiro en Patio Fontibón"}
${modalidadEntrega === "FLOTA" ? `• Destino: ${municipio} - ${direccion}` : "• Retiro directo: Av. Calle 24 #128-15"}

💰 *LIQUIDACIÓN CONSOLIDADA:*
• Subtotal Mercancía: $${subtotal.toLocaleString("es-CO")} COP
• Flete Transporte: $${flete.toLocaleString("es-CO")} COP
👉 *TOTAL A TRANSFERIR: $${totalFinal.toLocaleString("es-CO")} COP*
----------------------------------------
Hola Alexander, armé este pedido con varios productos en la página web. Por favor confírmame disponibilidad y envíame la cuenta de Bancolombia para hacer la transferencia.`;

    const url = `https://wa.me/573203100664?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      <div className="mb-6 flex justify-between items-center">
        <Link href="/catalogo" className="text-xs font-mono text-slate-500 hover:text-[#1B4332] flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al Catálogo
        </Link>
        <span className="text-xs font-mono font-bold text-slate-500">
          {items.length} {items.length === 1 ? "producto" : "productos diferentes"} en el carrito
        </span>
      </div>

      <div className="max-w-3xl mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
          Despacho Consolidado • Patio Fontibón
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Finalizar Pedido Multi-Producto
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Los productos de su carrito se consolidarán en un solo camión coordinado por <strong>Alexander Torres</strong>.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-3xl">
            🛒
          </div>
          <h2 className="text-xl font-bold text-slate-900">No hay productos en su carrito</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Visite el catálogo o la sección de acabados y agregue estibas, postes o mesas para finalizar su compra.
          </p>
          <Link
            href="/catalogo"
            className="inline-block bg-[#1B4332] text-white font-bold text-xs py-3 px-6 rounded-xl transition"
          >
            Ir al Catálogo de Productos
          </Link>
        </div>
      ) : (
        <form onSubmit={enviarPedidoWhatsApp} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: DATOS Y LOGÍSTICA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* DATOS DEL CLIENTE */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h2 className="font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-[#1B4332]" /> Datos del Comprador
              </h2>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setTipoCliente("EMPRESA")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    tipoCliente === "EMPRESA" ? "bg-[#1B4332] text-white border-[#1B4332]" : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  Empresa (NIT)
                </button>
                <button
                  type="button"
                  onClick={() => setTipoCliente("PERSONA")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    tipoCliente === "PERSONA" ? "bg-[#1B4332] text-white border-[#1B4332]" : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  Persona Natural (CC)
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {tipoCliente === "EMPRESA" ? "Razón Social:" : "Nombre Completo:"}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={tipoCliente === "EMPRESA" ? "Ej: Logística San Carlos SAS" : "Ej: Carlos Mendoza"}
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-[#1B4332]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">NIT o Cédula:</label>
                    <input
                      required
                      type="text"
                      placeholder="901458789-4"
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-mono focus:outline-[#1B4332]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teléfono WhatsApp:</label>
                    <input
                      required
                      type="tel"
                      placeholder="310 123 4567"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-mono focus:outline-[#1B4332]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={deseaFactura}
                      onChange={(e) => setDeseaFactura(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#1B4332]"
                    />
                    <span className="font-semibold text-slate-800">
                      ¿Requiere Factura de Venta / Remisión oficial?
                    </span>
                  </label>

                  {deseaFactura && (
                    <div className="mt-2 pl-6">
                      <input
                        type="email"
                        placeholder="Correo para envío de factura tras pago"
                        value={emailFactura}
                        onChange={(e) => setEmailFactura(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl p-2 text-xs font-mono focus:outline-[#1B4332]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* LOGÍSTICA */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h2 className="font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1B4332]" /> Logística de Despacho
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setModalidadEntrega("FLOTA")}
                  className={`p-3 rounded-2xl border text-left transition ${
                    modalidadEntrega === "FLOTA" ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold" : "border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="text-xs block">Despacho con Flota</span>
                  <span className="text-[10px] font-normal text-slate-500">Viaje consolidado a bodega</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalidadEntrega("PATIO")}
                  className={`p-3 rounded-2xl border text-left transition ${
                    modalidadEntrega === "PATIO" ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold" : "border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="text-xs block">Retiro en Fontibón</span>
                  <span className="text-[10px] font-normal text-emerald-700 font-semibold">Gratis ($0 COP)</span>
                </button>
              </div>

              {modalidadEntrega === "FLOTA" && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Municipio de Destino:</label>
                    <input
                      type="text"
                      placeholder="Ej: Funza, Mosquera, Madrid, Bogotá..."
                      value={municipio}
                      onChange={(e) => setMunicipio(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-[#1B4332]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Dirección Exacta:</label>
                    <input
                      type="text"
                      placeholder="Ej: Parque Industrial San Carlos Bodega 4"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-[#1B4332]"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* COLUMNA DERECHA: RESUMEN DE TODOS LOS ITEMS DEL CARRITO */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs sticky top-24">
              
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">
                  Productos a Despachar
                </h3>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {totalItems} uds totales
                </span>
              </div>

              {/* LISTA DINÁMICA DE ITEMS DEL CARRITO */}
              <div className="py-4 space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between items-start text-xs border-b border-slate-100 pb-2">
                    <div className="pr-2">
                      <strong className="text-slate-900 block leading-tight">{it.nombre}</strong>
                      <span className="text-[11px] font-mono text-slate-500">
                        {it.cantidad} {it.unidad} × ${it.precio.toLocaleString("es-CO")}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-800 shrink-0">
                      ${(it.precio * it.cantidad).toLocaleString("es-CO")}
                    </span>
                  </div>
                ))}
              </div>

              {/* TOTALES */}
              <div className="py-3 space-y-2 text-xs font-mono border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Mercancía:</span>
                  <span>${subtotal.toLocaleString("es-CO")} COP</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Flete Consolidado:</span>
                  <span>${flete.toLocaleString("es-CO")} COP</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-baseline">
                <span className="font-bold text-slate-800 text-xs uppercase font-mono">Total a Pagar:</span>
                <span className="text-2xl font-black font-mono text-[#1B4332]">
                  ${totalFinal.toLocaleString("es-CO")} COP
                </span>
              </div>

              {/* BOTÓN WHATSAPP MULTI-PRODUCTO */}
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md font-mono"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Pedir {items.length} {items.length === 1 ? "Producto" : "Productos"} por WhatsApp
              </button>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p>✓ Alexander recibe la lista completa en su chat.</p>
                <p>✓ Consolida el camión y le envía su cuenta Bancolombia.</p>
              </div>

            </div>
          </div>

        </form>
      )}

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-mono">Cargando checkout multi-producto...</div>}>
      <CheckoutContenido />
    </Suspense>
  );
}