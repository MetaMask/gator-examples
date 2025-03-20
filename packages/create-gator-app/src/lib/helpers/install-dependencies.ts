import { spawn } from "child_process";
import { PackageManager } from "../types/package-manager";

export async function installDependencies(
  packageManager: PackageManager
): Promise<void> {
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
