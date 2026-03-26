"use client";

import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { prepareRedeemDelegationData } from "@/utils/delegationUtils";
import { getSmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { useState } from "react";
import { Hex } from "viem";
import { sepolia } from "viem/chains";
import Button from "./Button";

export default function RedeemDelegationButton() {
  const { smartAccount } = useDelegateSmartAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<Hex | null>(null);
  const chain = sepolia;
  const { getDelegation } = useStorageClient();
  const { bundlerClient, paymasterClient, pimlicoClient } =
    usePimlicoServices();

  const handleRedeemDelegation = async () => {
    if (!smartAccount) return;

    setLoading(true);
    setError(null);

    try {
      const delegation = getDelegation(smartAccount.address);

      if (!delegation) {
        throw new Error("No delegation found");
      }

      const redeemData = prepareRedeemDelegationData(delegation);
      const { fast: fee } = await pimlicoClient!.getUserOperationGasPrice();

      const userOperationHash = await bundlerClient!.sendUserOperation({
        account: smartAccount,
        calls: [
          {
            to: getSmartAccountsEnvironment(chain.id).DelegationManager,
            data: redeemData,
          },
        ],
        ...fee,
        paymaster: paymasterClient,
      });

      const { receipt } = await bundlerClient!.waitForUserOperationReceipt({
        hash: userOperationHash,
      });

      setTransactionHash(receipt.transactionHash);

      console.log(receipt);
    } catch (error) {
      const errorMessage = (error as Error)?.message ?? 'Unknown error occurred';
      console.error(`Error redeeming delegation: ${errorMessage}`);
      setError(errorMessage);
    }

    setLoading(false);
  };

  if (transactionHash) {
    return (
      <div>
        <Button
          onClick={() =>
            window.open(
              `https://sepolia.etherscan.io/tx/${transactionHash}`,
              "_blank",
            )
          }
        >
          View on Etherscan
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleRedeemDelegation} disabled={loading}>
        {loading ? 'Redeeming...' : 'Redeem Delegation'}
      </Button>
      {error && (
        <div className="max-w-4xl p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}