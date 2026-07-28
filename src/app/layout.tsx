import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://layvo.com.br"),
  title: {
    default: "Layvo Gestão — Seu negócio na palma da mão",
    template: "%s | Layvo",
  },
  description:
    "Vendas, estoque, clientes e financeiro em um só lugar. Simples de usar, feito para pequenos negócios.",
  applicationName: "Layvo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
