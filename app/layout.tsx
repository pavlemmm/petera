import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Petera",
  description: "Platforma za vlasnike i čuvare kućnih ljubimaca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={`bg-linear-to-r from-black/10`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
