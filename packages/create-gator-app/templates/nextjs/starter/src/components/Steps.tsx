"use client";
import { useEffect } from "react";
import ConnectButton from "@/components/ConnectButton";
import CreateDelegateButton from "@/components/CreateDelegateButton";
import CreateDelegationButton from "@/components/CreateDelegationButton";
import DeployDelegatorButton from "@/components/DeployDelegatorButton";
import RedeemDelegationButton from "@/components/RedeemDelegationButton";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { useAccount } from "wagmi";
import { useStepContext } from "@/hooks/useStepContext";

export default function Steps() {
  const { step, changeStep } = useStepContext();
  const { isConnected } = useAccount();
  const { smartAccount } = useDelegatorSmartAccount();
  const { smartAccount: delegateSmartAccount } = useDelegateSmartAccount();
  const { getDelegation } = useStorageClient();

  useEffect(() => {
    if (!isConnected) {
      changeStep(1);
    }

    if (isConnected && smartAccount && !delegateSmartAccount) {
      smartAccount.isDeployed().then((isDeployed) => {
        if (!isDeployed) {
          changeStep(2);
        }
        if (isDeployed) {
          changeStep(3);
        }
      });
    }

    if (isConnected && smartAccount && delegateSmartAccount) {
      const delegation = getDelegation(delegateSmartAccount.address);
      if (!delegation) {
        changeStep(4);
      } else {
        changeStep(5);
      }
    }
  }, [isConnected, smartAccount, delegateSmartAccount]);

  return (
    <>
      {step === 1 && (
        <>
          <p className="text-block">
            The first step would be to connect your Metamask wallet.
            <br />
            <br />
            You can customize the Wagmi config to connect to any chain you want,
            and use the connector of your choice.
          </p>
          <ConnectButton />
        </>
      )}
      {step === 2 && (
        <>
          <p className="text-block">
            The MetaMask smart contract account that grants authority. This will
            on chain be deployed, just in time for redeeming the delegation.
          </p>

          <DeployDelegatorButton />
        </>
      )}
      {step === 3 && (
        <>
          <p className="text-block">
            The MetaMask smart contract account that receives the delegation.
            Initially this will be counterfactual (not deployed on-chain), until
            it is deployed by submitting a user operation
          </p>
          <CreateDelegateButton />
        </>
      )}
      {step === 4 && (
        <>
          <p className="text-block">
            The delegator creates and signs a delegation, granting specific
            authority to the delegate account. In this case, the delegation can
            be used to perform any transaction on delegator's behalf.
            <br />
            <br />
            To restrict the delegate account to only perform specific actions,
            the delegator can specify a caveats array in the delegation.
          </p>
          <CreateDelegationButton />
        </>
      )}
      {step === 5 && (
        <>
          <p className="text-block">
            The redeemer submits a user operation that executes the action
            allowed by the delegation (in this case, transfer nothing to no one)
            on behalf of the delegator
          </p>
          <RedeemDelegationButton />
        </>
      )}
    </>
  );
}
