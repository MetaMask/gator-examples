import {
  createPimlicoClient,
  PimlicoClient,
} from "permissionless/clients/pimlico";
import { useMemo } from "react";
import { http } from "viem";
import {
  BundlerClient,
  createBundlerClient,
  createPaymasterClient,
  PaymasterClient,
} from "viem/account-abstraction";
import { useChainId } from "wagmi";

export function usePimlicoServices() {
  const chainId = useChainId();
  const pimlicoKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

  if (!pimlicoKey) {
    throw new Error("Pimlico API key is not set");
  }

  const bundlerClient: BundlerClient = useMemo(() => {
    return createBundlerClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });
  }, [chainId, pimlicoKey]);

  const paymasterClient: PaymasterClient = useMemo(() => {
    return createPaymasterClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });
  }, [chainId, pimlicoKey]);

  const pimlicoClient: PimlicoClient = useMemo(() => {
    return createPimlicoClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });
  }, [chainId, pimlicoKey]) as PimlicoClient;

  return { bundlerClient, paymasterClient, pimlicoClient };
}
