import fs from "fs-extra";
import inquirer from "inquirer";
import chalk from "chalk";
import IGatorAppOptions from "./types/gator-app-options";
import {
  installTemplate,
  configureWeb3Auth,
  installDependencies,
} from "./helpers";
import { configurePackageJson } from "./helpers/configure-package-json";
import { ErrorCodes, GatorAppError } from "./types/gator-app-error";
import { GatorAppConfig } from "./gator-app-config";

export class CreateGatorApp {
  constructor(private options: IGatorAppOptions) {}

  async createProject(): Promise<void> {
    await this.handleExistingDirectory();
    await this.copyTemplateFiles();
    await this.configureWeb3Auth();
    await this.configurePackage();
    await this.installDependencies();
  }

  private async handleExistingDirectory(): Promise<void> {
    if (fs.existsSync(this.options.targetDir)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Directory ${this.options.projectName} already exists. Do you want to overwrite it?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        throw new GatorAppError(
          "Operation cancelled. Please choose a different project name.",
          ErrorCodes.PROJECT_EXISTS
        );
      }

      await fs.emptyDir(this.options.targetDir);
    } else {
      fs.mkdirSync(this.options.targetDir, { recursive: true });
    }
  }

  private async copyTemplateFiles(): Promise<void> {
    const templateResult = await installTemplate(
      this.options.templatePath,
      this.options.targetDir,
      this.options
    );

    if (!templateResult.success) {
      throw new GatorAppError(
        templateResult.message,
        ErrorCodes.TEMPLATE_COPY_FAILED
      );
    }
  }

  private async configureWeb3Auth(): Promise<void> {
    const gatorAppConfig = new GatorAppConfig(
      {
        projectName: this.options.projectName,
        framework: this.options.framework,
        template: this.options.template,
        packageManager: this.options.packageManager,
      },
      { web3AuthNetwork: this.options.web3AuthNetwork },
      undefined,
      { addWeb3auth: this.options.addWeb3auth }
    );

    if (gatorAppConfig.shouldAddWeb3AuthConfig()) {
      try {
        await configureWeb3Auth(this.options);
      } catch (error) {
        throw GatorAppError.fromError(error, ErrorCodes.WEB3AUTH_CONFIG_FAILED);
      }
    }
  }

  private async configurePackage(): Promise<void> {
    try {
      await configurePackageJson(this.options);
    } catch (error) {
      throw GatorAppError.fromError(error, ErrorCodes.PACKAGE_CONFIG_FAILED);
    }
  }

  private async installDependencies(): Promise<void> {
    if (!this.options.skipInstall) {
      try {
        process.chdir(this.options.targetDir);
        await installDependencies(this.options.packageManager);
      } catch (error) {
        console.warn(
          chalk.yellow(
            "Dependencies installation failed, but your project was created."
          )
        );
        console.error(
          chalk.red(
            `\nInstallation error: ${
              error instanceof Error ? error.message : String(error)
            }`
          )
        );
        console.log("\nYou can try installing dependencies manually:");
        console.log(`cd ${this.options.projectName}`);
        console.log(
          `  ${this.options.packageManager} ${
            this.options.packageManager === "yarn" ? "" : "install"
          }`
        );
      }
    }
  }
}
