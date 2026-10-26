import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Logo from "@/components/Logo";
import { MapPin, Phone, Scale } from "lucide-react";

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
      <body className="min-h-screen flex flex-col justify-between antialiased overflow-x-hidden">
        
        {/* BARRA SUPERIOR COMPACTA EN MÓVIL */}
        <div className="bg-[#0F172A] text-slate-300 text-[11px] py-1.5 px-3 border-b border-slate-800 font-mono">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
            
            <div className="flex items-center space-x-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
              <span className="truncate">Patio Fontibón: Av. Calle 24 #128-15</span>
            </div>
            
            <div className="flex items-center space-x-3 shrink-0">
              <a href="tel:3042394091" className="text-amber-400 font-bold flex items-center gap-1 hover:underline">
                <Phone className="w-3 h-3" />
                <span>304 239 4091</span>
              </a>
            </div>

          </div>
        </div>

        {/* NAVEGACIÓN ADAPTATIVA CON MENÚ HAMBURGUESA */}
        <Navbar />

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>

        {/* BOTÓN FLOTANTE */}
        <WhatsAppButton />

        {/* REDES SOCIALES OFICIALES EN EL FOOTER */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase mb-3">Síguenos en Redes</h4>
          <div className="space-y-2">
            <a
              href="https://www.facebook.com/profile.php?id=61595407978912"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition"
            >
              <span className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs shrink-0">f</span>
              <span className="truncate">Facebook Las Brisas</span>
            </a>
            <a
              href="https://www.instagram.com/recuperaradoralasbrisas/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition"
            >
              <span className="w-6 h-6 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0">IG</span>
              <span className="truncate">@recuperaradoralasbrisas</span>
            </a>
          </div>
        </div>

        {/* FOOTER ADAPTADO A CELULARES */}
        <footer className="bg-[#0F172A] text-slate-400 py-10 px-5 border-t border-slate-800 text-xs mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800">
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Logo className="w-7 h-7" />
                <span className="font-bold text-white text-base">Las Brisas</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Recuperadora de maderas, estibas, plásticos, metales, remates y esmeraldas en Fontibón.
              </p>
              <p className="font-mono text-slate-500 text-[10px]">NIT: 80.160.322-3</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase mb-2">Contacto Directo</h4>
              <p className="text-slate-300">Alexander Torres (Propietario)</p>
              <a href="tel:3042394091" className="text-emerald-400 font-mono font-bold block mt-0.5">
                📞 304 239 4091
              </a>
              <p className="text-[11px] text-slate-500 mt-1">Av. Calle 24 #128-15, Fontibón</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase mb-2">Divisiones</h4>
              <ul className="space-y-1 text-[11px]">
                <li><Link href="/catalogo" className="hover:text-white">Estibas & Maderas</Link></li>
                <li><Link href="/acabados" className="hover:text-white">Acabados & Muebles</Link></li>
                <li><Link href="/metales-remates" className="hover:text-white">Metales & Remates</Link></li>
                <li><Link href="/esmeraldas" className="hover:text-white">Esmeraldas Certificadas</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase mb-2">Legal & Vigilancia</h4>
              <ul className="space-y-1 text-[11px]">
                <li>
                  <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                    <Scale className="w-3 h-3" /> Vigilado SIC (Ley 1480)
                  </a>
                </li>
                <li><Link href="/pqrs" className="hover:text-white">Radicar PQRS y Retracto</Link></li>
                <li><span className="text-slate-500">Factura Electrónica DIAN 2026</span></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-2">
            <span>© 2026 Recuperadora Las Brisas.</span>
            <span className="font-mono">Bogotá D.C., Colombia</span>
          </div>
        </footer>

      </body>
    </html>
  );
}