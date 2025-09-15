import {
  createPimlicoClient,
} from "permissionless/clients/pimlico";
import { useMemo } from "react";
import { http } from "viem";
import {
  createBundlerClient,
  createPaymasterClient,
} from "viem/account-abstraction";
import { useChainId } from "wagmi";

export function usePimlicoServices() {
  const chainId = useChainId();
  const {
    pimlicoClient,
    bundlerClient,
    paymasterClient
  } = useMemo(() => {
    const pimlicoKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;

    if (!pimlicoKey) {
      throw new Error("Pimlico API key is not set");
    }

    const bundlerClient = createBundlerClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });

    const paymasterClient = createPaymasterClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });

    const pimlicoClient = createPimlicoClient({
      transport: http(
        `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoKey}`
      ),
    });

    return {
      pimlicoClient,
      bundlerClient,
      paymasterClient
    }

  }, [chainId]);

  return { bundlerClient, paymasterClient, pimlicoClient };
}
