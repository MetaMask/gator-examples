#!/usr/bin/env node
import inquirer, { Answers } from "inquirer";
import chalk from "chalk";
import { Command, OptionValues } from "commander";
import { createCommand } from "./lib/helpers/commands";
import { displayIntro } from "./lib/helpers/intro";
import { displayOutro } from "./lib/helpers/outro";
import { WEB3AUTH_PROMPTS } from "./lib/prompts/web3auth";
import { BASE_PROMPTS } from "./lib/prompts/base";
import { LLM_PROMPTS } from "./lib/prompts/llm";
import { BuilderConfig } from "./lib/config";
import { Builder } from "./lib/builder";
import { BuilderError } from "./lib/types/builder-error";
import { resolveTemplate } from "./lib/helpers/resolve-template";

async function promptUser(flags: OptionValues) {
  const answers = await inquirer.prompt(BASE_PROMPTS);
  let web3AuthAnswers: Answers | undefined;
  let llmAnswers: Answers | undefined;

  const template = resolveTemplate(answers);

  if (flags.addWeb3auth && template.isWeb3AuthSupported) {
    web3AuthAnswers = await inquirer.prompt(WEB3AUTH_PROMPTS);
  }

  if (flags.addLlmRules && template.areLLMRulesSupported) {
    llmAnswers = await inquirer.prompt(LLM_PROMPTS);
  }

  return { answers, web3AuthAnswers, llmAnswers };
}

export async function main() {
  const command: Command = createCommand();
  const flags: OptionValues = command.parse(process.argv).opts();

  displayIntro();
  try {
    const { answers, web3AuthAnswers, llmAnswers } = await promptUser(flags);
    const builderConfig = new BuilderConfig(
      answers,
      web3AuthAnswers,
      llmAnswers,
      flags
    );

    const createGatorApp = new Builder(builderConfig);
    await createGatorApp.createProject();

    displayOutro(builderConfig.getOptions());
  } catch (error) {
    if (error instanceof BuilderError) {
      console.error(chalk.red(`\nError: ${error.message}`));
    } else {
      console.error(
        chalk.red(
          `\nError: ${error instanceof Error ? error.message : String(error)}`
        )
      );
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}