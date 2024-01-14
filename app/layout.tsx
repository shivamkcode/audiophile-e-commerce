import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  title: "audiophile",
  description: "ecommerce site created using Next.js by Shivam Kumar",
};

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
        <link rel="icon" type="image/svg+xml" href="/assets/shared/desktop/logo.svg" />
      </head>
      <body className={`${manrope.className} bg-[#FAFAFA] `}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
