import IGatorAppOptions from "../types/gator-app-options";

export const configureENV = (
  content: string,
  gatorAppConfiguration: IGatorAppOptions
) => {
  if (gatorAppConfiguration.addWeb3auth && gatorAppConfiguration.isWeb3AuthSupported) {
    const web3AuthNetwork = gatorAppConfiguration.web3AuthNetwork!;
    if (gatorAppConfiguration.framework === "nextjs") {
      content += `
  NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_${web3AuthNetwork.toUpperCase()}
  NEXT_PUBLIC_WEB3AUTH_NETWORK=${web3AuthNetwork}
    `;
    } else if (gatorAppConfiguration.framework === "vite-react") {
      content += `
  VITE_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_${web3AuthNetwork.toUpperCase()}
  VITE_WEB3AUTH_NETWORK=${web3AuthNetwork}
    `;
    }
  }
  return content;
};
