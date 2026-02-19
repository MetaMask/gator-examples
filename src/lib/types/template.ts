import { Framework } from './framework';

export type ITemplate = {
  name: string;
  value: string;
  description: string;
  framework: Framework;
  isWeb3AuthSupported: boolean;
};
