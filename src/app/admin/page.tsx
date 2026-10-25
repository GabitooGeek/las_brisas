"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Truck, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Printer, 
  Building2, 
  PlusCircle,
  ExternalLink
} from "lucide-react";

export default function AdminPatioPage() {
  // Mini formulario para que Alexander genere la factura cuando le llegue el comprobante
  const [clienteFactura, setClienteFactura] = useState("");
  const [nitFactura, setNitFactura] = useState("");
  const [productoFactura, setProductoFactura] = useState("Estibas de Madera Grado A");
  const [cantFactura, setCantFactura] = useState("100");
  const [precioUnitFactura, setPrecioUnitFactura] = useState("29440");
  const [fleteFactura, setFleteFactura] = useState("180000");
  const [dirFactura, setDirFactura] = useState("Bogotá / Sabana");

  const urlFacturaGenerada = `/factura?cliente=${encodeURIComponent(clienteFactura || "CLIENTE GENERAL")}&nit=${encodeURIComponent(nitFactura || "Sin NIT")}&item=${encodeURIComponent(productoFactura)}&cant=${cantFactura}&unit=${precioUnitFactura}&flete=${fleteFactura}&dir=${encodeURIComponent(dirFactura)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-sans">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
            Panel Exclusivo de Alexander Torres (Propietario)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Mesa de Control de Patio & Generador de Facturas
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Sede: Av. Calle 24 #128-15, Fontibón • Solo uso interno
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* HERRAMIENTA 1: GENERADOR OFICIAL DE FACTURA POST-PAGO (5 Columnas) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border-2 border-emerald-500 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-[#1B4332] pb-3 border-b border-slate-100">
            <Printer className="w-5 h-5 text-emerald-700" />
            <h2 className="font-bold text-base text-slate-900">
              Emitir Factura / Remisión Oficial
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Una vez el cliente le mande el comprobante de transferencia por WhatsApp, llene estos datos y toque el botón para <strong>imprimir la factura física</strong> o <strong>guardarla en PDF</strong> para enviársela.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nombre o Empresa del Cliente:</label>
              <input
                type="text"
                placeholder="Ej: Distribuidora Andina SAS"
                value={clienteFactura}
                onChange={(e) => setClienteFactura(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium focus:outline-[#1B4332]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">NIT o Cédula:</label>
                <input
                  type="text"
                  placeholder="901458789-4"
                  value={nitFactura}
                  onChange={(e) => setNitFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-[#1B4332]"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cantidad de Unidades:</label>
                <input
                  type="number"
                  value={cantFactura}
                  onChange={(e) => setCantFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono font-bold focus:outline-[#1B4332]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Descripción del Producto:</label>
              <input
                type="text"
                value={productoFactura}
                onChange={(e) => setProductoFactura(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium focus:outline-[#1B4332]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Precio Unitario (COP):</label>
                <input
                  type="number"
                  value={precioUnitFactura}
                  onChange={(e) => setPrecioUnitFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-[#1B4332]"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Valor Flete (COP):</label>
                <input
                  type="number"
                  value={fleteFactura}
                  onChange={(e) => setFleteFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono focus:outline-[#1B4332]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Lugar de Entrega / Destino:</label>
              <input
                type="text"
                value={dirFactura}
                onChange={(e) => setDirFactura(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-[#1B4332]"
              />
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={urlFacturaGenerada}
              target="_blank"
              className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase font-mono flex items-center justify-center gap-2 transition shadow-md"
            >
              <FileText className="w-4 h-4" /> Generar & Imprimir Factura Oficial
            </Link>
            <span className="text-[11px] text-slate-500 text-center block mt-1.5 font-mono">
              Abre la hoja membretada con firmas lista para imprimir o PDF
            </span>
          </div>
        </div>

        {/* HERRAMIENTA 2: CONTROL DE DESPACHOS Y CAMIONES (7 Columnas) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-600" /> Flota en Patio Fontibón
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block text-[10px]">VEHÍCULO 1:</span>
                <strong className="text-slate-900 block text-sm">Turbo Placa SPP 837</strong>
                <span className="text-emerald-700 font-bold">Disponible en patio</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block text-[10px]">VEHÍCULO 2:</span>
                <strong className="text-slate-900 block text-sm">Tractomula Blanca</strong>
                <span className="text-blue-700 font-bold">Para viajes nacionales</span>
              </div>
            </div>

            <h3 className="font-bold text-slate-800 text-xs uppercase font-mono mt-6 mb-3">
              Últimas Órdenes Registradas para Despacho:
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 block font-sans">Almacenes de la Sabana SAS</strong>
                  <span className="text-slate-500 font-mono text-[11px]">80 Listones Pino • Mosquera</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] px-2 py-1 rounded-md">
                  PAGADO
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 block font-sans">Carrocerías Industriales SAS</strong>
                  <span className="text-slate-500 font-mono text-[11px]">300 Estibas Nuevas • Siberia</span>
                </div>
                <span className="bg-blue-100 text-blue-800 font-mono font-bold text-[10px] px-2 py-1 rounded-md">
                  EN CARGUE
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}