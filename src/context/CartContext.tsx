"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ItemCarrito {
  id: string;
  slug: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
  dimensiones: string;
  unidad: string;
}

interface CartContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (producto: ItemCarrito) => void;
  eliminarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  limpiarCarrito: () => void;
  totalItems: number;
  subtotal: number;
  drawerAbierto: boolean;
  setDrawerAbierto: (abierto: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [montado, setMontado] = useState(false);

  // Cargar carrito de localStorage
  useEffect(() => {
    setMontado(true);
    const guardado = localStorage.getItem("carrito_las_brisas");
    if (guardado) {
      try {
        setItems(JSON.parse(guardado));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    if (montado) {
      localStorage.setItem("carrito_las_brisas", JSON.stringify(items));
    }
  }, [items, montado]);

  const agregarAlCarrito = (nuevoItem: ItemCarrito) => {
    setItems((prev) => {
      const existe = prev.find((item) => item.id === nuevoItem.id);
      if (existe) {
        return prev.map((item) =>
          item.id === nuevoItem.id
            ? { ...item, cantidad: item.cantidad + nuevoItem.cantidad }
            : item
        );
      }
      return [...prev, nuevoItem];
    });
    setDrawerAbierto(true); // Abre el carrito automáticamente
  };

  const eliminarDelCarrito = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const limpiarCarrito = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
        totalItems,
        subtotal,
        drawerAbierto,
        setDrawerAbierto,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}