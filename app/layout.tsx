import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Manrope } from 'next/font/google'

export const metadata: Metadata = {
  title: "audiophile",
  description: "ecommerce site",
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-[#FAFAFA] `}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
