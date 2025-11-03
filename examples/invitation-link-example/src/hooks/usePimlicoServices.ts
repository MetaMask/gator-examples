import {
  createPimlicoClient,
  PimlicoClient,
} from "permissionless/clients/pimlico";
import { useEffect, useState } from "react";
import { http } from "viem";
import {
  BundlerClient,
  createBundlerClient,
  createPaymasterClient,
  PaymasterClient,
} from "viem/account-abstraction";
import { useChainId } from "wagmi";

export function usePimlicoServices() {
  const [paymasterClient, setPaymasterClient] = useState<PaymasterClient>();
  const [bundlerClient, setBundlerClient] = useState<BundlerClient>();
  const [pimlicoClient, setPimlicoClient] = useState<PimlicoClient>();
  const chainId = useChainId();

  useEffect(() => {
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

    setPimlicoClient(pimlicoClient);
    setBundlerClient(bundlerClient);
    setPaymasterClient(paymasterClient);
  }, [chainId]);

  return { bundlerClient, paymasterClient, pimlicoClient };
}
