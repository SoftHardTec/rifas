import type { Metadata } from "next";
import {
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  ColorSchemeScript,
  mergeMantineTheme,
} from "@mantine/core";
import localFont from "next/font/local";

import "./globals.css";
import "@mantine/carousel/styles.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gana con la Pampara",
  description: "Next App Mantine Tailwind Template",
};

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    fontFamily: geistSans.style.fontFamily,
    fontFamilyMonospace: geistMono.style.fontFamily,
    // Hacemos el texto principal un poco menos negro
    black: "#25262b",
    // Hacemos el fondo de "papel" (cards, etc.) un gris muy claro en vez de blanco puro
    white: "#fffefeff",
    primaryColor: "blue",
    colors: {
      // Sobrescribimos los colores del tema oscuro para hacerlo más profundo
      dark: [
        "#C1C2C5",
        "#A6A7AB",
        "#909296",
        "#5c5f66",
        "#373A40",
        "#2C2E33",
        "#1F2023",
        "#141517",
        "#101113",
        "#0B0C0D",
      ],
      // Suavizamos la paleta de grises para el tema claro
      gray: [
        "#f8f9fa", // Ligeramente más oscuro que el fondo de "papel"
        "#e4e7ebf1", // Este será el nuevo fondo del body
        "#e9ecef",
        "#dee2e6",
        "#ced4da",
        "#adb5bd",
        "#868e96",
        "#495057",
        "#343a40",
        "#212529",
      ],
    },
  }),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <title>Gana con la Pampara</title>
      </head>
      <body className="antialiased">
        <SpeedInsights />
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
