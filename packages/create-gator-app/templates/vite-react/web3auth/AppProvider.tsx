import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "viem/chains";
import { ReactNode } from "react";
import { metaMask } from "wagmi/connectors";
import web3AuthConnector from "@/connectors/Web3AuthConnector";
import { GatorProvider } from "@/providers/GatorProvider";
import { StepProvider } from "@/providers/StepProvider";

export const connectors = [metaMask(), web3AuthConnector([sepolia])];

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
      <WagmiProvider config={wagmiConfig}>
        <StepProvider>
          <GatorProvider>{children}</GatorProvider>
        </StepProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
