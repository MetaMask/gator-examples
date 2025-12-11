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

  const { bundlerClient, paymasterClient, pimlicoClient } = useMemo(() => {
    const pimlicoKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

    if (!pimlicoKey) {
      throw new Error("Pimlico API key is not set");
    }

    const bundlerClient: BundlerClient = createBundlerClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });

    const paymasterClient: PaymasterClient = createPaymasterClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });

    const pimlicoClient: PimlicoClient = createPimlicoClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });

    return { bundlerClient, paymasterClient, pimlicoClient };
  }, [chainId]);

  return { bundlerClient, paymasterClient, pimlicoClient };
}
