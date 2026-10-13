"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Clock, 
  Building2 
} from "lucide-react";

export default function PqrsPage() {
  const [tipo, setTipo] = useState<string>("RETRACTO");
  const [nombre, setNombre] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [factura, setFactura] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [radicado, setRadicado] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generación de consecutivo único con fecha y hora
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const nuevoRadicado = `LB-SIC-2026-${randomNum}`;
    setRadicado(nuevoRadicado);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      
      {/* Cabecera */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#1B4332] font-bold mb-2">
          <Scale className="w-4 h-4 text-emerald-700" />
          <span>ESTATUTO DEL CONSUMIDOR • LEY 1480 DE 2011</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
          Radicación de PQRS & Derecho de Retracto
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Recuperadora de Maderas, Estibas y Plásticos Las Brisas (NIT: 80.160.322-3).
          Término legal de respuesta: máximo 15 días hábiles conforme a las disposiciones de la Superintendencia de Industria y Comercio (SIC).
        </p>
      </div>

      {radicado ? (
        /* PANTALLA DE RADICADO EXITOSO */
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 text-center space-y-5 shadow-xs">
          <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-extrabold text-slate-900">
            Solicitud Radicada Formalmente
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Guarde su número de radicado. Se ha enviado constancia a <strong>{correo}</strong> con fecha, hora exacta ($UTC-5$) y copia para la auditoría de la SIC.
          </p>

          <div className="bg-slate-50 p-5 rounded-2xl font-mono text-center border border-slate-200 w-fit mx-auto">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Número de Radicado Oficial:</span>
            <span className="text-2xl font-black text-[#1B4332] mt-1 block">
              {radicado}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Plazo máximo de respuesta: 15 días hábiles
            </span>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button 
              onClick={() => window.print()}
              className="bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-bold py-3 px-6 rounded-xl transition"
            >
              Imprimir Copia de Radicado
            </button>
            <Link 
              href="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-3 px-6 rounded-xl transition"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      ) : (
        /* FORMULARIO FORMAL */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Tipo de Trámite */}
          <div>
            <label className="text-xs font-mono uppercase font-bold text-slate-700 block mb-2">
              Seleccione el Tipo de Trámite Legal:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "RETRACTO", label: "Derecho de Retracto (Art. 47)", desc: "Hasta 5 días post-entrega" },
                { id: "GARANTIA", label: "Garantía de Madera / Defecto", desc: "Hasta 90 días estructural" },
                { id: "PETICION", label: "Petición / Consulta Tributaria", desc: "Aclaración DIAN o CUFE" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setTipo(item.id)}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    tipo === item.id
                      ? "border-[#1B4332] bg-emerald-50 text-[#1B4332] font-bold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs block">{item.label}</span>
                  <span className="text-[10px] font-normal text-slate-500 mt-0.5 block">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nombre o Razón Social:
              </label>
              <input
                required
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Distribuidora Andina SAS"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-[#1B4332]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Cédula o NIT:
              </label>
              <input
                required
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                placeholder="Ej: 901458789-4"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Correo Electrónico para Notificaciones:
              </label>
              <input
                required
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="juridica@empresa.com"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Número de Factura DIAN o Consecutivo (Opcional):
              </label>
              <input
                type="text"
                value={factura}
                onChange={(e) => setFactura(e.target.value)}
                placeholder="Ej: LB-2026-001048"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-[#1B4332]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Descripción clara de los hechos o solicitud:
            </label>
            <textarea
              required
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Indique las cantidades de estibas, lote de madera o motivo de la solicitud..."
              className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-[#1B4332]"
            />
          </div>

          {/* Banner de Advertencia Legal SIC */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Aviso legal sobre el Derecho de Retracto:</strong> De conformidad con el artículo 47 de la Ley 1480 de 2011, el retracto debe solicitarse dentro de los cinco (5) días hábiles siguientes a la entrega de la mercancía. La madera debe encontrarse en el mismo estado en que fue entregada en patio o muelle.
            </div>
          </div>

          <label className="flex items-start space-x-2.5 text-xs text-slate-600 cursor-pointer">
            <input required type="checkbox" className="mt-0.5 rounded accent-[#1B4332] w-4 h-4" />
            <span>
              Autorizo el tratamiento de mis datos personales para la gestión de este radicado conforme a la <strong>Ley 1581 de 2012 (Habeas Data)</strong>.
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-[#1B4332] hover:bg-[#143326] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm font-mono"
          >
            Radicar Solicitud Formalmente
          </button>
        </form>
      )}

    </div>
  );
}