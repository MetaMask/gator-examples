"use client";

import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from "@metamask-private/delegator-core-viem";
import { useEffect, useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function useDelegatorSmartAccount(): {
  smartAccount: MetaMaskSmartAccount<Implementation> | null;
} {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [smartAccount, setSmartAccount] =
    useState<MetaMaskSmartAccount<Implementation> | null>(null);

  useEffect(() => {
    if (!address || !walletClient || !publicClient) return;

    console.log("Creating smart account");

    toMetaMaskSmartAccount({
      client: publicClient,
      implementation: Implementation.Hybrid,
      deployParams: [address, [], [], []],
      deploySalt: "0x",
      signatory: { walletClient },
    }).then((smartAccount) => {
      setSmartAccount(smartAccount);
    });
  }, [address, walletClient, publicClient]);

  return { smartAccount };
}
