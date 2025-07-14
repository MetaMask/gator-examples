"use client";

import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import { useStepContext } from "@/hooks/useStepContext";
import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import { useState } from "react";
import { zeroAddress } from "viem";
import Button from "@/components/Button";

export default function DeployDelegatorButton() {
  const [loading, setLoading] = useState(false);
  const { smartAccount } = useDelegatorSmartAccount();
  const { changeStep } = useStepContext();
  const { bundlerClient, paymasterClient, pimlicoClient } =
    usePimlicoServices();

  const handleDeployDelegator = async () => {
    if (!smartAccount || !pimlicoClient || !bundlerClient) return;
    setLoading(true);
    
    try {
      const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

      const userOperationHash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        calls: [
          {
            to: zeroAddress,
            value: 0n,
          },
        ],
        paymaster: paymasterClient,
        ...fee,
      });

      const { receipt } = await bundlerClient.waitForUserOperationReceipt({
        hash: userOperationHash,
      });

      console.log(receipt);
      changeStep(3);
    } catch (error) {
      console.error("Failed to deploy account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDeployDelegator} disabled={loading}>
      {loading ? "Deploying Account..." : "Deploy Account"}
    </Button>
  );
}
