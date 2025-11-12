import { Framework } from "./framework";
import { PackageManager } from "./package-manager";
import { ITemplate } from "./template";

interface IBuilderOptions {
  projectName: string;
  targetDir: string;
  templatePath: string;
  web3AuthTemplatePath?: string;
  addWeb3auth: boolean;
  framework: Framework;
  packageManager: PackageManager;
  web3AuthNetwork?: string;
  template: ITemplate;
  skipInstall: boolean;
}

export default IBuilderOptions;
