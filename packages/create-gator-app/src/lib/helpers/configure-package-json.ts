import fs from "fs-extra";
import path from "path";
import { BuilderConfig } from "../config";

export const configurePackageJson = async (
  builderConfig: BuilderConfig
) => {
  const options = builderConfig.getOptions();

  const packageJsonPath = path.join(
    options.targetDir,
    "package.json"
  );
  // If the package.json file exists, update the name and dependencies
  if (fs.existsSync(packageJsonPath)) {
    const pkgJson = await fs.readJson(packageJsonPath);
    pkgJson.name = builderConfig.getOptions().projectName;
    if (builderConfig.shouldAddWeb3AuthConfig()) {
      pkgJson.dependencies = {
        ...pkgJson.dependencies,
        "@web3auth/modal": "10.0.0-beta.9",
      };

      // If the project is using vite-react, we need to add the buffer and process
      // dependencies to the package.json file
      //
      // This is because vite-react requires a polyfill for the Buffer and process
      // variables, which are not available in the browser.
      if (options.framework === "vite-react") {
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
