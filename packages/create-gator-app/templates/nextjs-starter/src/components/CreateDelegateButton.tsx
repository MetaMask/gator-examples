"use client";

import { AppContext } from "@/providers/AppProvider";
import { useContext } from "react";

export default function CreateDelegateButton() {
  const { generateDelegateWallet } = useContext(AppContext);

  return (
    <button className="button" onClick={generateDelegateWallet}>
      Create Delegate Wallet
    </button>
  );
}
