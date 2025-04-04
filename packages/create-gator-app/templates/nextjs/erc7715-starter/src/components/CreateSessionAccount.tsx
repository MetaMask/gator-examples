"use client";

import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { ArrowRight } from "lucide-react";

export default function CreateSessionAccountButton() {
  const { createSessionAccount } = useSessionAccount();

  const handleCreateSessionAccount = async () => {
    await createSessionAccount();
  };

  return (
    <button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      onClick={handleCreateSessionAccount}
    >
      <span>Create Session Account</span>
      <ArrowRight className="w-5 h-5" />
    </button>
  );
}
