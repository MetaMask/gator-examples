import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK_TYPE } from "@web3auth/base";
import { Chain } from "wagmi/chains";

export default function web3AuthConnector(chains: Chain[]) {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0],
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthInstance = new Web3Auth({
    clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID as string,
    privateKeyProvider,
    web3AuthNetwork: import.meta.env
      .VITE_WEB3AUTH_NETWORK as WEB3AUTH_NETWORK_TYPE,
  });

  return Web3AuthConnector({
    web3AuthInstance,
  });
}
