import { BuilderConfig } from "../config";

export const configureENV = (
  content: string,
  builderConfig: BuilderConfig
) => {
  const options = builderConfig.getOptions();

  if (builderConfig.shouldAddWeb3AuthConfig()) {
    const web3AuthNetwork = options.web3AuthNetwork!;
    if (options.framework === "nextjs") {
      content += `
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_${web3AuthNetwork.toUpperCase()}
NEXT_PUBLIC_WEB3AUTH_NETWORK=${web3AuthNetwork}
    `;
    } else if (options.framework === "vite-react") {
      content += `
VITE_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_${web3AuthNetwork.toUpperCase()}
VITE_WEB3AUTH_NETWORK=${web3AuthNetwork}
    `;
    }
  }
  return content;
};
