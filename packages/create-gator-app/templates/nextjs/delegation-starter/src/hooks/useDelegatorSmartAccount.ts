"use client";

import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";
import { useEffect, useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function useDelegatorSmartAccount(): {
  smartAccount: MetaMaskSmartAccount | null;
} {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [smartAccount, setSmartAccount] = useState<MetaMaskSmartAccount | null>(
    null
  );

  useEffect(() => {
    if (!address || !walletClient || !publicClient) return;

    console.log("Creating smart account");

    toMetaMaskSmartAccount({
      client: publicClient,
      implementation: Implementation.Hybrid,
      deployParams: [address, [], [], []],
      deploySalt: "0x",
      signer: { walletClient },
    }).then((smartAccount) => {
      setSmartAccount(smartAccount);
    });
  }, [address, walletClient, publicClient]);

  return { smartAccount };
}