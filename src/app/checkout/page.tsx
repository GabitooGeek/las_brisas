"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Lock, 
  CheckCircle2, 
  Truck, 
  Building2, 
  User, 
  FileCheck,
  CreditCard,
  Building,
  UploadCloud,
  FileText
} from "lucide-react";

// Algoritmo oficial DIAN Módulo 11
function calcularDV(nit: string): number {
  const nitLimpio = nit.replace(/\D/g, "");
  if (!nitLimpio) return 0;
  const factores = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
  const longitud = nitLimpio.length;
  let suma = 0;
  for (let i = 0; i < longitud; i++) {
    suma += parseInt(nitLimpio.charAt(longitud - 1 - i), 10) * factores[14 - i];
  }
  const residuo = suma % 11;
  return residuo === 0 || residuo === 1 ? residuo : 11 - residuo;
}

const BANCOS_COLOMBIA = [
  "Bancolombia",
  "Davivienda",
  "Banco de Bogotá",
  "Banco BBVA Colombia",
  "Banco de Occidente",
  "Scotiabank Colpatria",
  "Banco Agrario de Colombia",
  "Banco Itaú",
  "Nequi",
  "Daviplata",
];

export default function CheckoutPage() {
  // Datos fiscales
  const [tipoCliente, setTipoCliente] = useState<"PJ" | "PN">("PJ");
  const [nit, setNit] = useState<string>("901458789");
  const [razonSocial, setRazonSocial] = useState<string>("LOGÍSTICA Y ALMACENAMIENTO ANDINO SAS");
  const [emailFactura, setEmailFactura] = useState<string>("facturacion@andinolog.com");

  // Logística
  const [modalidadEntrega, setModalidadEntrega] = useState<"FLOTA" | "PATIO">("FLOTA");
  const [destino, setDestino] = useState<string>("Funza, Cundinamarca");
  const [direccion, setDireccion] = useState<string>("Parque Industrial San Carlos, Bodega 4");

  // Tributario
  const [esGranContribuyente, setEsGranContribuyente] = useState<boolean>(true);

  // MÉTODOS DE PAGO COLOMBIANOS
  const [metodoPago, setMetodoPago] = useState<"PSE" | "TRANSFERENCIA" | "CARD">("PSE");
  const [bancoSeleccionado, setBancoSeleccionado] = useState<string>("Bancolombia");
  const [emailPSE, setEmailPSE] = useState<string>("tesoreria@andinolog.com");
  const [numComprobante, setNumComprobante] = useState<string>("");
  const [ordenPagada, setOrdenPagada] = useState<boolean>(false);

  const dvCalculado = useMemo(() => calcularDV(nit), [nit]);

  // Liquidación
  const liquidacion = useMemo(() => {
    const baseMercancia = 4416000;
    const flete = modalidadEntrega === "FLOTA" ? 340000 : 0;
    const subtotalGravable = baseMercancia + flete;
    const iva19 = Math.round(subtotalGravable * 0.19);
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
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
            Plataforma Transaccional B2B / B2C
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Pasarela Transaccional & Emisión DIAN
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-emerald-50 text-[#1B4332] px-3.5 py-1.5 rounded-full border border-emerald-200 font-semibold">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span>Cifrado TLS 1.3 • NIT: 80.160.322-3</span>
        </div>
      </div>

      {ordenPagada ? (
        /* PANTALLA DE ÉXITO POST-PAGO */
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-10 text-center max-w-2xl mx-auto space-y-5 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            ¡Pago Aprobado y Factura DIAN Emitida!
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Se ha verificado el pago por medio de <strong>{metodoPago === "PSE" ? `PSE (${bancoSeleccionado})` : metodoPago === "TRANSFERENCIA" ? "Transferencia Bancaria Bancolombia" : "Tarjeta de Crédito"}</strong> para <strong>{razonSocial}</strong>.
          </p>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left font-mono text-xs space-y-2">
            <div><strong>Consecutivo Oficial:</strong> LB-2026-001048</div>
            <div><strong>Método de Pago:</strong> {metodoPago === "PSE" ? `PSE - Debitado de ${bancoSeleccionado}` : `Transferencia Ref: ${numComprobante || "TF-98471"}`}</div>
            <div className="break-all"><strong>CUFE DIAN:</strong> a8f9c17e4b9012356d8174520938475628194017263548192039485761</div>
            <div><strong>Total Cancelado:</strong> ${liquidacion.totalPagar.toLocaleString("es-CO")} COP</div>
            <div><strong>Ruta de Despacho:</strong> Patio Fontibón → {destino}</div>
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
        /* FORMULARIO EN 2 COLUMNAS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: DATOS FISCALES Y DESTINO (7 COLUMNAS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* PASO 1: DATOS FISCALES */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-5">
                <Building2 className="w-5 h-5 text-[#1B4332]" />
                <h2 className="font-bold text-slate-900 text-base">
                  Paso 1: Datos para la Factura Electrónica
                </h2>
              </div>

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

                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-9">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      NIT (Escribe el número sin guiones):
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
                      DV (DIAN):
                    </label>
                    <div className="w-full bg-emerald-100 border border-emerald-300 text-[#1B4332] font-mono font-black text-center rounded-xl p-3 text-sm">
                      {dvCalculado}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Correo para Recepción de Facturación DIAN:
                  </label>
                  <input
                    type="email"
                    value={emailFactura}
                    onChange={(e) => setEmailFactura(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
                  />
                </div>
              </div>
            </div>

            {/* PASO 2: LOGÍSTICA DE CARGA PESADA */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-5">
                <Truck className="w-5 h-5 text-[#1B4332]" />
                <h2 className="font-bold text-slate-900 text-base">
                  Paso 2: Modalidad de Entrega
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
                  <span className="text-[11px] font-normal text-slate-500">Camión Sencillo a bodega</span>
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
                      Dirección de Muelle / Bodega:
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

          {/* COLUMNA DERECHA: SELECCIÓN DE CUENTA, BANCO Y PAGO (5 COLUMNAS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs sticky top-24">
              
              <h3 className="font-extrabold text-slate-900 text-lg pb-3 border-b border-slate-100">
                Paso 3: Método de Pago & Cuentas
              </h3>

              {/* SELECTOR DE PAGO COLOMBIANO */}
              <div className="grid grid-cols-3 gap-2 my-4 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setMetodoPago("PSE")}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    metodoPago === "PSE"
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  PSE Bancos
                </button>
                <button
                  type="button"
                  onClick={() => setMetodoPago("TRANSFERENCIA")}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    metodoPago === "TRANSFERENCIA"
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  Transferencia
                </button>
                <button
                  type="button"
                  onClick={() => setMetodoPago("CARD")}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    metodoPago === "CARD"
                      ? "bg-[#1B4332] text-white border-[#1B4332] font-bold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  Tarjeta
                </button>
              </div>

              {/* OPCIÓN 1: PSE */}
              {metodoPago === "PSE" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Selecciona tu Banco Colombiano:
                    </label>
                    <select
                      value={bancoSeleccionado}
                      onChange={(e) => setBancoSeleccionado(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-semibold focus:outline-[#1B4332]"
                    >
                      {BANCOS_COLOMBIA.map((banco) => (
                        <option key={banco} value={banco}>{banco}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Correo registrado en PSE:
                    </label>
                    <input
                      type="email"
                      value={emailPSE}
                      onChange={(e) => setEmailPSE(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-mono focus:outline-[#1B4332]"
                    />
                  </div>
                </div>
              )}

              {/* OPCIÓN 2: TRANSFERENCIA BANCARIA DIRECTA (DATOS DE LAS BRISAS) */}
              {metodoPago === "TRANSFERENCIA" && (
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3 mb-4 text-xs font-mono">
                  <div className="text-amber-950 font-bold flex items-center gap-1.5 pb-2 border-b border-amber-200">
                    <Building className="w-4 h-4 text-amber-700" />
                    Cuenta Oficial de Las Brisas:
                  </div>
                  <div className="space-y-1 text-slate-700">
                    <div><strong>Banco:</strong> BANCOLOMBIA</div>
                    <div><strong>Tipo:</strong> Cuenta Corriente Empresarial</div>
                    <div><strong>Número:</strong> <span className="text-base font-extrabold text-[#1B4332]">031-8016032-23</span></div>
                    <div><strong>Titular:</strong> Recuperadora Las Brisas</div>
                    <div><strong>NIT:</strong> 80.160.322-3</div>
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Ingresa el Número de Aprobación / Comprobante:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: TF-9847192"
                      value={numComprobante}
                      onChange={(e) => setNumComprobante(e.target.value)}
                      className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-mono focus:outline-[#1B4332]"
                    />
                  </div>
                </div>
              )}

              {/* OPCIÓN 3: TARJETA DE CRÉDITO */}
              {metodoPago === "CARD" && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 mb-4 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1">Número de Tarjeta:</label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 block mb-1">Vence (MM/AA):</label>
                      <input type="text" placeholder="12/28" className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono" />
                    </div>
                    <div>
                      <label className="text-slate-600 block mb-1">CVC:</label>
                      <input type="text" placeholder="123" className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono" />
                    </div>
                  </div>
                </div>
              )}

              {/* RESUMEN DE LIQUIDACIÓN */}
              <div className="py-3 space-y-2 text-xs font-mono border-t border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Gravable:</span>
                  <span>${liquidacion.subtotalGravable.toLocaleString("es-CO")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>IVA Liquidado (19%):</span>
                  <span>${liquidacion.iva19.toLocaleString("es-CO")}</span>
                </div>
                {esGranContribuyente && (
                  <div className="flex justify-between text-emerald-800 bg-emerald-50 p-2 rounded-xl font-bold">
                    <span>ReteFuente (-2.5%):</span>
                    <span>-${liquidacion.retefuente.toLocaleString("es-CO")} COP</span>
                  </div>
                )}
              </div>

              {/* Total Final */}
              <div className="py-4 flex justify-between items-baseline">
                <span className="font-bold text-slate-800 text-sm uppercase font-mono">Total a Pagar:</span>
                <span className="text-2xl font-black font-mono text-[#1B4332]">
                  ${liquidacion.totalPagar.toLocaleString("es-CO")} COP
                </span>
              </div>

              {/* BOTÓN FINAL */}
              <button
                type="button"
                onClick={() => setOrdenPagada(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm font-mono"
              >
                {metodoPago === "PSE"
                  ? `Pagar con PSE (${bancoSeleccionado})`
                  : metodoPago === "TRANSFERENCIA"
                  ? "Confirmar Transferencia Bancolombia"
                  : "Procesar Tarjeta de Crédito"}
              </button>

              <div className="mt-3 text-center text-[10px] text-slate-400 font-mono">
                Factura Electrónica con CUFE emitida de inmediato
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}