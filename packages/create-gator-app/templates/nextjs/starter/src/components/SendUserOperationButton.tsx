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

  const handleSendUserOperation = async () => {
    setIsLoading(true);
    setReceipt(null);
    if (!smartAccount || !pimlicoClient || !bundlerClient) {
      return;
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
    setIsLoading(false);
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
    </div>
  );
}
