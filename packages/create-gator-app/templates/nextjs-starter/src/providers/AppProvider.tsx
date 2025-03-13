"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { lineaSepolia, mainnet, sepolia } from "viem/chains";
import { createContext, ReactNode } from "react";
import { metaMask } from "wagmi/connectors";

export const AppContext = createContext({
  delegateWallet: "0x",
  generateDelegateWallet: () => {},
  step: 1,
  setStep: (step: number) => {},
});

export const connectors = [metaMask()];

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors,
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
  },
});

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </QueryClientProvider>
  );
}
