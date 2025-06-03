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
    if (!smartAccount) return;
    setLoading(true);
    const { fast: fee } = await pimlicoClient!.getUserOperationGasPrice();

    const userOperationHash = await bundlerClient!.sendUserOperation({
      account: smartAccount,
      calls: [
        {
          to: zeroAddress,
        },
      ],
      paymaster: paymasterClient,
      ...fee,
    });

    const { receipt } = await bundlerClient!.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    console.log(receipt);
    setLoading(false);
    changeStep(3);
  };

  return (
    <Button onClick={handleDeployDelegator}>
      {loading ? "Deploying..." : "Deploy Delegator Account"}
    </Button>
  );
}
