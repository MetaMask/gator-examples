import fs from "fs-extra";
import { Answers } from "inquirer";
import path from "path";

export const configurePackageJson = async (
  targetDir: string,
  answers: Answers
) => {
  const packageJsonPath = path.join(targetDir, "package.json");
  // If the package.json file exists, update the name and dependencies
  if (fs.existsSync(packageJsonPath)) {
    const pkgJson = await fs.readJson(packageJsonPath);
    pkgJson.name = answers.projectName;
    if (answers.useEmbeddedWallet) {
      pkgJson.dependencies = {
        ...pkgJson.dependencies,
        "@web3auth/ethereum-provider": "^9.7.0",
        "@web3auth/modal": "^9.7.0",
        "@web3auth/web3auth-wagmi-connector": "^7.0.0",
      };
    }

    await fs.writeJson(packageJsonPath, pkgJson, { spaces: 2 });
  }
};
