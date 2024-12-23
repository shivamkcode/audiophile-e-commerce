"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Manrope } from "next/font/google";
import { AlertProvider } from "./alertContext";
import Alert from "@/components/Alert";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>audiophile</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/shared/desktop/logo.svg"
        />
      </head>
      <AlertProvider>
        <body className={`${manrope.className} bg-[#FAFAFA] `}>
          <Alert />
          <Navbar />
          {children}
          <Footer />
        </body>
      </AlertProvider>
    </html>
  );
}
