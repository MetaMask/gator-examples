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
  title: "MetaMask Smart Accounts Kit Starter App",
  description: "A starter app for the MetaMask Smart Accounts Kit Farcaster MiniApp",
};

const frame = {
  version: 'next',
  imageUrl: `${process.env.NEXT_PUBLIC_URL}/gator.png`,
  button: {
    title: 'Launch Starter',
    action: {
      type: 'launch_frame',
      name: 'MetaMask Smart Accounts Kit Farcaster MiniApp',
      url: `${process.env.NEXT_PUBLIC_URL}/`,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:text-white">
      <head>
        <meta name="fc:miniapp" content={JSON.stringify(frame)} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-black text-black dark:text-white font-geist-sans`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
