import { Answers } from "inquirer";

export const configureENV = (content: string, answers: Answers) => {
  if (answers.useEmbeddedWallet) {
    const web3AuthNetwork = answers.web3AuthNetwork;
    if (answers.framework === "nextjs") {
      content += `
      NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_${web3AuthNetwork.toUpperCase()}
      NEXT_PUBLIC_WEB3AUTH_NETWORK=${web3AuthNetwork}
    `;
    } else if (answers.framework === "vite-react") {
      content += `
      VITE_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_${web3AuthNetwork.toUpperCase()}
      VITE_WEB3AUTH_NETWORK=${web3AuthNetwork}
    `;
    }
  }
  return content;
};
