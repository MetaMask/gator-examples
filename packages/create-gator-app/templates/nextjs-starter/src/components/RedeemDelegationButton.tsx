"use client";

import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { prepareRedeemDelegationData } from "@/utils/delegationUtils";
import { pimlicoClient } from "@/utils/pimlicoUtils";
import { bundlerClient, paymasterClient } from "@/utils/viemUtils";
import { getDeleGatorEnvironment } from "@metamask-private/delegator-core-viem";
import { useState } from "react";
import { Hex } from "viem";
import { sepolia } from "viem/chains";

export default function RedeemDelegationButton() {
  const { smartAccount } = useDelegateSmartAccount();
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex | null>(null);
  const chain = sepolia;
  const { getDelegation } = useStorageClient();

  const handleRedeemDelegation = async () => {
    if (!smartAccount) return;

    setLoading(true);

    const delegation = getDelegation(smartAccount.address);

    if (!delegation) {
      return;
    }

    const redeemData = prepareRedeemDelegationData(delegation);
    const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

    const userOperationHash = await bundlerClient.sendUserOperation({
      account: smartAccount,
      calls: [
        {
          to: getDeleGatorEnvironment(chain.id).DelegationManager,
          data: redeemData,
        },
      ],
      ...fee,
      paymaster: paymasterClient,
    });

    const { receipt } = await bundlerClient.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    setTransactionHash(receipt.transactionHash);

    console.log(receipt);
    setLoading(false);
  };

  if (transactionHash) {
    return (
      <div>
        <button
          className="button"
          onClick={() =>
            window.open(
              `https://sepolia.etherscan.io/tx/${transactionHash}`,
              "_blank"
            )
          }
        >
          View on Etherscan
        </button>
      </div>
    );
  }

  return (
    <button
      className="button"
      onClick={handleRedeemDelegation}
      disabled={loading}
    >
      {loading ? "Redeeming..." : "Redeem Delegation"}
    </button>
  );
}
