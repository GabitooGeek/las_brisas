import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Logo from "@/components/Logo";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Phone, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Recuperadora Las Brisas | Maderas, Estibas, Metales y Esmeraldas",
  description: "Comercialización de estibas, maderas dimensionadas, metales, remates y esmeraldas en Fontibón, Bogotá D.C. NIT: 80.160.322-3",
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
      <body className="min-h-screen flex flex-col justify-between antialiased">
        
        {/* BARRA SUPERIOR CON REDES SOCIALES Y TELÉFONOS */}
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
            
            <div className="flex items-center space-x-5">
              {/* ENLACES A REDES SOCIALES */}
              <div className="flex items-center space-x-3 pr-3 border-r border-slate-700">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition"
                  aria-label="Facebook Las Brisas"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400 transition"
                  aria-label="Instagram Las Brisas"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* WhatsApp Directo */}
                <a
                  href="https://wa.me/573223989414?text=Hola,%20contacto%20desde%20la%20web%20de%20Las%20Brisas"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition"
                  aria-label="WhatsApp Las Brisas"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                </a>
              </div>

              {/* Teléfonos */}
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Alexander Torres (Propietario): <strong className="text-white">320 310 0664</strong></span>
              </span>
            </div>

          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
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

            <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Link href="/catalogo" className="hover:text-[#1B4332] transition">
                Estibas & Madera
              </Link>
              <Link href="/acabados" className="text-amber-800 hover:text-amber-900 transition flex items-center gap-1">
                <span>Acabados & Muebles</span>
              </Link>
              <Link href="/metales-remates" className="text-slate-800 hover:text-amber-800 transition">
                Metales & Remates
              </Link>
              <Link href="/esmeraldas" className="text-emerald-800 hover:text-emerald-900 transition flex items-center gap-1">
                <span>💎 Esmeraldas</span>
              </Link>
              <Link href="/cubicador" className="hover:text-[#1B4332] transition">
                Cubicador
              </Link>
            </nav>

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

        {/* CONTENIDO DE LA PÁGINA */}
        <main className="flex-1">
          {children}
        </main>

        {/* BOTÓN FLOTANTE DE WHATSAPP CON SPEED-DIAL */}
        <WhatsAppButton />

        {/* FOOTER CORPORATIVO CON REDES SOCIALES */}
        <footer className="bg-[#0F172A] text-slate-400 py-12 px-6 border-t border-slate-800 text-xs mt-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            {/* Columna 1 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Logo className="w-8 h-8" />
                <span className="font-bold text-white text-base">Las Brisas</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Recuperadora de maderas, estibas, plásticos, metales, remates industriales y esmeraldas colombianas en Fontibón.
              </p>
              <p className="font-mono text-slate-500">NIT: 80.160.322-3</p>
            </div>

            {/* Columna 2 */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Atención & Despachos</h4>
              <p className="text-slate-400">Patio: Av. Calle 24 #128-15, Fontibón, Bogotá D.C.</p>
              <p className="text-slate-300 font-semibold mt-1">Alexander Torres (Gerencia General): 320 310 0664</p>
              <span className="text-emerald-400 font-mono text-[11px] block mt-2">✓ Flota propia: Turbos y Mulas</span>
            </div>

            {/* Columna 3: REDES SOCIALES OFICIALES */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Síguenos en Redes</h4>
              <div className="space-y-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition"
                >
                  <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">f</span>
                  <span>Facebook / Recuperadora Las Brisas</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition"
                >
                  <span className="w-7 h-7 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">IG</span>
                  <span>Instagram @lasbrisas_maderas</span>
                </a>
                <a
                  href="https://wa.me/573223989414"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition"
                >
                  <span className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">WA</span>
                  <span>WhatsApp Línea Comercial Fontibón</span>
                </a>
              </div>
            </div>

            {/* Columna 4: SIC Y LEGAL */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Marco Legal & SIC</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5" /> Portal Superintendencia (SIC)
                  </a>
                </li>
                <li><Link href="/pqrs" className="hover:text-white">Radicar PQRS y Retracto (Ley 1480)</Link></li>
                <li><span className="text-slate-500">Habeas Data (Ley 1581 de 2012)</span></li>
                <li><span className="text-slate-500">Factura Electrónica UBL 2.1 DIAN</span></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
            <span>© 2026 Recuperadora Las Brisas. Todos los derechos reservados.</span>
            <span className="font-mono">Fontibón - Bogotá D.C., Colombia</span>
          </div>
        </footer>

      </body>
    </html>
  );
}