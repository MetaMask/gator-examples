import path from "path";
import { NPM_AUTH_TOKEN } from "../../../config";
import fs from "fs-extra";
import GatorAppConfiguration from "../types/gator-app-configuration";

export async function generatePackageManagerConfigs(
  gatorAppConfiguration: GatorAppConfiguration
): Promise<void> {
  switch (gatorAppConfiguration.packageManager) {
    case "npm":
    case "pnpm":
      return await fs.writeFile(
        path.join(gatorAppConfiguration.targetDir, ".npmrc"),
        `//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}
  @metamask-private:registry=https://registry.npmjs.org/`
      );
    case "yarn":
      await fs.writeFile(
        path.join(gatorAppConfiguration.targetDir, ".yarnrc.yml"),
        `
nodeLinker: node-modules
npmRegistries:
  //registry.npmjs.org:
    npmAuthToken: ${NPM_AUTH_TOKEN}
  
npmScopes:
  metamask-private:
    npmRegistryServer: "https://registry.npmjs.org"
    npmAuthToken: ${NPM_AUTH_TOKEN}
      `
      );

      return await fs.createFile(
        path.join(gatorAppConfiguration.targetDir, "yarn.lock")
      );
    default:
      throw new Error(
        `Unsupported package manager: ${gatorAppConfiguration.packageManager}`
      );
  }
}
