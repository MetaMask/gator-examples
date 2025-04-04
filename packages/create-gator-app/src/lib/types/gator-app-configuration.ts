import { Framework } from "./framework";
import { PackageManager } from "./package-manager";

interface GatorAppConfiguration {
  projectName: string;
  targetDir: string;
  templatePath: string;
  web3AuthTemplatePath?: string;
  useWeb3auth: boolean;
  framework: Framework;
  packageManager: PackageManager;
  web3AuthNetwork?: string;
  template: string;
}

export default GatorAppConfiguration;
