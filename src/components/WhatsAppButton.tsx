"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <a
        href="https://wa.me/573203100664?text=Hola%20Alexander,%20contacto%20directamente%20desde%20la%20plataforma%20de%20Las%20Brisas"
        target="_blank"
        rel="noreferrer"
        className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-5 rounded-full shadow-2xl flex items-center gap-2.5 transition hover:scale-105 active:scale-95 group font-bold text-xs"
        aria-label="Contactar a Alexander Torres por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white shrink-0" />
        <span className="hidden sm:inline">
          Hablar con Alexander Torres (Propietario)
        </span>
        <span className="sm:hidden">
          WhatsApp
        </span>
      </a>
    </div>
  );
}