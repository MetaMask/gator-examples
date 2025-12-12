import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/AppProvider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaMask Smart Accounts x Dynamic Quickstart",
  description: "An example for using Dynamic as signer for MetaMask Smart Accounts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:text-white h-full overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-black text-black dark:text-white font-geist-sans antialiased max-w-full overflow-hidden h-full`}
      >
        <AppProvider>
          <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="flex flex-col flex-1 min-h-0">
              {children}
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
