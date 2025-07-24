"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { baseSepolia, sepolia } from "viem/chains";
import { ReactNode } from "react";
import { GatorProvider } from "@/providers/GatorProvider";
import { StepProvider } from "@/providers/StepProvider";
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { FrameProvider } from "@/providers/FarcasterFrameProvider";

export const connectors = [miniAppConnector()];

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors,
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <FrameProvider>
          <StepProvider>
            <GatorProvider>{children}</GatorProvider>
          </StepProvider>
        </FrameProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
