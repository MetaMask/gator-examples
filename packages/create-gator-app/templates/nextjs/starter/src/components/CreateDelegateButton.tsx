"use client";

import { useGatorContext } from "@/hooks/useGatorContext";

export default function CreateDelegateButton() {
  const { generateDelegateWallet } = useGatorContext();

  return (
    <button className="button" onClick={generateDelegateWallet}>
      Create Delegate Wallet
    </button>
  );
}
