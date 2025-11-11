"use client";

import { useEffect, useState } from "react";
import ConnectButton from "@/components/ConnectButton";
import CreateSessionAccountButton from "@/components/CreateSessionAccount";
import RedeemPermissionButton from "@/components/RedeemPermissionButton";
import GrantPermissionsButton from "./GrantPermissionsButton";
import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { usePermissions } from "@/providers/PermissionProvider";
import { useAccount } from "wagmi";

export default function Steps() {
  const [step, setStep] = useState<number>(1);
  const { sessionAccount } = useSessionAccount();
  const { permission } = usePermissions();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      setStep(1);
      return;
    }

    if (permission && sessionAccount) {
      setStep(4);
    } else if (sessionAccount) {
      setStep(3);
    } else if (isConnected) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [sessionAccount, permission, isConnected]);

  return (
    <div className="max-w-4xl mx-auto p-3 space-y-8">
      {step === 1 && (
        <div className="space-y-6 flex flex-col gap-6 items-center justify-center">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              To get started, please connect your wallet. Make sure your connected account is upgraded to a MetaMask Smart Account.
              If your account is not upgraded, you can upgrade it by following the instructions on the
              <a href="https://support.metamask.io/configure/accounts/switch-to-or-revert-from-a-smart-account/" className="text-blue-500 hover:text-blue-400 underline ml-1" target="_blank" rel="noopener noreferrer">
                MetaMask Support Page.
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              If your account is not upgraded, the session account won't able to redeem the permissions.
            </p>
          </div>
          <ConnectButton />
        </div>

      )}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This is the account (session account) that redeems the
              permissions granted by the MetaMask user. For
              using ERC-7715 permissions, user needs to have upgraded to
              <a
                href="https://support.metamask.io/configure/accounts/switch-to-or-revert-from-a-smart-account/"
                className="text-blue-500 hover:text-blue-400 underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaMask Smart Account.
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Example use case: A subscription service that allows users to
              subscribe to a service and this account is the dApp&apos;s account
              that redeems the subscription.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Creating a smart account for the session account is optional, but having one has
              multiple benefits such as gas sponsorship, batch transactions,
              better user experience.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In this example, we create a session account with burner private
              key and save it in the session storage. In production explore all other
              signers supported by the
              <a
                href="https://docs.metamask.io/smart-accounts-kit/guides/smart-accounts/create-smart-account/"
                className="text-blue-500 hover:text-blue-400 underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaMask Smart Accounts Kit.
              </a>
            </p>
          </div>
          <CreateSessionAccountButton />
        </div>
      )}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Grant permissions to the session account that was created in the previous
              step. This will prompt the user to grant the native token periodic transfer
              permissions to the session account.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              You can safely store the response for later redemption by the
              session account. In this example, we will save the response in
              session state.
            </p>
          </div>
          <GrantPermissionsButton />
        </div>
      )}
      {step === 4 && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The session account submits a user operation that
              executes the transaction on behalf of MetaMask user using the
              permission granted earlier.
            </p>
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-md p-3 mb-4 mt-4">
              <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
              <p className="text-yellow-800 dark:text-yellow-200">
                Make sure to have enough native tokens in your smart account
              </p>
            </div>
          </div>
          <RedeemPermissionButton />
        </div>
      )}
    </div>
  );
}