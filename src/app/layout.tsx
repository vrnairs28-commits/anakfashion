import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Boutique | Modern Luxury Women's Fashion",
  description: "Exquisite women's fashion catalog featuring sarees, kurtis, ethnic wear, and modern dresses.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-dark-gray selection:bg-rose-pink/20 selection:text-rose-pink">
        <Navbar />
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
