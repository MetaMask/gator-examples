"use client";

import { useEffect, useState } from "react";
import CreateSessionAccountButton from "@/components/CreateSessionAccount";
import RedeemPermissionButton from "@/components/RedeemPermissionButton";
import GrantPermissionsButton from "./GrantPermissionsButton";
import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { usePermissions } from "@/providers/PermissionProvider";

export default function Steps() {
  const [step, setStep] = useState<number>(1);
  const { sessionAccount } = useSessionAccount();
  const { permission } = usePermissions();

  useEffect(() => {
    if (permission && sessionAccount) {
      setStep(3);
    } else if (sessionAccount) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [sessionAccount, permission]);

  return (
    <div className="max-w-4xl mx-auto p-3 space-y-8">
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This is the account (delegate account) that redeems the
              delegations (ERC7710) that was granted by the user (ERC7715). For
              this example, we will use a
              <a
                href="https://docs.metamask.io/delegation-toolkit/concepts/smart-accounts/"
                className="text-blue-500 hover:text-blue-400 underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Delegator Smart Account
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Example use case: A subscription service that allows users to
              subscribe to a service and this account is the dApp&apos;s account
              that redeems the subscription using a delegate account.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Having a delegator account is optional, but having one has
              multiple benefits such as gas sponsorship, batch transactions,
              better user experience.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In this example, we create a delegator account with burner account
              signer and save the private key in the session storage. In
              production explore all other signer supported by gator SDK
              <a
                href="https://docs.metamask.io/delegation-toolkit/how-to/create-smart-account/configure-accounts-signers/"
                className="text-blue-500 hover:text-blue-400 underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </p>
          </div>
          <CreateSessionAccountButton />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Grant permissions to the session account created in the previous
              step. This will prompt the user to:
            </p>
            <ol className="text-gray-700 dark:text-gray-300 list-decimal list-inside space-y-2">
              <li>
                Install two MetaMask snaps that handle ERC7715 permissions (if
                not already installed)
              </li>
              <li>Grant permissions to the session account</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              You can safely store the response for later redemption by the
              session account. In this example, we will save the response in
              local storage.
            </p>
          </div>
          <GrantPermissionsButton />
        </div>
      )}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The session account (redeemer) submits a user operation that
              executes the permission granted by the user
            </p>
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-md p-3 mb-4 mt-4">
              <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
              <p className="text-yellow-800 dark:text-yellow-200">
                Make sure to have enough tokens in your smart account
              </p>
            </div>
          </div>
          <RedeemPermissionButton />
        </div>
      )}
    </div>
  );
}
