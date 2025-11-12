"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "viem/chains";
import { ReactNode } from "react";
import { metaMask } from "wagmi/connectors";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

export const connectors = [metaMask()];

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors,
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [sepolia.id]: http(),
  },
});

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID as string,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <DynamicWagmiConnector>
            {children}
          </DynamicWagmiConnector>
        </WagmiProvider>
      </QueryClientProvider>
    </DynamicContextProvider >
  );
}