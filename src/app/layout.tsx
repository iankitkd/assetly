import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

import Providers from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Box, Container } from "@mui/material";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Assetly",
  description: "A marketplace for high-quality digital assets created by professionals.",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />

            <Container maxWidth="lg" component="main" sx={{ flexGrow: 1, p: 0, minHeight: "100vh" }}>
              {children}
            </Container>

            <Footer />
          </Box>

        </Providers>
      </body>
    </html>
  );
}
