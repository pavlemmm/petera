import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Petera",
  description: "Sigurno mesto za ljubimce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-linear-to-r from-black/10`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
