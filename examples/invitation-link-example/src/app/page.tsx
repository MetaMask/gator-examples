"use client";
import Steps from "@/components/Steps";
import Footer from "@/components/Footer";
import { useAccount, useDisconnect } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-4 font-geist-sans">
      {address && (
        <header className="absolute top-4 right-4">
          <button
            onClick={() => disconnect()}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Disconnect
          </button>
        </header>
      )}
      <main className="flex flex-col gap-6 row-start-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Invitation Links
          </h1>
          <p className="text-white/70">
            Create and share invitation links for rewards
          </p>
        </div>
        <Steps />
      </main>
      <Footer />
    </div>
  );
}
