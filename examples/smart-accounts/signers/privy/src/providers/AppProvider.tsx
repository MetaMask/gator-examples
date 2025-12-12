"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http } from "wagmi";
import { sepolia } from "viem/chains";
import { ReactNode } from "react";
import { metaMask } from "wagmi/connectors";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";

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
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}