"use client";

import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import { useStepContext } from "@/hooks/useStepContext";
import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import { useState } from "react";
import { zeroAddress } from "viem";

export default function DeployDelegatorButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    <>
      <button className="button" onClick={handleDeployDelegator}>
        {loading ? "Deploying..." : "Deploy Delegator Account"}
      </button>
      {error && <div className="error">{error}</div>}
    </>
  );
}
