import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Poppins-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quality engines",
  description: "The machine you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          <div className="mx-auto flex min-h-screen flex-col p-4 sm:max-w-xl sm:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
