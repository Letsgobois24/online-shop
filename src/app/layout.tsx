import { geistSans, geistMono, lato } from "@/utils/font/fonts";
import "./globals.css";
import Providers from "@/utils/providers";
import { Metadata } from "next";
import Navbar from "@/components/Fragments/Navbar/Navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Letsgobois Shop",
    default: "Letsgobois Shop - Belanja Online Aman & Terpercaya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} ${lato.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
