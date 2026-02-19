"use client";

import Steps from "@/components/Steps";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WalletInfoContainer from "@/components/WalletInfoContainer";
import PermissionInfo from "@/components/PermissionInfo";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <Hero />
        <WalletInfoContainer />
        <PermissionInfo />
        <Steps />
      </main>
      <Footer />
    </div>
  );
}