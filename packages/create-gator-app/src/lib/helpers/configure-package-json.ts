import fs from "fs-extra";
import path from "path";
import GatorAppConfiguration from "../types/gator-app-configuration";

export const configurePackageJson = async (
  gatorAppConfiguration: GatorAppConfiguration
) => {
  const packageJsonPath = path.join(gatorAppConfiguration.targetDir, "package.json");
  // If the package.json file exists, update the name and dependencies
  if (fs.existsSync(packageJsonPath)) {
    const pkgJson = await fs.readJson(packageJsonPath);
    pkgJson.name = gatorAppConfiguration.projectName;
    if (gatorAppConfiguration.useWeb3auth) {
      pkgJson.dependencies = {
        ...pkgJson.dependencies,
        "@web3auth/ethereum-provider": "^9.7.0",
        "@web3auth/modal": "^9.7.0",
        "@web3auth/web3auth-wagmi-connector": "^7.0.0",
      };

      // If the project is using vite-react, we need to add the buffer and process
      // dependencies to the package.json file
      //
      // This is because vite-react requires a polyfill for the Buffer and process
      // variables, which are not available in the browser.
      if (gatorAppConfiguration.framework === "vite-react") {
        pkgJson.devDependencies = {
          ...pkgJson.devDependencies,
          buffer: "^6.0.3",
          process: "^0.11.10",
        };
      }
    }

    await fs.writeJson(packageJsonPath, pkgJson, { spaces: 2 });
  }
};