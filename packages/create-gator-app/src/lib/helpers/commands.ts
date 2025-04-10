import { Command } from "commander";
import packageJson from "../../../package.json";

export const createCommand = (): Command => {
  return new Command(packageJson.name)
    .version(
      packageJson.version,
      "-v, --version",
      "Check version the current version of the create-gator-app CLI"
    )
    .helpOption("-h, --help", "Display the available options")
    .option(
      "--use-web3auth",
      "Use Web3Auth Embedded Wallet as a signer for delegator"
    )
    .option("--skip-install", "Skip the installation of dependencies")
    .option("--add-llm-rules", "Add LLM rules for your IDE");
};
