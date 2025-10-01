"use client";

import { useState } from "react";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import {
  encodeDelegation,
  prepareRootDelegation,
} from "@/utils/delegationUtils";
import Button from "@/components/Button";

export default function CreateLinkButton() {
  const { smartAccount } = useDelegatorSmartAccount();
  const [encodedDelegation, setEncodedDelegation] = useState<string | null>(
    null,
  );
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);

  const handleCreateDelegation = async () => {
    if (!smartAccount) return;
    console.log(smartAccount.address);
    const delegation = prepareRootDelegation(smartAccount);

    const signature = await smartAccount.signDelegation({
      delegation,
    });

    const signedDelegation = {
      ...delegation,
      signature,
    };

    const encoded = encodeDelegation(signedDelegation);
    setEncodedDelegation(encoded);

    // Create shareable URL with the encoded delegation
    const url = new URL(window.location.href);
    url.searchParams.set("delegation", encoded);
    setShareableUrl(url.toString());

    console.log(encoded);
  };

  const copyToClipboard = async () => {
    if (shareableUrl) {
      try {
        await navigator.clipboard.writeText(shareableUrl);
        alert("URL copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy URL:", err);
      }
    }
  };

  return (
    <div className="space-y-4">
      {shareableUrl && (
        <div className="bg-gray-800 border border-gray-700 p-3 rounded">
          <h4 className="text-white text-sm mb-2">Shareable Invitation Link</h4>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareableUrl}
              readOnly
              className="flex-1 bg-gray-700 text-white px-2 py-1 rounded text-xs font-mono border border-gray-600"
            />
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center px-2 py-1 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors rounded border border-gray-600 text-xs font-mono font-medium"
              title="Copy link"
            >
              Copy
            </button>
          </div>
        </div>
      )}
      <Button onClick={handleCreateDelegation}>
        {encodedDelegation
          ? "Create New Invitation Link"
          : "Create Invitation Link"}
      </Button>
    </div>
  );
}
