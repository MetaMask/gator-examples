"use client";

import { useEffect, useState } from "react";
import AddressCard from "@/components/AddressCard";
import { CodeBlock } from "@/components/CodeBlock";
import ConnectButton from "@/components/ConnectButton";
import CreateDelegateButton from "@/components/CreateDelegateButton";
import CreateDelegateCodeBlock from "@/components/CreateDelegateCodeBlock";
import CreateDelegationButton from "@/components/CreateDelegationButton";
import CreateDelegationCodeBlock from "@/components/CreateDelegationCodeBlock";
import CreateDelegatorCodeBlock from "@/components/CreateDelegatorCodeBlock";
import DeployDelegatorButton from "@/components/DeployDelegatorButton";
import LearnMoreButton from "@/components/LearnMoreButton";
import RedeemDelegationButton from "@/components/RedeemDelegationButton";
import RedeemDelegationCodeBlock from "@/components/RedeemDelegationCodeBlock";
import { useAccount } from "wagmi";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import { useStepContext } from "@/hooks/useStepContext";
import useStorageClient from "@/hooks/useStorageClient";

export default function Steps() {
  const { step, changeStep } = useStepContext();
  const { address } = useAccount();
  const { smartAccount } = useDelegatorSmartAccount();
  const { smartAccount: delegateSmartAccount } = useDelegateSmartAccount();
  const { getDelegation } = useStorageClient();
  const [storedDelegation, setStoredDelegation] = useState<any>(null);

  useEffect(() => {
    if (!address) {
      changeStep(1);
    }

    if (address && smartAccount && !delegateSmartAccount) {
      smartAccount.isDeployed().then((isDeployed: boolean) => {
        if (!isDeployed) {
          changeStep(2);
        }
        if (isDeployed) {
          changeStep(3);
        }
      });
    }

    if (address && smartAccount && delegateSmartAccount) {
      const delegation = getDelegation(delegateSmartAccount.address);
      if (!delegation) {
        changeStep(4);
      } else {
        changeStep(5);
      }
    }
  }, [address, smartAccount, delegateSmartAccount]);

  // Refresh stored delegation when on step 4 or 5
  useEffect(() => {
    if (step === 5 && delegateSmartAccount) {
      const delegation = getDelegation(delegateSmartAccount.address);
      setStoredDelegation(delegation);
    }
  }, [step, delegateSmartAccount]);

  return (
    <>
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddressCard
            address={smartAccount?.address}
            title="Delegator Account"
            description="The delegator is a MetaMask smart account that grants authority to the delegate account. This account creates and signs the delegation."
            fallbackText="Not connected"
          />
          <AddressCard
            address={delegateSmartAccount?.address}
            title="Delegate Account"
            description="The delegate is a smart account with a locally generated private key as its signer. This account receives the delegation authority."
            fallbackText="Not created yet"
          />
        </div>
      </div>

      {step === 1 && (
        <>
          <p className="text-gray-700 dark:text-white/70 max-w-4xl leading-relaxed">
            The first step is to connect your wallet.
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
          <p className="text-gray-700 dark:text-white/70 max-w-4xl leading-relaxed">
            The MetaMask smart contract account that grants authority. This will
            be deployed on-chain, just in time for redeeming the delegation.
          </p>

          <LearnMoreButton href="https://docs.metamask.io/delegation-toolkit/how-to/create-smart-account" />
          <CreateDelegatorCodeBlock />
          <DeployDelegatorButton />
        </>
      )}
      {step === 3 && (
        <>
          <p className="text-gray-700 dark:text-white/70 max-w-4xl leading-relaxed mb-6">
            The MetaMask smart contract account that receives the delegation.
            Initially this will be counterfactual (not deployed on-chain), until
            it is deployed by submitting a user operation.
          </p>

          <LearnMoreButton href="https://docs.metamask.io/delegation-toolkit/how-to/create-smart-account" />
          <CreateDelegateCodeBlock />
          <CreateDelegateButton />
        </>
      )}
      {step === 4 && (
        <>
          <p className="text-gray-700 dark:text-white/70 max-w-4xl leading-relaxed">
            The delegator creates and signs a delegation, granting specific
            authority to the delegate account. In this case, the delegation can
            be used to perform any transaction on delegator's behalf. The signed
            delegation will be persisted in localStorage.
            <br />
            <br />
            The delegator must specify sufficient caveats to limit the authority
            being granted to the delegate.{" "}
            <a
              href="https://docs.metamask.io/delegation-toolkit/how-to/create-delegation/restrict-delegation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline italic"
            >
              See how to restrict the delegation
            </a>
            .
          </p>

          <LearnMoreButton href="https://docs.metamask.io/delegation-toolkit/how-to/create-delegation" />
          <CreateDelegationCodeBlock />
          <CreateDelegationButton />
        </>
      )}
      {step === 5 && (
        <>
          {storedDelegation && (
            <div>
              <h4 className="font-semibold mb-4 text-sm text-gray-900 dark:text-white">
                📋 Delegation to Redeem
              </h4>
              <div className="max-w-4xl">
                <CodeBlock
                  lines={JSON.stringify(storedDelegation, null, 2)
                    .split("\n")
                    .map((line) => ({
                      prefix: ">" as const,
                      content: line,
                    }))}
                />
              </div>
            </div>
          )}

          <p className="text-gray-700 dark:text-white/70 max-w-4xl leading-relaxed">
            The redeemer submits a user operation that executes the action
            allowed by the delegation (in this case, transfer nothing to no one)
            on behalf of the delegator. We are using the signed delegation
            stored in localStorage to execute on behalf of the delegator.
          </p>

          <LearnMoreButton href="https://docs.metamask.io/delegation-toolkit/how-to/redeem-delegation" />
          <RedeemDelegationCodeBlock />
          <RedeemDelegationButton />
        </>
      )}
    </>
  );
}