#!/usr/bin/env node
import inquirer, { Answers } from "inquirer";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { installTemplate } from "./lib/helpers/install-template";
import { displayIntro } from "./lib/helpers/intro";
import { WEB3AUTH_PROMPTS } from "./lib/prompts/web3auth";
import { BASE_PROMPTS } from "./lib/prompts/base";
import { configureWeb3Auth } from "./lib/helpers/configure-web3auth";
import { installDependencies } from "./lib/helpers/install-dependencies";
import { configurePackageJson } from "./lib/helpers/configure-package-json";
import { displayOutro } from "./lib/helpers/outro";
import { createCommand } from "./lib/helpers/commands";
import { Command, OptionValues } from "commander";
import GatorAppConfiguration from "./lib/types/gator-app-configuration";
import { checkLLMRulesExist } from "./lib/helpers/check-llm-rules";
import { LLM_PROMPTS } from "./lib/prompts/llm";
import { isWebAuthSupported } from "./lib/helpers/check-web3auth-support";

export async function main() {
  const command: Command = createCommand();
  const flags: OptionValues = command.parse(process.argv).opts();

  displayIntro();
  const answers = await inquirer.prompt(BASE_PROMPTS);
  let web3AuthAnswers: Answers | undefined;
  let llmAnswers: Answers | undefined;

  const targetDir = path.join(process.cwd(), answers.projectName);
  const templatePath = path.join(
    __dirname,
    "../../templates",
    answers.framework,
    answers.template
  );

  const web3authTemplatePath = path.join(
    __dirname,
    "../../templates",
    answers.framework,
    "web3auth"
  );

  const isWeb3AuthSupportAvailable = isWebAuthSupported(answers.template);
  const isLLMSupportAvailable = checkLLMRulesExist(templatePath);

  // If the user wants to use Embedded Wallet, prompt them for the
  // Web3Auth configuration
  if (flags.addWeb3auth && isWeb3AuthSupportAvailable) {
    web3AuthAnswers = await inquirer.prompt(WEB3AUTH_PROMPTS);
  }

  // If the user wants to use LLM rules, prompt them for the LLM configuration
  if (flags.addLlmRules && isLLMSupportAvailable) {
    llmAnswers = await inquirer.prompt(LLM_PROMPTS);
  }

  const gatorAppConfiguration: GatorAppConfiguration = {
    projectName: answers.projectName,
    targetDir: targetDir,
    templatePath: templatePath,
    web3AuthTemplatePath: web3authTemplatePath,
    addWeb3auth: flags.addWeb3auth,
    framework: answers.framework,
    packageManager: answers.packageManager,
    template: answers.template,
    web3AuthNetwork: web3AuthAnswers?.web3AuthNetwork,
    addLLMRules: flags.addLlmRules,
    areLLMRulesAvailable: checkLLMRulesExist(templatePath),
    ideType: llmAnswers?.ideType,
    skipInstall: flags.skipInstall,
    isWebAuthSupported: isWebAuthSupported(answers.template),
  };

  const spinner = ora("Creating your project...").start();

  try {
    // Check if the directory already exists
    if (fs.existsSync(gatorAppConfiguration.targetDir)) {
      spinner.stop();
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Directory ${gatorAppConfiguration.projectName} already exists. Do you want to overwrite it?`,
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
      await fs.emptyDir(gatorAppConfiguration.targetDir);
    } else {
      fs.mkdirSync(gatorAppConfiguration.targetDir, { recursive: true });
    }

    spinner.text = "Copying template files...";

    const templateResult = await installTemplate(
      templatePath,
      targetDir,
      gatorAppConfiguration
    );

    if (!templateResult.success) {
      spinner.fail(templateResult.message);
      process.exit(1);
    }

    spinner.succeed("Template files copied successfully");

    if (
      gatorAppConfiguration.addWeb3auth &&
      gatorAppConfiguration.isWebAuthSupported
    ) {
      spinner.text = "Configuring Web3Auth...";
      await configureWeb3Auth(gatorAppConfiguration);
    }

    spinner.text = "Setting up package configuration...";
    await configurePackageJson(gatorAppConfiguration);

    process.chdir(targetDir);

    if (!gatorAppConfiguration.skipInstall) {
      try {
        spinner.text = `Installing dependencies with ${gatorAppConfiguration.packageManager}...`;
        await installDependencies(gatorAppConfiguration.packageManager);
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
        console.log(`cd ${gatorAppConfiguration.projectName}`);
        console.log(
          `  ${gatorAppConfiguration.packageManager} ${
            gatorAppConfiguration.packageManager === "yarn" ? "" : "install"
          }`
        );

        spinner.succeed(
          chalk.green(`Project structure created at ${targetDir}`)
        );
        return;
      }
    } else {
      spinner.info(chalk.blue("Skipping dependency installation."));
      console.log("\nYou can install dependencies manually later:");
      console.log(`cd ${gatorAppConfiguration.projectName}`);
      console.log(
        `  ${gatorAppConfiguration.packageManager} ${
          gatorAppConfiguration.packageManager === "yarn" ? "" : "install"
        }`
      );
    }

    spinner.succeed(
      chalk.green(`Project created successfully at ${targetDir}`)
    );
    displayOutro(gatorAppConfiguration);
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
