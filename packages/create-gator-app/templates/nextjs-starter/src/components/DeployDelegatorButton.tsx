"use client";

import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import { AppContext } from "@/providers/AppProvider";
import { pimlicoClient } from "@/utils/pimlicoUtils";
import { bundlerClient, paymasterClient } from "@/utils/viemUtils";
import { useContext, useState } from "react";
import { zeroAddress } from "viem";

export default function DeployDelegatorButton() {
  const [loading, setLoading] = useState(false);
  const { smartAccount } = useDelegatorSmartAccount();
  const { setStep } = useContext(AppContext);

  const handleDeployDelegator = async () => {
    if (!smartAccount) return;
    setLoading(true);
    const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

    const userOperationHash = await bundlerClient.sendUserOperation({
      account: smartAccount,
      calls: [
        {
          to: zeroAddress,
        },
      ],
      paymaster: paymasterClient,
      ...fee,
    });

    const { receipt } = await bundlerClient.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    console.log(receipt);
    setLoading(false);
    setStep(3);
  };

  return (
    <button className="button" onClick={handleDeployDelegator}>
      {loading ? "Deploying..." : "Deploy Delegator Account"}
    </button>
  );
}
