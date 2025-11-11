"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";
import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { usePermissions } from "@/providers/PermissionProvider";
import { Loader2, CheckCircle } from "lucide-react";
import Button from "@/components/Button";
import { useChainId, useWalletClient } from "wagmi";

export default function GrantPermissionsButton() {
  const { sessionAccount } = useSessionAccount();
  const { savePermission } = usePermissions();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdjustmentAllowed, setIsAdjustmentAllowed] = useState<boolean>(true);

  /**
   * Handles the permission granting process for native token periodic transfer.
   *
   * This function:
   * 1. Creates a Viem client with ERC-7715 provider actions
   * 2. Sets up permission parameters including:
   *    - Chain ID (Sepolia testnet)
   *    - Expiry time (24 hours from current time)
   *    - Signer details (delegate smart account)
   *    - Native token periodic transfer permission configuration
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

    if (!walletClient) {
      throw new Error("Wallet client not connected");
    }

    setIsLoading(true);

    try {
      const client = walletClient.extend(erc7715ProviderActions());
      const currentTime = Math.floor(Date.now() / 1000);
      // 30 days in seconds
      const expiry = currentTime + 24 * 60 * 60 * 30;

      const permissions = await client.requestExecutionPermissions([{
        chainId,
        expiry,
        signer: {
          type: "account",
          data: {
            address: sessionAccount.address,
          },
        },
        isAdjustmentAllowed,
        permission: {
          type: "native-token-periodic",
          data: {
            // 0.001 ETH in WEI format.
            periodAmount: parseEther("0.001"),
            // 1 day in seconds
            periodDuration: 86400,
            justification: "Permission to transfer 0.001 ETH every day",
          },
        },
      }]);
      savePermission(permissions[0]);
    } catch (error) {
      console.error('Error granting permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="adjustment-allowed"
          checked={isAdjustmentAllowed}
          onChange={(e) => setIsAdjustmentAllowed(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300"
        />
        <label htmlFor="adjustment-allowed" className="text-sm font-medium">
          Allow adjustment for requested permission.
        </label>
      </div>
      <Button
        className="w-full space-x-2"
        onClick={handleGrantPermissions}
        disabled={isLoading}
      >
        <span>
          {isLoading && "Granting Permissions..."}
          {!isLoading && "Grant Permissions"}
        </span>
        {isLoading && (
          <Loader2 className="h-5 w-5 animate-spin" />
        )}
        {!isLoading && (
          <CheckCircle className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}