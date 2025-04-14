import { useAccountAbstractionUtils } from "@/hooks/useAccountAbstractionUtils";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { prepareRedeemDelegationData } from "@/utils/delegationUtils";
import { useState } from "react";
import { Hex } from "viem";


export default function RedeemDelegationButton() {
  const { smartAccount } = useDelegateSmartAccount();
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Hex | null>(null);
  const { getDelegation } = useStorageClient();
  const { bundlerClient, paymasterClient, pimlicoClient } =
    useAccountAbstractionUtils();

  const handleRedeemDelegation = async () => {
    if (!smartAccount) return;

    setLoading(true);

    const delegation = getDelegation(smartAccount.address);

    if (!delegation) {
      return;
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
