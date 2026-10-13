import Logo from "@/components/logo";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Phone, MapPin, ShieldCheck, Scale, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Recuperadora Las Brisas | Maderas, Estibas y Plásticos",
  description: "Comercialización de estibas nuevas y recuperadas, maderas dimensionadas y fletes industriales desde Fontibón, Bogotá D.C. NIT: 80.160.322-3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col justify-between antialiased">
        
        {/* BARRA SUPERIOR OPERATIVA */}
        <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500 inline" />
                Patio Fontibón: Av. Calle 24 #128-15, Bogotá D.C.
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-400 font-mono hidden sm:inline">NIT: 80.160.322-3</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Lubia: <strong className="text-white font-mono">322 398 9414</strong></span>
                <span className="text-slate-600">•</span>
                <span>Alexander: <strong className="text-white font-mono">320 310 0664</strong></span>
              </span>
              <span className="bg-[#1B4332] text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase">
                DIAN 2026
              </span>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            {/* Logotipo Corporativo */}
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="w-12 h-12" />
              <div>
                <span className="text-2xl font-black tracking-tight text-[#0F172A] block leading-none">
                  LAS BRISAS
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mt-0.5">
                  Maderas • Metales • Esmeraldas
                </span>
              </div>
            </Link>

            {/* Menú de las 3 Divisiones */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Link href="/catalogo" className="hover:text-[#1B4332] transition">
                Estibas & Madera
              </Link>
              
              {/* NUEVA DIVISIÓN: METALES Y REMATES */}
              <Link href="/metales-remates" className="text-amber-700 hover:text-amber-800 transition flex items-center gap-1">
                <span>Metales & Remates</span>
                <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[9px]">Industrial</span>
              </Link>

              {/* NUEVA DIVISIÓN: ESMERALDAS */}
              <Link href="/esmeraldas" className="text-emerald-800 hover:text-emerald-900 transition flex items-center gap-1">
                <span>💎 Esmeraldas</span>
                <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded text-[9px]">RUCOM</span>
              </Link>

              <Link href="/cubicador" className="hover:text-[#1B4332] transition">
                Cubicador
              </Link>
              <Link href="/pqrs" className="hover:text-[#1B4332] transition">
                PQRS
              </Link>
            </nav>

            {/* Acceso Rápido Checkout / Patio */}
            <div className="flex items-center space-x-3">
              <Link
                href="/checkout"
                className="bg-[#1B4332] hover:bg-[#143326] text-white px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide transition shadow-sm"
              >
                Checkout & Flete
              </Link>
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL DE CADA PÁGINA */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER LEGAL OBLIGATORIO (SIC / LEY 1480 / DIAN) */}
        <footer className="bg-[#0F172A] text-slate-400 py-10 px-6 border-t border-slate-800 text-xs mt-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
            <div>
              <h4 className="text-white font-bold text-sm mb-2">Recuperadora Las Brisas</h4>
              <p className="text-slate-400 leading-relaxed">
                Empresa especializada en economía circular, reacondicionamiento de pallets de madera y plástico, y suministro de madera dimensionada en Bogotá y Cundinamarca.
              </p>
              <p className="font-mono text-slate-500 mt-2">NIT: 80.160.322-3</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-2">Ubicación y Despachos</h4>
              <p className="text-slate-400">Patio de operaciones: Av. Calle 24 #128-15, Fontibón - Las Brisas, Bogotá D.C.</p>
              <p className="text-slate-400 mt-1">Líneas directas: 322 398 9414 / 320 310 0664</p>
              <p className="text-emerald-400 font-mono text-[11px] mt-2">✓ Despacho en Turbos, Sencillos y Tractomulas</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-2">Protección al Consumidor & SIC</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5" /> Portal Superintendencia de Industria y Comercio
                  </a>
                </li>
                <li><Link href="/pqrs" className="hover:text-white">Radicar PQRS y Derecho de Retracto (Ley 1480)</Link></li>
                <li><span className="text-slate-500">Política de Datos Personales (Ley 1581 de 2012)</span></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
            <span>© 2026 Recuperadora Las Brisas. Todos los derechos reservados.</span>
            <span className="font-mono">Facturación Electrónica Validada por la DIAN (UBL 2.1)</span>
          </div>
        </footer>

      </body>
    </html>
  );
}