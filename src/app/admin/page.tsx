"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Truck, 
  Printer, 
  FileText, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export const dynamic = "force-dynamic";

function AdminPatioContenido() {
  const searchParams = useSearchParams();

  // PIN de seguridad para que el cliente no pueda entrar (Por defecto: 1234)
  const [pin, setPin] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  // Estados del formulario
  const [clienteFactura, setClienteFactura] = useState("");
  const [nitFactura, setNitFactura] = useState("");
  const [telefonoFactura, setTelefonoFactura] = useState("");
  const [productoFactura, setProductoFactura] = useState("");
  const [cantFactura, setCantFactura] = useState("");
  const [precioUnitFactura, setPrecioUnitFactura] = useState("");
  const [fleteFactura, setFleteFactura] = useState("");
  const [dirFactura, setDirFactura] = useState("");

  // AUTO-LLENADO AUTOMÁTICO DESDE EL LINK DE WHATSAPP
  useEffect(() => {
    const c = searchParams.get("cliente");
    const n = searchParams.get("nit");
    const tel = searchParams.get("tel");
    const item = searchParams.get("item");
    const cant = searchParams.get("cant");
    const unit = searchParams.get("unit");
    const flete = searchParams.get("flete");
    const dir = searchParams.get("dir");

    if (c) setClienteFactura(c);
    if (n) setNitFactura(n);
    if (tel) setTelefonoFactura(tel);
    if (item) setProductoFactura(item);
    if (cant) setCantFactura(cant);
    if (unit) setPrecioUnitFactura(unit);
    if (flete) setFleteFactura(flete);
    if (dir) setDirFactura(dir);

    // Si ya inició sesión antes en este teléfono, lo recuerda
    if (localStorage.getItem("admin_las_brisas") === "true") {
      setAutenticado(true);
    }
  }, [searchParams]);

  const verificarPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setAutenticado(true);
      localStorage.setItem("admin_las_brisas", "true");
    } else {
      alert("PIN incorrecto. Solo personal autorizado de Las Brisas.");
    }
  };

  const urlFacturaGenerada = `/factura?cliente=${encodeURIComponent(clienteFactura || "CLIENTE GENERAL")}&nit=${encodeURIComponent(nitFactura || "Sin NIT")}&tel=${encodeURIComponent(telefonoFactura || "")}&item=${encodeURIComponent(productoFactura || "Mercancía")}&cant=${cantFactura || 1}&unit=${precioUnitFactura || 0}&flete=${fleteFactura || 0}&dir=${encodeURIComponent(dirFactura || "Patio Fontibón")}`;

  // SI NO ESTÁ AUTENTICADO: PIDE EL PIN
  if (!autenticado) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border-2 border-slate-300 rounded-3xl shadow-xl text-center font-sans">
        <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Acceso Privado de Patio</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Exclusivo para Alexander Torres. Ingrese su PIN de propietario para emitir la factura.
        </p>

        <form onSubmit={verificarPin} className="space-y-4">
          <input
            type="password"
            maxLength={4}
            placeholder="PIN (Por defecto: 1234)"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full text-center text-2xl font-mono tracking-widest p-3 border-2 border-slate-300 rounded-xl focus:outline-[#1B4332]"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-3 rounded-xl text-xs uppercase font-mono transition"
          >
            Desbloquear Panel
          </button>
        </form>
      </div>
    );
  }

  // SI ESTÁ AUTENTICADO: MUESTRA EL FORMULARIO AUTO-LLENADO
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-sans">
      
      <div className="flex justify-between items-center pb-6 border-b border-slate-200 mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 w-fit">
            <Unlock className="w-3.5 h-3.5" /> Alexander Torres • Propietario
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Mesa de Facturación & Despachos de Patio
          </h1>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("admin_las_brisas");
            setAutenticado(false);
          }}
          className="text-xs font-mono text-slate-400 hover:text-red-600 border border-slate-200 px-3 py-1.5 rounded-xl"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORMULARIO AUTO-LLENADO */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-emerald-700" /> Factura / Remisión de Venta
            </h2>
            {clienteFactura && (
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Datos del Pedido Auto-Llenados
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Cliente / Razón Social:</label>
              <input
                type="text"
                value={clienteFactura}
                onChange={(e) => setClienteFactura(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">NIT / Cédula:</label>
                <input
                  type="text"
                  value={nitFactura}
                  onChange={(e) => setNitFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono font-bold text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Teléfono:</label>
                <input
                  type="text"
                  value={telefonoFactura}
                  onChange={(e) => setTelefonoFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono text-slate-800 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mercancía a Despachar:</label>
              <input
                type="text"
                value={productoFactura}
                onChange={(e) => setProductoFactura(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-semibold text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cantidad:</label>
                <input
                  type="number"
                  value={cantFactura}
                  onChange={(e) => setCantFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono font-black text-slate-900 bg-slate-50"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Precio Unit:</label>
                <input
                  type="number"
                  value={precioUnitFactura}
                  onChange={(e) => setPrecioUnitFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono text-slate-800 bg-slate-50"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Flete:</label>
                <input
                  type="number"
                  value={fleteFactura}
                  onChange={(e) => setFleteFactura(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono text-slate-800 bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Lugar de Entrega:</label>
              <input
                type="text"
                value={dirFactura}
                onChange={(e) => setDirFactura(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 bg-slate-50"
              />
            </div>
          </div>

          {/* BOTÓN DE IMPRESIÓN OFICIAL */}
          <div className="pt-3">
            <Link
              href={urlFacturaGenerada}
              target="_blank"
              className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-4 px-4 rounded-2xl text-xs uppercase font-mono flex items-center justify-center gap-2 transition shadow-lg"
            >
              <Printer className="w-5 h-5" /> Imprimir Factura Física / Guardar en PDF
            </Link>
            <span className="text-[11px] text-slate-500 text-center block mt-2 font-mono">
              Genera la factura oficial membretada para el conductor o enviarla por WhatsApp
            </span>
          </div>
        </div>

        {/* COLUMNA DERECHA: ESTADO DE PATIO */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" /> Instrucciones de Patio
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed font-sans">
              <p>1. Verifique en su aplicación de Bancolombia que la transferencia coincida con el total.</p>
              <p>2. Toque el botón verde <strong>"Imprimir Factura Física"</strong>.</p>
              <p>3. Entregue una copia firmada al chofer del camión para la entrega en bodega.</p>
              <p>4. Si el cliente la necesita digital, guárdela en PDF y envíesela por el chat.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-mono">Cargando panel de administración...</div>}>
      <AdminPatioContenido />
    </Suspense>
  );
}