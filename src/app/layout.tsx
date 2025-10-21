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
