import { Framework } from "./framework";

export interface ITemplate {
  name: string;
  value: string;
  description: string;
  framework: Framework;
  isWeb3AuthSupported: boolean;
}

