import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// Archivo: texto de UI, precios pequeños, labels — limpio y legible.
// Bricolage Grotesque: titulares, precios grandes — le da carácter premium
// a la marca en vez del Inter genérico por defecto.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Don Toto DA+ | Tradición y calidad en cada corte",
  description:
    "Supermercado familiar con más de 20 años de trayectoria. Recorré nuestras góndolas y pedí online desde la web o la app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${archivo.variable} ${bricolage.variable} bg-brand-cream font-sans text-brand-dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
