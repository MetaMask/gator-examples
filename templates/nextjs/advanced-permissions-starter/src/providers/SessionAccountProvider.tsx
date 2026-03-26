"use client";

import {
  Implementation,
  MetaMaskSmartAccount,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";
import { createContext, useState, useContext } from "react";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { usePublicClient } from "wagmi";

interface SessionAccountContext {
  sessionAccount: MetaMaskSmartAccount | null,
  createSessionAccount: () => Promise<void>,
  isLoading: boolean,
  error: string | null,
}

export const SessionAccountContext = createContext<SessionAccountContext>({
  sessionAccount: null,
  createSessionAccount: async () => { },
  isLoading: false,
  error: null,
});

export const SessionAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sessionAccount, setSessionAccount] = useState<MetaMaskSmartAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const publicClient = usePublicClient();

  const createSessionAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!publicClient) {
        throw new Error("Public client not found");
      }

      const account = privateKeyToAccount(generatePrivateKey());

      const newSessionAccount = await toMetaMaskSmartAccount({
        client: publicClient,
        implementation: Implementation.Hybrid,
        deployParams: [account.address, [], [], []],
        deploySalt: "0x",
        signer: { account },
      });

      setSessionAccount(newSessionAccount);
    } catch (err) {
      console.error("Error creating a session account:", err);
      setError(err instanceof Error ? err.message : "Failed to create a session account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SessionAccountContext.Provider
      value={{
        sessionAccount,
        createSessionAccount,
        isLoading,
        error,
      }}
    >
      {children}
    </SessionAccountContext.Provider>
  );
};

export const useSessionAccount = () => {
  return useContext(SessionAccountContext);
};