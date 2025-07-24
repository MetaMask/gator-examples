"use client";

import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import { useStepContext } from "@/hooks/useStepContext";
import useStorageClient from "@/hooks/useStorageClient";
import { prepareRootDelegation } from "@/utils/delegationUtils";
import Button from "@/components/Button";

export default function CreateDelegationButton() {
  const { smartAccount } = useDelegatorSmartAccount();
  const { storeDelegation } = useStorageClient();
  const { smartAccount: delegateSmartAccount } = useDelegateSmartAccount();
  const { changeStep } = useStepContext();

  const handleCreateDelegation = async () => {
    if (!smartAccount || !delegateSmartAccount) return;
    console.log(smartAccount.address, delegateSmartAccount.address);
    const delegation = prepareRootDelegation(
      smartAccount,
      delegateSmartAccount.address,
    );

    const signature = await smartAccount.signDelegation({
      delegation,
    });

    const signedDelegation = {
      ...delegation,
      signature,
    };

    console.log(signedDelegation);
    storeDelegation(signedDelegation);
    changeStep(5);
  };

  return <Button onClick={handleCreateDelegation}>Create Delegation</Button>;
}
