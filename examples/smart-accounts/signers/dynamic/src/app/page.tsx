"use client";

import Steps from "@/components/Steps";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-geist-sans min-h-0">
      <div className="flex flex-col gap-2 items-center justify-center pt-8 flex-1 overflow-y-auto min-h-0">
        <h1 className="text-2xl font-bold text-center max-w-2xl leading-tight mb-16">
          MetaMask Smart Accounts x Dynamic Quickstart
        </h1>
        <main className="flex flex-col items-center justify-center">
          <Steps />
        </main>
      </div>
      <Footer />
    </div>
  );
}
