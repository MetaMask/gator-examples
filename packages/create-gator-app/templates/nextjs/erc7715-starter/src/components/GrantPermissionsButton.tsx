"use client";

import { useState } from "react";
import { createClient, custom } from "viem";
import { sepolia } from "viem/chains";
import { erc7715ProviderActions } from "@metamask/delegation-toolkit/experimental";
import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { usePermissions } from "@/providers/PermissionProvider";
import { Loader2, CheckCircle } from "lucide-react";

export default function GrantPermissionsButton() {
  const { sessionAccount } = useSessionAccount();
  const { savePermission } = usePermissions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handles the permission granting process for native token streaming.
   *
   * This function:
   * 1. Creates a Viem client with ERC-7715 provider actions
   * 2. Sets up permission parameters including:
   *    - Chain ID (Sepolia testnet)
   *    - Expiry time (24 hours from current time)
   *    - Signer details (delegate smart account)
   *    - Native token stream permission configuration
   * 3. Grants the permissions through the MetaMask snap
   * 4. Stores the granted permissions using the PermissionProvider
   * 5. Updates the application step
   *
   * @throws {Error} If delegate smart account is not found
   * @async
   */
  const handleGrantPermissions = async () => {
    if (!sessionAccount) {
      throw new Error("Session account not found");
    }

    setIsLoading(true);

    try {
      const client = createClient({
        transport: custom(window.ethereum),
      }).extend(erc7715ProviderActions());

      const currentTime = Math.floor(Date.now() / 1000);
      const oneDayInSeconds = 24 * 60 * 60;
      const expiry = currentTime + oneDayInSeconds;

      const permissions = await client.grantPermissions([
        {
          chainId: sepolia.id,
          expiry,
          signer: {
            type: "account",
            data: {
              address: sessionAccount.address,
            },
          },
          permission: {
            type: "native-token-stream",
            data: {
              initialAmount: 1n, // 1 WEI
              amountPerSecond: 1n, // 1 WEI per second
              startTime: currentTime,
              maxAmount: 10n, // 10 WEI
              justification: "Payment for a subscription service",
            },
          },
        },
      ]);
      savePermission(permissions[0]);
    } catch (error) {
      console.error("Error granting permissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleGrantPermissions}
        disabled={isLoading}
      >
        <span>
          {isLoading ? "Granting Permissions..." : "Grant Permissions"}
        </span>
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <CheckCircle className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
