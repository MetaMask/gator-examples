import { useAccountAbstractionUtils } from "@/hooks/useAccountAbstractionUtils";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { prepareRedeemDelegationData } from "@/utils/delegationUtils";
import { useState } from "react";
import { Hex } from "viem";
import Button from "@/components/Button";

export default function RedeemDelegationButton() {
  const { smartAccount } = useDelegateSmartAccount();
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getDelegation } = useStorageClient();
  const { bundlerClient, paymasterClient, pimlicoClient } =
    useAccountAbstractionUtils();

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
            to: smartAccount.environment.DelegationManager,
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
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
        {loading ? "Redeeming..." : "Redeem Delegation"}
      </Button>
      {error && (
        <div className="max-w-4xl p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
