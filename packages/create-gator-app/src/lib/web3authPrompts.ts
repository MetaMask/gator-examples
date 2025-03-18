const web3AuthNetworkChoices = [
  {
    name: "Sapphire Devnet",
    value: "sapphire_devnet",
  },
  {
    name: "Sapphire Mainnet",
    value: "sapphire_mainnet",
  },
];

export const web3AuthPrompts = [
  {
    type: "list",
    name: "web3AuthNetwork",
    message: "Which Web3Auth network do you want to use?",
    choices: web3AuthNetworkChoices,
    default: "sapphire_devnet",
  },
];
