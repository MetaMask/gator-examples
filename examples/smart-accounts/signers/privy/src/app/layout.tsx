import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaMask Smart Accounts x Privy Example",
  description: "A example for using Privy as a signer for MetaMask Smart Accounts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:text-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-black text-black dark:text-white font-geist-sans antialiased max-w-full overflow-x-hidden`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
