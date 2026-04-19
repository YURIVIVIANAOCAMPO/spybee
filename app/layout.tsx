import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spybee - Mis Proyectos",
  description: "Gestión de proyectos y seguimiento de incidencias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
