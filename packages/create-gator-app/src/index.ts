#!/usr/bin/env node
import inquirer, { Answers } from "inquirer";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { generatePackageManagerConfigs } from "./lib/helpers/create-package-manager-config";
import { installTemplate } from "./lib/helpers/install-template";
import { displayIntro } from "./lib/helpers/intro";
import { WEB3AUTH_PROMPTS } from "./lib/prompts/web3auth";
import { PackageManager } from "./lib/types/package-manager";
import { BASE_PROMPTS } from "./lib/prompts/base";
import { configureWeb3Auth } from "./lib/helpers/configure-web3auth";
import { configurePackageJson } from "./lib/helpers/configure-package-json";
import { installDependencies } from "./lib/helpers/install-dependencies";
import { displayOutro } from "./lib/helpers/outro";

export async function main() {
  displayIntro();
  const answers = await inquirer.prompt(BASE_PROMPTS);
  let web3AuthAnswers: Answers | undefined;

  // If the user wants to use Embedded Wallet, prompt them for the Web3Auth configuration
  if (answers.useEmbeddedWallet) {
    web3AuthAnswers = await inquirer.prompt(WEB3AUTH_PROMPTS);
  }

  const spinner = ora("Creating your project...").start();

  try {
    const targetDir = path.join(process.cwd(), answers.projectName);

    // Check if the directory already exists
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
      answers.framework,
      answers.template
    );

    installTemplate(templatePath, targetDir, {
      ...answers,
      ...web3AuthAnswers,
    });

    if (answers.useEmbeddedWallet) {
      spinner.text = "Configuring Web3Auth...";
      await configureWeb3Auth(answers, targetDir);
    }

    spinner.text = "Setting up package configuration...";
    await configurePackageJson(targetDir, answers);

    // This is not required once the SDK made public
    await generatePackageManagerConfigs(
      targetDir,
      answers.packageManager as PackageManager
    );

    process.chdir(targetDir);

    try {
      spinner.text = `Installing dependencies with ${answers.packageManager}...`;
      await installDependencies(answers.packageManager);
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
    displayOutro(answers.packageManager, answers);
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
