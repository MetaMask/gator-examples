import { spawn } from "cross-spawn";
import path from "path";
import fs from "fs-extra";
import { NPM_AUTH_TOKEN } from "../../config";

export type PackageManager = "npm" | "yarn" | "pnpm";

export async function install(packageManager: PackageManager): Promise<void> {
  const args: string[] = ["install"];

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, args, {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "development",
      },
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}

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
      return await fs.writeFile(
        path.join(targetDir, ".yarnrc.yml"),
        `npmRegistries:
  //registry.npmjs.org:
    npmAuthToken: ${NPM_AUTH_TOKEN}

npmScopes:
  metamask-private:
    npmRegistryServer: "https://registry.npmjs.org"
    npmAuthToken: ${NPM_AUTH_TOKEN}`
      );
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }
}
