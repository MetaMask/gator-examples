import { Framework } from "./framework";
import { PackageManager } from "./package-manager";

interface GatorAppConfiguration {
  projectName: string;
  targetDir: string;
  templatePath: string;
  web3AuthTemplatePath?: string;
  addWeb3auth: boolean;
  isWebAuthSupported: boolean;
  framework: Framework;
  packageManager: PackageManager;
  web3AuthNetwork?: string;
  template: string;
  addLLMRules: boolean;
  areLLMRulesAvailable: boolean;
  ideType: "Cursor" | "Windsurf" | "Both";
  skipInstall: boolean;
}

export default GatorAppConfiguration;
