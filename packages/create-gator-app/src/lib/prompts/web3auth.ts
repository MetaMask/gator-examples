import { WEB3AUTH_NETWORK_CHOICES } from "../choices/web3auth-network";

export const WEB3AUTH_PROMPTS = [
  {
    type: "list",
    name: "web3AuthNetwork",
    message: "Which Web3Auth network do you want to use?",
    choices: WEB3AUTH_NETWORK_CHOICES,
    default: "sapphire_devnet",
  },
];
