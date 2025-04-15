import path from "path";
import fs from "fs-extra";
import IGatorAppOptions from "../types/gator-app-options";

export const configureWeb3Auth = async (
  gatorAppConfiguration: IGatorAppOptions
) => {
  const connectorTemplatePath = path.join(
    gatorAppConfiguration.web3AuthTemplatePath!,
    "Web3AuthConnector.ts"
  );

  const connectorPath = path.join(
    gatorAppConfiguration.targetDir,
    "src",
    "connectors",
    "Web3AuthConnector.ts"
  );

  await fs.copy(connectorTemplatePath, connectorPath);

  const providerTemplatePath = path.join(
    gatorAppConfiguration.web3AuthTemplatePath!,
    "AppProvider.tsx"
  );

  const providerPath = path.join(
    gatorAppConfiguration.targetDir,
    "src",
    "providers",
    "AppProvider.tsx"
  );

  await fs.copy(providerTemplatePath, providerPath);

  const isPolyfillRequired = gatorAppConfiguration.framework === "vite-react";

  // If the project is using vite-react, we need to copy the index.html file
  // from the web3auth template to the target directory
  //
  // This is because vite-react requires a polyfill for the Buffer and process
  // variables, which are not available in the browser.
  if (isPolyfillRequired) {
    const indexHTMLTemplate = path.join(
      gatorAppConfiguration.web3AuthTemplatePath!,
      "index.html"
    );
    const indexHtmlPath = path.join(
      gatorAppConfiguration.targetDir,
      "index.html"
    );
    await fs.copy(indexHTMLTemplate, indexHtmlPath);
  }
};
