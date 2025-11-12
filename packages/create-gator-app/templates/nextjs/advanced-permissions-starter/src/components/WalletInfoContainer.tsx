"use client";

import { useSessionAccount } from "@/providers/SessionAccountProvider";
import WalletInfo from "@/components/WalletInfo";
import { useAccount } from "wagmi";

export default function WalletInfoContainer() {
  const { sessionAccount } = useSessionAccount();
  const { address } = useAccount();

  return (
    <div className="w-full max-w-4xl mx-auto p-3 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sessionAccount && (
          <WalletInfo
            address={sessionAccount.address}
            label="Session Account"
          />
        )}
        {address && (
          <WalletInfo address={address} label="Connected Account" />
        )}
      </div>
    </div>
  );
}