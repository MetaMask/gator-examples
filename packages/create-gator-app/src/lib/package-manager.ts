import { spawn } from "cross-spawn";
import path from "path";
import fs from "fs-extra";
export type PackageManager = "npm" | "yarn" | "pnpm";

export async function install(
  packageManager: PackageManager,
): Promise<void> {
  const args: string[] = ["install"];

  return new Promise((resolve, reject) => {
    console.log("ENV", process.env);
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
  if (!process.env.NPM_AUTH_TOKEN) {
    throw new Error("NPM_AUTH_TOKEN is not set");
  }

  switch (packageManager) {
    case "npm":
    case "pnpm":
      return await fs.writeFile(
        path.join(targetDir, ".npmrc"),
        `//registry.npmjs.org/:_authToken=${process.env.NPM_AUTH_TOKEN}
@metamask-private:registry=https://registry.npmjs.org/`
      );
    case "yarn":
      return await fs.writeFile(
        path.join(targetDir, ".yarnrc.yml"),
        `npmRegistries:
  //registry.npmjs.org:
    npmAuthToken: ${process.env.NPM_AUTH_TOKEN}

npmScopes:
  metamask-private:
    npmRegistryServer: "https://registry.npmjs.org"
    npmAuthToken: ${process.env.NPM_AUTH_TOKEN}`
      );
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }
}

export async function replaceAuthTokenWithPlaceholder(
  targetDir: string,
  packageManager: PackageManager
): Promise<void> {
  if (!process.env.NPM_AUTH_TOKEN) {
    throw new Error("NPM_AUTH_TOKEN is not set");
  }

  switch (packageManager) {
    case "npm":
    case "pnpm":
      return await fs.writeFile(
        path.join(targetDir, ".npmrc"),
        `//registry.npmjs.org/:_authToken=<npm-auth-token>
@metamask-private:registry=https://registry.npmjs.org/`
      );
    case "yarn":
      return await fs.writeFile(
        path.join(targetDir, ".npmrc"),
        `npmRegistries:
  //registry.npmjs.org:
    npmAuthToken: <npm-auth-token>

npmScopes:
  metamask-private:
    npmRegistryServer: "https://registry.npmjs.org"
    npmAuthToken: <npm-auth-token>`
      );
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }
}