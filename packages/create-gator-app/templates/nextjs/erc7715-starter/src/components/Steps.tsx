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
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <p className="text-gray-300 mb-4">
              This is the account (delegate account) that redeems the
              delegations (ERC7710) that was granted by the user. For this
              example, we will use a
              <a
                href="https://metamask.github.io/delegator-core/docs/concepts/delegator-smart-account"
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Delegator Smart Account
              </a>
            </p>
            <p className="text-gray-300 mb-4">
              Example use case: A subscription service that allows users to
              subscribe to a service and this account is the dApp&apos;s account
              that redeems the subscription using a delegate account.
            </p>
            <p className="text-gray-300">
              Having a delegator account is optional, but having one has
              multiple benefits such as gas sponsorship, batch transactions,
              better user experience.
            </p>
          </div>
          <CreateSessionAccountButton />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <p className="text-gray-300 mb-4">
              Grant permissions to the session account that we have created in
              the previous step. This will prompt the user to:
            </p>
            <ol className="text-gray-300 list-decimal list-inside space-y-2">
              <li>
                If not installed, install 2 MetaMask snaps that handles the
                ERC7715 permissions
              </li>
              <li>Grant permissions to the session account</li>
            </ol>
            <p className="text-gray-300 mt-4">
              You can save the response safely in order to get redeemed by the
              session account later. In this example we will save the response
              in the local storage.
            </p>
          </div>
          <GrantPermissionsButton />
        </div>
      )}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <p className="text-gray-300">
              The session account (redeemer) submits a user operation that
              executes the permission granted by the user
            </p>
            <p className="text-gray-300 mb-4">
              Make sure to have enough tokens in your smart account
            </p>
          </div>
          <RedeemPermissionButton />
        </div>
      )}
    </div>
  );
}
