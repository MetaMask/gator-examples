"use client";

import Steps from "@/components/Steps";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-4 font-geist-sans">
      <h1 className="text-3xl font-bold text-center max-w-2xl leading-relaxed">
        MetaMask Smart Accounts x Privy Quickstart
      </h1>
      <main className="flex flex-col gap-6 row-start-2">
        <Steps />
      </main>
      <Footer />
    </div>
  );
}
