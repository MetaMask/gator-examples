"use client";

import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";
import { useEffect, useState } from "react";
import { privateKeyToAccount } from "viem/accounts";
import { usePublicClient } from "wagmi";
import { useGatorContext } from "@/hooks/useGatorContext";

export default function useDelegateSmartAccount() {
  const { delegateWallet } = useGatorContext();
  const publicClient = usePublicClient();

  const [smartAccount, setSmartAccount] = useState<MetaMaskSmartAccount | null>(
    null
  );

  useEffect(() => {
    console.log(delegateWallet);
    if (delegateWallet === "0x" || !publicClient) return;

    console.log("Creating smart account");
    const account = privateKeyToAccount(delegateWallet as `0x${string}`);

    toMetaMaskSmartAccount({
      client: publicClient,
      implementation: Implementation.Hybrid,
      deployParams: [account.address, [], [], []],
      deploySalt: "0x",
      signer: { account },
    }).then((smartAccount) => {
      setSmartAccount(smartAccount);
    });
  }, [delegateWallet, publicClient]);

  return { smartAccount };
}