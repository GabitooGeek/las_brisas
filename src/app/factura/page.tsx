"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

function FacturaContenido() {
  const searchParams = useSearchParams();

  // Parámetros leídos de la URL del pedido
  const cliente = searchParams.get("cliente") || "CLIENTE GENERAL";
  const nit = searchParams.get("nit") || "222222222222";
  const telefono = searchParams.get("tel") || "304 239 4091";
  const producto = searchParams.get("item") || "Estibas de Madera Grado A";
  const cantidad = Number(searchParams.get("cant")) || 100;
  const precioUnitario = Number(searchParams.get("unit")) || 29440;
  const flete = Number(searchParams.get("flete")) || 180000;
  const direccion = searchParams.get("dir") || "Patio Fontibón, Bogotá D.C.";
  
  const subtotalMercancia = cantidad * precioUnitario;
  const total = subtotalMercancia + flete;

  // Fecha y consecutivo automático
  const hoy = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const numeroFactura = `REM-${Date.now().toString().slice(-6)}`;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 font-sans">
      
      {/* BOTONES SUPERIORES (Se ocultan al imprimir) */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <Link href="/" className="text-xs font-mono font-bold text-slate-600 hover:text-[#1B4332] flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver a la Tienda
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 shadow-md transition font-mono"
        >
          <Printer className="w-4 h-4" /> Imprimir Factura Física / Guardar en PDF
        </button>
      </div>

      {/* DOCUMENTO FÍSICO MEMBRETADO (Hoja de Factura) */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-lg print:border-none print:shadow-none print:p-0 text-slate-900">
        
        {/* ENCABEZADO CON DATOS OFICIALES DE LAS BRISAS */}
        <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2 border-slate-800 gap-4">
          <div className="flex items-center space-x-3">
            <Logo className="w-16 h-16 shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                RECUPERADORA LAS BRISAS
              </h1>
              <span className="text-[11px] font-mono font-bold uppercase text-slate-600 block mt-1">
                Maderas • Estibas • Metales • Remates
              </span>
              <p className="text-xs text-slate-700 mt-1 font-medium">
                Alexander Torres — Propietario / Gerencia
              </p>
              <p className="text-xs font-mono text-slate-600">
                NIT: 80.160.322-3 • Régimen Comercial
              </p>
              <p className="text-xs text-slate-500">
                Av. Calle 24 No. 128-15, Fontibón - Las Brisas, Bogotá D.C.
              </p>
              <p className="text-xs font-mono text-emerald-800 font-bold">
                WhatsApp / Celular: 304 239 4091
              </p>
            </div>
          </div>

          <div className="border-2 border-slate-900 rounded-2xl p-4 text-center bg-slate-50 min-w-[200px] w-full sm:w-auto font-mono">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              FACTURA DE VENTA / REMISIÓN
            </span>
            <span className="text-xl font-black text-[#1B4332] block mt-1">
              No. {numeroFactura}
            </span>
            <span className="text-[11px] text-slate-600 block mt-1">
              Fecha: {hoy}
            </span>
          </div>
        </div>

        {/* DATOS DEL CLIENTE / RECEPTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-mono text-[10px] uppercase block font-bold">CLIENTE / RAZÓN SOCIAL:</span>
            <strong className="text-sm text-slate-900 block mt-0.5">{cliente}</strong>
            <span className="font-mono text-slate-600 block mt-1">NIT / C.C.: {nit}</span>
            <span className="text-slate-600 block">Teléfono: {telefono}</span>
          </div>

          <div className="sm:text-right">
            <span className="text-slate-400 font-mono text-[10px] uppercase block font-bold">LUGAR DE ENTREGA:</span>
            <span className="text-sm font-semibold text-slate-900 block mt-0.5">{direccion}</span>
            <span className="text-slate-500 block mt-1">Despacho desde: Patio Fontibón</span>
            <span className="text-emerald-700 font-mono font-bold block mt-1">Estado de Pago: Confirmado</span>
          </div>
        </div>

        {/* TABLA DE ÍTEMS Y MERCANCÍA */}
        <div className="py-6">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-800 text-slate-700">
                <th className="py-2.5">CANT.</th>
                <th className="py-2.5">DESCRIPCIÓN DE LA MERCANCÍA</th>
                <th className="py-2.5 text-right">VALOR UNIT.</th>
                <th className="py-2.5 text-right">VALOR TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="py-3 font-bold text-center sm:text-left">{cantidad}</td>
                <td className="py-3 font-sans">
                  <strong className="block text-slate-900">{producto}</strong>
                  <span className="text-[11px] text-slate-500">Materia prima seleccionada y rectificada en patio Fontibón</span>
                </td>
                <td className="py-3 text-right">${precioUnitario.toLocaleString("es-CO")}</td>
                <td className="py-3 text-right font-bold">${subtotalMercancia.toLocaleString("es-CO")}</td>
              </tr>
              {flete > 0 && (
                <tr>
                  <td className="py-3 font-bold text-center sm:text-left">1</td>
                  <td className="py-3 font-sans">
                    <strong className="block text-slate-900">Servicio de Flete y Transporte Pesado</strong>
                    <span className="text-[11px] text-slate-500">Cargue en patio y entrega en destino acordado</span>
                  </td>
                  <td className="py-3 text-right">${flete.toLocaleString("es-CO")}</td>
                  <td className="py-3 text-right font-bold">${flete.toLocaleString("es-CO")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TOTALES */}
        <div className="border-t-2 border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-start gap-4 font-mono text-xs">
          <div className="text-[11px] text-slate-500 max-w-sm">
            <p><strong>Observaciones:</strong> Esta factura de venta / remisión constituye constancia de entrega de la mercancía. Cualquier reclamo debe realizarse dentro de los 5 días hábiles conforme a la Ley 1480 de 2011.</p>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-right">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal Mercancía:</span>
              <span>${subtotalMercancia.toLocaleString("es-CO")}</span>
            </div>
            {flete > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Flete de Transporte:</span>
                <span>${flete.toLocaleString("es-CO")}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black text-[#1B4332] pt-2 border-t-2 border-slate-800">
              <span>TOTAL PAGADO:</span>
              <span>${total.toLocaleString("es-CO")} COP</span>
            </div>
          </div>
        </div>

        {/* FIRMAS DE CONFORMIDAD */}
        <div className="grid grid-cols-2 gap-8 pt-16 mt-8 border-t border-dashed border-slate-300 font-mono text-xs text-center">
          <div>
            <div className="border-t border-slate-700 w-3/4 mx-auto pt-2">
              <strong>Alexander Torres</strong>
              <span className="block text-[10px] text-slate-500">Recuperadora Las Brisas • Vendedor</span>
            </div>
          </div>
          <div>
            <div className="border-t border-slate-700 w-3/4 mx-auto pt-2">
              <strong>Firma y Cédula de Quien Recibe</strong>
              <span className="block text-[10px] text-slate-500">Recibido a Conformidad en Destino</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function FacturaPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-mono">Cargando factura...</div>}>
      <FacturaContenido />
    </Suspense>
  );
}