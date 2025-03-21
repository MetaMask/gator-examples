import { Answers } from "inquirer";

export const configureENV = (content: string, answers: Answers) => {
  if (answers.useEmbeddedWallet) {
    if (answers.framework === "nextjs") {
      content += `
      NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_SAPPHIRE_DEVNET
      NEXT_PUBLIC_WEB3AUTH_NETWORK=${answers.web3AuthNetwork}
    `;
    } else if (answers.framework === "vite-react") {
      content += `
      VITE_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_SAPPHIRE_DEVNET
      VITE_WEB3AUTH_NETWORK=${answers.web3AuthNetwork}
    `;
    }
  }
  return content;
};
