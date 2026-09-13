import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "ByteAscend | Master Coding & Crack Interviews",
  description: "The ultimate platform for Data Structures, Algorithms, Web Development, and Tech Interview Prep.",
};

import { InactivityTimeout } from "@/components/InactivityTimeout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen flex flex-col">
        <InactivityTimeout />
        {children}
      </body>
    </html>
  );
}
