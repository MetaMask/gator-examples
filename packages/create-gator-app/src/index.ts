#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import chalk from "chalk";

import {
  generatePackageManagerConfigs,
  install,
  PackageManager,
} from "./lib/package-manager";
import { prompts } from "./lib/prompts";
import { displayIntro } from "./lib/intro";
import { installTemplate } from "./lib/installTemplate";

export async function main() {
  displayIntro();
  const answers = await inquirer.prompt(prompts);

  const spinner = ora("Creating your project...").start();

  try {
    const targetDir = path.join(process.cwd(), answers.projectName);

    if (fs.existsSync(targetDir)) {
      spinner.stop();
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Directory ${answers.projectName} already exists. Do you want to overwrite it?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(
          chalk.yellow(
            "\nOperation cancelled. Please choose a different project name."
          )
        );
        process.exit(0);
      }

      spinner.start("Cleaning existing directory...");
      await fs.emptyDir(targetDir);
    } else {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    spinner.text = "Copying template files...";
    const templatePath = path.join(
      __dirname,
      "../../templates",
      answers.template
    );
    
    installTemplate(templatePath, targetDir, answers.useEmbeddedWallet, answers.web3AuthNetwork);

    if (answers.useEmbeddedWallet) {
      spinner.text = "Configuring Web3Auth...";
      const connectorTemplatePath = path.join(
        __dirname,
        "../../templates",
        "web3auth",
        "Web3AuthConnector.ts"
      );
      const connectorPath = path.join(
        targetDir,
        "src",
        "connectors",
        "Web3AuthConnector.ts"
      );

      await fs.copy(connectorTemplatePath, connectorPath);

      const providerTemplatePath = path.join(
        __dirname,
        "../../templates",
        "web3auth",
        "AppProvider.tsx"
      );

      const providerPath = path.join(
        targetDir,
        "src",
        "providers",
        "AppProvider.tsx"
      );

      await fs.copy(providerTemplatePath, providerPath);
    }

    spinner.text = "Setting up package configuration...";
    await generatePackageManagerConfigs(
      targetDir,
      answers.packageManager as PackageManager
    );

    const pkgJsonPath = path.join(targetDir, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
      const pkgJson = await fs.readJson(pkgJsonPath);
      pkgJson.name = answers.projectName;
      if (answers.useEmbeddedWallet) {
        pkgJson.dependencies = {
          ...pkgJson.dependencies,
          "@web3auth/ethereum-provider": "^9.7.0",
          "@web3auth/modal": "^9.7.0",
          "@web3auth/web3auth-wagmi-connector": "^7.0.0",
        };
      }

      await fs.writeJson(pkgJsonPath, pkgJson, { spaces: 2 });
    }

    // This is not required once the SDK made public
    await generatePackageManagerConfigs(
      targetDir,
      answers.packageManager as PackageManager
    );

    process.chdir(targetDir);

    try {
      spinner.text = `Installing dependencies with ${answers.packageManager}...`;
      await install(answers.packageManager);
    } catch (installError: unknown) {
      spinner.warn(
        chalk.yellow(
          "Dependencies installation failed, but your project was created."
        )
      );
      console.error(
        chalk.red(
          `\nInstallation error: ${
            installError instanceof Error
              ? installError.message
              : String(installError)
          }`
        )
      );
      console.log("\nYou can try installing dependencies manually:");
      console.log(`cd ${answers.projectName}`);
      console.log(
        `  ${answers.packageManager} ${
          answers.packageManager === "yarn" ? "" : "install"
        }`
      );

      spinner.succeed(chalk.green(`Project structure created at ${targetDir}`));
      return;
    }

    spinner.succeed(
      chalk.green(`Project created successfully at ${targetDir}`)
    );

    console.log(chalk.cyan("\n🚀 Next steps:"));
    console.log(chalk.white(`  1. cd ${answers.projectName}`));
    console.log(chalk.white(`  2. ${answers.packageManager} dev`));

    console.log(chalk.cyan("\n📚 Documentation:"));
    console.log(
      chalk.white(
        "  • Learn more about Delegation toolkit: https://docs.gator.metamask.io/"
      )
    );
    console.log(
      chalk.white("  • Explore example code in the /examples directory")
    );

    console.log(chalk.green("\n🦊 Happy building with Delegation toolkit! 🦊"));
  } catch (error) {
    spinner.fail("Failed to create project");
    console.error(
      chalk.red(
        `\nError: ${error instanceof Error ? error.message : String(error)}`
      )
    );
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
