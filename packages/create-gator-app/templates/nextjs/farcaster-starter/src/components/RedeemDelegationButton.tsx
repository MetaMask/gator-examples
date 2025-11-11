"use client";

import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { prepareRedeemDelegationData } from "@/utils/delegationUtils";
import { getSmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { useState } from "react";
import { Hex } from "viem";
import { baseSepolia as chain } from "viem/chains";
import Button from "./Button";

export default function RedeemDelegationButton() {
  const { smartAccount } = useDelegateSmartAccount();
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex | null>(null);
  const { getDelegation } = useStorageClient();
  const { bundlerClient, paymasterClient, pimlicoClient } =
    usePimlicoServices();

  const handleRedeemDelegation = async () => {
    if (!smartAccount || !pimlicoClient || !bundlerClient || !paymasterClient) return;

    setLoading(true);

    const delegation = getDelegation(smartAccount.address);

    if (!delegation) {
      return;
    }

    const redeemData = prepareRedeemDelegationData(delegation);
    const { fast: fee } = await pimlicoClient!.getUserOperationGasPrice();

    const userOperationHash = await bundlerClient.sendUserOperation({
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

    const { receipt } = await bundlerClient.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    setTransactionHash(receipt.transactionHash);

    console.log(`Redeemed delegation receipt: ${receipt.transactionHash}`);
    setLoading(false);
  };

  if (transactionHash) {
    return (
      <div>
        <Button
          onClick={() =>
            window.open(
              `https://sepolia.basescan.org/g/tx/${transactionHash}`,
              "_blank",
            )
          }
        >
          View on BaseScan
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleRedeemDelegation} disabled={loading}>
      {loading ? 'Redeeming...' : 'Redeem Delegation'}
    </Button>
  );
}