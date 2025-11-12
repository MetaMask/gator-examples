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
  title: "Advanced Permissions (ERC-7715)",
  description: "A dApp to test the Advanced Permissions (ERC-7715) implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full font-geist-sans antialiased flex flex-col bg-white dark:bg-black text-black dark:text-white`}
      >
        <div className="flex-1">
          <main>
            <AppProvider>
              {children}
            </AppProvider>
          </main>
        </div>
      </body>
    </html>
  );
}