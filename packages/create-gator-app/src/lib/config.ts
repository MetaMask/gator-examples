import { Answers } from "inquirer";
import { OptionValues } from "commander";
import path from "path";
import IBuilderOptions from "./types/builder-options";
import { checkLLMRulesExist } from "./helpers/check-llm-rules";
import { isWeb3AuthSupported } from "./helpers/check-web3auth-support";

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
      template: baseAnswers.template,
      web3AuthNetwork: web3AuthAnswers?.web3AuthNetwork,
      addLLMRules: flags.addLlmRules,
      areLLMRulesAvailable: checkLLMRulesExist(templatePath),
      ideType: llmAnswers?.ideType,
      skipInstall: flags.skipInstall,
      isWeb3AuthSupported: isWeb3AuthSupported(baseAnswers.template),
    };
  }

  getOptions(): IBuilderOptions {
    return this.options;
  }

  shouldAddLLMRules(): boolean {
    return this.options.addLLMRules && this.options.areLLMRulesAvailable;
  }

  shouldAddWeb3AuthConfig(): boolean {
    return this.options.addWeb3auth && this.options.isWeb3AuthSupported;
  }
}