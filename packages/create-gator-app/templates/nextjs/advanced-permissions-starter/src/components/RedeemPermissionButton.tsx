"use client";

import { useState } from "react";
import { Hex } from "viem";
import { pimlicoClientFactory } from "@/services/pimlicoClient";
import { bundlerClientFactory } from "@/services/bundlerClient";
import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { usePermissions } from "@/providers/PermissionProvider";
import { Loader2, CheckCircle, ExternalLink } from "lucide-react";
import Button from "@/components/Button";
import { useAccount, usePublicClient } from "wagmi";

export default function RedeemPermissionButton() {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<Hex | null>(null);

  const { sessionAccount } = useSessionAccount();
  const { permission } = usePermissions();
  const publicClient = usePublicClient();
  const { chain } = useAccount();

  /**
   * Handles the redemption of delegation permissions.
   * Retrieves stored permission data, sends a user operation with delegation,
   * and updates the transaction hash state.
   * @returns {Promise<void>}
   */
  const handleRedeemPermission = async () => {
    if (!permission || !chain || !publicClient || !sessionAccount) return;
    setLoading(true);

    try {
      const { context, signerMeta } = permission;

      if (!signerMeta) {
        console.error("No signer meta found");
        setLoading(false);
        return;
      }
      const { delegationManager } = signerMeta;

      // Validate required parameters
      if (!context || !delegationManager) {
        console.error("Missing required parameters for delegation");
        setLoading(false);
        return;
      }

      const pimlicoClient = pimlicoClientFactory(chain.id);
      const bundlerClient = bundlerClientFactory(chain.id);

      const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

      /**
       * Sends a user operation with delegation to the bundler client. Only the session account can redeem the delegation.
       * This operation includes:
       * - A transfer of 1 ETH to a specific address
       * - The required permissions context and delegation manager
       * - Account metadata and gas fee information
       * @returns {Promise<Hex>} The hash of the user operation
       */
      const hash = await bundlerClient.sendUserOperationWithDelegation({
        publicClient,
        account: sessionAccount,
        calls: [
          {
            to: sessionAccount.address,
            data: '0x',
            value: 1n,
            permissionsContext: context,
            delegationManager,
          },
        ],
        ...fee,
      });

      const { receipt } = await bundlerClient.waitForUserOperationReceipt({
        hash,
      });

      setTxHash(receipt.transactionHash);

      console.log(receipt);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (txHash) {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-600 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
            Transaction Successful!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-4">
            Your transaction has been processed and confirmed on the blockchain.
          </p>

          <Button
            className="w-full space-x-2"
            onClick={() =>
              window.open(`${chain?.blockExplorers?.default?.url}/tx/${txHash}`, '_blank')
            }
          >
            <span>View on {chain?.blockExplorers?.default?.name}</span>
            <ExternalLink className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <Button
            className="w-full space-x-2"
            onClick={handleRedeemPermission}
            disabled={loading}
          >
            <span>
              {loading ? "Processing Transaction..." : "Redeem Permission"}
            </span>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        className="w-full space-x-2"
        onClick={handleRedeemPermission}
        disabled={loading}
      >
        <span>
          {loading ? "Processing Transaction..." : "Redeem Permission"}
        </span>
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <CheckCircle className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}