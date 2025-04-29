import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { GatorProvider } from "@/providers/GatorProvider";
import { StepProvider } from "@/providers/StepProvider";
import { Web3AuthOptions, WEB3AUTH_NETWORK } from "@web3auth/modal";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";

const queryClient = new QueryClient();

const web3AuthOptions: Web3AuthOptions = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: process.env.NEXT_PUBLIC_WEB3AUTH_NETWORK as WEB3AUTH_NETWORK,
  authBuildEnv: "testing",
};

const web3authConfig = {
  web3AuthOptions,
};

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <Web3AuthProvider config={web3authConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <StepProvider>
          <GatorProvider>{children}</GatorProvider>
        </StepProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  );
}
