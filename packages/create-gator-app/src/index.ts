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
import { GatorAppConfig } from "./lib/gator-app-config";
import { CreateGatorApp } from "./lib/create-gator-app";
import { GatorAppError } from "./lib/types/gator-app-error";
import { isWeb3AuthSupported } from "./lib/helpers/check-web3auth-support";
import { checkLLMRulesExist } from "./lib/helpers/check-llm-rules";

async function promptUser(flags: OptionValues) {
  const answers = await inquirer.prompt(BASE_PROMPTS);
  let web3AuthAnswers: Answers | undefined;
  let llmAnswers: Answers | undefined;

  if (flags.addWeb3auth && isWeb3AuthSupported(answers.template)) {
    web3AuthAnswers = await inquirer.prompt(WEB3AUTH_PROMPTS);
  }

  if (flags.addLlmRules && checkLLMRulesExist(answers.template)) {
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
    const gatorAppConfig = new GatorAppConfig(
      answers,
      web3AuthAnswers,
      llmAnswers,
      flags
    );

    const createGatorApp = new CreateGatorApp(gatorAppConfig.getOptions());
    await createGatorApp.createProject();

    displayOutro(gatorAppConfig.getOptions());
  } catch (error) {
    if (error instanceof GatorAppError) {
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