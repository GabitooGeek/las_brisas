import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Logo from "@/components/Logo";
import { Phone, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Recuperadora Las Brisas | Maderas, Estibas, Metales y Esmeraldas",
  description: "Comercialización de estibas, maderas dimensionadas, metales y esmeraldas en Fontibón, Bogotá D.C. NIT: 80.160.322-3",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col justify-between antialiased overflow-x-hidden bg-[#F8FAFC]">
        
        {/* BARRA SUPERIOR COMPACTA */}
        <div className="bg-[#0F172A] text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800 font-mono">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
            
            <div className="flex items-center space-x-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
              <span className="truncate">Patio Fontibón: Av. Calle 24 #128-15, Bogotá D.C.</span>
            </div>
            
            <div className="flex items-center space-x-3 shrink-0">
              <a href="tel:3042394091" className="text-amber-400 font-bold flex items-center gap-1 hover:underline">
                <Phone className="w-3 h-3" />
                <span>304 239 4091</span>
              </a>
            </div>

          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <Navbar />

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* BOTONES FLOTANTES REDES SOCIALES (FACEBOOK, INSTAGRAM, WHATSAPP) */}
        <WhatsAppButton />

        {/* FOOTER CORPORATIVO OSCURO Y LIMPIO */}
        <footer className="bg-[#0F172A] text-slate-400 py-12 px-6 border-t border-slate-800 text-xs mt-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            {/* Columna 1: Empresa */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Logo className="w-8 h-8" />
                <span className="font-bold text-white text-base">Las Brisas</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Recuperadora de maderas, estibas, plásticos, metales, remates industriales y esmeraldas colombianas en Fontibón.
              </p>
              <p className="font-mono text-slate-500 text-[11px]">NIT: 80.160.322-3</p>
            </div>

            {/* Columna 2: Contacto */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
                Atención en Patio
              </h4>
              <p className="text-slate-300 font-medium">Alexander Torres (Propietario)</p>
              <a href="tel:3042394091" className="text-emerald-400 font-mono font-bold block mt-1 hover:underline">
                📞 304 239 4091
              </a>
              <p className="text-slate-400 text-xs mt-1">Av. Calle 24 #128-15, Fontibón</p>
              <span className="text-amber-400 font-mono text-[10px] block mt-2">✓ Despacho en Turbos y Mulas</span>
            </div>

            {/* Columna 3: Divisiones */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
                Divisiones
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><Link href="/catalogo" className="hover:text-white transition">Estibas & Maderas</Link></li>
                <li><Link href="/acabados" className="hover:text-white transition">Acabados & Muebles Rústicos</Link></li>
                <li><Link href="/metales-remates" className="hover:text-white transition">Metales & Remates Industriales</Link></li>
                <li><Link href="/esmeraldas" className="hover:text-white transition">Esmeraldas Certificadas RUCOM</Link></li>
                <li><Link href="/cubicador" className="hover:text-white transition">Calculadora de Cubicaje</Link></li>
              </ul>
            </div>

            {/* Columna 4: Legal SIC */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
                Marco Legal & SIC
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
                    <Scale className="w-3.5 h-3.5" /> Vigilado SIC (Ley 1480)
                  </a>
                </li>
                <li><Link href="/pqrs" className="hover:text-white transition">Radicar PQRS y Retracto</Link></li>
                <li><span className="text-slate-500">Habeas Data (Ley 1581 de 2012)</span></li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2 font-mono">
            <span>© 2026 Recuperadora Las Brisas. Todos los derechos reservados.</span>
            <span>Fontibón - Bogotá D.C., Colombia</span>
          </div>
        </footer>

      </body>
    </html>
  );
}