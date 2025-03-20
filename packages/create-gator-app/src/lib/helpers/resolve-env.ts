export const resolveEnv = (
  content: string,
  useEmbeddedWallet: boolean,
  web3AuthNetwork: string
) => {
  if (useEmbeddedWallet) {
    content += `
      NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_SAPPHIRE_DEVNET
      NEXT_PUBLIC_WEB3AUTH_NETWORK=${web3AuthNetwork}
    `;
  }
  return content;
};
