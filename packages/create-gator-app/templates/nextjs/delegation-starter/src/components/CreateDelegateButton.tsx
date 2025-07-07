"use client";

import { useGatorContext } from "@/hooks/useGatorContext";
import Button from "@/components/Button";

export default function CreateDelegateButton() {
  const { generateDelegateWallet } = useGatorContext();

  return (
    <Button onClick={generateDelegateWallet}>Create Delegate Wallet</Button>
  );
}
