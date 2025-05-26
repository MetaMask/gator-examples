"use client";

import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { usePermissions } from "@/providers/PermissionProvider";
import WalletInfo from "./WalletInfo";

export default function WalletInfoContainer() {
  const { sessionAccount, clearSessionAccount } = useSessionAccount();
  const { smartAccount } = usePermissions();
  return (
    <div className="w-full max-w-4xl mx-auto p-3 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sessionAccount && (
          <WalletInfo
            address={sessionAccount.address}
            label="Session Account"
            onClear={clearSessionAccount}
            showClearButton={true}
          />
        )}
        {smartAccount && (
          <WalletInfo address={smartAccount} label="Smart Account" />
        )}
      </div>
    </div>
  );
}
