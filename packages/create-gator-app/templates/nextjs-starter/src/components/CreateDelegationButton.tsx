"use client";

import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { AppContext } from "@/providers/AppProvider";
import { prepareRootDelegation } from "@/utils/delegationUtils";
import { useContext } from "react";

export default function CreateDelegationButton() {
  const { smartAccount } = useDelegatorSmartAccount();
  const { storeDelegation } = useStorageClient();
  const { smartAccount: delegateSmartAccount } = useDelegateSmartAccount();
  const { setStep } = useContext(AppContext);

  const handleCreateDelegation = async () => {
    if (!smartAccount || !delegateSmartAccount) return;
    console.log(smartAccount.address, delegateSmartAccount.address);
    const delegation = prepareRootDelegation(
      smartAccount.address,
      delegateSmartAccount.address
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
    setStep(5);
  };

  return (
    <button className="button" onClick={handleCreateDelegation}>
      Create Delegation
    </button>
  );
}
