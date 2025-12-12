import useSmartAccount from "@/hooks/useSmartAccount";
import Button from "@/components/Button";
import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import { Address, TransactionReceipt } from "viem";
import { useState } from "react";

interface SendUserOperationProps {
  to: Address;
  value: bigint;
  isEnabled?: boolean;
}

export default function SendUserOperation({
  to,
  value,
  isEnabled = false,
}: SendUserOperationProps) {
  const { smartAccount } = useSmartAccount();
  const { pimlicoClient, bundlerClient, paymasterClient } =
    usePimlicoServices();
  const [isLoading, setIsLoading] = useState(false);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendUserOperation = async () => {
    setIsLoading(true);
    setReceipt(null);
    setError(null);

    try {
      if (!smartAccount) {
        throw new Error("Smart account is not available.");
      }

      const { fast: fees } = await pimlicoClient.getUserOperationGasPrice();

      const userOperationHash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        calls: [
          {
            to,
            value,
          },
        ],
        ...fees,
        paymaster: paymasterClient,
      });

      const { receipt } = await bundlerClient.waitForUserOperationReceipt({
        hash: userOperationHash,
      });

      setReceipt(receipt);
    } catch (error) {
      setError((error as Error).message ?? "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Button
          onClick={handleSendUserOperation}
          disabled={isLoading || !isEnabled}
        >
          {isLoading ? "Sending User Operation..." : "Send User Operation"}
        </Button>

        {receipt && (
          <Button
            onClick={() =>
              window.open(
                `https://sepolia.etherscan.io/tx/${receipt.transactionHash}`,
                "_blank",
              )
            }
          >
            View on Etherscan
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md p-3">
          <p className="text-red-700 dark:text-red-300 text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
    </div>
  );
}