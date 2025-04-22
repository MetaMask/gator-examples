import { ITemplate } from "../types/template";

const NEXTJS_TEMPLATE_OPTIONS: ITemplate[] = [
  {
    name: "Basic Delegator app with NextJS",
    value: "starter",
    description: "A basic Next.js template with App Router",
    framework: "nextjs",
    isWeb3AuthSupported: true,
    areLLMRulesSupported: false,
  },
  {
    name: "Experimental: Basic Gator app to try out ERC7715 Permissions",
    value: "erc7715-starter",
    description: "Experimental: A basic Gator app to try out ERC7715 Permissions",
    framework: "nextjs",
    isWeb3AuthSupported: false,
    areLLMRulesSupported: true,
  },
];

const VITE_REACT_TEMPLATE_OPTIONS: ITemplate[] = [
  {
    name: "Basic Delegator app with Vite React",
    value: "starter",
    description: "A basic Vite React template with App Router",
    framework: "vite-react",
    isWeb3AuthSupported: true,
    areLLMRulesSupported: false,
  },
];

export const TEMPLATE_OPTIONS: ITemplate[] = [
  ...NEXTJS_TEMPLATE_OPTIONS,
  ...VITE_REACT_TEMPLATE_OPTIONS,
];