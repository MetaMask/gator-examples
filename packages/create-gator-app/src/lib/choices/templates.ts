import { ITemplate } from "../types/template";

const NEXTJS_TEMPLATE_OPTIONS: ITemplate[] = [
  {
    name: "MetaMask Smart Accounts Starter",
    value: "starter",
    description: "A basic Next.js MetaMask Smart Accounts starter",
    framework: "nextjs",
    isWeb3AuthSupported: true,
    areLLMRulesSupported: false,
  },
  {
    name: "MetaMask Smart Accounts & Delegation Starter",
    value: "delegation-starter",
    description: "A basic Next.js MetaMask Smart Accounts & Delegation starter",
    framework: "nextjs",
    isWeb3AuthSupported: true,
    areLLMRulesSupported: false,
  },
  {
    name: "Farcaster Mini App Delegation Starter",
    value: "farcaster-starter",
    description: "A basic Next.js Farcaster Mini App Delegation starter",
    framework: "nextjs",
    isWeb3AuthSupported: false,
    areLLMRulesSupported: false,
  },
  {
    name: "Experimental: ERC7715 Permissions starter",
    value: "erc7715-starter",
    description: "A basic Next.js ERC7715 Permissions starter",
    framework: "nextjs",
    isWeb3AuthSupported: false,
    areLLMRulesSupported: true,
  },
];

const VITE_REACT_TEMPLATE_OPTIONS: ITemplate[] = [
  {
    name: "MetaMask Smart Accounts Starter",
    value: "starter",
    description: "A basic Vite React MetaMask Smart Accounts starter",
    framework: "vite-react",
    isWeb3AuthSupported: true,
    areLLMRulesSupported: false,
  },
  {
    name: "MetaMask Smart Accounts & Delegation Starter",
    value: "delegation-starter",
    description: "A basic Vite React MetaMask Smart Accounts & Delegation starter",
    framework: "vite-react",
    isWeb3AuthSupported: true,
    areLLMRulesSupported: false,
  },
];

export const TEMPLATE_OPTIONS: ITemplate[] = [
  ...NEXTJS_TEMPLATE_OPTIONS,
  ...VITE_REACT_TEMPLATE_OPTIONS,
];