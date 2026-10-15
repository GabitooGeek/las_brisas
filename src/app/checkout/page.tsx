"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INVENTARIO_COMPLETO } from "@/data/productos";
import { 
  Building2, 
  User, 
  Truck, 
  MapPin, 
  MessageCircle, 
  FileText, 
  CheckCircle2, 
  ShieldCheck,
  ArrowLeft
} from "lucide-react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const skuParam = searchParams.get("sku") || "estiba-estandar-madera-recuperada-a";
  const qtyParam = Number(searchParams.get("qty")) || 100;

  // Producto seleccionado
  const producto = INVENTARIO_COMPLETO[skuParam] || INVENTARIO_COMPLETO["estiba-estandar-madera-recuperada-a"];

  // Datos del comprador
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

  // Cantidad y precios
  const [cantidad, setCantidad] = useState<number>(qtyParam);

  const liquidacion = useMemo(() => {
    let unitario = producto.precioBase;
    if (cantidad >= 200) unitario = producto.precioMayorista;
    else if (cantidad >= 50) unitario = Math.round(producto.precioBase * 0.92);

    const subtotalMercancia = cantidad * unitario;
    
    // Flete aproximado de patio
    let flete = 0;
    if (modalidadEntrega === "FLOTA") {
      flete = cantidad <= 220 ? 180000 : cantidad <= 420 ? 260000 : 650000;
    }

    const total = subtotalMercancia + flete;

    return {
      unitario,
      subtotalMercancia,
      flete,
      total,
    };
  }, [cantidad, producto, modalidadEntrega]);

  // Generar el mensaje estructurado de WhatsApp para Alexander
  const enviarPedidoWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Link automático para que Alexander abra e imprima la factura
    const linkFactura = `https://las-brisas.vercel.app/factura?cliente=${encodeURIComponent(nombreCliente || "Cliente Web")}&nit=${encodeURIComponent(documento || "Sin NIT")}&tel=${encodeURIComponent(telefono || "")}&item=${encodeURIComponent(producto.nombre)}&cant=${cantidad}&unit=${liquidacion.unitario}&flete=${liquidacion.flete}&dir=${encodeURIComponent(direccion ? `${municipio} - ${direccion}` : municipio)}`;

    const mensaje = `🚚 *NUEVO PEDIDO DESDE LA WEB - LAS BRISAS*
----------------------------------------
👤 *Cliente:* ${nombreCliente || "Cliente Web"}
🆔 *Documento/NIT:* ${documento || "No especificado"}
📞 *Teléfono:* ${telefono || "No especificado"}
${deseaFactura ? `📄 *Requiere Factura DIAN:* Sí (${emailFactura || "Sin correo"})` : "📄 *Factura:* No requerida"}

📦 *PRODUCTO SOLICITADO:*
• ${producto.nombre}
• Cantidad: ${cantidad} ${producto.unidad}
• Medidas: ${producto.dimensiones}

📍 *LOGÍSTICA DE ENTREGA:*
• Modalidad: ${modalidadEntrega === "FLOTA" ? "Despacho con Flota Las Brisas" : "Retiro en Patio Fontibón"}
${modalidadEntrega === "FLOTA" ? `• Destino: ${municipio} - ${direccion}` : "• Retiro directo: Av. Calle 24 #128-15"}

💰 *LIQUIDACIÓN ESTIMADA:*
• Mercancía: $${liquidacion.subtotalMercancia.toLocaleString("es-CO")} COP
• Flete: $${liquidacion.flete.toLocaleString("es-CO")} COP
👉 *TOTAL A PAGAR: $${liquidacion.total.toLocaleString("es-CO")} COP*
----------------------------------------
📄 *GENERAR FACTURA / REMISIÓN EN 1 CLIC:*
${linkFactura}
----------------------------------------
Hola Alexander, acabo de armar este pedido en la página. Por favor envíame los datos de la cuenta bancaria para transferir.`;

    const url = `https://wa.me/573042394091?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Volver */}
      <div className="mb-6">
        <Link href="/catalogo" className="text-xs font-mono text-slate-500 hover:text-[#1B4332] flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al Catálogo
        </Link>
      </div>

      <div className="max-w-3xl mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
          Atención Directa de Patio Fontibón
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Confirmar Pedido & Coordinar Pago
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Complete los datos para remitir su orden directamente al WhatsApp de <strong>Alexander Torres (Propietario)</strong> para coordinar la cuenta de transferencia y el despacho.
        </p>
      </div>

      <form onSubmit={enviarPedidoWhatsApp} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: DATOS Y LOGÍSTICA (7 COLUMNAS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* DATOS DEL CLIENTE */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#1B4332]" /> Datos de Contacto y Facturación
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
                  {tipoCliente === "EMPRESA" ? "Razón Social de la Empresa:" : "Nombre Completo:"}
                </label>
                <input
                  required
                  type="text"
                  placeholder={tipoCliente === "EMPRESA" ? "Ej: Distribuidora Andina SAS" : "Ej: Carlos Mendoza"}
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-[#1B4332]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {tipoCliente === "EMPRESA" ? "NIT:" : "Cédula de Ciudadanía:"}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej: 901458789-4"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-mono focus:outline-[#1B4332]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Teléfono / WhatsApp de Contacto:
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Ej: 310 123 4567"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm font-mono focus:outline-[#1B4332]"
                  />
                </div>
              </div>

              {/* FACTURA ELECTRÓNICA DIAN */}
              <div className="pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deseaFactura}
                    onChange={(e) => setDeseaFactura(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#1B4332]"
                  />
                  <span className="font-semibold text-slate-800">
                    ¿Requiere Factura Electrónica DIAN?
                  </span>
                </label>

                {deseaFactura && (
                  <div className="mt-2 pl-6">
                    <label className="text-[11px] text-slate-500 block mb-1">
                      Correo para envío de la factura electrónica tras el pago:
                    </label>
                    <input
                      type="email"
                      placeholder="facturacion@empresa.com"
                      value={emailFactura}
                      onChange={(e) => setEmailFactura(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-2 text-xs font-mono focus:outline-[#1B4332]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LOGÍSTICA DE ENTREGA */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#1B4332]" /> Modalidad de Entrega
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setModalidadEntrega("FLOTA")}
                className={`p-3 rounded-2xl border text-left transition ${
                  modalidadEntrega === "FLOTA" ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold" : "border-slate-200 text-slate-600"
                }`}
              >
                <span className="text-xs block">Despacho con Camión</span>
                <span className="text-[10px] font-normal text-slate-500">A su bodega o finca</span>
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
                  <label className="font-semibold text-slate-700 block mb-1">Municipio / Destino:</label>
                  <input
                    type="text"
                    placeholder="Ej: Funza, Mosquera, Madrid, Bogotá Norte..."
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-[#1B4332]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Dirección de Entrega:</label>
                  <input
                    type="text"
                    placeholder="Ej: Zona Franca Bodega 12 o Vereda La Florida"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-[#1B4332]"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* COLUMNA DERECHA: RESUMEN Y BOTÓN WHATSAPP (5 COLUMNAS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs sticky top-24">
            
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
              Resumen del Pedido
            </h3>

            <div className="py-4 space-y-3 text-xs font-mono border-b border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">PRODUCTO:</span>
                <strong className="text-slate-900 text-sm block">{producto.nombre}</strong>
                <span className="text-slate-500">{producto.dimensiones}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600">Cantidad:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="w-20 p-1 border border-slate-300 rounded text-center font-bold text-xs"
                  />
                  <span>{producto.unidad}</span>
                </div>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Precio Unitario:</span>
                <span>${liquidacion.unitario.toLocaleString("es-CO")} COP</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Flete de Transporte:</span>
                <span>${liquidacion.flete.toLocaleString("es-CO")} COP</span>
              </div>
            </div>

            <div className="py-4 flex justify-between items-baseline">
              <span className="font-bold text-slate-800 text-xs uppercase font-mono">Total Liquidado:</span>
              <span className="text-2xl font-black font-mono text-[#1B4332]">
                ${liquidacion.total.toLocaleString("es-CO")} COP
              </span>
            </div>

            {/* BOTÓN DIRECTO A WHATSAPP DE ALEXANDER */}
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md font-mono"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Pedir por WhatsApp con Alexander
            </button>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <p>✓ Alexander recibe su pedido exacto en su chat.</p>
              <p>✓ Le remite el número de cuenta de Bancolombia.</p>
              <p>✓ Al confirmar el pago, emite la factura electrónica a su correo.</p>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
}