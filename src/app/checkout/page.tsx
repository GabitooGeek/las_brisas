"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Upload, 
  CheckCircle2, 
  Truck, 
  Building2, 
  User, 
  FileCheck,
  CreditCard
} from "lucide-react";

// Algoritmo oficial DIAN Módulo 11 para calcular el Dígito de Verificación
function calcularDV(nit: string): number {
  const nitLimpio = nit.replace(/\D/g, "");
  if (!nitLimpio) return 0;

  const factores = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
  const longitud = nitLimpio.length;
  let suma = 0;

  for (let i = 0; i < longitud; i++) {
    const digito = parseInt(nitLimpio.charAt(longitud - 1 - i), 10);
    suma += digito * factores[14 - i];
  }

  const residuo = suma % 11;
  if (residuo === 0 || residuo === 1) return residuo;
  return 11 - residuo;
}

export default function CheckoutPage() {
  // Estados fiscales
  const [tipoCliente, setTipoCliente] = useState<"PJ" | "PN">("PJ");
  const [nit, setNit] = useState<string>("901458789");
  const [razonSocial, setRazonSocial] = useState<string>("LOGÍSTICA Y ALMACENAMIENTO ANDINO SAS");
  const [emailFactura, setEmailFactura] = useState<string>("facturacion@andinolog.com");
  const [rutCargado, setRutCargado] = useState<boolean>(true);

  // Estados logísticos
  const [modalidadEntrega, setModalidadEntrega] = useState<"FLOTA" | "PATIO">("FLOTA");
  const [destino, setDestino] = useState<string>("Funza, Cundinamarca");
  const [direccion, setDireccion] = useState<string>("Parque Industrial San Carlos, Bodega 4");

  // Estados tributarios
  const [esGranContribuyente, setEsGranContribuyente] = useState<boolean>(true);
  const [metodoPago, setMetodoPago] = useState<"PSE" | "CARD">("PSE");
  const [ordenPagada, setOrdenPagada] = useState<boolean>(false);

  // Cálculo en vivo del Dígito de Verificación
  const dvCalculado = useMemo(() => calcularDV(nit), [nit]);

  // Liquidación Financiera Oficial (Base 150 estibas Grado A)
  const liquidacion = useMemo(() => {
    const baseMercancia = 4416000;
    const flete = modalidadEntrega === "FLOTA" ? 340000 : 0;
    const subtotalGravable = baseMercancia + flete;
    const iva19 = Math.round(subtotalGravable * 0.19);
    
    // Retención en la fuente (2.5%) si es Gran Contribuyente
    const retefuente = esGranContribuyente ? Math.round(baseMercancia * 0.025) : 0;
    const totalPagar = subtotalGravable + iva19 - retefuente;

    return {
      baseMercancia,
      flete,
      subtotalGravable,
      iva19,
      retefuente,
      totalPagar,
    };
  }, [modalidadEntrega, esGranContribuyente]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Cabecera del Checkout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
            Plataforma Transaccional B2B / B2C
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Checkout Seguro & Facturación Electrónica DIAN
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-emerald-50 text-[#1B4332] px-3.5 py-1.5 rounded-full border border-emerald-200 font-semibold">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span>Cifrado TLS 1.3 • NIT: 80.160.322-3</span>
        </div>
      </div>

      {ordenPagada ? (
        /* PANTALLA DE ÉXITO POST-PAGO CON TIMBRADO DIAN */
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-10 text-center max-w-2xl mx-auto space-y-5 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            ¡Pago Aprobado y Factura DIAN Emitida!
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Se ha generado la Factura Electrónica de Venta para <strong>{razonSocial}</strong>. El documento XML UBL 2.1 y la representación gráfica han sido transmitidos a su buzón registrado.
          </p>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left font-mono text-xs space-y-1.5">
            <div><strong>Prefijo y Consecutivo:</strong> LB-2026-001048</div>
            <div className="break-all"><strong>CUFE:</strong> a8f9c17e4b9012356d8174520938475628194017263548192039485761</div>
            <div><strong>Total Liquidado:</strong> ${liquidacion.totalPagar.toLocaleString("es-CO")} COP</div>
            <div><strong>Despacho:</strong> Patio Fontibón → {destino}</div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.print()}
              className="bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-bold py-3 px-6 rounded-xl transition"
            >
              Descargar Factura PDF (Con QR DIAN)
            </button>
            <Link 
              href="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-3 px-6 rounded-xl transition text-center"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      ) : (
        /* FORMULARIO DE CHECKOUT EN 2 COLUMNAS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO LEGAL Y LOGÍSTICA (7 COLUMNAS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* PASO 1: DATOS FISCALES */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-5">
                <Building2 className="w-5 h-5 text-[#1B4332]" />
                <h2 className="font-bold text-slate-900 text-base">
                  Paso 1: Identificación Tributaria (DIAN)
                </h2>
              </div>

              {/* Selector Persona Jurídica / Natural */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setTipoCliente("PN")}
                  className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition ${
                    tipoCliente === "PN"
                      ? "border-[#1B4332] bg-emerald-50 text-[#1B4332]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <User className="w-4 h-4" /> Persona Natural (CC)
                </button>
                <button
                  type="button"
                  onClick={() => setTipoCliente("PJ")}
                  className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition ${
                    tipoCliente === "PJ"
                      ? "border-[#1B4332] bg-emerald-50 text-[#1B4332]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Building2 className="w-4 h-4" /> Empresa (NIT)
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Razón Social (Registrada en Cámara de Comercio):
                  </label>
                  <input
                    type="text"
                    value={razonSocial}
                    onChange={(e) => setRazonSocial(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm font-medium focus:outline-[#1B4332]"
                  />
                </div>

                {/* NIT CON CÁLCULO DE DV AUTOMÁTICO */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-9">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      NIT (Escribe el NIT sin guiones):
                    </label>
                    <input
                      type="text"
                      value={nit}
                      onChange={(e) => setNit(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono font-bold focus:outline-[#1B4332]"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      DV (Módulo 11):
                    </label>
                    <div className="w-full bg-emerald-100 border border-emerald-300 text-[#1B4332] font-mono font-black text-center rounded-xl p-3 text-sm">
                      {dvCalculado}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Correo para Recepción de Facturación Electrónica DIAN:
                  </label>
                  <input
                    type="email"
                    value={emailFactura}
                    onChange={(e) => setEmailFactura(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
                  />
                </div>

                {/* Carga de RUT */}
                <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-700">
                    <FileCheck className="w-4 h-4 text-emerald-700" />
                    <span>RUT_Empresa_Actualizado_2026.pdf (Cargado)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                    Validado para emisión legal
                  </span>
                </div>
              </div>
            </div>

            {/* PASO 2: LOGÍSTICA DE CARGA PESADA */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-5">
                <Truck className="w-5 h-5 text-[#1B4332]" />
                <h2 className="font-bold text-slate-900 text-base">
                  Paso 2: Modalidad de Entrega y Carga Pesada
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setModalidadEntrega("FLOTA")}
                  className={`p-3 rounded-2xl border text-left transition ${
                    modalidadEntrega === "FLOTA"
                      ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs block">Despacho con Flota Las Brisas</span>
                  <span className="text-[11px] font-normal text-slate-500">Camión Sencillo a muelle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalidadEntrega("PATIO")}
                  className={`p-3 rounded-2xl border text-left transition ${
                    modalidadEntrega === "PATIO"
                      ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs block">Retiro en Patio Fontibón</span>
                  <span className="text-[11px] font-normal text-emerald-700 font-semibold">Gratis ($0 COP)</span>
                </button>
              </div>

              {modalidadEntrega === "FLOTA" && (
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Dirección de Muelle / Centro de Distribución:
                    </label>
                    <input
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-[#1B4332]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Municipio / Departamento:
                    </label>
                    <input
                      type="text"
                      value={destino}
                      onChange={(e) => setDestino(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-[#1B4332]"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* COLUMNA DERECHA: LIQUIDACIÓN FISCAL Y PAGO (5 COLUMNAS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs sticky top-24">
              
              <h3 className="font-extrabold text-slate-900 text-lg pb-3 border-b border-slate-100">
                Liquidación Oficial de Orden
              </h3>

              {/* Items del pedido */}
              <div className="py-4 space-y-2.5 text-xs font-mono border-b border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-600">150× Estibas Grado A (Patio):</span>
                  <strong className="text-slate-900">${liquidacion.baseMercancia.toLocaleString("es-CO")}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Flete Especializado:</span>
                  <strong className="text-slate-900">${liquidacion.flete.toLocaleString("es-CO")}</strong>
                </div>
              </div>

              {/* Impuestos DIAN */}
              <div className="py-4 space-y-2 text-xs font-mono border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Gravable:</span>
                  <span>${liquidacion.subtotalGravable.toLocaleString("es-CO")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>IVA Liquidado (19%):</span>
                  <span>${liquidacion.iva19.toLocaleString("es-CO")}</span>
                </div>

                <div className="pt-2">
                  <label className="flex items-center space-x-2 text-[11px] text-slate-700 cursor-pointer mb-1">
                    <input
                      type="checkbox"
                      checked={esGranContribuyente}
                      onChange={(e) => setEsGranContribuyente(e.target.checked)}
                      className="rounded accent-[#1B4332] w-3.5 h-3.5"
                    />
                    <span>Empresa es Agente de Retención (ReteFuente)</span>
                  </label>
                  {esGranContribuyente && (
                    <div className="flex justify-between text-emerald-800 bg-emerald-50 p-2 rounded-xl font-bold">
                      <span>ReteFuente (-2.5%):</span>
                      <span>-${liquidacion.retefuente.toLocaleString("es-CO")} COP</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Final */}
              <div className="py-4 flex justify-between items-baseline">
                <span className="font-bold text-slate-800 text-sm uppercase font-mono">Total a Pagar:</span>
                <span className="text-2xl font-black font-mono text-[#1B4332]">
                  ${liquidacion.totalPagar.toLocaleString("es-CO")} COP
                </span>
              </div>

              {/* Pasarela de Pagos */}
              <div className="space-y-2 mb-5">
                <label className="flex items-center p-3 border-2 border-[#1B4332] bg-emerald-50/50 rounded-2xl cursor-pointer">
                  <input
                    type="radio"
                    name="pago"
                    checked={metodoPago === "PSE"}
                    onChange={() => setMetodoPago("PSE")}
                    className="accent-[#1B4332]"
                  />
                  <span className="ml-2.5 text-xs font-bold text-[#1B4332]">
                    PSE (Débito a Cuentas Corrientes y de Ahorros)
                  </span>
                </label>
                <label className="flex items-center p-3 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="pago"
                    checked={metodoPago === "CARD"}
                    onChange={() => setMetodoPago("CARD")}
                    className="accent-[#1B4332]"
                  />
                  <span className="ml-2.5 text-xs font-medium text-slate-700">
                    Tarjeta de Crédito Corporativa
                  </span>
                </label>
              </div>

              {/* Botón de Confirmación */}
              <button
                type="button"
                onClick={() => setOrdenPagada(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm font-mono"
              >
                Pagar con PSE & Emitir Factura DIAN
              </button>

              <div className="mt-4 text-center text-[10px] text-slate-400 font-mono">
                Vigilado Superintendencia de Industria y Comercio • DIAN 2026
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}