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
      "--add-web3auth",
      "Add Web3Auth Embedded Wallet as a signer for delegator smart account"
    )
    .option("--skip-install", "Skip the installation of dependencies")
};
