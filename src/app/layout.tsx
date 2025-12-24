import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

import Providers from "@/src/app/providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Assetly",
  description: "A market place for digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
