import path from "path";
import { NPM_AUTH_TOKEN } from "../../../config";
import { PackageManager } from "../types/package-manager";
import fs from "fs-extra";

export async function generatePackageManagerConfigs(
  targetDir: string,
  packageManager: PackageManager
): Promise<void> {
  switch (packageManager) {
    case "npm":
    case "pnpm":
      return await fs.writeFile(
        path.join(targetDir, ".npmrc"),
        `//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}
  @metamask-private:registry=https://registry.npmjs.org/`
      );
    case "yarn":
      await fs.writeFile(
        path.join(targetDir, ".yarnrc.yml"),
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
        path.join(targetDir, "yarn.lock")
      );
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }
}
