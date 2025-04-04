"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "viem/chains";
import { ReactNode } from "react";
import web3AuthConnector from "@/connectors/Web3AuthConnector";
import { metaMask } from "wagmi/connectors";
import { GatorProvider } from "@/providers/GatorProvider";
import { StepProvider } from "@/providers/StepProvider";

const chains = [sepolia];

export const connectors = [metaMask(), web3AuthConnector(chains)];

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains,
  connectors,
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
  },
});

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <StepProvider>
          <GatorProvider>{children}</GatorProvider>
        </StepProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
