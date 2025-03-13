"use client";

import { AppContext } from "@/providers/AppProvider";
import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from "@metamask-private/delegator-core-viem";
import { useContext, useEffect, useState } from "react";
import { privateKeyToAccount } from "viem/accounts";
import { usePublicClient } from "wagmi";

export default function useDelegateSmartAccount() {
  const { delegateWallet, generateDelegateWallet } = useContext(AppContext);
  const publicClient = usePublicClient();

  const [smartAccount, setSmartAccount] =
    useState<MetaMaskSmartAccount<Implementation> | null>(null);

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
      signatory: { account },
    }).then((smartAccount) => {
      setSmartAccount(smartAccount);
    });
  }, [delegateWallet, publicClient]);

  return { smartAccount };
}
