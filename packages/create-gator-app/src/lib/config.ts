import { Answers } from "inquirer";
import { OptionValues } from "commander";
import path from "path";
import IBuilderOptions from "./types/builder-options";
import { resolveTemplate } from "./helpers/resolve-template";

export class BuilderConfig {
  private options: IBuilderOptions;

  constructor(
    baseAnswers: Answers,
    web3AuthAnswers: Answers | undefined,
    llmAnswers: Answers | undefined,
    flags: OptionValues
  ) {
    const targetDir = path.join(process.cwd(), baseAnswers.projectName);

    const templatePath = path.join(
      __dirname,
      "../../../templates",
      baseAnswers.framework,
      baseAnswers.template
    );

    const web3AuthTemplatePath = path.join(
      __dirname,
      "../../../templates",
      baseAnswers.framework,
      "web3auth"
    );

    this.options = {
      projectName: baseAnswers.projectName,
      targetDir,
      templatePath,
      web3AuthTemplatePath,
      addWeb3auth: flags.addWeb3auth,
      framework: baseAnswers.framework,
      packageManager: baseAnswers.packageManager,
      template: resolveTemplate(baseAnswers),
      web3AuthNetwork: web3AuthAnswers?.web3AuthNetwork,
      addLLMRules: flags.addLlmRules,
      ideType: llmAnswers?.ideType,
      skipInstall: flags.skipInstall,
    };
  }

  getOptions(): IBuilderOptions {
    return this.options;
  }

  shouldAddLLMRules(): boolean {
    return this.options.addLLMRules && this.options.template.areLLMRulesSupported;
  }

  shouldAddWeb3AuthConfig(): boolean {
    return this.options.addWeb3auth && this.options.template.isWeb3AuthSupported;
  }
}