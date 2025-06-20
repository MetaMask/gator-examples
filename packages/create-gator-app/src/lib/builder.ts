import fs from "fs-extra";
import inquirer from "inquirer";
import chalk from "chalk";
import IBuilderOptions from "./types/builder-options";
import {
  installTemplate,
  configureWeb3Auth,
  installDependencies,
} from "./helpers";
import { configurePackageJson } from "./helpers/configure-package-json";
import { ErrorCodes, BuilderError } from "./types/builder-error";
import { BuilderConfig } from "./config";
import ora from "ora";
import path from "path";

export class Builder {
  private builderConfig: BuilderConfig;
  private options: IBuilderOptions;
  private spinner: ora.Ora;

  constructor(private config: BuilderConfig) {
    this.builderConfig = config;
    this.options = config.getOptions();
    this.spinner = ora("Creating your project...");
  }

  async createProject(): Promise<void> {
    this.spinner.start();
    await this.handleExistingDirectory();
    await this.copyTemplateFiles();
    if (this.builderConfig.shouldAddWeb3AuthConfig()) {
      await this.configureWeb3Auth();
    }
    await this.configurePackage();
    if (this.options.packageManager === "yarn") {
      await this.configureYarnLock();
    }
    if (!this.options.skipInstall) {
      await this.installDependencies();
    }
    this.spinner.succeed(
      chalk.green(`Project structure created at ${this.options.targetDir}`)
    );
  }

  private async handleExistingDirectory(): Promise<void> {
    if (fs.existsSync(this.options.targetDir)) {
      this.spinner.stop();
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Directory ${this.options.projectName} already exists. Do you want to overwrite it?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        throw new BuilderError(
          "Operation cancelled. Please choose a different project name.",
          ErrorCodes.PROJECT_EXISTS
        );
      }
      this.spinner.start("Cleaning existing directory...");
      await fs.emptyDir(this.options.targetDir);
    } else {
      fs.mkdirSync(this.options.targetDir, { recursive: true });
    }
  }

  private async copyTemplateFiles(): Promise<void> {
    this.spinner.text = "Copying template files...";
    const templateResult = await installTemplate(
      this.options.templatePath,
      this.options.targetDir,
      this.builderConfig
    );

    if (!templateResult.success) {
      this.spinner.fail(templateResult.message);
      throw new BuilderError(
        templateResult.message,
        ErrorCodes.TEMPLATE_COPY_FAILED
      );
    }
    this.spinner.succeed("Template files copied successfully");
  }

  private async configureWeb3Auth(): Promise<void> {
    this.spinner.start("Configuring Web3Auth...");
      try {
        await configureWeb3Auth(this.options);
        this.spinner.succeed("Web3Auth configured successfully");
      } catch (error) {
        this.spinner.fail("Web3Auth configuration failed");
        throw BuilderError.fromError(error, ErrorCodes.WEB3AUTH_CONFIG_FAILED);
      }
  
  }

  private async configurePackage(): Promise<void> {
    this.spinner.start("Configuring package.json...");
    try {
      await configurePackageJson(this.builderConfig);
      this.spinner.succeed("package.json configured successfully");
    } catch (error) {
      this.spinner.fail("package.json configuration failed");
      throw BuilderError.fromError(error, ErrorCodes.PACKAGE_CONFIG_FAILED);
    }
  }

  private async configureYarnLock(): Promise<void> {
    await fs.createFile(path.join(this.options.targetDir, "yarn.lock"));
  }

  private async installDependencies(): Promise<void> {
    this.spinner.start("Installing dependencies...");
    try {
      process.chdir(this.options.targetDir);
      await installDependencies(this.options.packageManager);
      this.spinner.succeed("Dependencies installed successfully");
    } catch (error) {
      this.spinner.warn(
        chalk.yellow(
          "Dependencies installation failed, but your project was created."
        )
      );
      console.error(
        chalk.red(
          `\nInstallation error: ${error instanceof Error ? error.message : String(error)
          }`
        )
      );
      console.log("\nYou can try installing dependencies manually:");
      console.log(`cd ${this.options.projectName}`);
      console.log(
        `  ${this.options.packageManager} ${this.options.packageManager === "yarn" ? "" : "install"
        }`
      );
    }
  }
}
