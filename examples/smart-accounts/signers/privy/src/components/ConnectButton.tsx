"use client";

import Button from "@/components/Button";
import { useConnectOrCreateWallet } from "@privy-io/react-auth";

export default function ConnectButton() {
  const { connectOrCreateWallet } = useConnectOrCreateWallet();

  return (
    <div className="flex gap-2">
      <Button onClick={() => connectOrCreateWallet()}>
        Connect with Privy
      </Button>
    </div>
  );
}
