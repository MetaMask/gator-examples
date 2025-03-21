import path from "path";
import fs from "fs-extra";
import { Answers } from "inquirer";

export const configureWeb3Auth = async (
  answers: Answers,
  targetDir: string
) => {
  const web3authDirectory = path.join(
    __dirname,
    "../../../../templates",
    answers.framework,
    "web3auth"
  );

  const connectorTemplatePath = path.join(
    web3authDirectory,
    "Web3AuthConnector.ts"
  );

  const connectorPath = path.join(
    targetDir,
    "src",
    "connectors",
    "Web3AuthConnector.ts"
  );

  await fs.copy(connectorTemplatePath, connectorPath);

  const providerTemplatePath = path.join(web3authDirectory, "AppProvider.tsx");

  const providerPath = path.join(
    targetDir,
    "src",
    "providers",
    "AppProvider.tsx"
  );

  await fs.copy(providerTemplatePath, providerPath);

  const isPolyfillRequired = answers.framework === "vite-react";

  // If the project is using vite-react, we need to copy the index.html file
  // from the web3auth template to the target directory
  //
  // This is because vite-react requires a polyfill for the Buffer and process
  // variables, which are not available in the browser.
  if (isPolyfillRequired) {
    const indexHTMLTemplate = path.join(web3authDirectory, "index.html");
    const indexHtmlPath = path.join(targetDir, "index.html");
    await fs.copy(indexHTMLTemplate, indexHtmlPath);
  }
};
